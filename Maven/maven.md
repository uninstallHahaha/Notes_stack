# *Maven*

* 依赖管理
  * 将所有jar包都统一放到仓库中管理
* 单元测试
* 构建项目
  * 集成了原来手动的编译 , 打包 , 运行等操作



## maven的使用

1. 下载安装包
2. 配置系统环境变量
   1. 确认已经配置完成java的环境变量
   2. 新建系统变量 `MAVEN_HOME:解压maven的地址`
   3. 在path环境变量中添加 `%MAVEN_HOME%\bin` 
   4. 在命令行中执行 `mvn -v` 来查看maven配置结果
3. 在maven解压目录下 , `conf/settings.xml` 中配置maven
   1. 默认本地仓库为 `用户文件夹/.m2/repository`
   2. 修改 ***localRepository*** 来指定本地仓库地址



## maven项目的标准结构

* src/main/java 核心代码

* src/main/resources 配置文件
* src/test/java 测试代码
* src/test/resources 测试配置文件
* src/main/webapp 页面资源





## maven常用指令

* ***mvn clean***: 删除target编译文件目录 
* ***mvn compile***: 编译核心代码生成target目录
* ***mvn test***: 编译核心代码和测试代码生成在target目录中
* ***mvn package***: 编译所有代码并生成包文件在target目录中
* ***mvn install***: 编译所有代码并生成包文件在target目录中 , 并将该包加入到本地仓库中
* ***mvn deploy***: 将项目上传到私服



## maven 生命周期

* 默认生命周期 : 编译(compile)->测试(test)->打包(package)->安装(install)->发布(deploy) 
* 清理生命周期 : 清理(clean)



## 项目对象模型pom文件

* 项目自身信息
* 项目依赖信息
  * 公司名
  * 项目名
  * 版本号
* 项目运行环境(插件)



## idea使用maven

#### 配置

1. settings -> maven , 设置maven安装目录和settings文件所在目录以及本地仓库位置
2. settings -> maven -> Runner , 配置运行参数 `-DarchetypeCatalog=internal` , 防止无网络情况下无法创建maven项目的问题

#### 创建maven的java/javaweb项目

1. 创建quickstart的骨架项目( 基本的java项目 )  或者 webapp的骨架项目(javaweb项目)
2. 补全项目结构 resources 目录
3. 如果是java项目 , 直接不使用骨架创建项目更加方便

#### servlet示例

1. 导包 `servlet-api` , `jsp-api` , `junit`
   1. 如果本地仓库有相关jar包, 会在输入的时候提示 
   2. 如果本地仓库无相关jar包, 在mvn官方仓库搜索然后复制坐标到pom文件中, 然后会自动下载该jar包
2. 创建servlet写接口
3. 在webapp下创建要跳转的jsp
4. 直接在maven projects窗口中点击右上角的执行mvn自定义命令按钮
5. 输入命令 `tomcat:run(使用maven内置的tomcat启动项目)` 执行
6. 在浏览器访问web.xml中设置的 servlet-name( 接口访问路径 )
7. 此时会报500错误 , 因为maven中内置了tomcat, 而tomcat中又包含了servlet-api 和 jsp-api这两个jar包, 此时项目中也有这两个jar包 , 那么这两个jar包就会发生冲突 , 从而报错 , 解决方法是在pom文件中配置jar包的使用范围, 设置 `scope` 为 `provided` , 即只在写代码的时候使用 , 而不在编译的过程中使用 , 就避免了jar包的冲突
8. 同理 , 给 `junit` 包设置使用范围为 `test` , 即只在执行test命令时使用
9. 重启tomcat测试接口跳转

#### 配置maven中的tomcat

1. maven中内置的tomcat是6 , 现在要使用版本7 , 在pom中配置tomcat7 

   ```xml
   <build>
   	<plugins>
      		<plugin>
          		<groupId>org.apache.tomcat.maven</groupId> 
               <artifactId>tomcat7-maven-plugin</artifactId>
               <version>2.2</version>
               <configuration>
              	<port>8090</port> 
               </configuration>
           </plugin> 
       </plugins>
   </build>
   ```

2. 此时新添加了tomcat7插件 , 通过运行 `tomcat7:run` 命令来开启tomcat7

3. 设置插件坐标模板 settings -> 搜索live -> 选择Live Templates -> 右上角+ -> 添加一个组 -> 在新添加的组上右上角+ -> 添加一个模板 -> 设置模板名字 -> 设置模板内容 -> 设置模板作用的文件类型 -> ok , 然后在pom中直接输入模板的名字根据提示可直接使用模板

4. 在pom中配置jdk插件

   ```xml
   
      		<plugin>
          		<groupId>org.apache.maven.plugins</groupId> 
               <artifactId>maven-compiler-plugin</artifactId>
               <configuration>
                   <!--设置使用jdk1.8-->
              	   <target>1.8</target> 
                   <source>1.8</source>
                   <!--设置使用utf-8-->
                   <encoding>UTF-8</encoding>
               </configuration>
           </plugin> 
   
   ```


#### maven的java项目中使用数据库(原生jdbc)

1. 创建普通的maven工程(java项目)

2. 补全项目结构

3. 创建实体类 

4. 导包 `mysql-connector-java`

   ```xml
   <dependency>
   	<groupId>mysql</groupId>
       <artifactId>mysql-connector-java</artifactId>
       <version>5.1.6</version>
       <scope>runtime</scope>
   </dependency>
   ```

5. 关于jar包作用域

   | 依赖范围        | 编译有效(写代码时) | 测试有效(运行测试时) | 运行有效(运行时) | 例子                      |
   | --------------- | :----------------: | :------------------: | :--------------: | ------------------------- |
   | compile( 默认 ) |         √          |          √           |        √         | spring-core               |
   | test            |         ×          |          √           |        √         | junit                     |
   | provided        |         √          |          √           |        ×         | servlet-api               |
   | runtime         |         ×          |          √           |        √         | jdbc驱动                  |
   | system          |         √          |          √           |        ×         | 本地的maven仓库之外的类库 |

6. 创建dao层类 , 使用原生jdbc查询数据

7. 在test下创建带 `@Test` 的测试方法调用dao层方法测试数据库的查询 





## maven导包冲突问题的解决

* 在pom中导入jar包时, maven会自动将该包依赖的其他包都一同导入 , 此时pom中导入的包称为 **直接依赖** , 这些包所依赖的其他被导入的包称为 **间接依赖** 
* 因为上述机制的存在 , 所以 间接依赖包之间可能会产生冲突 , 比如 导入 版本5.0.2的spring-context , 会自动导入5.0.2的spring-core , 同时导入 版本4.2.8的spring-bean , 会自动导入4.2.8的spring-core , 此时就存在了两个版本的spring-core , 产生jar包的冲突
* 在pom中新导入包时要注意查看maven projects窗口下的 **依赖树结构图** , 确保不会产生jar包冲突

#### 解决方法

* 调整pom中导包的顺序 , 写在上面的包的间接依赖被优先导入

* 在pom中手动指定间接依赖包的版本 , 即手动在pom中导入spring-core

* 在pom中使用依赖包排除导入的设置 ( 推荐 )

  ```xml
  <dependency>
  	<groupId>org.springframework</groupId>
      <artifactId>spring-bean</artifactId>
      <version>4.2.8</version>
      <exclusions>
          <!--排除spring-core的间接依赖导入-->
     	    <exclusion>
         		<groupId>org.springframework</groupId>
      		<artifactId>spring-core</artifactId>
          </exclusion> 
      </exclusions>
  </dependency>
  ```

  



## 版本锁定

* 一个项目A依赖于另外一个项目B , 那么B中的jar包都会成为A的间接依赖包 , 而如果在A的pom中又重新指定了这些间接依赖包的版本 , 那么会优先使用A中配置的版本 , 因为依赖包版本的改变 , 可能导致依赖的项目B无法正常使用 , 所以此时就需要在项目B中对依赖包版本进行锁定 , 哪怕是A中重新指定版本 , 也不会生效, 从而避免了B无法使用的问题

```xml
<!--设置变量值-->
<properties>
	<spring.version>5.0.2.RELEASE</spring.version>
</properties>

<!--版本锁定, 只有锁定版本功能, 还需要在dependencies中导入-->
<dependencyManagement>
	<groupId>org.springframework</groupId>
    <artifactId>spring-bean</artifactId>
    <!--使用变量值-->
    <version>${spring.version}</version>
</dependencyManagement>
```



## maven项目的模块化拆分

* 对于项目可以重用的部分 , 可以拆分出来成为模块 , 供其他项目使用
* 在一个父工程下的模块之间可以相互引用 , 只需在pom中配置引用即可
* 一个工程也可以引用另外一个工程, 只需将被引用的工程安装到本地仓库 , 然后在pom中引用即可

1. 创建普通的maven项目作为父工程 , 这个项目中只需要有pom文件即可
2. 在该项目下创建模块 , 作为子模块 ,  这里创建三个模块dao, service , web 作为示例
3. 此时就建立了一个父工程和子模块的关系

> 在子模块中 , 不同的直接依赖和传递依赖作用域类型对应的作用域
>
> | 直接依赖\传递依赖 |          | provided | runtime  | test |
> | ----------------- | -------- | -------- | -------- | ---- |
> | compile           | compile  | -        | runtime  | -    |
> | provided          | provided | provided | provided | -    |
> | runtime           | runtime  | -        | runtime  | -    |
> | test              | test     | -        | test     | -    |
>
> * 比如子模块compile依赖于父工程 , 父工程test依赖于junit , 那么子模块 - 依赖于junit( 不依赖 )
> * 实际开发中 , 如果发现依赖丢失 , 那么直接手动导入该包即可 , 无需参照该图

