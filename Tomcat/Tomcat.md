# Tomcat 8.5

##### tomcat源码部署运行

1. 下载tc的压缩包

2. 在idea中创建空的项目

3. 将tc压缩包解压到空项目文件夹中

4. 进入解压后的目录 , 创建目录 home , 将 conf 和 webapp 移动到home目录中

5. 在解压后的根目录创建pom.xml 文件,  编辑该文件 添加tc的依赖

6. 在idea的maven窗口中导入上一步创建的pom文件

7. 项目中 java/org/apache/catalina/startup/Boostrap 中的main方法为tc程序的启动入口

8. 将该main方法配置为启动入口 , 在idea中添加运行配置 , 选择该类 , 并添加运行参数

    ```
    -Dcatalina.home= tc源码的home目录路径,包括home
    -Dcatalina.base= tc源码的home目录路径,包括home
    -Djava.util.logging.manager= org.apache.juli.ClassLoaderLogManager
    -Djava.util.logging.config.file= 要把日志文件存到的位置/logging.properties
    ```

9. 启动项目

10. 访问 localhost:8080 , 此时会发现报无法解析jsp的异常 , 因为没有初始化加载jsp的类

11. 回到源码 , 搜索 ContextConfig , 在该类中的 configstart方法中 的 webConfig(); 这一句后面加上初始化jsp加载器的代码 `context.addServletContainerInitializer(new JasperInitializer(), null);`

12. 重新启动项目 , 访问 localhost:8080



##### http

![](F:\#NOTES\ING\Tomcat\http的工作原理.png)

* 先用tcp与服务器进行连接 , 然后使用http进行数据传输

* 服务端就是tomcat , 负责通过tcp与浏览器进行连接 , 解析http请求 , 解析jsp转为静态资源并生成http数据返回给浏览器



##### tc的架构

* tc工作流程

![](F:\#NOTES\ING\Tomcat\tc工作流程.png)

* servlet工作流程

    ![](F:\#NOTES\ING\Tomcat\servlet工作流程.png)

* tc的架构

    ![](F:\#NOTES\ING\Tomcat\tc架构.png)

连接器处理连接

容器负责管理servlet



* 连接器和容器的总体架构

    ![](F:\#NOTES\ING\Tomcat\coyote与catalina的交互.png)

连接器只负责io数据传输操作相关 

支持的IO模型 :  ( 连接器 )

*  NIO 非阻塞IO , 8.5版本默认此方式
* NIO2 异步IO
* APR 采用c/c++实现 , 需要独立安装apr库
* BIO : 自 8.5 版本以后就不支持了 , 在之前为默认的传输协议 , 性能较以上的方式弱

支持的应用层协议 : ( 容器 )

* HTTP / 1.1 , 默认的方式
*  AJP 
* HTTP/2 , 较HTTP/1.1性能更高 , 下一代协议

>  IO层在HTTP之下, 数据先通过IO层传输 , 然后通过应用层解析



###### 连接器coyote的组成

![](F:\#NOTES\ING\Tomcat\连接器组成.png)

endpoint组件 : 将数据流转换成应用层协议的数据

processor组件 : 将应用层数据封装到request类型的对象中 , 这个request对象是连接器自己内部的类型

adapter组件(适配器) : 将request类型的对象转换成servlerRequest对象 , servletRequest类型是容器内部的类型



###### 容器catalna的组成

![](F:\#NOTES\ING\Tomcat\catalina结构.png)

container的结构

![](F:\#NOTES\ING\Tomcat\container结构.png)

* host是开启服务的虚拟主机 , 可以开启多个虚拟主机地址
* context就是web应用 , 在一个host下可以有多个web应用
* wrapper就是web项目中的servlet

* 通过查看server.xml配置文件可以分析出整个架构



##### tc的启动流程

![](F:\#NOTES\ING\Tomcat\tc启动流程.png)

* 启动的入口类为

    ![](F:\#NOTES\ING\Tomcat\启动的入口类.png)



##### tc请求处理流程

![](F:\#NOTES\ING\Tomcat\tc请求处理流程.png)





##### tc源码分析

* 所有的组件都实现了lifecycle接口 , 该接口为生命周期接口, 包含了基本的生命周期方法

* 各个组件的默认实现类

    ![](F:\#NOTES\ING\Tomcat\各组件的默认实现.png)





##### tc组件之jasper

* 用于解析jsp文件的组件
* jsp本质上是servlet
* jasper引擎负责将对页面的请求找到相应的jsp文件, 并将jsp文件转换成.java文件 ,然后编译成.class文件, 通过将页面设置到response对象中返回给浏览器

###### jsp编译方式

1. 运行时编译 ( 默认 )

    tomcat容器启动时不会对其中的jsp进行编译 , 而是在用户第一次请求时进行编译

2. 预编译

    需要下载Apache Ant预编译程序



### tc服务器配置(server.xml)

##### Executor

 配置共享线程池供多个connector使用 , 如果不配置该项 , 则各个connector使用各自的线程池

##### Connector

配置连接 , 可使用Executor中设置的线程池

##### Engine 引擎

###### host

配置主机名对应的项目文件目录 , 可配置多个host对应不同的项目文件目录 , 默认只有一个host名为locahost, 对应的是webapps文件夹

* context 配置在该host下的项目文件及其访问路径



### tc的web应用配置(web.xml)

* context-param 上下文变量 , 该变量配置后可以在servlet中使用

    ```xml
    <context-param>
    	<param-name>project_param</param-name>
        <param-value>hhh</param-value>
    </context-param>
    ```

    在serlvet中获取该值

    ```java
    String res = request.getServletContext().getInitParameter("project_param");
    ```

* session-config 配置web服务器端的session设置

    ![](F:\#NOTES\ING\Tomcat\web-session设置.png)

* servlet/servlet-mapping 配置 servlet

    ![](F:\#NOTES\ING\Tomcat\web-servlet配置.png)

* listener 配置监听器 , 监听context , servlet , request 的生命周期

* filter 配置过滤器 , 用于登录验证

* welcome-file-list 配置欢迎页面

* error-page 配置错误页面



### tc管理配置(tc自带的管理页)

#### host-manager

* 点击 tc自带主页的 host-manger 按钮进入 host-manger应用

    * 进入该应用需要事先在 conf/tomcat-users.xml 配置角色和用户

        ```xml
        <role rolename="admin-gui"/> <!--带访问界面权限的角色-->
        <role rolename="admin-script"/> <!--带进行操作权限的角色-->
        <!--创建具有角色的用户-->
        <user username="alice" password="123123" roles="admin-gui,admin-script"/>
        ```

    * 输入在配置文件中配置的用户和密码进入管理页面 , 可对在server.xml中配置的虚拟hosts进行管理

#### manage

* 通过访问点击 tc自带页面中 manager APP 访问manager页面 , 同样需要在 tomcat-users.xml 中配置角色和用户

    ```xml
    <role rolename="manager-gui"/> <!--带访问界面权限的角色-->
    <role rolename="manager-script"/> <!--带进行操作权限的角色-->
    <!--创建具有角色的用户-->
    <user username="alice" password="123123" roles="admin-gui,admin-script,manager-gui,manager-script"/>
    ```

* 登录进入manager页面可管理当前部署的应用

* 点击manager页面中的 server status 可查看jvm信息 , os信息 , 线程池信息等



### tc的jvm配置

* 通常jvm分配给tc的内存都不够用, 所以需要修改相关配置

* jvm内存模型

    ![](F:\#NOTES\ING\Tomcat\jvm内存模型.png)

* 配置jvm内存参数

    > windows下修改 catalina.bat 文件
    >
    > ```bat
    > #添加如下配置
    > set JAVA_OPTS=-server -Xms2048m -Xmx2048x -XX:MetaspaceSize=256m -XX:MaxMetaspaceSize=256m -XX:SurvivorRatio=8
    > ```
    >
    > linux下修改 catalina.sh 文件
    >
    > ```sh
    > JAVA_OPTS="-server -Xms2048m -Xmx2048x -XX:MetaspaceSize=256m -XX:MaxMetaspaceSize=256m -XX:SurvivorRatio=8"
    > ```
    >
    > 

| 参数                 | 说明                                                         | 优化建议                |
| -------------------- | ------------------------------------------------------------ | ----------------------- |
| -Xms                 | 堆内存初始大小                                               | 建议与-Xms设置为相同    |
| -Xmx                 | 堆内存的最大大小                                             | 建议设置为可用内存的80% |
| -Xmn                 | 新生代的内存大小 , 官方建议是整个堆的3/8                     |                         |
| -XX:MetaspaceSize    | 元空间内存初始大小, jdk1.8之前配置为 -XX:PermSize            |                         |
| -XX:MaxMetaspaceSize | 元空间内存最大大小,jdk1.8之前配置为-XX:MaxPermSize           |                         |
| -XX:NewRatio         | 设置新生代和老年代的相对大小比例, 如 -XX:NewRatio=3设置 老年代/新生代=3/1 |                         |
| -XX:SurvivorRatio    | 设置Eden区与幸存区大小比例, 如-XX:SurvivorRatio=10设置 Eden区/幸存区 = 10/1 |                         |
| -server              | 以服务端模式运行                                             | 服务端模式建议开启      |
|                      |                                                              |                         |

* 修改完之后重启tc , 在manager->server status 中查看jvm内存分配情况





### tc集群(nginx)

* 正向代理和反向代理 : 区别在于 后端的服务器是一个还是多个 , 后端服务器是一个时 , 代理服务器称为正向代理 , 后端服务器是多个时 , 代理服务器称为反向代理

1. 准备两个tc , 如果是在同一台机器上 , 需要修改 server.xml 中的 shutdown端口, http端口, ajp 端口 , 修改tc主页的内容 方便后续查看负载均衡结果

2. 下载并解压nginx

3. 配置nginx.conf

    ```conf
    #设置一个代理流,在下面被引用
    upstream serverpool{
    	#可配置此项 , 使得来自一台客户端请求的服务器总是某一台
    	ip_hash;
    	#设置这个流中包含的tc服务器们的地址
    	#此处可添加参数设置负载均衡策略fail_timeout , max_fails , fail_time , backup , down
    	server localhost:8888 weight=1;
    	server localhost:9999 weight=1;
    }
    
    #配置nginx的server
    server{
    	#设置nginx监听的端口
    	listen 99;
    	#设置nginx的服务域名
    	server_name localhost;
    	#设置请求分发给哪些tc服务器
    	location / {
    		proxy_pass http://serverpool/; 
    	}
    }
    ```

4. 启动nginx , 启动两台tc

5. 访问nignx的地址 , 即localhost:99 测试结果



#### 集群的session共享策略

1. 使用 ip_hash 的方式配置

2. 使用session复制功能 , 即通过广播机制在所有的tc服务器上同步session (tc自带的功能 , 不推荐)

    1. 在tc的server.xml中的engine标签下添加集群配置

        ```xml
        <Cluster className="org.apache.catalina.ha.tcp.SimpleTcpCluster"/> 	
        ```

    2. 在web应用的web.xml中的根节点中添加集群配置

        ```xml
        <distributable/>
        ```

3. 使用sso单点登录( 推荐 )

    使用单独的一台服务器加redis进行登录认证

    ![](F:\#NOTES\ING\Tomcat\sso单点登录.png)





### tc安全

#### 配置安全

1. 删除自带的webapps下的管理页面

2. 删除tomcat-users.xml 配置的所有角色用户信息

3. 关闭或修改默认的8005shutdown端口, 即修改server.xml

    ```xml
    <!--修改了端口 , 且修改了shutdown指令-->
    <Server port="8197" shutdown="fsjklaj2">...</Server>
    <!--或者直接关闭该端口-->
    <Server port="-1" shutdown="shutdown">...</Server>
    ```

    * 如果保持8005开启 , 那么可以通过telnet连接到该端口并关闭tc
        1. 在命令行 `telnet 127.0.0.1 8005`
        2. 输入 `shutdown` 将会把tc关闭

4. 定义404, 500等错误页面 , 防止后台报错直接暴露给用户而造成不安全

#### web应用安全

在web应用中使用独立的安全模块 , 也可使用第三方的安全模块 , 如 springsecurity , apche shiro

#### 传输安全

使用https协议





### tc性能调优

#### tc性能测试

* 这里使用 apachebench

1. 安装

    ```shell
    yum install httpd-tools
    ```

2. 查看版本号

    ```shell
    ab -V
    ```

3. 部署tc及其web应用

4. 使用ab进行测试

    ```
    ab -n 1000 -c 100 -T application/json <tc服务器上web应用的api地址>
    ```

    | 参数 | 含义                                            |
    | ---- | ----------------------------------------------- |
    | -n   | 测试时执行的请求次数                            |
    | -c   | 一次产生的请求个数                              |
    | -p   | 请求接口api需要提供的post数据, 使用json文件提供 |
    | -t   | 测试所进行的最大秒数                            |
    | -T   | post数据的content-type头信息                    |
    |      |                                                 |

5. 测试完成会生成测试报告

    其中重要的指标 : 

    | 参数                                            | 指标说明                   |
    | ----------------------------------------------- | -------------------------- |
    | requests per second                             | 吞吐率                     |
    | time per request                                | 用户平均请求等待时间       |
    | time per request:across all concurrent requests | 服务器平均每个请求完成时间 |
    | concurrency level                               | 并发用户数                 |
    |                                                 |                            |

    #### tc性能优化
    
    1. **按照jvm参数优化建议对jvm参数进行修改并通过ab测试结果**
    
    2. **通过调整tc使用的垃圾回收器类型来满足不同的需求**
    
        ![](F:\#NOTES\ING\Tomcat\垃圾回收器的类型.png)



![](F:\#NOTES\ING\Tomcat\如何选择垃圾回收器.png)

在tc中配置使用的垃圾回收策略

1. 通过jconsole查看tc所使用的的垃圾回收器

    1. 首先在 tc的 catalina.sh 中添加允许远程连接的参数 ( 和修改jvm参数是同一个地方 )

        其中设置的8999是使用jconsole连接使用的端口 , 也可设置为其他端口号

        ```sh
        JAVA_OPTS="-server -Xms2048m -Xmx2048x -XX:MetaspaceSize=256m -XX:MaxMetaspaceSize=256m -XX:SurvivorRatio=8 -Djava.rmi.server.hostname=本机ip -Dcom.sun.management.jmxremote.port=8999 -Dcom.sun.management.jmxremote.rmi.port=8999 -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.authenticate=false"
        ```

    2. jconsole在jdk目录的bin下 , 指定tc所在的ip和设置的远程连接端口 可在 vm概要 中查看到 垃圾回收 详细信息

2. 通过在 catalina.sh 中设置启动参数来设置垃圾回收器

    ![](F:\#NOTES\ING\Tomcat\gc设置.png)

![](F:\#NOTES\ING\Tomcat\gc信息打印设置.png)

3. **通过调整server.xml中的连接器参数进行优化**

    调整 connector 标签中的参数

    ![](F:\#NOTES\ING\Tomcat\connector参数优化.png)





### tc附加功能

websocket : html5新增的长链接方式 , 请求路径为 ws://...

在tc中使用ws :

在 tc 7.0.5 开始就支持ws

在服务端使用 endpoint 对象来作为 ws 连接中服务端的消息窗口 

两种方式定义一个 endpoint :

1. 继承 javax.websocket.Endpoint
2. 在pojo类上使用 @ServerEndpoint 使其成为一个endpoint ( 推荐 )

在endpoint类上定义ws的声明周期方法:

![](F:\#NOTES\ING\Tomcat\ws的服务端使用.png)

