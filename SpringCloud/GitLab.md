

### 平台即服务(Paas)

#### Git

1. 下载安装 git 和 ( tortoiseGit 或者 sourcetree )
2. github 和 gitee 是 ***第三方*** 代码托管的服务器平台, 可以通过 git 命令将代码托管到这些平台上
3. 在 github 上新建仓库 ( 选择开发语言会自动生成ignore的类型, 开源协议也要选择 )
4. 复制仓库地址
5. 在本地目录上使用命令行 `git clone 仓库地址` 将仓库内容克隆到本地
6. 使用 `git add 文件名` 来添加项目中要使用git管理的文件
7. 在本地修改项目后 使用 `git commit -m "提交注释"` 来提交到本地, 然后使用 `git push ` 提交到github服务器



#### GitLab 

>  GitLab 为代码托管平台, 相当于 github私服

#### 使用Docker compose安装GitLab中文版

* gitlab硬件要求至少2g内存, 固态硬盘( 5200转的机械硬盘会很卡 ), 所以虚拟机要设置内存和存放位置为固态硬盘
* 就相当于在自己的机器上开了一个github

##### 在linux虚拟机上部署gitlab的服务器, 然后在windows下使用

1. `docker pull twang2218/gitlab-ce-zh` 拉取gitlab镜像

2. 在 `/usr/local/docker/gitlab/` 下创建 `docker-compose.yml`

   ```yaml
   version: '3'
   services:
     web:
       image: 'twang2218/gitlab-ce-zh'
       restart: always
       #设置代码托管服务器的地址, 这里使用本机部署,所以设置为本机ip
       hostname: '192.168.75.145'
       environment: 
         TZ: 'Asia/Shanghai'
         GITLAB_OMNIBUS_CONFIG:
           #设置外部访问地址, 使用浏览器访问的地址, 这里使用的端口要和下面设置nginx的端口一致
           external_url 'http://192.168.75.145:8080'
           #设置ssh访问的端口
           gitlab_rails['gitlab_shell_ssh_port'] = 2222
           #设置gitlab的内部端口
           unicorn['port'] = 8888
           #设置nginx的端口
           nginx['listen_port'] = 8080
         ports:
         #设置宿主机端口和容器端口的映射关系
           - '8080:8080'
           - '8443:443'
           - '2222:22'
         volumes:
         #设置gitlab使用的数据卷
           - /usr/local/docker/gitlab/config:/etc/gitlab
           - /usr/local/docker/gitlab/data:/var/opt/gitlab
           - /usr/local/docker/gitlab/logs:/var/log/gitlab
   ```

3. `docker-compose up`  启动gitlab

4. 使用启动配置中设置的浏览器访问地址来访问 gitlab 页面

5. 在网页中设置 管理员密码( 账号是root )

6. 使用root登入网页, 点击扳手(管理区域)图标

7. 如果网页启动慢, 在左侧设置中设置 不启动Gravator头像 选项( 这功能需要翻墙 )

8. 在管理区域主页中 新建权限为管理员的用户 ( 一般不直接使用root用户 )

9. 在gitlab主页新建项目, 然后使用git命令或者tortoisegit来拉取或提交项目

##### 使用ssh的登录方式来拉取和提交项目 ( 免密登录, 进而持续部署 )

* ##### ssh的方式就是 在本机生成一个秘钥, 这个秘钥相当于本机的唯一标识, 每台机器都会有一个独一无二的秘钥, 然后在管理平台上设置添加这个秘钥, 也就是将本机标为信任, 在本机登录服务器时, 会将自己的秘钥发送给服务器, 然后服务器发现这个秘钥在信任列表中, 则使其自动登录

1. 生成ssh-key, 使用 ssh-keygen 生成工具生成 ,  位于 git 的安装目录下, `.../Git/usr/bin/` , 切换到该目录
2. 使用cmd运行 `ssh-keygen -t rsa -C "你的邮箱地址(注册github或者gitlab的邮箱)"`
3. 根据提示在系统中当前用户的文件夹下生成了ssh秘钥, 进入系统用户文件夹 , 然后 `.ssh/id_rsa.pub` 文件就是秘钥, 打开并复制整个秘钥中的内容
4. 在gitlab网页中, 用户头像->settings->ssh秘钥->将复制的内容粘贴到右侧的秘钥框中, 标题就是该秘钥的备注
5. 然后在项目主页设置使用ssh的链接
6. 在要拉取项目的机器上右键->tortoisegit setting->网络->ssh客户端, 将这个ssh.exe改为git安装目录下 `/usr/bin/ssh.exe` -> 点击 应用( 如果不能点, 先勾选这个界面上面的 '使用代理服务器', 然后点击引用, 然后再取消勾选,这是个可能存在的bug ) -> 确定
7. 右键使用tortoisegit输入ssh的链接拉取项目, 即可自动登录并拉取

> github上也可使用ssh自动登录



