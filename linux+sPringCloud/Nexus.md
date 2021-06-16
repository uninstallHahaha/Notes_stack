

### Nexus

* 依赖管理平台, 基于maven的私有的依赖管理平台
* mvnRepository 是maven的官方的依赖管理平台
* 阿里云提供的maven仓库就是使用nexus2.0构建的
* 这里我们使用nexus3.0, 这个版本耗用内存较大,建议虚拟机分配2G内存

#### nexus安装

1. `docker pull sonatype/nexus3` 拉取镜像

2. 因为对数据卷需要所有权限, 所以事先创建 data目录并 `chmod 777 data` 赋全权

3. 新建并编辑 `/usr/local/docker/nexus/docker-compose.yml`

   ```yaml
   version: '3.1'
   services:
     nexus:
       restart: always
       image: sonatype/nexus3
       container_name: nexus
       ports:
         - 8081:8081
       volumes:
         - /usr/local/docker/nexus/data:/nexus-data
   ```

4. `docker-compose up` 启动容器

5. 通过浏览器访问开启nexus服务机器的8081端口测试





> ### 注意: 在服务器中设置 restart: always( 开机自启 ) 的服务要考虑机器的内存大小, 如果开机自启的服务占用的内存大于内存大小, 那么将会 *无法开机* , 尤其是在使用 *云服务器* 的时候, 因为云服务器 *无交换空间* , 所以如果不恰当的设置了开机自启, 那么将永远不能开机
>
> 可以使用htop( linux上的任务管理器 ) 来查看硬件资源使用情况, `apt-get install htop`



#### nexus使用

1. 在nexus网页上使用 admin & admin123 登录

2. 可以在设置->users下修改密码

3. 修改maven的安装目录下 `/apache-maven-3.5.2/conf/settings.xml`

   ```xml
   <!--在servers节点下添加nexus节点-->
   <servers>
       <!--使用nexus发行版的仓库-->
   	<server>
           <id>nexus-releases</id>
           <!--使用这个账号密码来登录nexus服务器-->
           <username>admin</username>
           <password>admin123</password>
       </server>
       <!--使用nexus快照版的仓库-->
       <server>
           <id>nexus-snapshots</id>
           <username>admin</username>
           <password>admin123</password>
       </server>
   </servers>
   ```

4. 在maven项目的pom文件中添加使用nexus服务节点的配置

   ```xml
   <!--放到根节点下, 这个配置是设置可以上传项目到nexus服务-->
   <distributionManagement>
   	<repository>
           <!--这个id必须和maven中配置的sever的id一致,表示使用对应的server-->
       	<id>nexus-releases</id>
           <name>Nexus Release Repository</name>
           <!--对应仓库的地址,就是安装nexus服务的地址,这个地址可以从nexus网页中获取-->
           <url>http://192.168.75.129:8081/repository/maven-releases/</url>
       </repository>
       <snapshotRepository>
       	<id>nexus-snapshots</id>
           <name>Nexus Snapshot Repository</name>
           <url>http://192.168.75.129:8081/repository/maven-snapshots/</url>
       </snapshotRepository>
   </distributionManagement>
   ```

5. 在项目的cmd中使用 `mvn deploy [-Dmaven.test.skip=true]` 将本项目[ 跳过测试 ]推送到nexus仓库

6. 在nexus的网站中仓库的 ***Browse*** 中查看上传的项目

   ##### ----上传第三方的jar包到nexus仓库 

7. ```powershell
   mvn deploy:deploy-file 				# !!!这些命令要在一行内写, 不能换行
     -DgroupId=com.google.code.kaptcha  #设置组id
     -DartifactId=kaptcha				#设置项目id
     -Dversion=2.3						#设置版本
     -Dpackaging=jar					#设置打包方式
     -Dfile=D:\kaptcha-2.3.jar			#设置依赖包所在位置
     -Durl=http:/192.168.75.129:8081/repository/maven-releases/ #设置将依赖包上传到服务器的哪个库中, 可以在nexus中新建一个库专门放第三方的jar包, 这里放到发行库中
     -DrepositoryId=nexus-releases		#设置使用maven中配置的哪个服务来连接nexus(其实是在使用配置中的服务的账号和密码)
   ```

8. 在nexus的网站中仓库的 ***Browse*** 中查看上传的jar包

   ##### ----设置nexus服务器为代理仓库 ( 也就是下载依赖的时候先去这个仓库下载, 没有的话再去官网下载, 然后先将依赖从官网下载到这个服务器, 然后再从这个项目中下载 )

9. 在项目的pom的根节点下添加配置

   ```xml
   <!--设置依赖包的代理仓库-->
   <repositories>
   	<repository>
       	<id>nexus</id>
           <name>Nexus Repository</name>
           <!--设置nexus仓库的地址, 这里使用的是public仓库-->
           <url>http://127.0.0.1:8081/repository/maven-public/</url>
           <snapshots>
               <!--是否使用快照版-->
           	<enabled>true</enabled>
           </snapshots>
           <releases>
               <!--是否使用发行版-->
           	<enabled>true</enabled>
           </releases>
       </repository>
   </repositories>
   <!--设置插件依赖的代理仓库,我们将插件也放到nexus中管理, 所以这里也设置为nexus服务器-->
   <PluginRepositories>
   	<pluginRepository>
       	<id>nexus</id>
           <name>Nexus Repository</name>
           <!--设置nexus仓库的地址, 这里使用的是public仓库-->
           <url>http://127.0.0.1:8081/repository/maven-public/</url>
           <snapshots>
               <!--是否使用快照版-->
           	<enabled>true</enabled>
           </snapshots>
           <releases>
               <!--是否使用发行版-->
           	<enabled>true</enabled>
           </releases>
       </pluginRepository>
   </PluginRepositories>
   ```

   

10. 此时使用 `mvn package` 对项目进行构建的时候就会先经过nexus私服下载



> idea中使用maven需要先在settings->maven下配置maven配置文件和本地仓库位置, 勾选 always update snapshots 后将会保持使用仓库中最新的快照版本



* gitlab和nexus本质上都是代码托管, 区别在于gitlab是将源码开源, 而nexus只提供对外依赖包, 而不提供源码
* nexus私服的优势在于可以 ***维护官方仓库中没有的依赖包*** , 可以极大地 ***提高依赖下载速度*** , 可以 ***闭源管理*** 公司内部自己开发的依赖包
* 对于nexus中的releases版(发行版)  和  snapshots(快照版) , 区别在于发行版一旦发行(确定版本号), 该版本就不能再修改只能发行新版本, 而快照版可以在一个版本上多次修改