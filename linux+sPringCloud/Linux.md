### Linux

> 以 . 开头的文件都是隐藏文件

>如果使用的是虚拟机
>
>在linux配置完系统环境后, 安装软件之前, 应对系统进行克隆 , 然后在克隆版上安装软件并使用 , 防止安装软件出了问题还得重新装系统
>
>在vm上右键原系统, 管理 -> 克隆 -> 链接克隆(占用空间小,不会对原系统产生影响,但是运行效率相对较低)



#### ubantu安装

* 在创建虚拟机的时候***不要指定镜像文件*** ,等到创建完后在指定虚拟光驱加载镜像文件再开机
* 在安装ubantu的过程中 , 设置磁盘分区的时候 , ***一定要选择开启LVM(磁盘扩容技术)***, use entire disk and set up LVM
* ***LVM: 使得新插入的硬盘可以和之前的硬盘合并***
* ubantu16版本安装应设置全部为英文 ,中文有bug
* ubantu安装过程需要联网
* ***不要设置自动更新***
* software selection 中设置勾选 **OpenSSH server ** (空格勾选)
* 如果安装过程中配置network失败 , ctrl + r 运行 services.msc , 在服务列表中将vm相关的都启动



#### OpenSSH

> 在linux 中安装了 openssh 之后, 就可以在windows下使用 xshell 进行远程操作

* openssh:  open security shell , 进行linux的远程连接和操作
* openssh由服务端和客户端组成
* 两种连接验证方式
  * 口令验证 : 账号和密码
  * 密钥验证 : 客户端生成 公钥和私钥, 公钥发给服务端保存, 客户端使用私钥请求连接服务端, 服务端确认秘钥配对后即可连接
* 端口号22是ssh协议默认的端口号, 所以在xshell中创建连接时使用22端口



#### linux根目录结构

* bin 存放二进制可执行文件( 如ll, cat, mkdir )
* boot 存放系统启动时需要加载的文件
* dev 存放设备文件
* <span style="color:cyan">etc 存放配置文件 ( etcetera 附加物)</span>
* <span style="color:cyan">home 用户目录</span>
* lib 存放程序运行所需的依赖库文件
* mnt 安装临时文件系统的安装点( u盘 )
* opt 额外安装的可选应用程序包所放的位置
* proc 虚拟文件系统, 存放当前内存的映射
* root 超级管理员目录
* sbin 存放二进制可执行文件, 只有root用户才能访问
* tmp 存放临时文件
* usr 存放系统应用程序
  * <span style="color:cyan">user/local 自己安装的程序,必须放到此目录下</span>
* <span style="color:cyan">var 存放运行时需要改变数据的文件 ( 如数据库文件 ) </span>



#### linux命令

* touch 生成一个空文件
  
  * touch xxx.xxx
  
* echo 生成一个带内容的文件
  * echo abcd>1.txt
  * echo 1234>>1.txt
  
* find 搜索文件
  
  * find -name  'hello.txt'
  
* grep 在指定的文本文件中查找指定的字符串
  
  * grep hello hello.txt
  
* tree 用树形图列出文件结构

* ln 建立软链接
  * 软链接: 快捷方式
  * ln <要使用作为软链接的位置> <目标位置>
  
* more 分页展示文本内容
  
  * more hello.txt 回车下一页
  
* head 显示文件开头的内容

* tail 显示文件结尾内容 
  
  * tail -f 跟踪输出
  
* <span style="color:cyan">top 任务管理器</span>
  
  * top中会显示交换空间的信息
  * 交换空间: 在硬盘上开辟一块区域( 通常和内存大小相同 ), 当内存用满时, 使用交换空间作为内存进行操作, 防止系统崩溃, 但是同时会拖慢系统的性能, 所以在云服务器上无交换空间
  
* stat <文件名> 显示文件的详细信息

* <span style="color:cyan">ps 查看进程瞬时状态</span>

  * ps aux 以人类阅读方式显示该系统中所有的运行中程序

* du 查看指定文件目录已使用的空间
  
  * du -h 进行单位换算后输出
  
* <span style="color:cyan">df 查看整个文件系统的空间使用情况</span>
  
  * df -h 进行单位换算后输出
  
* free 显示当前内存和交换空间的情况

* netstat 查看网络状态

* <span style="color:cyan">kill 关闭进程</span>
  
  * kill -9 <进程号> 彻底杀进程
  
* sudo <其他命令>  临时使用超级管理员权限
  
  * sudo reboot
  
* 重启
  * reboot
  * shutdown -r now
  
* shutdown -h now 关机

* <span style="color:cyan">tar -zcvf <压缩结果名> <压缩目标> 压缩</span>
  
  * 压缩结果格式:  名字.压缩方式.压缩算法 ( hello.tar.gz -> tar压缩方式,gzip算法 )
  * -c 压缩
  * -x 解压
  * -z 使用gzip算法压缩
  * -j 使用bzip2算法压缩
  * -v 显示过程
  * -f  压缩后的名字, 后面要直接接上名字
  
* <span style="color:cyan">tar -zxvf <压缩包名>  解压缩</span>

* <span style="color:cyan">grep</span>  匹配查找命令

  `grep 正则1 正则2`  从正则2匹配的文件中查找匹配正则1的行
  
  `ls | grep 正则`  接在管道符后面的grep， 接收前面的输出，查找出符合正则的行
  
* <span style="color:cyan">echo</span>  显示字符串

    `echo 'string'`  显示字符串

    `echo -e 'string\n'` 开启转义显示字符串

    `echo 'string' > xxx.txt`  将字符串覆盖输出到指定文件

    `echo 'string' >> xxx.txt`  将字符串追加输出到指定文件





#### Linux包管理

>  Ubuntu使用 apt 软件包管理程序, centos使用 yum 软件包管理程序

* apt-get install nano  使用apt安装软件nano ( 一个文本编辑器 )

* apt-get remove nano  使用apt卸载nano软件, 不卸载相关依赖软件

* apt-get autoremove nano  卸载软件, 包括其依赖软件

> apt默认从官方的仓库获取软件 (比较慢)

修改数据源为国内镜像

1. lsb_release -a  查看系统版本 , 查看到codename 为 xenial, 为系统的名称

2. 编辑数据源  vi /etc/apt/sources.list,  将原有的内容全部删除 (dd), 改为阿里云的数据源

   ```sources.list
   deb http://mirrors.aliyun.com/ubuntu/ xenial main restricted universe multiverse  
   deb http://mirrors.aliyun.com/ubuntu/ xenial-security main restricted universe multiverse
   deb http://mirrors.aliyun.com/ubuntu/ xenial-updates main restricted universe multiverse
   deb http://mirrors.aliyun.com/ubuntu/ xenial-backports main restricted universe multiverse
   ```

   

3. 根据数据源更新软件列表 apt-get update





#### root用户

* linux默认root用户没有密码

* 使用 `sudo passwd root`  给root用户设置密码

* 密码设置成功后 ,使用 `su` 登录到root用户

* `su 用户名`  登录到指定用户, 直接 `su` 的话,就是登陆root

* **linux默认不可以使用root用户远程登录 , 也就是xshell登录, 修改配置文件 使得可以使用root用户远程登录**

  1. `vi /etc/ssh/sshd_config`

  2. ```sshd_config
     #其他配置...
     
     # Authentication:
     LoginGraceTime 120
     #PermitRootLogin prohibit-password  //注释此行
     PermitRootLogin yes //加入此行
     StrictModes yes
     
     #其他配置...
     ```

     
     
  3. 重启ssh服务  service ssh restart

#### 用户组

* 用户必须分配在用户组中 ,如果创建用户时没有为其分配 ,则自动创建一个与用户名相同的组并将其放入该组







#### 用户权限管理

1. 权限说明

   使用 ll 命令显示文件详情列表 

   ```shell
   -rw------- 1 root root 127 Jul 18 15:18 .bash_history
   #权限标识有十位
   #第一位 - 代表是文件 ,d 代表是文件夹, l 代表软链接
   #后9位分为三部分 , 所属用户权限 , 所属组权限 , 其他用户权限 
   #一组权限有三位, - 代表没有权限, r 代表读权限, w 代表写权限, x 代表可执行权限, 可执行代表对shell脚本的执行权限
   #第一个root 为当前用户
   #第二个root 为当前组
   #这里为 这是一个文件, 对于root用户, 有读写权限, 对于用户组root,无任何权限, 但是root用户属于root组, 所以root用户也具有读写权限, 对于其他用户无任何权限
   ```

   

2. `chmod` 改变权限

   对于shell脚本文件 , 使用root用户新建一个脚本 `shell.sh`

   ```shell
   #/bin/bash      声明这是一个可执行的shell脚本文件
   echo "hello shell"   直接将字符串输出到控制台
   ```

   此时查看该文件不具备执行权限

   使用 `chmod [用户名,不写用户名则给所有用户增加该权限] <+|-|=> <权限名> <该权限作用的文件>`

   ```shell
   >chmod +x shell.sh
   ```

   此时所有用户具备了对该文件的执行权限

3. `chown` 改变文件所属用户和用户组

   `chown [-R] 用户组:用户名 文件名`

   * 加R是将该文件夹下的所有文件都修改

4. 权限的数字设定法

   * 0 代表无权限, 1 代表可执行,  2 代表可写, 4 代表可读
   * 权限位一共九位, 所以数字表示法为三位数字, 如 777 代表权限全开

   比如 : 

   |   rwx   |   r-x   |   r-x   |
   | :-----: | :-----: | :-----: |
   | 4+2+1=7 | 4+0+1=5 | 4+0+1=5 |
   |  group  |  user   | others  |

   那么可以使用数字来设定 `chmod 755 file_name`







#### linux安装java

1. 在java的官网下载jre ,  linux x64 的 tar 包

2. 使用xshell提供的文件传输将tar包传到linux上

3. 解压缩

   ```shell
   >tar -xzvf ...
   ```

   

4. 将解压出来的文件夹移动到 `usr/local` 下 ( 应当将自己安装的软件都放到这个文件夹下 )

5. 配置系统环境变量

   ```shell
   vi /etc/environment
   ```

   编辑内容

   ```environment
   PATH="..."  #这句是原有的, 它将所有bin文件夹都加到了这里
   #添加如下,这些路径根据实际情况来定
   export JAVA_HOME=/usr/local/java/jdk1.8.0_152 
   export JRE_HOME=/usr/local/java/jdk1.8.0_152/jre
   export CLASSPATH=$CLASSPATH:$JAVA_HOME/lib:$JAVA_HOME/jre/lib
   ```

   

6. 配置用户变量

   ```shell
   vi /etc/profile
   ```

   编辑

   ```profile
   #原有的一套if...
   
   #添加如下,这些路径根据实际情况来定
   export JAVA_HOME=/usr/local/java/jdk1.8.0_152 
   export JRE_HOME=/usr/local/java/jdk1.8.0_152/jre
   export CLASSPATH=$CLASSPATH:$JAVA_HOME/lib:$JAVA_HOME/jre/lib
   export PATH=$JAVA_HOME/bin:$JAVA_HOME/jre/bin:$PATH:$HOME/bin
   
   #原有的一套if...
   ```

7. 使用户环境变量生效

   ```shell
   source /etc/profile
   #使其他用户的环境变量也生效
   su alice
   source /etc/profile
   ```

8. 测试是否配置是否成功

   ```shell
   java -version
   ```

   

#### linux安装tomcat

1. 在官网下载tomcat对应版本的tar包 (1.8对8以此类推)

2. 解压

   ```shell
   tar -xzvf xxx
   ```

3. 将解压出来的文件夹移动到 `usr/local` 下

4. 直接运行文件夹下bin中的sh文件开启服务器

5. 可以修改tomcat文件夹中 `conf` 下的 `server.xml` 中配置开启服务使用的端口号

   ```xml
   <!--其他配置-->
   <!--这里修改为80端口, 那么在访问的时候url就不用加端口号-->
   <Connector port="80"/>
   ```



#### linux安装mysql

1. `apt-get install mysql-server`

2. 在弹窗中设置mysql中的root密码

3. 使用 `whereis mysql` 查看安装路径

4. mysql数据存在于 `/var/lib/mysql` 下

5. 配置mysql启用远程连接( 关闭安全机制 )

   `nano /etc/mysql/mysql.conf.d/mysqld.cnf`

   ```mysql.cnf
   #将这个bind-address改为这个, 代表所有地址都可访问
   bind-address		= 0.0.0.0
   ```

6. 重启mysql服务使得配置生效

   `service mysql restart`

7. 在linux上使用root登录mysql, 然后开放访问权限给所有人

   ```shell
   mysql -u root -p 
   ```

   授权

   ```mysql
   mysql>grant all privileges on *.* to 'root'@'%' identified by 'root用户的密码';
   ```

8. 使用 `quit` 退出mysql

9. 使用windows下的 SQLyog 测试连接mysql