# Golang





​	In Go, a function whose name starts with a capital letter can be called by a function not in the same package. 







#### 内置包

##### os

###### os.Args

>   根据空格分割获取命令行参数

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	fmt.Println(os.Args)
}
```

![1606438382030](Golang.assets/1606438382030.png)



##### flag

> 用于解析命令行传递的标志位参数

> 使用flag解析的标志位参数支持格式:
>
> * xxx.exe -name=alice
> * xxx.exe -name alice
> * xxx.exe --name alice
> * xxx.exe --name=alice

```go
import (
	"flag"
	"fmt"
)

func main() {
    //先设置解析规则
    //第一个参数是标志位, 第二个参数是默认值, 第三个参数是当使用 xxx.exe --help 时给出的提示
    //返回值是对应类型的指针
	name := flag.String("name", "alice", "请输入name值")
    //然后执行解析
	flag.Parse()
	fmt.Println("name: ", *name)
}
```

使用--help显示提示

![1606441600160](Golang.assets/1606441600160.png)





#### Go操作MYSQL

###### 基本操作

1. `go get -u github.com/go-sql-driver/mysql` 下载数据库连接驱动

2. 无论哪个数据库连接驱动, 都是实现了内置模块 database/sql 这个包里面的规范, 因此所有数据库连接驱动的使用方式都是相同的

3. 使用数据库连接驱动进行连接

4. 基本的CRUD

   ```go
   package main
   
   import (
   	"database/sql"
   	"fmt"
   
   	_ "github.com/go-sql-driver/mysql"
   )
   
   //数据库连接池对象
   var db *sql.DB
   
   //初始化时数据库连接池对象
   func initDB(dsn string) (err error) {
   	//创建数据库连接池实例
   	//database/sql 中规定了 Open 方法返回一个连接池对象的指针, 因此可直接使用该 db 进行数据操作, 无需手动维护连接池
   	db, err = sql.Open("mysql", dsn)
   	if err != nil {
   		return
   	}
   	//ping数据库, 来测试是否连接成功
   	err = db.Ping()
   	if err != nil {
   		return
   	}
   	//设置连接池最大连接数
   	db.SetMaxOpenConns(10)
   	//设连接池最大闲置连接数
   	db.SetMaxIdleConns(5)
   	return
   }
   
   type student struct {
   	id   int
   	name string
   	age  int
   }
   
   //封装CRUD方法
   func queryByID(id int) (stu student) {
   	sql := "select * from student where id=?"
   	row := db.QueryRow(sql, id)
   	//查询返回的row一定要执行 Scan 方法, 因为 Scan 方法中包含了将连接放回连接池的操作
   	err := row.Scan(&stu.id, &stu.name, &stu.age)
   	if err != nil {
   		fmt.Printf("scan failed : %v\n", err)
   		return
   	}
   	return
   }
   
   func queryRows() (stus []student) {
   	sql := "select * from student"
   	rows, err := db.Query(sql)
   	if err != nil {
   		fmt.Printf("query rows failed : %v\n", err)
   		return
   	}
   	//一定要记得关闭rows
   	defer rows.Close()
   	//遍历
   	for rows.Next() {
   		var stu student
   		rows.Scan(&stu.id, &stu.name, &stu.age)
   		stus = append(stus, stu)
   	}
   	return
   }
   
   func insertRow(stu student) (n int64) {
   	sql := `insert into student(name, age) values(?,?)`
   	res, err := db.Exec(sql, stu.name, stu.age)
   	if err != nil {
   		fmt.Printf("insert row failed : %v\n", err)
   		return
   	}
   	//插入操作可调该方法获取最新插入数据的id, 显然只适合id是int类型的情况
   	n, err = res.LastInsertId()
   	if err != nil {
   		fmt.Printf("get inserted id failed : %v\n", err)
   		return
   	}
   	return
   }
   
   func modifyRow(stu student) (n int64) {
   	sql := "update student set name=?,age=? where id=?"
   	res, err := db.Exec(sql, stu.name, stu.age, stu.id)
   	if err != nil {
   		fmt.Printf("update row failed : %v\n", err)
   		return
   	}
   	n, err = res.RowsAffected()
   	if err != nil {
   		fmt.Printf("get rows affected failed : %v\n", err)
   		return
   	}
   	return
   }
   
   func delRow(id int) (n int64) {
   	sql := `delete from student where id=?`
   	res, err := db.Exec(sql, id)
   	if err != nil {
   		fmt.Printf("delete failed : %v\n", err)
   		return
   	}
   	n, err = res.RowsAffected()
   	if err != nil {
   		fmt.Printf("get rows affected failed : %v\n", err)
   		return
   	}
   	return
   }
   
   func main() {
   	//init db
   	if err := initDB("root:123123@tcp(127.0.0.1:3306)/go_store"); err != nil {
   		fmt.Printf("connect db failed : %v\n", err)
   		return
   	}
   	//根据id查询记录
   	stu := queryByID(1)
   	fmt.Println("查询结果: ", stu)
   	//查所有
   	stus := queryRows()
   	for _, v := range stus {
   		fmt.Println(v)
   	}
   	// 插入
   	stu = student{name: "blice", age: 22}
   	res := insertRow(stu)
   	fmt.Println("插入数据的id是: ", res)
   	//更新
   	stu = student{id: 1, name: "ylice", age: 18}
   	n := modifyRow(stu)
   	fmt.Println("更新影响行数: ", n)
   	//删除
   	n = delRow(1)
   	fmt.Println("删除影响行数: ", n)
   }
   ```

   

###### 预处理操作

> ​	如果某个对数据库的操作会频繁执行, 可以考虑使用预处理, 就是先把带参数位置的 sql语句发给数据库, 生成预处理对象, 之后再执行该操作时直接传递参数, 这种情况下, 预处理的方式能够提高性能

```go
//使用预处理的方式操作数据库
func preInsertRow(stu student) (n int64) {
	sql := "insert into student(name,age) values(?,?)"
	stmt, err := db.Prepare(sql)
	if err != nil {
		fmt.Printf("prepare failed : %v\n", err)
		return
	}
	//记得关闭预处理对象
	defer stmt.Close()
	res, err := stmt.Exec(stu.name, stu.age)
	if err != nil {
		fmt.Printf("preInsert failed : %v\n", err)
		return
	}
	n, err = res.LastInsertId()
	if err != nil {
		fmt.Printf("get last insert id failed : %v\n", err)
		return
	}
	return
}
```

###### 事务操作

```go
//事务操作
func transactionDemo() {
	//开启事务
	tx, err := db.Begin()
	if err != nil {
		fmt.Printf("start transaction failed : %v\n", err)
		return
	}
	//执行多个语句
	sql1 := "update student set age=age-2 where id=?"
	sql2 := "update student set age=age+2 where id=?"
	_, err = tx.Exec(sql1, 2)
	if err != nil {
		fmt.Printf("sql1 exec failed : %v\n", err)
		//执行失败则回滚
		tx.Rollback()
		return
	}
	_, err = tx.Exec(sql2, 3)
	if err != nil {
		tx.Rollback()
		fmt.Printf("sql2 exec failed : %v\n", err)
		return
	}
	//都执行成功则提交
	err = tx.Commit()
	if err != nil {
		tx.Rollback()
		fmt.Printf("commit failed : %v\n", err)
		return
	}

}
```

###### 使用sqlx

> sqlx是内置包 sql 的升级版, 简化了查询操作的流程
>
> 也是git上一个项目





#### Go操作Redis

> 使用 go-redis 包, 也内置实现了连接池对象

https://www.liwenzhou.com/posts/Go/go_redis/





#### NSQ

> 使用Go开发的分布式消息队列

> 消息队列就是先把消息存起来, 之后再慢慢地异步执行

> 该消息队列系统的设计方案包括 :
>
> * **一个中心管理节点**, 用来记录当前消息队列中消息的数量和正在工作的工作节点的位置; 该中心管理节点对工作节点们实时进行心跳检测以保证正常工作; 消费者连接该中心节点, 获得实际消息存放在哪个工作节点上, 然后消费者再去实际的工作节点取数据.
>
> * **若干个工作节点**, 这些工作节点接收生产者发送过来的数据并保存, 在需要的时候返回给消费者
>
> * **一个可选的可视化服务**, 其实就是实时从中心管理节点读取数据并在web页面上展示
>
> <img src="Golang.assets/1606480951365.png" alt="1606480951365" style="zoom: 80%;" />

一个工作节点 + 一个中心管理节点 + 可视化服务 的部署:

1. 下载NSQ, windows版本的就是一些 exe 文件

   ![1606480105083](Golang.assets/1606480105083.png)

2. 首先在此处命令行中执行 `nsqlookupd.exe` 打开中心管理节点

3. 然后在此处命令行中执行 `nsqd --lookupd-tcp-address=127.0.0.1:4160` 开启一个工作节点并注册到中心管理节点上

4. 此时消息队列系统已经启动, 此时可以在命令行中执行 `nsqadmin --lookupd-http-address=127.0.0.1:4161` 开启可视化服务, 监听中心管理节点上的消息队列, 默认可视化界面开启在 `http://127.0.0.1:4171` 这里

5. 然后就到了使用 Go 操作 NSQ消息队列

6. 首先下这个 `go get -u github.com/nsqio/go-nsq` , 也可以直接从git上下载放到对应目录下

7. 然后创建生产者, 往消息队列发送消息

   ```go
   package main
   
   import (
   	"bufio"
   	"fmt"
   	"os"
   	"strings"
   
   	"github.com/nsqio/go-nsq"
   )
   
   // NSQ Producer Demo
   
   var producer *nsq.Producer
   
   // 初始化生产者
   func initProducer(str string) (err error) {
   	config := nsq.NewConfig()
   	producer, err = nsq.NewProducer(str, config)
   	if err != nil {
   		fmt.Printf("create producer failed, err:%v\n", err)
   		return err
   	}
   	return nil
   }
   
   func main() {
   	nsqAddress := "127.0.0.1:4150"
   	err := initProducer(nsqAddress)
   	if err != nil {
   		fmt.Printf("init producer failed, err:%v\n", err)
   		return
   	}
   
   	reader := bufio.NewReader(os.Stdin) // 从标准输入读取
   	for {
   		data, err := reader.ReadString('\n')
   		if err != nil {
   			fmt.Printf("read string from stdin failed, err:%v\n", err)
   			continue
   		}
   		data = strings.TrimSpace(data)
   		if strings.ToUpper(data) == "Q" { // 输入Q退出
   			break
   		}
   		// 向 'topic_demo' publish 数据
   		err = producer.Publish("topic_demo", []byte(data))
   		if err != nil {
   			fmt.Printf("publish msg to nsq failed, err:%v\n", err)
   			continue
   		}
   	}
   }
   ```

8. 编译执行生产者, 在控制台多次发送消息, 可在可视化界面中查看消息队列中保存的未发出的消息

   ![1606480548060](Golang.assets/1606480548060.png)

9. 创建消费者, 用来接收消息队列中的消息

   ```go
   package main
   
   import (
   	"fmt"
   	"os"
   	"os/signal"
   	"syscall"
   	"time"
   
   	"github.com/nsqio/go-nsq"
   )
   
   // NSQ Consumer Demo
   
   // MyHandler 是一个消费者类型
   type MyHandler struct {
   	Title string
   }
   
   // HandleMessage 是需要实现的处理消息的方法
   func (m *MyHandler) HandleMessage(msg *nsq.Message) (err error) {
   	fmt.Printf("%s recv from %v, msg:%v\n", m.Title, msg.NSQDAddress, string(msg.Body))
   	return
   }
   
   // 初始化消费者
   func initConsumer(topic string, channel string, address string) (err error) {
   	config := nsq.NewConfig()
   	config.LookupdPollInterval = 15 * time.Second
   	c, err := nsq.NewConsumer(topic, channel, config)
   	if err != nil {
   		fmt.Printf("create consumer failed, err:%v\n", err)
   		return
   	}
   	consumer := &MyHandler{
   		Title: "沙河1号",
   	}
   	c.AddHandler(consumer)
   
   	// if err := c.ConnectToNSQD(address); err != nil { // 直接连NSQD
   	if err := c.ConnectToNSQLookupd(address); err != nil { // 通过lookupd查询
   		return err
   	}
   	return nil
   
   }
   
   func main() {
   	err := initConsumer("topic_demo", "first", "127.0.0.1:4161")
   	if err != nil {
   		fmt.Printf("init consumer failed, err:%v\n", err)
   		return
   	}
   	c := make(chan os.Signal)        // 定义一个信号的通道
   	signal.Notify(c, syscall.SIGINT) // 转发键盘中断信号到c
   	<-c                              // 阻塞
   }
   ```

10. 编译执行消费者, 可接收到从生产者中发出的消息







#### Context

> ​	如果想要手动实现使得一个 goroutine 在指定的时刻退出, 那么首先需要创建一个全局的 chan, 然后在 goroutine 中进行无限for循环, 在每一次循环时进行 select 判断直到能够从该 chan 中取的到值, 就退出该 for 循环即退出 goroutine, 这样做会使得每个人编出来的代码各种各样, 不利于程序的可读性.

> ​	为此, go官方推出了这种写法的规范, 即 context.

> ​	使用context来控制goroutine, 应当将 context 对象作为goroutine执行函数的参数传递 , 然后在函数内不断尝试获取 context.Done()

```go
package main

import (
	"context"
	"fmt"
	"sync"
	"time"
)

var wg sync.WaitGroup

func main() {
	//创建 context 实例
	//返回的第一个值是context实例, 调其Done方法会以只读的方式返回其内部维护的 chan
	//返回的第二个值是一个方法, 调用该方法会在其内部维护的 chan 中添加一个元素
	ctx, cancel := context.WithCancel(context.Background())
	wg.Add(1)
	go func(ctx context.Context) {
		defer wg.Done()
	FORLOOP:
		for {
			fmt.Println("goroutine print...")
			time.Sleep(time.Millisecond * 500)
			//在select中使用 ctx.Done() 接收context中chan里面的值, 收到值时就退出循环即实现了退出goroutine
			select {
			case <-ctx.Done():
				break FORLOOP
			default:
			}
		}
	}(ctx)
	time.Sleep(time.Second * 2)
	//调用cancel向chan中存值
	cancel()
	wg.Wait()
}
```

> context 包提供的四个with系列函数

```go
//返回一个普通的context, 提供cancel函数
func WithCancel(parent Context) (ctx Context, cancel CancelFunc)
//返回一个到指定时间自动通知的context, 也可手动调用cancel函数提前结束
func WithDeadline(parent Context, deadline time.Time) (Context, CancelFunc)
//返回一个指定时间后自动通知的context, 也可手动调用cancel函数提前结束
func WithTimeout(parent Context, timeout time.Duration) (Context, CancelFunc)
//WithValue函数和取消Context无关，它是为了生成一个绑定了一个键值对数据的Context，这个绑定的数据可以通过Context.Value方法访问到
func WithValue(parent Context, key, val interface{}) Context
```





#### go module

> go模块管理

> 使得自己的项目可以不用写在 GOPATH 目录的src下

> 项目中生成的 go.mod 文件用于记录项目直接引用的包

> 项目中生成的 go.sum 文件用于记录项目直接加间接引用的包

> go module 模块化的方式使得同一个包的多个版本可以共存用于不同的项目中

初始化go module项目

1. 在非 GOPATH 目录的地方新建文件夹并添加go文件, go文件中引用一些第三方的包
2. 在该目录命令行中 `set GO111MODULE=on` 打开 go module 功能
3. 在命令行中 `set GOPROXY=https://goproxy.cn` 设置下载包时使用的代理地址
4. 在命令行中 `go mod init` 初始化 `go.mod` 文件
5. 在命令行中 `go mod tidy` 检查项目使用到的所有包并更新 `go.mod` 文件以及生成 `go.sum` 文件
6. 在命令行中 `go mod download` 下载项目使用到的所有包到 GOPATH/pkg 中
7. 在命令行中 `go mod vendor` 将项目使用到的所有包复制到本目录下 `vendor` 文件夹中

之后添加使用到的第三方包时

1. `go mod tidy` 检测依赖更新
2. `go mod download` 下载新的依赖
3. `go mod vendor` 把新依赖搞到vendor目录中





#### tail 第三方包

> 持续读取文件变动







#### go ini 第三方包

> 读配置文件的







####  第三方包

> go 操作 kafka 的包







#### kafka

> 分布式消息队列

kafka架构

* 由多个 broker(节点) 组成, 每个 broker 分别存储消息
* 消息根据 topic 进行分组, 每个 topic 下的数据分成几部分保存到不同的 broker 上, 为的是提高并发
* 每个被分成分区的 topic 消息数据(被称为leader), 都会在其他的 broker 上进行备份(被称为fellower). 生产者发送消息和消费者接收消息总是直接与 leader 对接, fellower 只是一个备份的作用. 当某个 leader 所在节点出现故障时, 某一个 fellower 变成新的 leader进行工作
* 消费者通常被拆分为消费者组, 一个组是一个整体, 其中的组员不能读取相同的消息数据, 将消费者这样拆分的目的是提高读取消息的效率

消息存储机制

* 按照 `主题-分区号` 为文件夹名字, 存储到 server.properties 中配置的 log.dirs 路径中
* 在文件夹中, .index 存储同名的 log 文件中各条消息的起始位置
* 每当 log 文件大于 server.properties 中配置的 log.segment.bytes 大小时, 就使用当前已保存的消息条数加一为文件名, 创建 log 文件和对应的 index 文件
* 分文件存储是为了提高读取消息的速度, 读取消息时, 先根据消息的索引确定在哪个log 文件中存着, 然后根据对应的 index 文件确定消息在 log 文件中的起始位置, 然后直接打开文件去对应位置读取

消费者组分配主题分区机制

* 对于一个主题, 通常被分为多个分区; 对于一个消费者组, 通常包含多个消费者, 在一个消费者组对主题进行消费前, 会将该主题下的分区对消费者组成员进行分配, 也就是每个消费者会分配到几个分区去消费
* 消费者分配分区有两种策略
  1. 单张发牌式一个消费者一个分区直至发完, 会把所有订阅主题下的所有分区全都放到一块进行分配, 如果不同消费者订阅的主题不同, 那么某些消费者可能会分配到未订阅主题的分区
  2. 多张分牌式按照消费者个数一次性把所有分区进行分配 (默认的方式)

消费者读取位置存储机制

* 不指定消费者组名称时, 默认将新启动的消费者放到名为 consumer_group_随机数 的组中

* 消费者体现为消费者组, 组内成员不能多次读取同一个主题下的同一条数据, 那么就需要实时保存该消费者组对于某个主题当前消费到哪里了,

  这个当前消费位置被称为 offset

* kafka 0.9版本之前, 将 offset 以节点的形式存储到zookeeper的 consumer 节点下

* kafka 0.9版本及之后, 将 offset 存储到内置的 topic中, 名为 __consumer_offsets, 因为kafka将topic数据存储到本地, 所以就是将 offset 存储到本地

* 这个 __consumer_offsets 内置 topic 默认不可访问, 应当在 consumer.properties 文件中配置 `exclude.internal.topics=false` 之后才能访问

* 然后读这个 topic 的时候需要指定上一步中修改的配置文件

  ![1607067294293](Golang.assets/1607067294293.png)

指定启动的消费者所在的消费者组名

1. 修改 consumer.properties 文件中的 group.id 属性

2. 使用该配置文件启动消费者

   ![1607067936260](Golang.assets/1607067936260.png)

3. 使用该方式启动多个消费者会分到同一个消费者组, 对同一个主题进行订阅, 结果是多个消费者轮流接收到消息

ISR

* 每次生产者发送消息到 kafka , 都是 leader 先存好, 然后它的 fellower 跟着存好 
* 但是如果集群中 fellower 很多, 那么每次存储消息就要花费很长时间 
* 这个时候, 各个broker就根据各个 fellower 对存储消息的响应速度进行排名, 排名在前边的某些个就被赋予 ISR 会员资格 
* 每次存储消息时, 只要这些 ISR 会员都说 "我好了", 那么就认为本次消息存储完毕, 提高了存储的响应时间

ACK应答机制

* 生产者向kafka集群发送消息后, 怎样确认该消息是否发送成功呢, 这时候就需要 leader 站出来告诉生产者:"我好了"
* 但是同样的问题, 如果leader下的 fellower节点很多, 那岂不是响应的速度会很慢
* 于是 kafka 中有三种 ack的设置
  1. 0: 只要生产者发了消息, 就认为发成功了, 最快, 最不可靠
  2. 1: 只要 leader 存好了, 那么就返回 "我好了", 较快, 较不可靠, leader 炸了就完蛋
  3. -1: 得等到 leader 存好, 以及 ISR会员身份的 fellower存好, 才返回 "我好了", 最慢, 可靠性最高

它是如何骗消费者的 ( 如何保证消费者得到消息的一致性 )

* 如果在存消息的时候, 搞得各个 fellower 中存的消息个数都不一样, 也就是都没与 leader 完全同步, 比如 leader 存了10条, 两个fellower分别存了 8 , 9 条 
* 那么如果消费者此时在 leader 上读取到了第10条, 等着读取第11条呢, 然后 leader炸了, 这个时候某个 fellower 成为了 leader, 因为它们上面的消息都不全, 压根就没第10条,更别提第11条了
* 此时消费者来问, 我的第 11 条消息呢, 这个时候就尴尬了, 数组下标越界了
* 那么怎么处理这种情况呢, kafka就开始骗了, 总是取leader 和它的 fellower 中消息长度最短的长度, 告诉消费者, 我就这点消息, 你看着用吧, 实际上 leader 中的消息可能多的多.
* 这样做后, 即使 leader 炸了, fellower 成为 leader 时, 也不用怕给不了消费者消息的尴尬了.
* 但是如果上位的 fellower是存着 8 条消息的那个, 然后此时还存在一个 fellower有9条消息, 如果照常存消息和同步消息, 那么本来长度为9的那个 fellower 中消息下标就会跟当前这个只有8 条消息的leader 错位
* 如果很快这个原本有8条消息的 leader 炸了, 然后那个原本有9条消息的fellower上位了, 当消费者来要8条之后的消息时, 返回的消息将都是下标错位的.
* 所以新的 fellower 上位后, 还会告诉其他 fellower :"你们不能比我长", 凡是比当前leader 长的 fellower 中长出来的部分都切掉
* 这样做能够保证复杂情况下消费者得到的消息总是一致的, 但是就是赤裸裸的吞掉消息, 丢弃消息, 诈骗消费者.



跑 kafka

1. 先启动zookeeper, kafka的bin目录下自带一个 zookeeper, 其配置文件在 conf 目录下 , 使用zookeeper-server-start.bat 启动
2. 然后启动 bin 下的 kafka-server-start.bat, 配置文件同样在 conf 下, server.properties
3. 一个节点的kafka已经启动完毕

用kafka自带的命令行程序玩转kafka

1. 先把 zookeeper 跑起来

2. 执行 `kafka-server.start.bat` 文件开一个 kafka 的 broker(节点)

3. 修改 `server.properties ` 文件中 broker-id, listening-port, log.dirs 

4. 然后再次执行  `kafka-server.start.bat` 文件在本机另外一个端口上再开一个 broker

5. 此时本机运行了两个kafka 节点, 达到了玩耍的最低要求

6. 使用 `kafka-topics.bat` 文件来玩转 topic

7. `kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 2 --topic mytopic` 创建一个被分区为两份, 有一个副本的主题, 叫 mytopic

8. `kafka-topics.bat --describe mytopic --zookeeper localhost:2181` 查看上步创建的 topic

   ![1606740771002](Golang.assets/1606740771002.png)

9. 在两个broker配置的 log 文件存放目录下可查看文件的分区情况

   ![1606740842782](Golang.assets/1606740842782.png)

   因为这里是在同一台机器上启动了两个 broker , 且把两个的 log 目录都配置到了同一个文件夹下, 所以这俩会出现在一块, 正常情况下它们应当出现在不同的服务器上



go使用sarama v1.19.0第三方包操作kafka

> v1.19.0版本之后在windows安装会报gcc未安装错误, 需要先安装gcc

1. 下载 `go get `









#### zookeeper

> kafka 使用 zookeeper 作为服务注册发现中心

> 树形结构存储数据, 所有节点的路径都是 /xxx/xxx

##### 安装和启动

1. 下载并解压
2. 在目录下创建 data 文件夹, 用于存放数据
3. 复制 conf/zoo_sample.cfg 文件为 zoo.cfg 并修改 数据存放位置为上步新建的 data 文件夹
4. 在cmd中执行 bin 中的 zkServe.cmd

##### 使用zkCli.sh操作

> 执行 bin 中的 zkCli.cmd 默认连接本机2181端口
>
> 连接其他机器上的zookeeper时可设置 -server 参数来连接
>
> quit 退出

##### 列出节点

```shell
ls [路径]
```

##### 查看节点值

```shell
#无论节点是否有子节点, 它都能有值
get [节点路径]
```

##### 查看节点属性

```shell
stat [节点路径]
```

| **状态属性**   | **说明**                                                     |
| -------------- | ------------------------------------------------------------ |
| cZxid          | 数据节点创建时的事务ID                                       |
| ctime          | 数据节点创建时的时间                                         |
| mZxid          | 数据节点最后一次更新时的事务ID                               |
| mtime          | 数据节点最后一次更新时的时间                                 |
| pZxid          | 数据节点的子节点列表最后一次被修改（是子节点列表变更，而不是子节点内容变更）时的事务ID |
| cversion       | 子节点的版本号                                               |
| dataVersion    | 数据节点的版本号                                             |
| aclVersion     | 数据节点的ACL版本号                                          |
| ephemeralOwner | 如果节点是临时节点，则表示创建该节点的会话的SessionID；如果节点是持久节点，则该属性值为0 |
| dataLength     | 数据内容的长度                                               |
| numChildren    | 数据节点当前的子节点个数                                     |

##### 增加节点

有序节点做分布数据库id

> 有序节点可以作为分布式数据库数据的主键, 具体做法是首先规定一个有序节点名称作为数据库主键序号的生成节点, 每个客户端在往数据库存数据之前, 新增该有序节点, 因为zookeeper会自动在该节点后面加上唯一且递增的序号, 所以可以使用该序号作为要插入数据库数据的主键, 就保证了分库情况下数据主键的唯一.
>
> ![1606983591233](Golang.assets/1606983591233.png)
>
> 由图可知, 不断添加相同名称的有序节点, 后面的序号会逐个递增且不重复

有序节点做分布式锁

> 同样是使用有序节点, 创建 /Locks/Lock_ 的临时有序节点, 节点叫什么无所谓
>
> 对带锁保护的内容进行操作前, 先判断当前拿到的这个 Lock_节点序号的前一个节点是否存在, 不存在就代表轮到你了, 可以操作, 反之就代表被被人正操作着, 此时应当监听前一个节点的删除事件, 当其删除时, 就代表轮到自己了

使用方法

```shell
#创建持久节点, 不赋值默认为null
create [节点路径] [节点值]
#创建有序节点, 生成的节点名会后接序号
create -s [节点路径]
#创建临时节点, 该节点仅在本次shell中有效
create -e [节点路径]
#创建子节点, 首先得保证存在父节点, 如此时存在 node 节点, 为其创建子节点
create /node/second [值]
```

##### 修改节点

```shell
#普通修改节点
set [节点路径] [值]
#匹配版本号才能修改节点, 节点每修改一次, 版本号加一, 使用这种方式修改节点, 只有当前节点版本号等于给定版本号时, 才能修改成功
set [节点路径] [值] [版本号]
```

##### 删除节点

```shell
#只能删除没有子节点的节点
delete [节点路径]
#删除有子节点的节点
deleteall [节点路径]
```

##### 添加节点值监听

> 监听是一次性的, 捕获到一次动作后就失效 

> 这个可以做分布式配置共享, 将配置项设置为 节点值, 然后监听这些节点, 当收到变动消息时更新配置值

```shell
#先在一个 zkCli 中设置监听
get -s -w [节点路径]
#或者用 stat 添加监听也行, 没区别
stat -w [节点路径]
```

```shell
#再开一个 zkCli 修改监听的节点
set [节点路径] [值]
```

然后就会在添加监听的cmd中收到监听消息

![1606914092472](Golang.assets/1606914092472.png)

##### 添加节点监听

> 监听是一次性的, 捕获到一次动作后就失效

> 这个能监听该节点的子节点个数变化, 节点值变化不会监听

```shell
#先添加监听
ls -w [节点路径]
```

```shell
#然后在另外一个zkCli中给该节点添加子节点
create [节点路径]
```

##### acl权限控制列表

> 设置不同的服务器对zookeeper上节点数据的操作权限

>  使用：schema(模式)​ : id(用户) : ​permission(权限列表) 来标识 

###### 模式包括

| 方案   | 描述                                                | 对应的id       | 权限格式                |
| ------ | --------------------------------------------------- | -------------- | ----------------------- |
| world  | 只有一个用户：anyone，代表所有人（默认）            | 只有一个anyone | world:anyone:[权限列表] |
| ip     | 使用IP地址认证                                      | 目标的ip地址   | ip:[ip地址]:[权限列表]  |
| auth   | 使用已添加认证的用户认证, 就是明文用户名和密码      | 目标用户名     |                         |
| digest | 使用“用户名:密码”方式认证, 就是用户名和加密后的密码 | 目标用户名     |                         |

###### 权限列表

> 比如拥有所有权限表示为  cdrwa

| 权限   | ACL简写 | 描述                             |
| ------ | ------- | -------------------------------- |
| CREATE | c       | 可以创建子节点                   |
| DELETE | d       | 可以删除子节点（仅下一级节点）   |
| READ   | r       | 可以读取节点数据及显示子节点列表 |
| WRITE  | w       | 可以设置节点数据                 |
| ADMIN  | a       | 可以设置节点访问控制列表权限     |

###### 查看某节点权限列表

```shell
getAcl [节点路径]
```

![1606915458143](Golang.assets/1606915458143.png)

###### 设置权限列表

> 使用 setAcl <节点路径> <权限格式>

* 设置 world 模式的权限

  ```shell
  setAcl <节点路径> world:anyone:<权限列表>
  ```

* 设置 IP 模式的权限

  ```shell
  #设置赋予一个ip权限, 那么就只有该IP有权限
  setAcl <节点路径> ip:<IP地址>:<权限列表>
  #可同时设置多个ip权限,即同时设置多个权限规则
  setAcl <节点路径> ip:<IP地址>:<权限列表>,ip:<IP地址>:<权限列表>
  ```

* 设置 auth 模式的权限

  ```shell
  #首先得添加用户
  addauth digest <用户名>:<密码>
  
  #然后才能对该用户设置权限
  setAcl <节点路径> auth:<用户名>:<权限列表>
  ```

  ```shell
  #此时在别的机器上对该节点访问就需要先添加有权限的用户
  addauth digest <用户名>:<密码>
  #然后才能对该节点拥有对应的权限
  ```

* 设置 digest 模式的权限

  ```shell
  #首先使用linux命令生成用户名和密码的密文
  echo -n <用户名>:<密码> | openssl dgsl -binary -shal | openssl base64
  ```

  ```shell
  #同样是对用户的权限设置, 不同的是不需要先添加用户, 且使用加密后的密码
  setAcl <节点路径> digest:<用户名>:<上一步生成的密文>:<权限列表>
  #设置后需要添加对应用户才能拥有对应权限
  addauth digest <用户名>:<未经加密的密码>
  ```

* 同时设置多种权限模式, 使用 , 逗号分割多种权限格式

###### 设置内置的超管

> 为防止对节点设置了权限后忘了密码之类的尴尬, 应当设置一个内置的超级管理员账户, 通过修改 zkServer.bat 文件来实现, linux 下修改 zkServer.sh

1. 假设要添加的超管账号和密码是 super:admin, 还是先使用linux内置命令生成密文

   ```shell
   echo -n super:admin | openssl dgsl -binary -shal | openssl base64
   ```

2. 然后打开 zkServer 文件, 找到 `nohup $JAVA "-Dzookeeper.log.dir=${ZOO_LOG_DIR}" "-Dzookeeper.root.logger=${ZOO_LOG4J_PROP}"`, 在后面添加 `"-Dzookeeper.DigestAuthenticationProvider.superDigest=super:<上一步生成的密文>"`

3. 然后重启 zkServer

4. 然后添加 super 超管认证用户, 就拥有了所有节点的所有权限

   ```shell
   addauth digest super:admin
   ```

   

##### 集群部署

> 集群其实就是数据冗余, 所有节点都存一套数据

1. 整三个服务器, 使用同一台机器的三个不同端口也可以

2. 在各个节点的 zoo.cfg 文件中添加如下集群地址信息

   ```cfg
   server.1=<IP地址:端口:leader选举端口>
   server.2=<IP地址:端口:leader选举端口>
   server.3=<IP地址:端口:leader选举端口>
   ```

   如果是在一台机器的不同端口上开启服务, 记得修改 data 路径 和 端口号

3. 然后在各个节点的 data 目录下新建文件 myid , 编辑内容分别为 1,2,3

4. 分别使用 `zkServe` 启动服务

5. 使用 `zkServer.bat status` 检查启动状态

6. 使用 `zkCli.bat -server <IP地址:端口>` 可连接集群中指定的节点

> 集群中节点的几种类型:
>
> leader, fellower, observer

leader节点就相当于主节点, 写操作都会转发给 leader 节点来执行

fellower节点就相当于从节点

服务器启动时会进行 leader 选举, 就是谁的 myid 大谁就是 leader, 存在 leader 后就不再选举

observer节点不参与 leader 节点的选举, 不参与写数据时的ack反馈, 也就是写数据时不关心oberser节点写没写进去

配置一个 observer 节点:

1. 首先得有一个集群

2. 然后将各个节点的 zoo.cfg 配置文件将要作为 observer 节点的配置后面加上 :observer

   ```cfg
   server.1=<IP地址:端口:leader选举端口>
   server.2=<IP地址:端口:leader选举端口>
   #比如要用这台机器作为observer节点, 那么就在配置后面加上:observer
   server.3=<IP地址:端口:leader选举端口>:observer
   ```

3. 在 observer 节点的 zoo.cfg 中额外加上这样一句

   ```cfg
   peerType=observer
   ```

   

图形化工具

1、下载https://issues.apache.org/jira/secure/attachment/12436620/ZooInspector.zip

2、运行zookeeper-dev-ZooInspector.jar

  2.1 解压，进入目录ZooInspector\build

  2.2 在build目录，按住shift键右键鼠标，在右键菜单出选择“在此处打开命令窗口

  2.3 java -jar zookeeper-dev-ZooInspector.jar //执行成功后，会弹出java ui client

3、点击左上角连接按钮，输入zk服务地址：ip:2181





#### etcd

> 使用go开发的 key-value 存储服务

> 类似于zookeeper, 不同的是这个存储数据就是键值对, 没有树形节点的概念

> 适用场景: 
>
> * 配置中心  
> * 服务注册于发现
> * 分布式锁
> * 分库唯一id

> etcd 使用 Raft 协议保证数据一致性
>
> zookeeper 中使用 zad 协议保证数据一致性

> 为什么用 etcd 不用 zookeeper?
>
> * zookeeper操作复杂, 安装复杂, etcd就是go语言编译的可执行文件, 一键运行
> * zookeeper官方只提供 java 和 c 的api , etcd 本身即是go开发的支持go语言

##### 下载安装启动

1. git上下载

2. 解压, 直接运行 etcd.exe 启动服务

   ![1607220306840](Golang.assets/1607220306840.png)

3. 运行 `etcdctl.exe --endpoints=http://localhost:2379 <命令> <值> [值]` 操作数据

   ![1607220506144](Golang.assets/1607220506144.png)

> 操作数据的命令:
>
> * put 键 值
> * get 键
> * del 键

##### 使用go操作etcd

###### [put 和 get操作](http://www.topgoer.com/%E6%95%B0%E6%8D%AE%E5%BA%93%E6%93%8D%E4%BD%9C/go%E6%93%8D%E4%BD%9Cetcd/%E6%93%8D%E4%BD%9Cetcd.html#put%E5%92%8Cget%E6%93%8D%E4%BD%9C)

0. `go get go.etcd.io/etcd/clientv3`

1. 如果使用go mod构建, 忽略第一条, 使用如下步骤

   1. `go mod init`

   2. 手动在 `go.mod` 文件中添加, 因为 goproxy 上 etcd 包的路径名和 git 上的不同

      ```mod
      replace (
      	github.com/coreos/bbolt => go.etcd.io/bbolt v1.3.4
      	google.golang.org/grpc => google.golang.org/grpc v1.26.0
      )
      ```

   3. `go mod tidy`

   4. `go mod vendor`

2. 创建dome文件

   ```go
   package main
   
   import (
   	"context"
   	"fmt"
   	"time"
   
   	"go.etcd.io/etcd/clientv3"
   )
   
   // etcd client put/get demo
   // use etcd/clientv3
   
   func main() {
   	//创建客户端
   	cli, err := clientv3.New(clientv3.Config{
   		Endpoints:   []string{"127.0.0.1:2379"},
   		DialTimeout: 5 * time.Second,
   	})
   	if err != nil {
   		// handle error!
   		fmt.Printf("connect to etcd failed, err:%v\n", err)
   		return
   	}
   	fmt.Println("connect to etcd success")
   	//记得关闭客户端连接
   	defer cli.Close()
   	// put
   	//使用一秒钟的 context, 要么put先执行完, 要么一秒后执行put的goroutine关闭
   	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
   	_, err = cli.Put(ctx, "name", "alice")
       //put操作完后, 直接释放该goroutine的资源, 不写也行
   	cancel()
   	if err != nil {
   		fmt.Printf("put to etcd failed, err:%v\n", err)
   		return
   	}
   	fmt.Println("put success!")
   	// get
   	ctx, cancel = context.WithTimeout(context.Background(), time.Second)
   	resp, err := cli.Get(ctx, "name")
   	cancel()
   	if err != nil {
   		fmt.Printf("get from etcd failed, err:%v\n", err)
   		return
   	}
   	//输出get到的数据
   	for _, ev := range resp.Kvs {
   		fmt.Printf("%s:%s\n", ev.Key, ev.Value)
   	}
   }
   ```

3. 编译执行

4. 在 etcdCli.exe 客户端中查看操作数据结果

   ![1607237847860](Golang.assets/1607237847860.png)

###### [watch 监听数据](http://www.topgoer.com/%E6%95%B0%E6%8D%AE%E5%BA%93%E6%93%8D%E4%BD%9C/go%E6%93%8D%E4%BD%9Cetcd/%E6%93%8D%E4%BD%9Cetcd.html#watch%E6%93%8D%E4%BD%9C)





