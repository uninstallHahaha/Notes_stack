## mYbatis

持久层技术: 

* JDBC( 规范 )
* spring的jdbctemplate ( 工具类, 对jdbc的封装 )
* apache的dbutils ( 工具类对jdbc的封装 )



#### 搭建环境(xml配置)

1. 创建普通的maven工程

2. 创建数据库, 创建表 user{id, username, birthday, sex(char1), address}

3. 设置项目pom

   ```xml
   <packaging>jar</packaging>
   
   <!--导入mybatis-->
   <!--坐标从mybatis官网找-->
   
   <!--mysql-connector-java-->
   <!--log4j-->
   <!--junit-->
   ```

4. 新建实体类 User, 属性名同数据库( birthday是Date类型 )

5. 新建持久层接口 IUserDao

   ```java
   public interface IUserDao{
       List<User> findAll();
   }
   ```

6. 在resources文件加下新建mybatis的配置文件 SqlMapConfig.xml ( 叫什么无所谓 )

7. 添加约束

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE configuration
   	PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
   	"http://mybatis.org/dtd/mybatis-3-config.dtd">
   
   <!--mybatis的主配置文件-->
   <configuration>
   	<!--配置环境们-->
       <!--设置默认使用id为mysql的环境, 这个id名字随意-->
       <environments default="mysql">
       	<environment id="mysql">
               <!--配置事务类型-->
           	<transactionManager type="JDBC"></transactionManager>
               <!--配置数据源(连接池)-->
               <dataSource type="POOLED">
               	<property name="driver" value="com.mysql.jdbc.driver"></property>
                   <property name="url" value="jdbc:mysql://localhost:3306/数据库名"/>
                   <property name="username" value="root"></property>
                   <property name="password" value="1234"></property>
               </dataSource>
           </environment>
       </environments>
       
       <!--指定映射配置文件的位置, 每一个dao对应一个配置文件-->
       <mappers>
           <!--这里的位置是resources文件夹下的路径, 也就是resources/com/itheima/dao/IUserDao.xml-->
       	<mapper resource="com/itheima/dao/IUserDao.xml"></mapper>
           
           <!--也可以使用package标签来指定接口类所在的包或者是配置文件所在的路径-->
           <package name="com.itheima.dao"></package>
       </mappers>
   </configuration>
   ```

8. 在resources下新建( 这个目录要逐级创建,才是三级目录 ) com/itheima/dao/IUserDao.xml, 编辑IUserDao.xml

   * #### dao层接口的配置文件在resources目录下的位置必须和接口文件在java文件夹下的位置完全一致 (com/itheima/dao/...)

   ```xml
   <!--约束-->
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE mapper
   	PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
   	"http://mybatis.org/dtd/mybatis-3-mapper.dtd">
   
   <mapper namespace="IUserDao的全类名">
   	<!--配置findAll方法, id要和方法名一致-->
       <!--resultType设置要把结果集封装到哪个实体类对象中-->
       <select id="findAll" resultType="com.itheima.domain.User">
       	select * from user
       </select>
   </mapper>
   ```
   
   > 在mybatis中IUserDao.java和IUserDao.xml被称为mapper, 所以有的项目中将IUserDao.java称之为IUserMapper.java
   
   
#### 搭建环境(注解)

1. 将主配置文件 `SqlMapConfig.xml` 中的mapper标签修改为配置带注解的类名

```xml
<mappers>
   	<mapper class="com.itheima.dao.IUserDao"></mapper>
</mappers>
```

2. 在dao层接口的方法上加注解

```java
@Select("select * from user")
List<User> findAll();
```



#### 测试环境 (xml 和 注解 都适用)

1. 在test下新建测试类

   ```java
   public static void main() throws Exception{
       //读取配置文件
       //实际开发中的两种方式:
       //1. 使用类加载器, 但是它只能读取类路径的配置文件
       //2. 使用ServletContext对象的getRealPath(),获取项目的所在路径
       InputStream in = Resources.getResourceAsStream("SqlMapConfig.xml"); 
       //创建SqlSessionFactory对象
       //这里使用了构建者模式,将参数传给构建者, 由构建者创建, 把对象的创建细节屏蔽
       SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
       SqlSessionFactory factory = builder.build(in);
       //使用工厂对象生成SqlSession对象
       //降低类之间的依赖, 解耦
       SqlSession session = factory.openSession();
       //代理模式, 使用SqlSession创建dao接口的代理对象
       IUserDao userDao = session.getMapper(IUserDao.class);
       //使用代理对象执行方法
       List<User> users = userDao.findAll();
       //释放资源
       session.close();
       in.close();
   }
   ```




#### CRUD操作

* **insert**

  1. 在接口中添加插入方法

     ```java
     public interface IUserDao{
     	void save(User user);
     }    
     ```

  2. 在该接口对应的配置文件的mapper标签下 添加方法标签

     ```xml
     <!--
     id 为对应的方法名
      使用 parameterType 设置传入参数对应的类性,如果是一个实体类, 那么在sql中的参数就会从这个实体类中的属性中匹配, 使用#{}
     -->
     <insert id="save" parameterType="com.itheima.domain.User">
     	insert into user (username, address, sex, birthday)values(#{username},#{address}, #{sex},#{birthday})
     </insert>
     ```

  3. 测试的时候使用 `sqlSession` 对象的  `commit()`  方法来提交事务, 日期类型 使用 `user.setBirthday(new Date());`

* **updata**

  1. 操作同上, 使用 updata 标签

* **delete**

  1. 添加接口方法

     ```java
     void delete(int userID);
     ```

  2. 添加对应的配置

     ```xml
     <delete id="delete" parameterType="int">
         <!--如果只有一个参数, 而且不是实体类型, 那么这个#{}中的名字随便写-->
     	delete from user where id=#{uid}
     </delete>
     ```

* **模糊查询**

  1. 配置sql语句不写%时, 传参要写% ( #{}的方式生成sql时使用的是预处理占位符的方式, 推荐 )

     ```xml
     select * from user where username like #{name}
     ```

     ```java
     //这个是测试方法
     List<User> users = UserDao.findByName("%王%");
     ```

  2. 或者在sql语句中写% ( 这种方式生成sql时使用的是直接字符串拼接, 不推荐 )

     ```xml
     <!--这里的${}中必须写value-->
     select * from user where username like '%${value}%'
     ```

  

* **聚合函数**

  1. xml

     ```xml
     <select id="getTotal" resultType="int">
     	select count(id) from user
     </select>
     ```

  2. java

     ```java
     int getTotal();
     ```

     

> 数据库支持 `select last_insert_id();` 来获取刚插入的数据的id
>
> 使用方法: ( 要insert和select两句同时执行 )
>
> ```mysql
> insert into user(username, address, sex, birthday)values("test","bj","男","2018-01-01");
> select last_insert_id();
> ```
>
> 返回 :
>
> |last_insert_id|
>
> |				   51|



* **获取插入数据的id**

  1. 在配置中添加返回属性的标签

     ```xml
     <insert id="save" parameterType="com.itheima.domain.User">
     	<!--配置插入操作后返回新数据的id, 新id会被封装到插入操作使用的实体类对象中-->
         <!--
     	keyProperty 返回值设置到插入对象的哪个属性中
     	keyColumn  返回值在表中的列名
     	resultType  返回值的类型
     	order  这个语句相对原语句的执行位置, after表示在insert之后执行
     	-->
         <selectKey keyProperty="id" keyColumn="id" resultType="int" order="AFTER">
             select last_insert_id();
         </selectKey>
         insert into user(username, address, sex, birthday) values(#{username},#{address},#{sex},#{birthday});
     </insert>
     ```

  2. 测试

     ```java
     //新建对象
     User user = new User;
     //设置user属性来做插入...
     
     //执行带返回新id的插入操作
     userDao.save(user);
     
     //测试原实体类对象中被封装的id
     sout(user.getId());
     ```

     

#### 参数深入

> OGNl表达式 #{}: apache家的. 对象图导航语言. 通过对象的get方法来获取属性值, 在写法上省略get. 所以写为 #{username}.

* 在mybatis的ognl表达式中可以使用 属性的属性, 例如 `user.username` , 其中user是parameterType参数中提供类型的属性

> mysql在windows下对字段不区分大小写, 在linux下区分大小写

* 设置resultType为实体类型时, 默认按照每条记录中每个字段的名字从实体类中的属性去匹配赋值



#### resultMap

>    使用resultMap设置数据库查询结果列名和实体类中属性的对应关系

1. 在  `mapper`  标签下使用  `resultMap`  标签定义一个对应关系
```xml
<!-- id为这个对应关系的唯一标识, 随意写 -->
<!-- type为使用哪个实体类来接收结果 -->
<resultMap id="userMap" type="com.itheima.domain.User">
	<!-- property为实体类中的属性名, column为查询结果中的列名 -->

	<!-- 设置主键字段的对应关系 -->
	<id property="userId" column="id"></id>
	<!-- 设置非主键的对应关系 -->
	<result property="userName" column="username"></result>
	<result property="userAddress" column="address"></result>
	<result property="userSex" column="sex"></result>
	<result property="userBirthday" column="birthday"></result>
</resultMap>
```
2. 在方法的配置中使用定义的resultMap
```xml
<!-- resultMap指定使用对应关系的id -->
<select id="findAll" resultMap="userMap">
	select * from user;
</select>
```



#### 配置文件中的公用属性

1. 在configuration标签下, 使用properties标签定义公用属性

   ```xml
   <configuration>
   	<!--定义属性-->
       <properties>
           <!--name是唯一标识-->
       	<property name="driver" value="com.mysql.jdbc.Driver"></property>
       </properties>
       
       <!--其他地方使用公用的属性-->
       <!--使用${}根据属性的name来引用-->
       <property name="driver" value="${driver}"></property>
       
   </configuration>
   ```



#### 从外部文件引入公共属性

1. 在resources下新建属性配置文件 jdbcConfig.properties

2. 在配置文件中进行引入

   ```xml
   <!--引入外部属性配置文件, 默认为类路径下(resources下)-->
   <properties resource="jdbcConfig.properties"></properties>
   ```



> URL: uniform resource locator 统一资源定位符 ( 协议-主机-端口-URI ), 在整个网络中的唯一定位
>
> URI: uniform resource identifier 统一资源标识符 ( url中端口号之后的内容 ), 在应用中的唯一定位



#### 给实体类型起别名

1. 在主配置文件中配置别名

   ```xml
   <configuration >
   	<!--配置别名可全局使用-->
       <typeAliases>
           <!--别名为user, 别名的使用不区分大小写(User, uSeR, useR都可以)-->
       	<typeAlias type="com.itheima.domain.User" alias="user"></typeAlias>
           
           <!--或者配置一个包, 该包下的所有类都会自动起别名, 别名就是类名, 而且不区分大小写-->
           <package name="com.itheima.domain"></package>
       </typeAliases>
   </configuration>
   ```

2. 在其他地方使用别名 ( 别名不区分大小写 )







#### myBatis的连接池配置

>   连接池: 
>
>   *   存储连接对象的集合, 线程安全的, 不能让两个线程拿到同一个连接
>
>   *   数据结构为队列, 先进先出

*   在主配置文件的dataSource标签下配置, type属性设置使用哪种连接池的方式

* type的取值: 
  * **POOLED** : 实现了传统的javax.sql.DataSource的规范, 而生成的连接池	
  * **UNPOOLED** : 采用传统的连接获取方式,但是没有使用连接池, 连接随用随生成
  * JNDI: 采用服务器提供的JNDI技术实现连接的获取, 不同服务器拿到的dataSource对象不同, tomcat服务器采用的连接池是dbcp连接池, 该方式只能在web项目或者maven的war工程下使用



#### myBatis的事务操作

* 默认自动提交关闭, 使用SQLSession对象的commit和rollback方法来提交和回滚
* 在openSession时传入参数true可设置为自动提交开启, 此时每完成一步修改都会提交 ( 实际应用中不使用 )



#### 一对一的表关联查询

>   使用复合对象实现一对一的表关联查询并且将数据封装

1. account表和user表是多对一 ( 一个user可以有多个account账户信息 ), 需要在查询account时将对应 的user信息查询并封装

2. 在account的实体类中添加user属性, 设置get和set方法, 用于存储该account对应的user信息

3. 在配置文件中使用多表查询, 并且配置封装规则 resultMap

   ```xml
   <resultMap id="accountUserMap" type="account">
       <id property="id" column="aid"></id>
       <result property="xxx" column="xxx"></result>
       <result property="xxx" column="xxx"></result>
       <!--封装account中的user属性的信息-->
       <!--javaType指定这个属性用的是哪个java对象-->
       <association property="user" column="uid" javaType="com.itheima.domain.user">
           <id property="id" column="id"></id>
           <result property="xxx" column="xxx"></result>
           <result property="xxx" column="xxx"></result>
       </association>
   </resultMap>
   
   <!--使用多表查询, 指定封装数据方法为以上-->
   <select id="findAllAccount" resultMap="accountUserMap">
   	select a.*, u.username, u.address from account a, user u where u.id=a.uid;
   </select>
   ```




#### 一对多的表关联查询

>   使用复合对象实现一对多的查询并将数据封装

1. user表和account表是一对多的关系, 一个user可以有多个account, 需要在查询user的同时将该user所属account全部查出来

2. 在user的实体类中添加List< account >  accounts的属性并添加get和set方法

3. 修改sql语句并且修改自定义封装的方法

   ```xml
   <resultMap id="userAccountMap" type="user">
   	<id property="id" column="id"></id>
       <result property="xxx" column="xxx"></result>
       <result property="xxx" column="xxx"></result>
       <result property="xxx" column="xxx"></result>
       <!--配置封装user对象中的account集合的方法-->
       <!--property指定将这个集合封装到user对象中的哪个属性中-->
       <!--ofType 指定这个集合中每一个元素是什么类型的-->
       <collection property="accounts" ofType="com.itheima.domain.account">
           <id property="id" column="aid"></id>
           <result property="xxx" column="xxx"></result>
           <result property="xxx" column="xxx"></result>
       </collection>
   </resultMap>
   
   <!--使用连接查询-->
   <!--左外连接, 保留所有左边表的数据-->
   <select id="findAll" resultMap="userAccountMap">
       select * from user u left outer join account a on u.id=a.uid;
   </select>
   ```





#### 多对多的表关联查询

>   使用多表连接查询实现多对多的数据封装 ( 要点在于查询中使用中间表的两个左外连接 )

1. user表和role表是多对多的关系, 使用中间表 user_role{ uid,rid} 来表示其关系

2. 在role表中添加user类型的list集合属性

3. 配置查询语句和封装结果的方法

   ```xml
   <resultMap id="roleMap" type="role">
   	<id property="roleId" column="rid"></id>
       <result property="xxx" column="xxx"></result>
       <result property="xxx" column="xxx"></result>
       <result property="xxx" column="xxx"></result>
       <!--配置封装role对象中的user集合的方法-->
       <!--property指定将这个集合封装到user对象中的哪个属性中-->
       <!--ofType 指定这个集合中每一个元素是什么类型的-->
       <collection property="users" ofType="com.itheima.domain.user">
           <id property="id" column="id"></id>
           <result property="xxx" column="xxx"></result>
           <result property="xxx" column="xxx"></result>
       </collection>
   </resultMap>
   
   <!--配置根据中间表的多表查询-->
   <select id="findAll" resultMap="roleMap">
   	select u.*, r.id as rid, r.role_name, r.role_desc from role r 
       	left outer join user_role ur on r.id=ur.rid
       	left outer join user u on u.i=ur.uid;
   </select>
   ```

4. 对用户的查询操作同上, 只是sql语句的左外连接方向不同



### mybatis的延迟查询

* 对于两张表的关系, 可以分为两种: 
  * 一对多 , 一个用户对应多个账户
  * 一对一, 一个账户只属于一个用户

#### 延迟查询一对一的相关数据

>   配置一对一的情况下延迟加载 ***用户***  的信息 
>
>   ( 查询所有账户信息, 在调用其所属用户信息时再查询用户信息 )

1. 修改account的resultMap规则中的association配置, 同时将查询account的sql语句设置为只对account表进行查询的sql

   ```xml
   <!--自定义对account的封装方法-->
   <resultMap id="accountMap" type="com.itheima.domain.account">
       <id property="xxx" column="xxx"></id>
       <result property="xxx" column="xxx"></result>
       <result property="xxx" column="xxx"></result>
       <!--配置account中的user属性为延迟加载-->
       <!--property属性设置的 是将数据封装到account对象的哪个属性中-->
       <!--这里设置的column为 使用id查询用户 中传入的id参数, 这个uid是查询account表查出来的字段值-->
       <!--javaType设置该属性对应的是哪个java类-->
       <!--select设置使用哪个方法对user属性进行懒加载查询, 这个方法来自userdao的配置文件, 值为userDao的配置文件中的mappers标签的namespace属性加方法名-->
       <association property="user" column="uid" javaType="com.itheima.domain.user" select="com.itheima.dao.IUserDao.findById"></association>
   </resultMap>
   
   <!--将查询account的sql改为只查account表-->
   <select id="findAll" resultMap="accountMap">
   	select * from account
   </select>
   ```

2. 在mybatis主配置文件开启懒加载模式

   ```xml
   <configuration>
       
       <!--全局配置-->
   	<settings>
       	<!--开启懒加载-->
           <setting name="lasyLoadingEnabled" value="true"></setting>
           <!--设置为不直接加载对象的所有属性值-->
           <setting name="aggressiveLasyLoading" value="false"></setting>
       </settings>
   </configuration>
   ```

3. 此时只有在调用account中的user属性时, 才会进行查询

4. 在一对多的延迟加载中 ( 对user的查询中延迟加载所属account的内容 ), 配置collection的select属性来实现

   ```xml
   <!--account的mapper文件-->
   
   <!--配置自定义封装user对象的方法-->
   <resultMap id="userMap" type="com.itheima.domain.user">
       <id property="xxx" column="xxx"></id>
       <result property="xxx" column="xxx"></result>
       <result property="xxx" column="xxx"></result>
       <!--配置user对象中的account集合为延迟加载-->
       <!--property设置将集合数据封装到哪个属性中-->
       <!--ofType设置集合中每一项的类型-->
       <!--column 设置按照id进行查询的入参id, 这里使用的是对user的查询返回的id字段的值-->
       <!--select设置延迟加载使用哪个方法进行查询-->
       <collection property="accounts" ofType="com.itheima.domain.account" column="id" select="com.itheima.dao.IAccountDao.findAccountById"></collection>
   </resultMap>
   ```

   

### mybatis内存缓存

* 适用于经常查询且不经常修改而且数据的正确性对结结果的影响不大的数据

* mybatis一级缓存 ( 默认开启 )

  * 在对数据进行查询后, 会将结果存到sqlSession对象中, 当再次进行查询时 , 会先从sqlSession中进行查询, 如果有则返回, 没有则去数据库查询.
  * 当sqlSession对象被销毁时, 一级缓存就会消失
  * sqlSession对一级缓存的存放方式是map类型

  * 使用 `sqlSession.close() 关闭session`  和  `sqlSession.clearCache() 清空缓存`  和 `修改, 添加, 删除 , 提交commit()` 时, 缓存会被清空
  * 一级缓存存放的是地址, 所以两次重复的查询会返回同一个对象

* mybatis二级缓存 ( 默认关闭 )

  * 该缓存存在于SqlSessionFactory对象中, 该工厂对象创建的sqlSession对象共享这个缓存

  * 二级缓存中存的是数据, 所以不同的sqlSession查询获取到的是不同的对象

  * 使用步骤:

    1. 在主配置文件中开启二级缓存

       ```xml
       <configuration>
           <!--设置二级缓存开启-->
       	<settings>
           	<setting name="cacheEnabled" value="true"></setting>
           </settings>
       </configuration>
       ```

    2. 在接口对应配置文件中开启二级缓存

    3. 在接口对应配置文件的select标签中开启二级缓存

       ```xml
       <!--这是userdao接口的配置文件-->
       <mapper namespace="com.itheima.dao.IUserDao">
       	<!--开启二级缓存-->
           <cache/>
           
           <!--开启查询方法使用二级缓存-->
           <select id="findById" parmeterType="int" resultType="user" 		     userCache="true">
           	<!--sql语句...-->
           </select>
       </mapper>
       ```

    4. 在测试类中使用同一个sqlSessionFactory对象先后创建两个sqlSession对象对同一条数据进行查询, 查看控制台日志会发现只发起了一次查询





### mybatis 注解

1. 创建普通的maven工程

2. 导入依赖包

   * mybatis
   * mysql-connector-java
   * log4j
   * junit

3. 创建实体类 User

4. 创建dao层的接口 IUserDao

5. 创建主配置文件 在 resources 下

   ```xml
   <configuration>
   	<!--引入外部配置文件, 创建连接池的参数-->
       <properties resource="jdbcConfig.properties"></properties>
       <!--配置别名-->
       <typeAliases>
       	<package name="com.itheima.domain"></package>
       </typeAliases>
       
       <!--配置连接池-->
       <environments default="mysql">
           <environment id="mysql">
           	<transactionManager type="JDBC"></transactionManager>
               <dataSource type="POOLED">
               	<property name="driver" value="${jdbc.driver}"></property>
                   <property name="url" value="${jdbc.url}"></property>
                   <property name="username" value="${jdbc.username}"></property>
                   <property name="password" value="${jdbc.password}"></property>
               </dataSource>
           </environment>
       </environments>
       
       <!--指定配置了注解 的dao接口的所在位置-->
       <mappers>
       	<package name="com.itheima.dao"></package>
       </mappers>
   </configuration>
   ```

6. 创建jdbcConfig.properties用于创建连接池的参数的配置文件, 在 resources 下

7. 在dao层接口的方法上使用注解

   ```java
   public interface IUserDao{
   
   	//查询所有用户
       @Select("select * from user")
   	List<User> findAll();
       
       //添加用户
       @Insert("insert into uer (username, address, sex, birthday) values(#{username}, #{address}, #{sex}, #{birthday})")
       void addUser(User user);
   }
   ```

8. 使用sqlSessionFactory的方法测试



> 如果在resource路径下同dao层接口路径存在xml配置文件 , 同时在dao层接口的方法上使用了注解 , 运行时就会报错, dao层接口的xml和注解不能同时存在



#### 使用注解定义resultMap

1. 在接口类的方法上使用  `@Results` 

   ```java
   //使用results注解自定义封装方法
   //results中的id属性设置该封装方法的id
   //result中的id设置是否为主键, 默认不是主键
   //property设置封装到实体类的哪个属性中
   //column设置值从哪个字段来
   @Select("sql...")
   @Results(id="userMap",
            value={
       @Result(id=true, property="useId", column="id"),
       @Result(property="userName", column="username"),
       @Result(property="userAddress", column="address"),
       @Result(property="userSex", column="Sex"),
       @Result(property="userBirthday", column="birthday"),
   })
   List<User> findAll();
   
   //使用resultMap引用已经定义好的封装方法, 这里使用上面那个
   @Select("sql...")
   @ResultMap(value={"userMap"})  //可以简化写成 @ResultMap("userMap")
   User findById(int id);
   ```



#### 注解一对一关联查询-立即查询

>   使用注解实现多对一的关联查询且立即加载 ( 在查询账户的同时将所属用户查询出来 )

1. 使用Results->Result->One->select&fetchType 注解

   ```java
   //使用one属性实现多对一的关联查询
   //select写的是关联查询的实现方法, 来自另外一个dao层接口的方法
   //fetchType指定是否懒加载, FetchType.LASY为懒加载, FetchType.EAGER为立即加载
   //关联查询的封装中, column指定使用第一次查询返回的哪个字段作为关联查询的参数
   @Select("select * from account")
   @Results(id="accountMap",
           value={
               @Result(id=true, property="id", column="id"),
               @Result(property="money", column="money"),
               @Result(property="uid", column="uid"),
               @Result(property="user", column="uid", one=@One(select="com.itheima.dao.IUserDao.findById", fetchType=FetchType.EAGER)),
           })
   List<Account> findAll();
   ```

   

#### 注解一对多查询-懒加载

>   使用注解实现多对多的关联查询且不立即加载 
>
>   ( 在查询user的同时, 懒加载该user名下的account ) 

1. 使用Results->Result->Many->select&fetchType 注解

   ```java
   //使用many属性实现多对多的关联查询
   //select写的是关联查询的实现方法, 来自另外一个dao层接口的方法
   //fetchType指定是否懒加载, FetchType.LASY为懒加载, FetchType.EAGER为立即加载
   //关联查询的封装中, column指定使用第一次查询返回的哪个字段作为关联查询的参数
   @Select("select * from user")
   @Results(id="userMap",
           value={
               @Result(id=true, property="id", column="id"),
               @Result(property="xxx", column="xxx"),
               @Result(property="xxx", column="xxx"),
               @Result(property="accounts", 
                       column="id",
                       many=@Many(select="com.itheima.dao.IAccountDao.findById",
                                  fetchType=FetchType.LASY)),
           })
   List<User> findAll();
   ```

   

#### 使用注解开启二级缓存

1. 在主配置文件中开启二级缓存

   ```xml
   <configuration>
       <settings>
       	<!--开启二级缓存-->
           <setting name="cacheEnabled" value="true"></setting>
       </settings>
   </configuration>
   ```

2. 在dao层接口接口上 使用  `@CacheNamespace`

   ```java
   //设置 对该接口中方法的调用使用二级缓存
   @CacheNamespace(blocking = true)
   public interface IUserDao{
       ...
   }
   ```





### 简化工作

###### Lombok

>   使用Lombok提供的注解, 不再需要手动给实体类定义各种setter和getter以及其他构造方法之类的
>
>   它会在编译的时候自动生成以上方法

1.  引入

    ```xml
    <!-- https://mvnrepository.com/artifact/org.projectlombok/lombok -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.18.12</version>
        <scope>provided</scope>
    </dependency>
    ```

2.  在实体类上使用

    ```java
    import lombok.Data;
    
    //Data注解在编译时帮你生成各种方法
    public @Data class User {
        int id;
        String name;
        int age;
        Date birthday;
    }
    ```

3.  像往常一样使用实体类
