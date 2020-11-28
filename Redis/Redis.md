> ### Redis

* ##### Redis配置

  1. 将解压出来的文件夹下的 `redis.conf `文件 拷贝到 Redis安装完成的文件夹下与 `bin` 文件夹同级
  2. 如果想使得自定义的配置文件生效, 则在启动服务时应加上配置文件路径 ` ./bin/redis-server ./redis.conf`
  3. 配置项
     1. daemonize yes  设置为守护进程运行模式
     2. bind 127.0.0.1   设置访问地址为本机, 仅限本机可访问本服务器, 注释掉则清除访问限制
     3. port 6379     设置访问的端口
     4. database 16 设置为可支持同时使用16个数据库
     5. save <second> <changes>  设置在second时间内,如果修改次数达到changes,则持久化数据
     6. dbfilename dump.rdb  设置本地持久化文件的名称
     7. dir ./  设置本地持久化文件的存放位置( 默认当前目录 )
     8. requirepass xxxxxx  设置连接到redis服务器的密码 , 设置密码后应使用 `AUTH <password>`命令来连接
     9. maxclients 10000 设置同一时间的最大客户端连接数
     10. maxmemory <bytes>  设置最大内存使用量, 超过时会删除快过期的key上的数据

* ##### 服务端的操作

  * 服务端的关闭
    * 直接杀进程(数据丢失)
      1. 查询pid `ps -ef | grep -i redis`
      2. 关闭进程 `kill -9 <pid>`
    * 数据保存,正常关闭
      1. 在客户端执行 `shutdown`

* ##### 客户端的使用

  1. 连接服务端`./redis-cli [-h host] [-p port] -a password`
     * -h host 默认为本机
     * -p port 为连接端口, 默认为6379
     * -a password 为连接密码
  2. `keys <pattern>`  按照模式查询
     1. `keys *` 查询所有键
     2. `keys ?` ?代表一个字符
  3. `set <key> <value>`  设置键值对, 覆盖, 无视类型
  4. 删除key `del[key...]`,  返回删除成功的数目
  5. 获取序列化之后的值 `dump <key>` ( key会被序列化后存到硬盘上 )
  6. 是否存在 `exists <key>` , 存在则返回1,否则返回0
  7. 设置key的过期时间 `expire <key> <seconds>`
     * 存放限时活动的信息
     * 网站定时更新的数据
     * 手机验证码
     * 限制网站访问频率
  8. 返回key的剩余生存时间 `ttl <key>`,  -1为永久,-2为无效. 默认为永久
  9. 移除过期时间,设置key为永久 `persist <key>`
  10. 切换数据库 `select <number>` , 切换到number下标的数据库
  11. 从当前数据库中随机返回一个key `random <key>`
  12. 重命名key `rename <oldname> <newname>`
  13. 移动key到另一个数据库 `move <key> <ind>`  , 移动key到下标为ind的数据库中
  14. 获得key的类型 `type <key>`
  15. `flushdb` 清空数据库
  
  
  
* ### Redis特性

  * 单个键最大512M

  * 使用命名规范来建立数据关联性

    * 统一的规范: user:123:password

  * ***数据类型***

    > #### *string*

    * 二进制安全: 数据传输过程中无编码和解码的操作, 不会出错
    * `setnx key value`  只有key不存在的时候才赋值
    * `set key value` 赋值
    * `get key` 获取字符串类型的值, 如果值不是字符串类型, 返回错误
    * `getrange key start end`  获取范围内的子字符串, 包括头尾
    * `getset key value` 赋值, 如果之前存在,返回之前的值, 不存在则返回nil
    * `strlen key` 获取字符串长度
    * `append key value` 字符串拼接
    * `incr key` 值自增1, 如果不存在则先初始化为0再自增
    * `incrby key num` 值自增num
    * `decr key` 值自减1
    * `decrby key num` 值自减num
    * 应用场景
      1. 字符串存储
      2. 图片存储
      3. 计数器

    > #### *hash ( 对象 )*

    * `hset key field value` 赋值( 键, 属性, 值 )
    * `hmset key field value [field1 value1 ...]` 同时存储一个对象的多个属性
    * `hget key field` 取值 ( 键, 属性 )
    * `hmget key field [field1 ...] ` 同时取一个对象中多个属性的值
    * `hgetall key`  获取一个对象中所有属性的值
    * `hkeys key` 获取对象中所有的键
    * `hlen key`  获取对象中键的数量
    * `hdel key field [field1 ...]` 删除一个对象中的一个或多个属性, 属性删完后对象就会被释放
    * `del key` 直接删除对象
    * `hsetnx key field value`  属性不存在时赋值
    * `hincrby key field num` 对象整型属性自增num
    * `hincrbyfloat key field num` 对象浮点数属性自增num
    * `hexists key field`  查看对象是否存在属性, R1&0
    * 应用场景:
      1. 存储对象
    
    > ### *list( linkedlist)*
    
    * `lpush key value [value1...]`  将一个或多个数值插入到列表头部( 往左侧添加 )
    * `rpush key value [value2...]`  将一个或多个数值插入到列表的尾部( 往右侧添加 ) 
    * `lpushx key value` 将一个值插入到已存在的列表 *头部*, 如果列表不存在, 操作无效
    * `rpushx key value` 将一个值插入到已存在的列表 *尾部* , 如果列表不存在, 操作无效
    * `llen key` 返回列表长度
    * `lindex key index` 返回下标为index的值
    * `lrange key start end`  返回范围内的数值 ( -1为最后一个元素, -2位倒数第二个元素, 以此类推 )
    * `lpop key` 左一出栈
    * `rpop key` 右一出栈
    * `blpop key1 [key2...] timeout` 待到key中有数据时左一出栈,  或者超时退出
    * `brpop key1 [key2...] timeout` 待到key中有数据时右一出栈,  或者超时退出
    * `ltrim key start end` 修剪list只剩区间内元素
    * `lset key index value` 修改key中下标为index的值为value
    * `linsert key <before|after> word value` 在key中的word元素的<前|后>插入value
    * `rpoplpush from to` 从from列表中右出栈一个元素作为to列表的左进栈元素, 返回值为被操作的元素 , 使用 `rpoplpush l1 l1` 实现循环列表
    * 应用场景:
      1. 对大量的数据进行增减操作
      2. 使用范围返回命令实现分页功能
      3. 使用右出左进函数和两个任务列表来实现任务队列功能



* ### *在JAVA中使用Redis*

  1. 在项目中引入jedis的jar包 ( 也可使用pom直接引入 ) ( jedis相当于一个客户端 )

  2. 在redis服务端的防火墙中开启6379端口  ( 同时注意在redis的启动设置中设置为其他ip可访问 )

     ```shell
     #查看当前防火墙开放的端口
     >firewall-cmd --list-ports
     #开启6379端口
     >firewall-cmd --zone=public --add-port=6379/tcp --permanent
     #重启防火墙使设置生效
     >firewall-cmd --reload
     ```

  3. 在java中使用jedis连接redis服务器

     ```java
     public void main(){
         //redis服务器地址
         String host = "xxx.xxx.xxx.xxx";
         //redis服务器端口号
         int port = 6379;
         Jedis jedis = new Jedis( host, port );
         //输入密码
         jedis.auth("******");
         
         //测试是否连接成功, 打印出PANG则为连接成功
         System.out.printf( jedis.ping() );
         
         //记得关闭连接
         jedis.close();
     }
     ```

  4. jedis的API ( 在redis中的命令与jedis实例的方法一一对应 )

     ```java
     //例子
     //测试string的操作
     @Test
     public void t1(){
         Jedis jedis = new Jedis("xxx.xxx.xxx.xxx", 6379);
         jedis.auth("******");
         
         jedis.set("strName", "这是一个字符串");
         System.out.printl(jedis.get("strName"));
         
         jedis.close();
     }
     ```

     开发实例: 使用redis减轻数据库的访问压力

     ```java
     //需求 : 先从redis中查询, 如果查询到则返回数据, 未查询到则从数据库中查询并存在redis中
     @Test
     public void t2(){
         Jedis jedis = new Jedis("xxx.xxx.xxx.xxx",6379);
         jedis.auth("******");
         
         //要查询的key
         String key = "name";
         
         if(jedis.exists(key)){
             //从redis中查到了
             System.out.printl(jedis.get(key));
         }else{
             //没从redis中查到
             //从数据库中查询
             //...
             String result = "zhangsan";
             //存到redis中
             jedis.set("name",result);
         }
         
         jedis.close();
     }
     
     ```

* ### *在java中使用redis连接池 (连接池:  统一管理和释放连接)*

  #### *redis连接池的使用*

  ```java
  public void main(){
      //设置连接池配置对象
      JedisPoolConfig poolConfig = new JedisPoolConfig();
      poolConfig.setMaxTotal(5);  //设置最大同时连接数
      poolConfig.setMaxIdle(1);  //设置没人连接的时候保留几个连接, 最大空闲数
      
      //新建池子对象
      JedisPool pool = new JedisPool(poolConfig, "xxx.xxx.xxx.xxx", 6379);
      
      //从池子中拿连接
      Jedis jedis = pool.getResouce();
      jedis.auth("******");
      
      //测试连接
      System.out.printl(jedis.ping());
  }
  ```

  ##### *封装jedis连接池的工具类*

  ```java
  public class JedisPoolUtil{
      
      private static final JedisPool pool;
      
      static//静态块, 只加载一次
      {
          JedisPoolConfig poolConfig = new JedisPoolConfig();
          poolConfig.setMaxTotal(5);
          poolConfig.setMaxIdle(1);
          //其他配置...
          pool = new JedisPool(poolConfig, "xxx.xxx.xxx.xxx",6379);
      }
      
      //获取连接
      public static Jedis getJedis(){
          Jedis jedis = pool.getResource();
          jedis.auth("******");
          return jedis;
      }
      //关闭连接
      public static void close(Jedis jedis){
          jedis.close();
          return;
      }
  }
  ```

* ### *使用spring-data整合的redis工具类 - 在springmvc项目中使用*

  #### ( 该jar包整合了包括连接池管理在内及其他关于redis数据存取的操作 )

  #### ( 由于jedis中对hash类型也就是对象类型的操作中都是用map类型在操作, 代码实现比较繁琐且重复, 所以要对jedis基础方法再封装 )

1. 引入jedis基础包和spring家的工具包

   `jedis` 和 `spring-data-redis`

2. 在对象上添加可序列化标记

   ```java
   //实现可序列化的接口(空接口,只是一个标记)
   public class Uesr implements Serializable{
   	//添加序列化id (鼠标右键User添加)
       private static final long serialVersionUID = .......;
   }
   ```

3. 编写spring-data-redis的配置文件

   ```xml
   <!--连接池子配置对象-->
   <bean id="jedisPoolConfig" class="redis.clients.jedis.JedisPoolConfig">
   	<!--配置最大连接数-->
       <property name="maxTotal" value="50"></property>
       <!--配置最大空闲数-->
       <property name="maxIdle" value="5"></property>
       <!--...其他配置, 也可通过配置参数文件和el表达式的方法加载进来-->
   </bean>
   
   <!--配置连接工厂对象 (其实就是连接池对象, 这里叫工厂罢了)-->
   <bean id="jedisConnectionFactory" class="org.spring.data.redis.connection.jedis.jedisConnectionFactory">
       <!--redis地址(默认本机)-->
       <property name="hostname" value="xxx.xxx.xxx.xxx"></property>
        <!--端口(默认6379)-->
       <property name="port" value="6379"></property>
       <!--密码(必填)-->
       <property name="password" value="******"></property>
       <!--自定义连接池子配置对象,就上边那个(默认为默认配置的配置对象)-->
       <property name="poolConfig" ref="jedisPoolConfig">
   </bean>    
   
   <!--配置使用以上池子对象的模板对象( 其实就是将redis基础对象中的方法整合之后的对象 )-->
   	<bean id="redisTemplate" class="org.springframework.data.redis.core.RedisTemplate">
           <!--将上面的配置完的池子对象传给模板对象,使模板对象完成初始化-->
           <!--不同的客户端配置不同的池子对象(如jedis和jredis等)-->
           <property name="connectionFactory" ref="jedisConnectionFactory">       </property>    	
       </bean>
   ```

4. 配置完成, 使用spring家的jedis工具包

   ###  *string类型的操作*
   
   ```java
   //测试关于string类型的操作
   //mvc中的实现层
   public class UserServiceImpl implements UserService{
       //spingmvc中的自动类型初始化
       //传入的泛型为 <键, 值> 类型
       @Autowired
       RedisTemplate<String , String> redisTemplate;
       
       //实现接口
       //通过key在redis中查询字符串类型, 查到则返回, 没查到则存到数据库中查, 并存到redis中
       @Override
       public String getString(String key){
           //通过模板获得一个关于String类型的操作对象
           ValueOperations<String,String> op = redisTemplate.opsForValue(); 
           
           //判断key是否存在
           if(redisTemplate.hasKey(key)){
               return op.get(key);
           }else{
               //数据中查询...
               String result = "数据库中查出来的字符串";
               op.set(key, result);
               return result;
           }
       }
   }
   ```
   
   > #### *由于RedisTemplate在对数据进行存储的时候默认给key和value前都加序列化标志字符串, 而且使用的是jdk的序列化方法, 给操作带来不便. 所以应当在配置文件中对RedisTemplate对象的序列化方法属性进行自定义配置*
   >
   > ##### ↓  ↓  ↓  ↓  ↓

```xml
<bean id="redisTemplate" class="org.springframework.data.redis.core.RedisTemplate">
    <property name="connectionFactory" ref="jedisConnectionFactory"></property>
    
    <!--配置序列化方法-->
    <property name="keySerializer">
        <bean class="org.springframework.data.redis.serializer.StringRedisSerializer"/>
    </property>
    <property name="valueSerializer">
        <bean class="org.springframework.data.redis.serializer.StringRedisSerializer"/>
    </property>
    <property name="hashKeySerializer">
        <bean class="org.springframework.data.redis.serializer.StringRedisSerializer"/>
    </property>
    <property name="hashValueSerializer">
        <bean class="org.springframework.data.redis.serializer.StringRedisSerializer"/>
    </property>

</bean>
```

#### **!!! 在RedisTemplate实例中, 不能通过set函数的重载方法直接设置key的有效期, 会设置失败, 应当先创建key然后使用 expire()函数 单独设置有效期.**

#### **!!! 在RedisTemplate实例中的方法是通用方法, 在opsForXXX()实例中的方法是特定数据类型的方法**

> ##### 案例: 限制用户的登录失败频率
>
> #### 需求: 用户最多在2分钟内登录失败5次, 否则限制登录一小时



### *hash类型的操作*

* redisTemplate中对hash的存储方式与手动存储hash对象不同

  redisTemplate引入表的概念, 使用一个user对象, 在其中添加多条键值对为多条数据, 每条数据中row为行号, hashkey为user对象的id, value为user对象中其他所有属性的序列化值, 为一个字符串.

  传统的对于对象的存储, 一条记录为一个对象实例, 该hash类型的键值对为该实例的所有属性和值一一对应, 所以传统的存储方式无表的概念.

  ```java
  @overrite
  public void addUser(User u){
      //使用redisTemplate来对对象进行存储
      //参数列表: 
      //key: 在redis中存储的key( 表名 )
      //hashkey: 在redis中值的条目的id,( 每条数据的id )
      //value: 每条数据的值 ( 数据条目数据 )
      User u = new User();
      //设置u的属性值
      //...
      redisTemplate.opsForHash().put("user", u.getId(), u);
  }
  
  
  //数据读取
  @overrite
  public User selectById(string id){
   	//判断是否存在
      //(该表下的该数据是否存在)
      if(redisTemplate.opsForHash().hasKey("user",id)){
      	 User u = (User)redisTemplate.opsForHash().get("user",id)
           return u;
      }else{
          //不存在则存储
          User u = new User();
          //从数据库中查询...
          //存到redis中
          redisTemplate.opsForHash().put("user", u.getId(),u);
      }
  }
  ```

  ### *对redisTemplate.opsForHash()关于泛型的优化*

  #### >>> 使用resource绑定HashOpertions类型的对象为redisTemplate.opsForHash()返回的对象

  ```java
  public class UserServiceImpl implements UserService{
      
      //根据类型从配置文件中进行对象的初始化
      //会自动根据配置文件中的配置来绑定对象
      @Autowired
      RedisTemplate<String,String> redisTemplate;
      
      //会根据名称来绑定,这里名称为redisTemplate,会从配置文件中匹配名称为redisTemplate的bean实例
      //然后绑定到redisTemplate对象中类型为HashOperations的属性, 从而完成初始化对象的操作.
      //这里设置了该对象的泛型为User, 则在使用该对象的时候,会使用User作为泛型类型来操作, 从而使得不需要再进行类型转换
      @Resource(name="redisTemplate")
      HashOperations<String, Integer,User> hashOperation;
      
      //同理可对string类型的操作对象进行泛型的优化
      @Resource(name="redisTemplate")
      ValueOperations<String,String> stringOps;
      
      @override
      public void getUser(String id){
          
          //此处不需要再进行强制类型转换
          //这步相当于redisTemplate.opsForHash().get("user",id);
          //如果直接使用上面那种方式, 则还需要进行强制类型转换, 因为会返回Object类型的数据
          User u = hashOperation.get("user", id);
      }
  }
  ```

  ### List类型的操作
  
  ```java
  public class UsersImpl{
      
      @Autowired
      RedisTemplate<String,String> redisTemplate;
      
      //自定义绑定泛型
      @Resource(name="redisTemplate")
      ListOperations<String, String> listOps;
      
      
      //模板中关于list的API与原生的命令大同小异
      //...
  }
  ```
  
  ### set
  
  * 无序不可重复的string集合
  * `sadd key val1 [val2...]` 添加
  * `scard key` 集合大小
  * `smembers key` 返回所有元素
  * `sismember key val` 判断是否存在val ( 1&0 )
  * `srandmember key [count]` 返回一个或count个随机的元素
  * `srem key member1 [member2...]` 从key中删除一个或多个元素
  * `spop key [count]` 从key中随机删除一个或多个元素并返回
  * `smov key1 key2 val` 将key1中的val移动到key2中
  * `sdiff s1 [s2]` 返回s1和s2的差集
  * `sinter s1 [s2]` 返回s1和s2的交集
  * `sunion s1 [s2]` 返回s1和s2的并集
  * `sdiffstore target key1 key2` 返回key1和key2的差集并保存在target中
  * `sinterstore target s1 s2` 返回s1和s2的交集并保存在target中
  * `sunionstore target s1 s2` 返回s1和s2的交集并保存在target中
  * 应用场景
    * 两个集合的差集,并集和交集
      1. 共同关注, 共同喜好, 共同好友
      2. 利用唯一性, 统计访问网络的独立IP



### zset

* 有序不可重复的string集合
* 根据元素的score值( double类型 ) 来进行排序
* `zadd key score1 val1 [score2 val2...]` 添加元素 (要score和val对应 )
* `zcard key` 返回元素个数
* `zrange key start end` 返回范围内的元素( 根据score从小到大排序 ) 
* `zcount key min max` 返回score在[min,max]内的元素
* `zrank key member` 返回key中member的索引
* `zrevrange key start end` 从大到小返回范围内的元素
* `zrem key val1 [val2...]` 从key中删除元素
* `zremrangebyrank key start end` 从排名区间内删除元素( 第一名是0 )
* `zremrangebyscore key min max` 根据score的大小删除范围内的元素
* 应用场景
  1. 排行榜
  2. 时间线
  3. 使用score作为任务队列的权重( 优先度 )



### Redis发布订阅

* publish(发布) -> channel(频道) -> client(客户端)
* 命令 ( 以下命令执行在客户端中 )
  * `subscribe channel [channel2...]`  订阅频道 ( 频道名称随便写 )
  * `publish channel message` 向channel中发送message
  * `unsubscribe channel [channel2...]` 取消订阅
  * `psubscribe pattern [pattern2...]` 根据模式订阅频道
  * `punsubscribe pattern [pattern2...]` 根据模式退订频道
* 应用场景:
  * 博客, 公众号
  * 实时聊天系统



### Redis 多数据库

* 命令
  * `select index` 切换数据库
  * `move key index` 将key移动到索引为index的数据库中
  * `flushdb`  清空当前库
  * `flushall` 清空所有库
* 缓存预热: 在项目上线前清空redis数据库, 然后访问一遍系统, 使数据加载到redis数据库中。



### Redis事务

* `multi` 开始录入事务队列
* `exec` 执行事务队列
* `discard` 放弃当前事务队列

```shell
#使用事务队列实现转账功能

#事务队列开始
>multi
ok
#将操作放入事务队列中
>get account:a
queued
>get account:b
queued
>decrby account:a 50
queued
>incrby account:b 50
queued
#执行
>exec
```

* 事务执行中, 如果命令执行报错, 其他命令会正常执行 ( 运行时错误 )
* 事务执行中, 如果命令本身出错, 整个事务都不会执行 ( 语法错误 )
* `watch key [key2...]` 监视key, 如果在监视状态下开启事务, 在事务未执行时key被其他客户端修改, 那么这个事务不会执行成功, 会返回nil. 在开启监视后, 如果exec或者discard先被执行, 则监视自动取消. ( 监视的有效期为一个事务 )

* `unwatch` 取消对所有key的监视
* 应用场景
  1. 商品秒杀
  2. 转账



### Redis数据淘汰策略配置 ( redis.conf )

* 当数据达到配置的最大内存使用量时, 会根据淘汰策略进行淘汰, 如果没有设置, 则报错out of memory
* `maxmemory 512G`设置最大内存 



### Redis持久化  ( 保存为本地文件 )

* RDB方式: 默认的持久化方法, 以二进制的方法将内存数据快照为数据文件dump.rdb
* 快照产生条件:
  1. 正常关闭 `shutdown`
  2. 到达策略安排的操作次数 `save 900 1`
* 优点: 存储速度快, 还原速度快
* 缺点: 照快照时候会占用内存, 小内存机器不适合, 如果是非正常关闭 , 会导致未做快照的数据丢失 



* AOF方式: 将操作的命令保存到 appendonly.aof 文件中, 使用保存的命令恢复数据
* 优点: 能保证数据不丢失
* 缺点: 会占用过多的硬盘空间
* 配置文件:
  * `appendonly yes`  启用aof
  * `appendfsync always`  收到命令就持久化
  * `appendfsync everysec` 每秒都做持久化
  * `appendfsync no` 完全依赖os, 性能最好, 但是持久化没保证



### Redis数据与数据库数据的一致性问题

* ***缓存穿透问题***  : 在redis中查不到就去数据库中查询, 在数据库中查询不到结果就不会设置redis数据. 这种机制会导致如果要查询的数据在数据库中不存在, 那么总是会去数据库中查询. 
* ***解决方法***  :  改为在数据库中查询不到就在redis中设置为空, 那么下次再来查询的时候使用的就是redis中的数据.不会总是进入数据库查询.



* ***缓存雪崩问题***  :  如果某时间点redis中的数据大量过期, 那么用户的请求都会落到数据库中, 从而造成数据库崩溃.
* ***解决方法***  :  尽量让缓存失效时间平局平均分布; 手动缓存预热;  限制流量;  使用队列访问的方法;



* ***热点key问题***  :  如果某个key访问热度很高, 那么在它失效的时候 , 会产生大量的线程来构建缓存, 从而造成系统崩溃.
* ***解决方法***  :  
  1. 使用锁的机制
  2. 不设置缓存失效时间, 定时更新缓存



* ##### 关于数据一致性的解决方法:

  1. 实时同步: 在redis中查不到就去数据库查, 然后保存到redis中. 更新数据时, 先更新数据库, 然后将缓存设置为过期. ( 先更新数据库, 后更新redis )

  > spring-boot中提供数据一致性的注解, 相当于自己写的判断数据是否在redis中存在, 存在则返回,不存在则查询的逻辑
  >
  > @Cacheable: 查询
  >
  > @CachePut: 更新 , 会从数据库中查询数据
  >
  > @CacheEvict: 删除
  >
  > @Caching: 组合用法

  2. 异步队列: 对于并发量很高的, 采用异步队列, 可采用kafka等消息中间件来实现. 
     * 原理: redis中正常进行数据的更新, 然后将更新操作做成消息队列, 发送给数据库, 数据库依次执行任务队列( 先更新redis, 后更新数据库 )

  3. 使用阿里同步工具canal
     * 原理: 数据库自带主从同步机制, 即为主负责修改, 从负责查询. 主数据库中产生修改时, 会产生日志文件, 从数据库接收日志文件做相应的修改, 实现主从一致. canal模拟自己是一个从数据库, 向主数据库中发送dump协议, 实时接收主数据库的修改日志, 然后解析日志, 将操作在redis中执行.
  4. 使用UDF自定义函数方式 ( 数据库自带的触发器功能 )
     * 原理: 通过自定义触发器来同步redis中的数据
  5. 使用定时任务
     * 实现: 每天定时将redis中的数据同步到数据库中



### Redis高级

* 实际开发中, 只有一台redis服务器是不够的的
* 实现高可用和高并发: 
  * 垂直扩展( 提升单机实力 )
  * 水平扩展( 使用集群 )



#### Redis主从复制

* 一主多从, 读写分离, 提高并发, 但是, 主宕机时会导致崩盘
* 主从配置: 
  * 主数据库不需要配置
  * 从服务器启动时使用命令 `./bin.redis-server ./redis.conf --port 6380 --slaveof 127.0.0.1 6379` ( 此时从服务器使用端口6380. 主服务器也在本机, 使用端口6379 )
  * `slaveof on one`  使用该命令取消作为从服务器
  * `slaveof <ip> <port>` 使用该命令成为从服务器



### Redis-cluster 集群 ( 无中心的水平扩展 )

* 特点:
  * 所有节点互连, 二进制传输数据
  * 客户端与redis直连, 客户端连接任意一个节点即可
  * 每个节点只存自己的数据
  * 因为master的投票机制, 所以集群中master节点应为奇数个, 而且至少3台主机, 同时一个主机至少配置一个从机, 所以集群至少需要3主3备
* 容错性:
  * 当其他master节点对某个节点有超过半数的访问超时时, 认定该节点为fail状态
  * 当某个master故障, 且该master没有slave, 记为集群fail状态
  * 当超过半数的master故障, 记为集群fail状态

> 真集群: 真正部署在不同的服务器上

> 假集群: 所有节点部署在同一个服务器的不同端口

#### redis集群部署

```shell
> #创建6个redis服务器的文件夹
> #将配置文件拷贝到各个文件夹下
> #修改配置文件
# protected-mode no 设置保护模式为关闭(可通过其他地址来访问redis服务器)
# port xxxx 修改端口号
# daemonize yes 后台运行模式
# pidfile /var/run/redis-xxxx.pid  修改pid进程文件名
# logfile ..... 修改日志文件名
# dir .... 修改数据文件存放地址
# cluster-enabled yes 启用集群
# cluster-config-file xxxx.conf 集群配置文件
# cluster-node-timeout 设置集群节点访问超时时间
> #将redis服务端拷贝到各个文件夹下
> #启动各个服务器节点
# 查看各个节点是否启动成功
> ps -ef | grep -i redis
# 会出现各个节点的进程 , 以[cluster]结尾

#使用redis-trib.rb工具创建集群
#该文件在解压目录的src文件夹下 

### 为了方便操作, 将该文件复制到 /usr/local/bin/ 中, 就可直接访问此命令
### 这个文件夹相当于Windows中的环境变量, 当在其他地方执行命令的时候, 会从此文件夹中查找并执行

#使用命令创建集群
> redis-trib.rb create--replicas 1 <ip>:<port> [<ip>:<port>...]

#如果报错 ruby:没有那个文件或目录, 是因为没有安装ruby (因为这个工具是用ruby实现的)
#安装ruby
> yum -y install ruby ruby-devel rubygems rpm-build
> gem install redis
# 此时会报错 需要ruby版本至少是2.2.2
# 因为Centos默认支持安装ruby到2.0.0, 所以需要先安装 rvm, 在把 ruby 版本提升
# 安装 rvm
> gpg --keyserver hkp://keys.gunpg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E37D2BAF1CF37B13E2069D6956105BD0E739499BDB
> curl -sSL https://get.rvm.io | bash -s stable
> find / -name rvm -print
> source /usr/local/rvm/scripts/rvm
> rvm list known #查看当前rvm库中已知的ruby版本

# 使用rvm对ruby进行版本升级
> rvm install 2.4.5
# 使用一个ruby版本
> rvm use 2.4.5
# 设置默认的ruby版本
> rvm use 2.4.5 --default
#查看ruby版本
> ruby --version

#安装redis
> gem install redis

#使用redis-trib.rb创建集群 (主从关系由工具来自己分配)
> redis-trib.rb create--replicas 1 <ip>:<port> [<ip>:<port>...]
# ...输出启动完的主从配置
# 提示进行配置
# 使用以上配置? yes

#完成集群的创建
```



#### 关于以上redis集群的测试

> 启动集群事项:
>
> 1. 依次启动配置好的各个节点服务器
> 2. 创建集群的命令只要执行过一次就无需再次执行

> 为了方便测试: 可将redis-cli也复制到 /usr/local/bin/ 文件夹下



1. 连接客户端到集群 ( 连接到一个节点即可 )

   ```shell
   > redis-cli -h xxx.xxx.xxx.xxx -c -p xxxx #-c表示连接到集群
   #如果配置文件中bind指定了ip地址, 那么-h参数不可省略
   
   #查看当前连接的节点的信息
   > info replication
   #查看当前连接的节点所在集群的所有节点的信息
   > cluster nodes
   #返回所有节点的信息
   #其中包含每个节点的ID, 集群通过节点ID实现对每个节点的辨识
   ```

2. 在该节点下对key进行存储

   ( 显示被重定向到另外一个节点 )

3. 在存储数据节点的从节点中查询数据 ( 通过查看集群信息来获取主从信息 )

   ```shell
   #先退出当前节点
   > quit
   #登录到目标从节点
   > redis-cli [各个参数]
   #查询数据 (假设这个key是name)
   > get name
   #会显示被重定向到存储这个数据的节点
   ```



#### 设置redis集群可由外部ip访问 ( 来自其他ip的java程序的请求 ) ( 设置系统的端口防火墙 )

1. 开放端口 ( 以下命令只能在Centos7以上执行 )

   ```shell
   #查看已经开放的端口
   > firewall-cmd --list-ports
   #开启端口
   > firewall-cmd --zone=public --add-port=<port>/tcp --permanent
   #重启防火墙使设置生效
   > firewall-cmd --reload
   ```

2. ***java连接集群示例***

   ```java
   public static void main(){
       //创建一个HostAndPort类型的set对象用来初始化 JedisCluster 对象, 该set对象存放集群中各个节点的ip和port信息
       Set<HostAndPort> nodes = new HashSet<HostAndPort>();
       node.add(new HostAndPort("xxx.xxx.xxx.xxx",xxxx));
       //...
           //把所有的节点信息存放到nodes中
       //...
       
       //使用nodes创建JedisCluster对象
       JedisCluster jedisCluster = new JedisCluster(nodes);
       //使用集群对象来操作数据 ( 该集群对象是单例的 )
       jedisCluster.set("name","zhangsan");
       jedisCluster.get("name");
   }
   ```

   

