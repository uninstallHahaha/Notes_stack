###### Java

* java中的集合, 线程安全? 线程不安全?

   	线程安全：就是当多线程访问时，采用了加锁的机制；即当一个线程访问该类的某个数据时，会对这个数据进行保护，其他线程不能对其访问，直到该线程读取完之后，其他线程才可以使用。防止出现数据不一致或者数据被污染的情况 

  ​	线程不安全：就是不提供数据访问时的数据保护，多个线程能够同时操作某个数据，从而出现数据不一致或者数据污染的情况 

  **Vector、HashTable、Properties是线程安全的；**

  **ArrayList、LinkedList、HashSet、TreeSet、HashMap、TreeMap等都是线程不安全的。**

  ​	 为了保证集合既是安全的而且效率高，Collections为我们提出了解决方案，把这些集合包装成线程安全的集合。
  Collections提供了如下几个静态方法。 

  ![1620805648557](C:\Notes\Java\Java.assets\1620805648557.png)

  

* Vector、ArrayList、LinkedList ?
  1、Vector：
  Vector与ArrayList一样，也是通过数组实现的，不同的是它支持线程的同步，即某一时刻只有一个线程能够写Vector，避免多线程同时写而引起的不一致性，但实现同步需要很高的花费，因此，访问它比访问ArrayList慢。
  2、ArrayList：
  a. 当操作是在一列数据的后面添加数据而不是在前面或者中间，并需要随机地访问其中的元素时，使用ArrayList性能比较好。
  b. ArrayList是最常用的List实现类，内部是通过数组实现的，它允许对元素进行快速随机访问。数组的缺点是每个元素之间不能有间隔，当数组大小不满足时需要增加存储能力，就要讲已经有数组的数据复制到新的存储空间中。当从ArrayList的中间位置插入或者删除元素时，需要对数组进行复制、移动、代价比较高。因此，它适合随机查找和遍历，不适合插入和删除。
  3、LinkedList：
  a. 当对一列数据的前面或者中间执行添加或者删除操作时，并且按照顺序访问其中的元素时，要使用LinkedList。
  b. LinkedList是用链表结构存储数据的，很适合数据的动态插入和删除，随机访问和遍历速度比较慢。另外，他还提供了List接口中没有定义的方法，专门用于操作表头和表尾元素，可以当作堆栈、队列和双向队列使用。



* HashTable、HashMap、HashSet ?
  HashTable和HashMap采用的存储机制是一样的，不同的是：
  1、HashMap：
  a. 采用数组方式存储key-value构成的Entry对象，无容量限制；
  b. 基于key hash查找Entry对象存放到数组的位置，对于hash冲突采用链表的方式去解决；
  c. 在插入元素时，可能会扩大数组的容量，在扩大容量时须要重新计算hash，并复制对象到新的数组中；
  d. 是非线程安全的；
  e. 遍历使用的是Iterator迭代器；

  2、HashTable：
  a. 是线程安全的；
  b. 无论是key还是value都不允许有null值的存在；在HashTable中调用Put方法时，如果key为null，直接抛出NullPointerException异常；
  c. 遍历使用的是Enumeration列举；

  3、HashSet：
  a. 基于HashMap实现，无容量限制；
  b. 是非线程安全的；
  c. 不保证数据的有序；



* StringBuffer , StringBulider , String ? 

  String 内部使用 final char 数组存放字符串数据, 如果要修改字符串长度, 那么只能重新申请一个 char 数组, 然后触发垃圾回收把之前的 数组回收, 这就很浪费时间, 所以如果涉及大量的字符串修改 , 字符串拼接的操作, String 类的效率会很低

  

  StringBulider 内部使用 char 数组存放字符串数据, 字符串拼接时可以直接对原数组进行扩容, 这样就省去了创建新数组和回收原数组的时间, 不足之处是对数组的操作不是线程安全的, 所以如果涉及大量的字符串修改, 拼接的操作, 还是这个好, 但是如果涉及多线程操作还是使用 StringBuffer

  

  StringBuffer 内部实现同 StringBulider , 唯一不同的是操作都是线程安全的, 所以使用多线程执行大量拼接操作时选这个



* 数据库连接池 ?

  ​	建立数据库连接是很耗时的操作 , 首先得加载数据库驱动程序到内存中, 然后与数据库建立网络连接, 然后才能执行语句, 用完之后还得释放连接, 如果没有释放连接, 那么数据库的对应的连接资源就不会被释放, 从而造成内存泄露.

  ​	如果没有一个统一的连接管理机制, 那么每来一个请求, 都得走上面一套流程, 这极大降低了响应速度.

  ​	数据库连接池在系统初始化时创建一定数量的连接, 每次来请求就分配一个出去, 用完之后不释放连接, 而是等下一次请求再次分配出去, 这就省去了建立连接和释放连接的时间, 提高响应时间. 数据库连接池应当设置最小连接数, 为了随时能够提供可用的连接以供请求使用, 这个初始创建的连接数应当根据访问的并发量而定, 定一个合适的数. 同时连接池应当提供限制最大连接数功能, 防止过多的连接造成数据库内存不足而宕机.



* HashMap?

  ​	本质就是一个数组, 数组元素是 Entry<K,V> 类型, Entry 是链表节点的结构, 能保存下一个元素的位置

  ​	存元素时 key > hash > indexofarr > 存到数组中对应位置 > 如果这个位置已经有元素了 > 就作为这个位置上元素的下一个链表节点 

  ​	所以总体的结构是 : 一个元素为链表的数组, 查找的时候先根据 key 算 hash, 然后换算成数组的index, 然后直接到这个位置取数据, 如果这个位置元素不止一个, 那么就只能遍历这个位置上的链表直到找到该元素.

  ​	当然, 应当尽量避免数组中元素称为链表的情况, 也就是多个 key 算出来的 index 一样, 这种情况就是 hash冲突, 应当选择好的 hash计算函数, 减少算出来 hash值是一样的情况.

  ​	综上, 因为是数组存储, 所以查找, 修改, 删除速度为 O(1), 效率很高, 除非hash冲突很多导致链表很长.



* hashTable ?

  线程安全版本的 hashMap , 数据结构同 hashMap

  hashMap 允许null, hashTable 不允许 null



###### Redis

* redis 数据类型 ?
  1. string
  2. list , 这里是 linkedlist 结构
  3. hash 字典 , 同 hashmap 结构
  4. set , 同 hashSet , 无序不可为空不可重复列表
  5. zset, 使用 key 作为排序标准的 hashMap 结构, 自动根据 key 进行排序, 直接就能用到排行榜功能上



* redis 中 zset 的跳表实现?

  https://blog.csdn.net/qq_38545713/article/details/105439688

  跳表 : 能够二分查找的单链表.

  ​	在原链表中, 每隔几个节点就抽取一个节点, 当做索引节点, 从整个链表抽取出来的索引节点就组成了一条索引链表, 然后可以使用这种方法构建多级索引, 这样的话, 在查询的时候, 从最高级索引开始查询, 确定范围后到下一级索引中查, 直至最终查询到原链表, 就可以快速定位目标节点, 这样的索引查询原理上基本等同于二分查找, 所以效率非常高.

  ![1620907740881](C:\Notes\Java\Java.assets\1620907740881.png)

  ​	而且, hashmap的 value 本身就是 list 类型, 那么就可以使用 hashmap 建立索引, key 是索引节点, value 是该索引节点到下个索引节点之间的原链表节点.

  ​	因为查询的高效性, 所以这种数据结构在插入, 修改, 删除操作时依然高效, 其中删除操作时如果要删除的节点刚好是索引节点, 那么应当把索引节点一同删除, 那么就要注意极端情况下把索引删完了, 又退化成单链表, 所以要在插入节点的同时适当的也增加索引节点.	



* Redis适用?
  1. 数据库与客户端之间的缓存
  2. 排行榜这种实时更新的数据, 自带 SortSet类型, 适合做排行
  3. 计数器/ 访问限制 , 例如点赞数, 访问数, 也可记录请求次数, 然后限制访问频率
  4. 消息队列, 利用自带的 List 实现发布/订阅模式
  5. 好友关系, 利用自带的交集, 并集, 差集 功能, 直接获得共同好友
  6. session 共享 , 在分布式服务中, 将用户登录的 session 保存到公共的 redis中,  各个服务器从 redis 中获取 session 进行登录验证



* Redis不适合 ?

  数据量很大且访问频率低, 那么这些数据保存到内存中就是浪费.



* Redis优点 ?

  1. 读写快啊
  2. 数据类型丰富啊
  3. 操作都是原子性啊
  4. 应用方面广啊 , 缓存, 消息队列, 计数器, 记录session




* redis 为什么快?
  1. 内存存储
  2. 单线程, 避免了线程切换的损失
  3. 底层使用系统的 epoll 多路复用函数, 把耗时的 IO操作交给 多路复用函数处理, 用于处理请求的函数仅仅是把请求发送给 IO 多路复用程序 和 从IO多路复用程序接受IO操作的回调通知, 然后返回给客户端
  
  * IO多路复用, 就是系统提供的调用, 用于实现非阻塞式的IO, 有三种实现, select, poll, epoll
  
    ​	其中 select 和 poll 检查 IO操作进度时都要遍历整个socket表, 而 epoll 使用回调的方式, 当IO操作进行响应时, 将结果保存到一个list中, epoll每次检查有没有IO操作结果时只需要遍历这个list即可, 所以epoll方式性能更高
  
    ​	redis 中处理客户端请求的只有一个线程, 如果使用同步阻塞IO机制, 那么就无法实现并发, 因为其他请求都得等前边的请求IO操作完成才能被处理,  所以必须使用IO多路复用机制, 它使用的是 epoll.



* redis相比memcached有哪些优势？
  * memcached所有的值均是简单的字符串，redis作为其替代者，支持更为丰富的数据类型
  * redis的速度比memcached快
  * redis 可以持久化其数据
  * redis 有主从备份功能
  * redis 一个 value 能有 1G, memcached 一个 value 最多 1M



* redis的并发竞争问题如何解决?

  Redis为单进程单线程模式，采用队列模式将并发访问变为串行访问。Redis本身没有锁的概念，Redis对于多个客户端连接并不存在竞争，但是在Jedis客户端对Redis进行并发访问时会发生连接超时、数据转换错误、阻塞、客户端关闭连接等问题，这些问题均是由于客户端连接混乱造成。对此有2种解决方法：

1. 客户端角度，为保证每个客户端间正常有序与Redis进行通信，对连接进行池化，同时对客户端读写Redis操作采用内部锁synchronized。
2. 服务器角度，利用setnx实现锁。

> 注：对于第一种，需要应用程序自己处理资源的同步，可以使用的方法比较通俗，可以使用synchronized也可以使用lock；第二种需要用到Redis的setnx命令，但是需要注意一些问题。



* redis 可能出现的性能问题 ?

  集群环境下, master节点进行数据落盘时, 主线程阻塞, 如果数据量过大, 会间断性暂停服务, 所以应当让从节点进行数据落盘, 主节点不要接手这档子事



* redis实现分布式锁 ?

  > ​	分布式锁是控制分布式系统或不同系统之间共同访问共享资源的一种锁实现，如果不同的系统或同一个系统的不同主机之间共享了某个资源时，往往需要互斥来防止彼此干扰来保证一致性。 

  ​	多个线程请求获取锁, 也就是使用 set命令( setnx + expire 版本的参数设置)设置同一个 key , 这个key就是所谓的锁, 谁能设置进去值, 就代表谁获得了锁, 其余的就是没获得锁, 该指令能够同时实现无则成功, 有则失败且带过期时间的 set 操作.

  ​	如果谁设置成功了, 那么就执行相关操作, 操作完了之后就 del 这个 key, 此时其他线程就可以设置上值了.

  ​	没设置成功的就开始轮询, 一直设置, 直到设置成功了, 就代表它获得了锁.



* redis 分布式锁和 zookeeper 分布式锁 ?

  ​	zookeeper使用自带的临时节点功能来实现分布式锁, 每一个进程来申请获取锁时会创建一个临时节点, 该临时节点编号递增, 只有进程获取到的节点编号是所有编号中最小的时候才认定为获得了锁, 否则给前一个节点添加监听, 当前一个节点操作完之后, 会将前一个节点删除, 此时后一个节点就监听到了删除事件, 然后再判断自己是不是当前最小的编号, 是则代表获得了锁.

  ​	zookeeper 分布式锁优点是实现起来简单而且能保证高可用 , 缺点是创建和删除节点都会消耗性能, 所以面对高并发,大流量时效果不佳, 此时还是建议使用 redis实现分布式锁, 能够应对高并发.





* redis 的 keys 命令?

  不要在生产环境用 keys命令, 因为单线程特性, 会让 redis 服务阻塞可能造成宕机.

  应该使用 scan 命令.



* redis 实现队列 ?

  ​	就用自带的 list 类型的值 , 生产者队尾加, 消费者队首取

  如果要实现延时队列?

  ​	用自带的 zset, 生产者设置 score 为当前时间戳, value 为消息, 消费者取消息时用当前时间戳减去延时, 然后范围查询 zset 中 score 在延时之前的消息.



* redis 同一时间大量key过期会造成 ?

  缓存雪崩, 也就是大量请求直接发送给底层数据库, 解决方式是在底层数据库之上加锁机制, 或者加一个消息队列, 或者预处理过期时间, 加上微小的随机的时间差, 避免同一时间过期



* redis 的数据持久化机制?

  ​	自动定时将内存中的数据保存到硬盘上, 下次启动时从备份文件中恢复数据到内存.

  * RDB模式: 默认模式, 每隔时间周期都开一个子进程, 把父进程内存中的数据保存到硬盘的临时文件上, 数据保存完成后, 临时文件替换上次的数据备份文件, 子进程退出.

  * AOF模式 : 记录每次收到的指令, 下次启动时执行一遍记录的所有命令, 跟mysql的binlog一个道理, 执行命令后不会立即保存到AOF文件中, 而是先放到缓冲区中, 然后隔一定的时间再从缓冲区同步到硬盘上, 这个时间间隔可配置
    * always : 不等, 直接同步
    * everysec : 一秒同步一次, 一般用这个
    * no : 等着操作系统给你同步, 没啥用



* 缓存穿透?

  ​	要查的数据在数据库里没有, 自然在缓存中也没有, 那么后面每次请求这个数据时都得走两次无用的查询, 最后得到的结果还是空

  解决: 要么直接把这些肯定不存在的数据汇总起来放到redis中, 设置为空, 直接来了就给它返回空



* redis 主从复制?
  1. 从服务器向主服务器发送同步请求
  2. 主服务器开始生成RDB文件, 并且从此时开始执行的写命令记录到缓冲区
  3. 主服务器向从服务器发送生成的RDB文件
  4. 从服务器接收RDB文件并同步到内存中
  5. 主服务器把之前暂存到缓冲区的数据发送给从服务器
  6. 从服务器同步这些缓冲区命令记录
  7. 之后主服务器每次执行写操作, 都会发给从服务器让其执行一次



* 缓存淘汰策略 ?
  1. voaltail-lru : 设置了过期时间的里面选最近最少使用的淘汰
  2. volatile-ttl : 设置了过期时间的里面选剩余有效期最短的淘汰
  3. volatile-random : 设置了过期时间的里面随机选择淘汰
  4. allkeys-random : 所有的缓存随机淘汰
  5. allkeys-lru : 所有的缓存选最近最少使用淘汰
  6. no-enviction : 不淘汰



* lru 最近最少使用算法的实现 ?

  为什么用链表实现, 因为链表删除中间元素和插入中间元素速度比数组快

  1. 使用双向链表保存各缓存数据, 每次访问或更新时将目标元素提到链表首部, 超过缓存最大长度时删除链表尾部元素
  2. 同时使用 map 存储链表中各个元素的位置, 使查询速度达到 O(1)



* redis 删除过期键的策略 ?
  * 定时删除, 只要一过期就删除, 缺点是消耗 cpu 资源
  * 惰性删除, 获取的时候检查有没有过期, 有就删除, 然后更新, 缺点是过期了还占在内存里
  * 定期删除, 定期处理过期数据





###### 网络

* 长连接和短连接 ?

  实质上说的是 TCP 连接的保持, 比如一个 web 页面要从服务器请求资源, 请求资源必定要建立 TCP 连接, 而一个页面中又有很多js,css,html文件, 如果每请求一个文件, 都要建立一个连接, 用完后释放, 那么就太消耗服务器资源了, 所以可以设置保持这个连接一段时间, 在这段时间内, 所有由这个客户端到服务器发起的请求都走这条连接, 就省去了不停创建和释放连接的时间, 这就是长连接



* 长轮询和短轮询 ?

  ​	短轮询就是客户端无限循环向服务器发请求问结果, 然后服务器收到请求后就给出响应. 很消耗客户端和服务器资源.

  ​	长轮询就是客户端依然无限循环向服务器发请求问结果, 但是服务器收到请求后先看看要的数据有没有变化, 有的话就直接返回, 没有的话就暂时不给响应, 而是开一个线程监控这个数据的变换, 等到有变化或者到了预定的超时时间时, 才给客户端响应, 这样的话, 请求和响应的频率就下降了, 但是每来一个请求服务器都开一个线程监控变化也是很浪费服务器资源的.



* ping的原理 ?

  ​	本质上, ping是操作系统内核的一个程序, 发起ping的发送方构建icmp数据包, 然后再包装一层IP首部, 最后发送到目标主机, 当目标主机收到数据包后, 解析到 IP 首部中 ***协议*** 是 icmp, 于是交给 icmp处理程序, icmp处理程序收到消息后,  构建一个固定大小的 icmp 包, 返回给发送方. 

  ​	ping 命令主要用来测试主机之间网络是否可达.

  ​	也可以在操作系统上设置忽略 icmp 类型的消息, 也就是收到 icmp 类型的数据包时不交给 icmp 处理程序处理, 那么也就不会给发送方返回消息包.

  **ICMP** : 更确切地应该说是 ICMP 类型的消息, 包含了 ICMP类型的首部, 跟 TCP 和 UDP 是一个档次的协议. 加装了 IP首部的数据包可以通过网络传输到目的主机, 到达目的主机后, 操作系统根据 IP 首部中 ***协议*** 字段判断 IP 数据包部分应该交给 TCP处理程序, UDP处理程序 还是 ICMP处理程序来处理.

  



* DNS 流程:
  1. 查查浏览器缓存
  2. 查看操作系统缓存(hosts文件)
  3. 问本地 DNS服务器要
  4. 问 RootDNS服务器要, 给一个主域名DNS服务器, 比如要的是 .com 的, 那么给的就是管理所有 .com 的DNS地址
  5. 问目标区域的主服务器地址要, 给一个目标域名注册到的 Name server服务器地址
  6. 问 Name server 地址
  7. 本地DNS缓存下
  8. 浏览器缓存下



* 如何使用 UDP 进行可靠传输 ?

  UDP协议不建立连接, 没有滑动窗口, 最小窗口, 确认重传, 序号和确认号机制, 只管把数据发给目的主机就完了.

  所以如果想使用 UDP 的情况下保证可靠传输, 应当在应用层实现以上功能.



* HTTP1.0, 1.1 , 2.0 区别?

  1.0 默认短连接, 仅支持 get , post , head 请求

  1.1 默认长连接, 添加支持 put, delete, patch , 支持断点续传

  2.0 多路复用, 降低开销, 基于二进制解析因此错误更少(1.x基于文本解析), 报头压缩, 节省带宽





###### 数据库

* mysql架构 ?

  ![1620826583967](C:\Notes\Java\Java.assets\1620826583967.png)

  1. 连接层 , 负责与客户端建立TCP连接, 实现用户认证, 数据加密等功能
  2. 服务层 , 负责将收到的 sql 语句中的视图, 触发器之类的转换为sql查询, 生成执行计划, 优化执行计划, 然后看看缓存里有没有结果
  3. 引擎层 , 接收服务层传下来的执行计划, 然后根据自身的存储规则执行, 不同的存储引擎实际上区别就在于存储数据的结构不同, 然后对应读取数据的方式也不同.
  4. 存储层, 就是指最终保存到磁盘上的文件, 引擎层程序从这里读取和保存数据



* 数据库设计三大范式 ?
  1. 确保每一个字段都是不可再分的, 原子性的, 例如 地址 字段, 如果还有需求是 城市 字段, 那么 地址字段就不是原子性
  2. 确保每一个字段都跟主键相关, 也就是一个表中所有数据都是一类数据, 不能说 学生信息表 里整一个 体重 字段
  3. 确保每一个字段都跟主键直接相关, 也就是不能间接相关, 比如 学生成绩表, 用 学号 作为字段就跟主键直接相关, 但是再整一个 学生年龄 就不是直接相关.
