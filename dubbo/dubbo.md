## dubbo

* 创建一个主maven项目, 在主项目中创建多个子maven模块, 这些模块分别提供model, controller, service, serviceImpl
* 模块间的相互引用在pom中设置dependency



#### 使用zookeeper作为dubbo的注册中心, 安装zookeeper

1. 下载zookeeper并解压
2. 在解压文件夹根目录下新建data文件夹, 用于存放注册的数据
3. 打开解压后文件夹下的conf文件夹, 复制一份zoo_sample.cfg, 编辑设置 `dataDir=../data`, 也就是设置注册数据放在刚才创建的文件夹里 ,  然后保存重命名为zoo.cfg, 这个名字是zookeeper启动时默认使用的配置文件的名字
4. 打开bin文件夹, 打开cmd, 直接运行zkServer.cmd  `>zkServer.cmd`,  控制台打印服务启动信息
5. 同样在bin文件夹下, 使用命令行运行zkCli.cmd `>zkCli.cmd`, 测试服务 `>get / #获取注册服务上根节点的信息`



#### 使用dubbo-admin作为监控控制台 (监控提供者和消费者)

1. 打开dubbo的github主页, 下翻至Ecosystem, 点击Dubbo OPS

2. 下载Dubbo OPS的zip , 完事解压

3. 打开解压文件夹中的dubbo admin项目, 这是一个jar打包方式的springboot项目

4. 修改该项目的配置 `application.properties`

   ```properties
   #其他配置...
   
   #修改zookeeper的地址
   dubbo.registry.address=zookeeper://127.0.0.1:2181
   
   #其他配置...
   ```

5. 在解压文件夹根位置 , 使用命令行对dubbo admin项目进行打包成jar( 也可以导入到idea中打包 )

   ```shell
   >mvn clean package
   ```

6. 使用命令行运行生成的jar包 ( 启动这个springboot项目 )

   ```shell
   >java -jar dubbo-admin-0.0.1-SNAPSHOT.jar
   ```

7. 使用浏览器测试运行的dubbo admin ,   `localhost:7001`  , 默认端口7001, 账号root, 密码root( 在启动这个监控台之前应启动zookeeper )



#### 在订单创建模块远程调用用户模块的案例

1. 创建两个普通maven项目， 它们同为整个项目中的某个模块的service层模块， 比如user的服务层模块和order的服务层模块， 其中在order的service方法中要调用user的service中的方法

2. 再创建一个普通的maven项目， 将其他模块项目的bean和service接口都放到这个模块项目中， 称为公共内容模块

3. 在各个service模块项目中 配置dependency来获取到 公共内容模块 中定义的bean和service接口

4. ***使得被调用的service方法在dubbo注册中心注册***
   
   1. 在被调用service方法的模块项目（提供者）中， 配置pom依赖dubbo （2.6.2）
   
   2. 在提供者中配置pom依赖curator-framework(2.12.0) , 这是操作zoopkeeper的客户端
   
      * dubbo2.6及以后使用的是这个curator来操作zookeeper
      * dubbo2.6版本之前的使用的是zkclient来操作zookeeper
   
   3. 在提供者中的resources文件下，新建xml配置文件provider.xml ( 其实就是spring的xml配置文件,dubbo依存于spring )  (新建spring配置文件)
   
      ```xml
      <!--添加dubbo的命名空间-->
      
      <bean>
      	<!-- 1.指定应用的名字(也就是当前项目的名字) -->
          <dubbo:application name="user-service-provider"></dubbo:application>
          
          <!-- 2.指定将该应用注册到哪里的什么注册中心中,这里是注册到本机2181上的zookeeper上 -->
          <dubbo:registry address="zookeeper://127.0.0.1:2181"></dubbo:registry>
          <!-- 或者这样写 -->
          <dubbo:registry protocol="zookeeper" address="127.0.0.1"></dubbo:registry>
          
          <!-- 3.配置消费者从哪个端口来远程调用这个提供者上的方法以及使用什么协议 -->
          <!-- 这里指定通信协议为dubbo,通信端口为20880 -->
          <dubbo:protocol name="dubbo" port="20880"></dubbo:protocol>
          
          <!-- 4.指定将该应用上的哪个服务类暴露到注册中心(指定哪个服务可以被远程调用) -->
          <!-- interface设置该类实现的接口, 这个接口来自那个集合了所有接口和bean的项目 -->
          <!-- ref设置这个类是哪个实体,引用spring容器中的另外一个实体 -->
          <dubbo:service interface="com.itheima.gather.service.UserService"
                         ref="userService">
          </dubbo:service>
          <!-- 这个实体是被第4步中ref的实体类 -->
          <bean id="userService"
                class="com.itheima.gmall.service.impl.UserServiceImpl"></bean>
      </bean>
      ```
   
   4. ***在提供者中写一个main方法启动spring容器来测试是否注册到了注册中心***
   
      ```java
      //从类路径下(resources下的配置文件)加载配置文件获取容器
      ClassPathXmlApplicationContext context = 
          new ClassPathXmlApplicationContext("provide.xml");
      //启动容器
      context.start();
      //设置等待输入使得程序不退出,方便在监控器中查看注册情况
      System.in.read();
      ```
   
   5. 在dubbo监控控制台的网页中查看服务的提供者,应用,服务等信息
   
   * 这个注册的原理实际上就是在启动spring容器时, 读取dubbo的配置, 然后通过与注册中心(zookeeper)建立连接, 同时调用zookeeper的api使得配置的类在zookeeper中注册, 然后监控控制台会实时监控目标注册中心的状态, 从而获取到已经注册的类, 这一套流程依存于spring
   
5. 使得消费者订阅提供者提供的类

   1. 在调用service方法的模块项目（消费者）中， 配置pom依赖dubbo （2.6.2）

   2. 在消费者中配置pom依赖curator-framework(2.12.0) , 这是操作zoopkeeper的客户端

      - dubbo2.6及以后使用的是这个curator来操作zookeeper
      - dubbo2.6版本之前的使用的是zkclient来操作zookeeper

   3. 在消费者的resources下新建spring的配置文件 consumer.xml

      ```xml
      <!-- 引入dubbo的命名空间 -->
      
      <beans>
      	<!-- 1.设置消费者的应用名称 -->
          <dubbo:application name="order-service-consumer"></dubbo:application>
          
          <!-- 2.设置要连接哪个注册中心 -->
          <dubbo:registry address="zookeeper://127.0.0.1:2181"></dubbo:registry>
          
          <!-- 3.设置需要使用哪个远程服务的接口(会自动生成这个接口的代理对象) -->
          <!-- interface设置接口,来自那个集合项目,应当同提供者中提供的那个接口 -->
          <!-- id设置这个对象在容器中的id(容器会将该代理对象加到容器中)-->
          <!-- 那么在使用这个对象的时候只需要自动注入即可 @Autowired -->
          <dubbo:reference interface="com.itheima.gather.UserService"
                           id="userService">
          </dubbo:reference>
      </beans>
      ```

   4. 使用main方法测试代理对象

      ```java
      //从类路径下(resources下的配置文件)加载配置文件获取容器
      ClassPathXmlApplicationContext context = 
          new ClassPathXmlApplicationContext("consumer.xml");
      //从容器中获取service对象 ( 应当在service上加上@Service注解使其被容器加载,且在spring配置中开启注解扫描 )
      OrderService orderService = context.getBean(OrderService.class);
      //调用方法测试, 这个initOrder方法中调用到了远程的service中的方法
      orderService.iniOrder("1");
      //阻塞程序
      System.in.read();
      ```

   5. 在监控控制台查看消费者信息

   * 这个原理其实就是在构建spring容器时, 通过远程连接提供者, 生成目标的代理对象并加到容器中, 然后直接调用容器中的这个对象, 就实现了远程调用



#### 使用监控中心dubbo-monitor-simple ( 监控接口的调用情况 )

1. 打开dubbo的github主页, 下翻至Ecosystem, 点击Dubbo OPS

2. 下载Dubbo OPS的zip , 完事解压

3. 打开解压文件夹中的 incubator-dubbo-ops-master/dubbo-monitor-simple 项目, 这是一个jar打包方式的springboot项目

4. 在 dubbo-monitor-simple文件夹下 使用mvn对项目进行打包  `>mvn package`

5. 生成target文件夹

6. 进入 target 文件夹, 解压 dubbo-monitor-simple-2.0.0-assembly.tar.gz, 解压出来dubbo-monitor-simple-2.0.0 文件夹, 进入该文件夹/conf/dubbo.properties, 修改监控中心配置文件

   ```properties
   #指定zookeeper的地址
   dubbo.registry.address=zookeeper://127.0.0.1:2181
   #指定其他服务于监控中心的通信端口 (通过这个端口连接到监控中心)
   dubbo.protocol.port=7070
   #设置监控中心网页的端口 (通过这个端口从网页上访问监控中心)
   dubbo.jetty.port=8080
   ```

7. 进入conf同级目录下的assembly.bin目录, 双击运行 start.bat 启动监控中心 ( 此时监控中心已经与注册中心连接 )

8. ***配置消费者连接到监控中心*** (配置消费者的spring配置文件)

   ```xml
   <beans>
       <!-- 通过注册中心来寻找并自动连接监控中心 -->
       <dubbo:monitor protocol="registry"></dubbo:monitor>
       <!-- 或者 手动指定监控中心的地址和端口 (这里指定的端口应当是监控中心与其他服务的通信端口) -->
       <dubbo:monitor address="127.0.0.1:7070"></dubbo:monitor>
   </beans>
   ```

9. ***配置提供者连接到监控中心*** (配置提供者的spring配置文件,同消费者配置)

10. 启动提供者测试方法使得服务在注册中心注册 , 启动消费者测试方法来远程调用提供者的服务, 然后在网页中查看远程调用的记录 ( 端口是监控中心配置文件中配置的那个 )



#### 在spingboot中使用dubbo ( spring配置文件中关于dubbo的配置在springboot的配置文件中都一一对应 )

1. 创建提供者项目, 为普通的springboot项目; 创建消费者项目, 为web的springboot项目

2. 在两个项目中都加入那个抽取了所有接口项目的依赖

3. 在提供者中创建一个service类, 在消费者中创建一个service, 其中的方法要调用到提供者中的方法

4. 在消费者中创建controller类, 提供调用service的方法

5. 在提供者个消费者中都 导入dubbo的starter依赖 `dubbo-spring-boot-starter` , 注意springboot版本和starter版本的对应关系, 在starter的git主页上有说明  ( 这个starter中包含了dubbo,zookeeper,操作zookeeper的客户端 )

6. 在提供者的springboot配置中配置dubbo

   ```properties
   #应用的名字
   dubbo.application.name=user-service-provider
   #注册中心的地址
   dubbo.registry.address=127.0.0.1
   #连接注册中心的协议
   dubbo.registry.protocol=zookeeper
   #通信协议 (与消费者通信)
   dubbo.protocol.name=dubbo
   #通信端口
   dubbo.protocol.port=20880
   #连接监控中心的地址
   dubbo.monitor.protocol=registry
   ```

7. 在提供者要注册的service类上添加 `@Service` 使得在注册中心注册, 这个注解来自dubbo包

8. 在springboot的main函数的类上添加 `@EnableDubbo` 使得dubbo的注解生效

9. **启动main方法, 在监控控制台查看注册的服务**

10. 在消费者的springboot配置文件中配置dubbo

    ```properties
    dubbo.application.name=boot-order-service-consumer
    dubbo.registry.address=zookeeper://127.0.0.1:2181
    dubbo.monitor.protocol=registry
    ```

11. 将消费者要使用的远程服务的service实例上的 `@Autowired`  改为 `@Reference` , 那么这个实例就会自动通过远程来创建

12. 在消费者main方法的类上添加 `@EnableDubbo` 使得dubbo注解生效

13. 注意如果设置了监控中心网页的端口为8080, 那么在启动这个消费者的服务器之前应当修改使用的端口 (内置的tomcat默认使用8080)

    ```properties
    server.port=8081
    ```

14. 启动消费者的main方法, 通过网页访问接口是否成功调用了远程的service方法, 然后在监控控制台中查看消费者状态



#### dubbo的配置参数覆盖规则

* 以下优先级从高到低

  * 启动java程序时使用的命令行命令中的参数
  * springboot中配置的dubbo参数
  * 项目resources目录下名为dubbo.properties的dubbo配置文件中的参数

* 验证配置参数优先级规则

  1. 在springboot的main函数上右键, 选择run configuration, 在弹出的窗口中先选择当前的这个main函数 ,然后设置arguments->VM args , 输入 -Ddubbo.protocol.port=20880  ( 这里的设置实际上就是eclipse在运行main方法时执行的命令的参数 )

  2. 在springboot中配置dubbo的端口

     ```properties
     dubbo.protocol.port=20881
     ```

  3. 在项目的resources目录下新建 dubbo.properties配置文件, 这个是dubbo自己的配置文件, 设置dubbo端口

     ```properties
     dubbo.protocol.port=20882
     ```

  4. 启动main方法, 查看监控控制台 ,发现使用的是设置的java运行参数中的端口号

  5. 依次去除高优先级的设置查看启动结果



#### 配置消费者启动时不检查 ( 订阅的服务是否在线 )

* 默认是开启这个检查的, 那么在启动消费者的spring容器时, 如果提供者没上线, 那么就直接会抛异常

* 在spring的配置文件中配置关闭启动时检查, 此时只有在调用远程服务时才会报错

  ```xml
  <beans>
      <!-- 在设置订阅的时候设置不启动时检查 -->
  	<dubbo:reference interface="com.itheima.gather.service.UserService"
                       id="userService"
                       check="false">
      </dubbo:reference>
      <!-- 如果要订阅很多个服务,那么每个订阅都要这样设置, 可以使用以下方式来统一设置所有订阅的通用属性 -->
      <dubbo:consumer check="false"></dubbo:consumer>
  </beans>
  ```

* ***同理可以配置关闭对注册中心的检查***

  ```xml
  <!-- 默认如果在启动的时候注册中心没在线就会报错, 这项设置关闭了这个报错 -->
  <dubbo:registry check="false"></dubbo:registry>
  ```

  

#### 消费者中设置远程调用的超时时间 ( 远程服务中方法运行的时间 )

* 默认使用 `dubbo:consumer`  中的 `timeout` 属性设置的时间, 默认为1000ms

* 在单个订阅中设置超时时间

  ```xml
  <!-- 设置这个订阅的超时时间为3000ms, 如果远程调用的方法没有3000ms内返回结果,则报错超时 -->
  <dubbo:reference interface="com.itheima.gether.service.UserService" 
                   id="userService"
                   timeout="3000">
      <!-- 也可以单独指定某个方法的超时时间 -->
      <dubbo:method name="getUserAddressList" timeout="1000"></dubbo:method>
  </dubbo:reference>
  <!-- 这个设置可以在 dubbo:consumer 中统一设置 -->
  ```

* 超时时间的设置优先级为, 方法级最优先, 其次是订阅服务级, 然后是全局配置 ( 可参照官网说明 )

* ***可以在提供者的服务中设置超时时间*** ( 如果消费者和提供者在同一级别配置了超时时间, 消费者的配置优先 )

  ```xml
  <!-- 这是提供者的配置文件 -->
  <dubbo:service interface="com.itheima.gather.service.UserService"
                 timeout="1000"
                 ref="userServiceImpl">
      <!-- 提供者也可设置方法级别的超时时间 -->
  </dubbo:service>
  <!-- 也可设置提供者的统一属性配置 -->
  <dubbo:provider timeout="2000"></dubbo:provider>
  ```

* ***使用retries参数设置超时后的重试次数***

  1. 设置消费者中 重试次数 和 超时时间

     ```xml
     <dubbo:reference interface="com.itheima.gether.service.UserService" 
                      id="userService"
                      timeout="3000"
                      retries="3">
     </dubbo:reference>
     ```

  2. 在不同的端口开启三个相同的提供者

  3. 启动消费者调用提供者方法( 运行时间会超时 ), 发现分别调用了不同端口上的提供者

  * **在超时后会重新调用提供者方法**
  * **对于删,改,查的操作, 可以设置重试 , 对于增的操作不可以设置重试, 有可能增了好几次** 





#### 多版本 , 使用同一个接口的不同版本的实现类 ( 消费者根据接口来唯一的使用提供者提供的实现类, 如果有多个实现类, 那么使用version来指定使用哪个 )

1. 在提供者中创建对同一个接口的多个实现类, 即为多版本

2. 在提供者的配置文件中同时向注册中心注册多个版本的实现类

   ```xml
   <!-- 向注册中心注册一个版本的实现类 -->
   <!-- 使用version指定版本号 -->
   <dubbo:service  interface="..." ref="userService1" version="1.0.0"></dubbo:service>
   <bean id="userService1" class="..."></bean>
   
   <!-- 使用version指定另外一个版本 -->
   <dubbo:service interface="..." ref="userService2" version="2.0.0"></dubbo:service>
   <bean id="userService2" class="..."></bean>
   ```

3. 在消费者中使用version指定要使用哪个版本的实现类

   ```xml
   <!-- 使用version指定版本, 如果是version="*", 那么会随机使用版本 -->
   <dubbo:reference id="..." interface="..." version="1.0.0"></dubbo:reference>
   ```





#### 本地存根 , 其实就是在调用远程实现类前调用的过滤器

* 通过创建和指定本地存根, 实现在调用一个接口的实现类之前, 先执行一套逻辑 (比如数据检校), 然后再执行真正的实现类

1. **创建一个目标接口的实现类 ( 通常将这个类放到公共项目下 )**

   ```java
   class UserServiceImplStub implements UserService{
       private final UserService userService;
       //提供一个使用原实现类的构造函数, dubbo会在构造这个类实例时将原来的代理对象传进来供方法的调用
       public UserServiceImplStub(UserService userService){
           this.userService = userService;
       }
       
       @Override
       public String getUserName(int id){
           //在调用原本的接口实现方法之前进行判断
           if(!StringUtil.isEmpty(id)){
               return userService.getUserName(id);
           }
           return null;
       }
   }
   ```

2. **在消费者的配置中配置使用这个存根类**

   ```xml
   <dubbo:reference interface="..." id="..." stub="第一步中那个存根类"></dubbo:reference>
   ```

   

#### 在springboot中使用dubbo的三种方式

* **如上, 在springboot的配置文件中配置dubbo, 同时开启注解扫描并使用注解**

* 直接使用dubbo的配置文件 ( xml配置文件, 就是spring的配置文件 )

  * 将xml配置文件放到resources下
  * 在main方法的类上不再使用 `@EnableDubbo` 开启注解扫描, 而是 在该类上 使用 `@ImportResource(location="classpath:provider.xml")` 来使用dubbo的xml配置文件

* 使用spring配置类的方式 (有用吗)

  * 创建一个类 , 类上使用 `@Configuration` 使其称为配置类

  * 在类中添加返回配置对象的方法, 配置对象与xml中配置的标签一一对应

    ```java
    @Configuration
    class MainConfiguration{
        
        //使用注解将配置对象加到容器中, 其实xml中的dubbo:xxx标签就是spring中的bean标签
        @Bean
        public ApplicationConfig applicationConfig(){
            //这个配置对象对应xml中的dubbo:application标签
            ApplicationConfig applicationConfig = new ApplicationConfig();
            applicationConfig.setName="user-service";
            return application;
        }
        
        //其他配置都类似, 可参照官方文档
    }
    ```

  * 在main的类上使用注解 `@EnableDubbo(scanBasePackage="xxx")` 来指定要扫描这个配置类



#### zookeeper宕机 和 dubbo直连

* 当zookeeper宕机时, 因为存在本地缓存, 所以消费者还是可以使用之前调用过的提供者的服务

* 在使用注解使用远程服务对象注入变量时 , 可以指定url参数 使其直接连接提供者, 此时不经过注册中心, 因此无注册中心也可使用

  ```java
  //直接从提供者获取对象注入, 而不经过注册中心
  @Refrence(url="127.0.0.1:20882")
  UserService userService;
  ```



#### 负载均衡策略设置

* 同时开启几个  **实现了同样接口**  服务的提供者, 然后使用消费者对这个服务进行访问, 会默认使用随机的方式使用这几个提供者中的某一个

* 可以在提供者或消费者或方法上指定  **loadbalance**  属性来改变负载均衡的策略



#### 服务降级设置

* 在服务器压力较大时, 为了不影响核心服务的运行, 对某些边缘服务进行降级设置
* 降级分为两种
  * 直接屏蔽, 对该服务的调用直接返回空, 不会调用服务
  * 调用失败时返回空, 对服务进行一次调用, 如果失败则返回为空
* 设置方法
  * 在监控控制台中的消费者设置中, 将对目标服务进行调用的消费者进行 **屏蔽** 或 **容错** 设置



#### 集群容错 , 就是当调用失败时怎么处理

#### 使用 Hystrix 进行容错管理

1. 在创建项目的时候 , 选择 Cloud Circuit Breaker 下的 Hystrix ( 或者直接打开pom文件 , 在打开的编辑窗口右键中使用edit starter来进行编辑 ), 提供者和消费者都需要
2. 在main方法的类上加上 `@EnableHystrix` 来开启Hystrix的注解扫描, 提供者和消费者都需要
3. 在提供者的服务方法上加 `@HystrixCommand`  指定使用Hystrix来处理异常
4. 在消费者远程调用提供者的方法上加 `HystrixCommand(fallbackMethod="hello")`  来指定调用失败时如何处理,  这个 hello 是当前类中的另外一个方法名, 当调用出错时, 会执行这个 hello 方法



### dubbo原理

* netty做网络通信