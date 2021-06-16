



### registry

* docker镜像的私服
* 主要目的是  ***管理开发的项目的镜像*** , 实现一次编译, 到处运行

#### 安装

1. `docker pull registry` 拉取镜像, 其实不用自己下载, 在使用docker-compose时会自动下载

2. 新建并编辑 `/usr/local/docker/registry/docker-compose.yml`

   ```yaml
   version: '3.1'
   services: 
     registry:
       image: registry
       restart: always
       container_name: registry
       ports:
         - 5000:5000
       volumes:
         - /usr/local/docker/registry/data:/var/lib/registry
   ```

3. `docker-compose up -d` 启动容器

4. 在浏览器访问  `ip:5000/v2/`

5. 在docker的服务端配置中添加该镜像服务器  `/etc/docker/daemon.json` , 使用该镜像私服的客户端都应当这样配置

   ```json
   {
       //之前配置的镜像加速器...
       //配置镜像服务器地址
       "insecure-registries":[
           "<ip>:5000"
       ]
   }
   ```

6. 重启docker使得配置生效

   ```shell
   >systemctl daemon-reload
   >systemctl restart docker
   ```

7. 使用 `docker info` 检查是否配置成功

#### 使用

> 上传镜像到 registry服务器 ( 假设192.168.75.131为部署了registry的服务器 )

8. `docker pull tomcat` 拉取tomcat镜像, 

9. `docker tag tomcat 192.168.75.131:5000/tomcat[:8.5.32]`  

   绑定这个tomcat镜像为registry服务器上的镜像, 名为tomcat [, 且版本为8.5.32] 

10. `docker push 192.168.75.131:5000/tomcat` 将tomcat镜像推送到服务器

11. `docker pull <ip>:<port>/tomcat` 拉取registry服务器上的镜像( 这个命令完整的格式是需要加上镜像所在的ip和port, 如果不写就是官方默认的地址 )

12. 在浏览器访问 `ip:5000/v2/_catalog` 来查看服务器上的镜像目录

    或者访问 `ip:5000/v2/tomcat/tags/list` 来查看指定的镜像

    ##### ----由于目前只能通过url的方式来获取registry上的内容, 所以可以安装一个webui来简化操作 , 这里使用 docker-registry-frontend , 也可以自己写( 自己写的话推荐使用pythonWeb, java开发相对繁琐 )

13. 编辑 `/usr/local/docker/registry/docker-compose.yml` 添加docker-registry-frontend的启动

    ```yaml
      frontend:
        image: konradkleine/docker-registry-frontend:v2
        ports:
          - 8080:80
        volumes:
          - ./certs/frontend.crt:/etc/apache2/server.crt:ro
          - ./certs/frontend.key:/etc/apache2/server.key:ro
        environment:
        #设置registry仓库的ip和端口
          - ENV_DOCKER_REGISTRY_HOST=192.168.75.133
          - ENV_DOCKER_REGISTRY_PORT=5000
    ```

14. `docker-compose up -d` 启动registry和它的前端页面

15. 在浏览器访问 docker-registry-frontend 的地址和配置的端口



