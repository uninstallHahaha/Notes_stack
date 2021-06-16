# springCloud实践





## 创建项目

1. 在gitlab上创建群组 ( 该群组为整个架构 ), 然后在群组中依次创建项目 ( 微服务 )

2. 在群组中创建 dependency( 统一依赖 ), eureka( 服务注册与发现 ), zuul( 网关 ), spring cloud config( 配置中心 ), zipkin( 服务链路追踪 ) , spring cloud admin( 服务状态监控 )

3. 在本地将这些项目拉取下来, 并创建各个项目的基本结构, 然后推送到gitlab上

4. 将这些架构基本服务部署到服务器上( 部署到服务器的docker上 , 因为硬件条件限制, 所以这里将所有服务都部署到一台虚拟机上的docker中 )

   #### 配置统一依赖服务

   1. 先将统一依赖服务项目和config项目上传到maven私服上
   2. 将其他使用该统一依赖服务的项目的pom配置中添加maven私服地址以成功依赖maven私服上的统一依赖项目

   #### 部署spring cloud config服务

   1. 将项目提交到gitlab

   2. 在虚拟机上将spring cloud config服务项目拉取到本地 , 使用 maven clean package 打包成jar

   3. 编辑dockerfile创建镜像 , 使用config服务在基于jdk的docker镜像上创建自定义的镜像并启动服务 , 这里使用jar包来启动 , 所以只需要基于jdk的docker镜像即可

      ```dockerfile
      #基于jdk
      FROM openjdk:8-jre
      
      #在根目录下创建app文件夹
      RUN mkdir /app
      
      #复制jar文件到app目录下
      COPY itoken-config-1.0.0-SNAPSHOT.jar /app/
      
      #运行jar文件
      CMD java -jar /app/itoken-config-1.0.0-SNAPSHOT.jar --spring.profiles.active=prod
      
      #暴露8888端口
      EXPOSE 8888
      ```

   4. 运行该自定义镜像 , 开启config服务

   5. 在浏览器访问测试config是否正常运行

   #### 配置eureka服务 ( 这里配置三台作为集群 )

   1. 集群端口的设置应当有一个区间以便以后做扩展, 比如 8761, 8861, 8961, 这三个端口之间的范围为预留扩展范围

   2. 因为配置config服务器的地址只能在名为boostrap.yml的文件中配置, 而此时config服务器地址不在本地, config服务器地址默认为本地, 所以要修改这个地址, 就得把配置文件的名字改为boostrap.yml , 以下所有使用到config服务的服务都要这样改

   3. 将项目提交到gitlab

   4. 在虚拟机上将项目拉取到本地, 然后使用 maven clean package 打包成jar

   5. 创建dockerfile来构建自定义镜像, dockerfile内容基本同上

   6. 使用docker-compose来启动eureka集群

      ```yml
      #docker-compose启动配置
      
      version: '3.1'
      services: 
        itoken-eureka-1:
          restart: always
          image: 192.168.75.131:5000/itoken-eureka
          container_name: itoken-eureka-1
          ports: #使用宿主机不同端口来启动eureka
           - 8761:8761
           
        itoken-eureka-2:
          restart: always
          image: 192.168.75.131:5000/itoken-eureka
          container_name: itoken-eureka-2
          ports:
           - 8861:8761
           
        itoken-eureka-3:
          restart: always
          image: 192.168.75.131:5000/itoken-eureka
          container_name: itoken-eureka-3
          ports:
           - 8961:8761
      ```



## 持续集成与持续部署

以上为手动集成与部署

**持续集成与持续部署** 指每一次代码提交都伴随一次自动将代码配置完成依赖至能运行的状态( 持续集成 ) , 并自动测试 , 如果测试通过 , 则自动部署到类生产环境, 然后自动部署到生产环境( 持续部署 ) .



### 使用gitlab进行持续集成

- giblab自带持续集成功能
- 每次提交代码都会构建一次 pipeline ( 管道 ) 操作, 其中包含多个 stage ( 阶段,例如安装依赖, 清理,打包 ),  阶段其中又包含多个 jobs( 任务 )
- 使用gitlab runner来执行 pipeline 操作, 这个runner服务应当运行在gitlab之外的另外一台机器上, 否则这些pipeline的操作过程会影响gitlab服务性能

* 这里使用docker中的gitlab-runner镜像来开启一个gitlab-runner, 其中要自己定义一个镜像, 继承于 gitlab-runner, 并且包含 java和maven的环境以便于实现java程序的持续部署



1. 在要开启 gitlab-runner 的机器上 , 在 `/usr/local/docker/runner/environment` 目录下创建 `Dockerfile` , 用于构建基于 gitlab-runner 的, 且适应 java 程序集成的 docker镜像 

   ```dockerfile
   #继承于gitlab-runner
   FROM gitlab/gitlab-runner:v11.0.2
   
   # 修改软件源
   RUN echo 'deb http://mirrors.aliyun.com/ubuntu/ xenial main restricted universe multiverse' > /etc/apt/sources.list && \
       echo 'deb http://mirrors.aliyun.com/ubuntu/ xenial-security main restricted universe multiverse' >> /etc/apt/sources.list && \
       echo 'deb http://mirrors.aliyun.com/ubuntu/ xenial-updates main restricted universe multiverse' >> /etc/apt/sources.list && \
       echo 'deb http://mirrors.aliyun.com/ubuntu/ xenial-backports main restricted universe multiverse' >> /etc/apt/sources.list && \
       apt-get update -y && \
       apt-get clean
   
   # 安装 Docker
   RUN apt-get -y install apt-transport-https ca-certificates curl software-properties-common && \
       curl -fsSL http://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | apt-key add - && \
       add-apt-repository "deb [arch=amd64] http://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable" && \
       apt-get update -y && \
       apt-get install -y docker-ce
   #复制上下文中的daemon.json文件到docker容器中作为容器中docker的配置文件
   COPY daemon.json /etc/docker/daemon.json
   
   # 安装 Docker Compose
   WORKDIR /usr/local/bin
   RUN wget https://raw.githubusercontent.com/topsale/resources/master/docker/docker-compose
   RUN chmod +x docker-compose
   
   # 安装 Java
   RUN mkdir -p /usr/local/java
   WORKDIR /usr/local/java
   # 复制上下文中的jdk压缩包到镜像中
   COPY jdk-8u152-linux-x64.tar.gz /usr/local/java
   RUN tar -zxvf jdk-8u152-linux-x64.tar.gz && \
       rm -fr jdk-8u152-linux-x64.tar.gz
   
   # 安装 Maven
   RUN mkdir -p /usr/local/maven
   WORKDIR /usr/local/maven
   # 从网上下载maven
   RUN wget https://raw.githubusercontent.com/topsale/resources/master/maven/apache-maven-3.5.3-bin.tar.gz
   # COPY apache-maven-3.5.3-bin.tar.gz /usr/local/maven
   RUN tar -zxvf apache-maven-3.5.3-bin.tar.gz && \
       rm -fr apache-maven-3.5.3-bin.tar.gz
   # COPY settings.xml /usr/local/maven/apache-maven-3.5.3/conf/settings.xml
   
   # 配置环境变量
   # 配置镜像中的java环境变量
   ENV JAVA_HOME /usr/local/java/jdk1.8.0_152
   ENV MAVEN_HOME /usr/local/maven/apache-maven-3.5.3
   ENV PATH $PATH:$JAVA_HOME/bin:$MAVEN_HOME/bin
   
   #切换工作目录至根目录
   WORKDIR /
   ```

2. 在 `/usr/local/docker/runner/environment` 目录下创建 `daemon.json`，用于配置加速器和仓库地址

   ```json
   {
     "registry-mirrors": [
       "https://registry.docker-cn.com"
     ],
     "insecure-registries": [
       //配置docker镜像仓库私服地址, json不支持注释, 要把这行删掉
       "192.168.75.131:5000"
     ]
   }
   ```

3. 在 `/usr/local/docker/runner` 目录下创建 `docker-compose.yml`

   ```yml
   #使用docker-compose来启动上面自定义的docker镜像
   #通过配置直接使用docker-compose来构建镜像并启动
   version: '3.1'
   services:
     gitlab-runner:
       #这里没有配置image, 通过配置build来使用本文件同级目录下的dockerfile来构建镜像并启动, 这里设置的是使用同级目录下的environment文件夹中的dockerfile
       build: environment
       restart: always
       container_name: gitlab-runner
       #设置使用root用户登录启动的容器
       privileged: true
       volumes:
         - /usr/local/docker/runner/config:/etc/gitlab-runner
         - /var/run/docker.sock:/var/run/docker.sock
   ```

4. 使用 `docker-compose up -d` 来启动镜像 , 此时已经启动一个 gitlab-runner

5. 在开启gitlab-runner的机器上 , 使用交互的方式进入刚才启动的 gitlab-runner 并在其中执行 `gitlab-runner register` , 这个gitlab-runner是命令, register 是参数 ( **设置这个runner跑哪个项目的pipeline任务,也就是持续集成任务** ) 

   ```shell
   docker exec -it gitlab-runner gitlab-runner register
   ```

6. 控制台会让你输入要注册项目的相关信息设置 , 在浏览器中打开某一个微服务的页面( 所有的微服务都要在runner中注册 ) , 点击左侧 **设置->CI/CD(持续集成/持续部署) -> 在右侧点击 Runners设置 的 展开** , 复制 setup a specific runner manually 下的 **URL和注册令牌** 到控制台中作为注册信息,  其中在控制台中设置项目的 description 和 tags 可以不设置 , 直接按 enter , 在设置 executor 时输入 shell , 设置完成则在控制台显示 runner registered successfully

7. 此时已经将runner注册到微服务项目 , 可以在gitlab中微服务项目的页面中 CI/CD 中查看已经注册的 runner , 这里点击该runner , 可能会返回500错误 , 这是gitlab的bug ( 也就是这个runner将会对这个项目持续集成和部署 ) , 接下来进行runner的配置, 也就是如何对项目进行集成和部署

8. 在微服务项目的根目录创建并编辑 `.gitlab-ci.yml` , 用于指定如何进行持续集成

   ```yml
   #一个这个文件就相当于一个 pipeline 
   #其中包含多个 stages
   #stages 其中又包含多个 jobs
   
   #设置要执行哪些阶段, 这里每个阶段的名字随便写
   stages:
     - test
   
   #设置执行清单
   #这个清单名随便写
   test: 
     #设置这段执行要执行哪个阶段, 这里的名字要和上面stages中的阶段名对应
     stage: test
     #设置这个阶段执行哪些任务, 这里是一个数组, 因为注册的时候选择的是shell执行器, 所以这里要写shell脚本
     script:
       #执行打印, 用来测试
       - echo "hello gitlab runner"
   ```

9. 将带有以上任务清单的项目提交到gitlab , **此时每次提交修改到gitlab, 都会自动执行任务清单中的流水线任务** ,  在浏览器刷新该项目, 点击左侧 **CI/CD -> 流水线** , 会出现流水线任务记录 , 点击进入查看详情 , 点击流水线作业下的任务 , 会显示任务清单中脚本执行的过程和结果   

10. 观察脚本执行过程 , 发现会先将最新版本的源码克隆到本地 , 这里的本地是指运行 gitlab-runner 的机器, 由于gitlab-runner 运行在docker中, 所以这里的本地就是容器内, 这里的克隆项目的地址是 `/home/gitlab-runner/builds/...`

11. 对gitlab自动克隆的源码进行打包部署 , 将这些操作的shell脚本加入到 `.gitlab-ci.yml` 中 , 来实现自动集成和部署 , 在编写此处的任务清单执行脚本列表时 , 应当每写一步shell , 就提交一次 , 然后到项目的CI/CD->流水线中查看shell执行结果 

    ```yml
    #这是自动集成和部署目标项目的.gitlab-ci.yml文件
    #定义阶段
    stages:
     - package
     
    #定义任务
    package:
     #定义package阶段的任务
     stage: package
     script:
     #对项目执行打包, 如果执行失败显示无mvn命令, 直接使用 /usr/local/maven/apache-maven-3.5.3/bin/maven clean package 来执行命令(直接使用二进制文件来执行)
     #这里打完的包文件会放到源码文件位置的target目录下, 也就是gitlab-runner自动克隆项目的目录下
      - mvn clean package
     
    ```

12. 在项目的根目录创建文件夹 `Docker` , 用于存放 `Dockerfile` 文件及其上下文 , 然后在 `.gitlab-ci.yml` 中配置使用这个 `Dockerfile` 进行镜像的构建并上传到私服 并把这个镜像跑起来 , 就实现了自动集成和部署 

    ```dockerfile
    #这是项目中Docker文件夹下的Dockerfile
    
    #基于jdk镜像, 用于运行jar文件
    FROM openjdk:8-jre
    
    #配置环境变量( 就是这个文件中的变量 )
    ENV APP_VERSION 1.0.0-SNAPSHOT
    
    #在容器中创建目录来放项目
    RUN mkdir /app
    
    #复制项目到容器中
    COPY itoken-config-$APP_VERSION.jar /app/app.jar
    
    #执行命令
    #参数: 命令(java命令), 参数(一个安全参数), 参数(-jar), 参数(运行的目标jar)
    #所以这个entrypoint就相当于执行了: 
    #java -Djava.security.egd=file:/dev/./urandom -jar /app/app.jar --spring.profiles.active=prod 这条命令, 在容器启动了java服务
    ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app/app.jar", "--spring.profiles.active=prod"]
    
    #设置使用的容器端口为8888
    EXPOSE 8888
    
    ```

    > 这是上面操作的dockerfile的模板

    ```dockerfile
    #这是项目中Docker文件夹下的Dockerfile
    
    #基于jdk镜像, 用于运行jar文件
    FROM openjdk:8-jre
    
    #配置环境变量( 就是这个文件中的变量 )
    ENV APP_VERSION 1.0.0-SNAPSHOT
    ENV DOCKERIZE_VERSION v0.6.1
    
    #下载一个dockerize, 这个软件实现了等待启动, 也就是在启动当前服务时, 如果依赖的服务没有启动, 那就等到依赖服务启动之后再启动该服务, 防止因为服务启动顺序而造成的服务报错且启动不起来
    RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz
    
    RUN mkdir /app
    
    COPY itoken-eureka-$APP_VERSION.jar /app/app.jar
    
    #运行dockerize实现等待启动, 这里设置的是等待5分钟
    ENTRYPOINT ["dockerize","-timeout","5m","-wait","http://192.168.75.128:8888","java","-Djava.security.egd=file:/dev/./urandom","-jar","/app/app.jar --spring.profiles.active=prod"]
    
    EXPOSE 8761
    ```

13. 编辑完上一步的dockerfile后, 需要补全项目中的 `.gitlab-ci.yml`  文件中的操作 , 即将打包后的jar复制到dockerfile的上下文路径中 ( 也就是项目根路径下的 `Docker` 文件夹 ) , 以及使用 dockerfile 构建镜像 并将镜像上传到私服

    ```yml
    #这是自动集成和部署目标项目的.gitlab-ci.yml文件
    #定义阶段
    stages:
     #打包阶段
     - package
     #构建阶段( 构建镜像 )
     #- build
     #推送镜像到私服
     - push
     #运行最新镜像
     - run
     #清理之前的虚悬镜像
     - clean
     
    #定义任务-打包以及将jar复制到dockerfile的上下文中 
    package:
     #定义package阶段的任务
     stage: package
     script:
     #对项目执行打包, 如果执行失败显示无mvn命令, 直接使用 /usr/local/maven/apache-maven-3.5.3/bin/maven clean package 来执行命令(直接使用二进制文件来执行)
     #这里打完的包文件会放到源码文件位置的target目录下, 也就是gitlab-runner自动克隆项目的目录下
      - mvn clean package
      - cp target/itoken-config-1.0.0-SNAPSHOT.jar Docker
      #切换到Docker文件夹下
      - cd Docker
      #构建镜像到私服(地址根据实际情况修改)
      - docker build -t 192.168.75.5000/itoken-config .
     
    #定义任务-构建 
    #build: 
     #stage: build
     #script: 
      #将target下生成的项目jar文件复制到项目根目录下的Docker文件夹(即dockerfile的上下文中)
      #!!!!!这里不能这样使用 , 因为ci每执行完一个阶段, 会将上一个阶段生成的target删除, 防止占用不必要的空间, 所以这里的cp操作应当在上一个stage中执行
      #- cp target/itoken-config-1.0.0-SNAPSHOT.jar Docker
      #这里发现阶段执行完毕后, 这个jar也会被自动删除, 所以构建镜像的操作也放到了上一个阶段
      #切换到Docker文件夹下
      #- cd Docker
      #构建镜像到私服(地址根据实际情况修改)
      #- docker build -t 192.168.75.5000/itoken-config .
      
    #推送镜像阶段
    push: 
      stage: push
      script:
      #将最新的镜像推送到私服, 然后在私服的前端管理页面中查看上面上传的最新镜像
       - docker push 192.168.75.131:5000/itoken-config
       
    #运行阶段 - 这里使用docker-compose运行, 要事先在项目的Docker文件夹中创建docker-compose.yml文件, 文件内容在下一步
    run: 
      stage: run
      script:
       - cd docker
       #先停止再启动
       - docker-compose down
       - docker-compose up -d
     
    #清理阶段
    clean:
      stage: clean
      script:
      #强制删除所有虚悬镜像(不需要交互)
       - docker rmi $(docker images -q -f dangling=true)
    ```

14. ```yml
    #这个是项目中Docker文件夹下的docker-compose.yml文件, 用于运行镜像
    version: '3.1'
    services: 
      itoken-config:
        restart: always
        image: 192.168.75.131:5000/itoken-config
        container_name: itoken-config
        ports: 
         - 8888:8888
    ```

15. 使用以上步骤部署 `eureka服务`等其他服务  , 注意第12步中应当使用 `dockerize` 实现等待启动 ( 在job中的直接从github上下载dockerize的操作可能会失败, 此时可以将该软件tar包下载到自己的服务器上, 然后指定下载地址为自己的服务器 )

16. 因为每次通过docker-compose启动的容器都会使用名字为 `docker_default` 的默认虚拟网卡 , 所以如果是***在同一台机器上启动多个服务***的话, 需要修改这个默认的虚拟网卡名字 , 修改 `docker-compose.yml` 来实现自定义的虚拟网卡名字

    ```yml
    version: '3.1'
    services: 
      itoken-eureka:
        #这个服务的相关配置...
        #自定义这个服务使用的虚拟网卡名字
        networks:
          - eureka_network
      
     #配置上面虚拟网卡名字到networks中使生效
     networks:
       eureka_network:
    ```

    

