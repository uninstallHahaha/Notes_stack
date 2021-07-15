解压ipvsadm

制作内核软连接 ln -s /usr/src/kernels/2.6.32-431.e16.x86_64 /usr/src/linux  --->ipvsadm会去/usr/src/linux这个目录下去找内核文件

回到ipvsadm解压目录安装 make && make install

确认ipvsadm安装成功 
ipvsadm 
lsmod | grep -i ip_vs

没安装成功的话, modprobe ip_vs 启动模块

添加模块开机自动启动
echo "/sbin/modprobe ip_vs" >>/etc/rc.local  ------->  >> 符号为追加到

配置ipvs虚拟服务器地址
ipvsadm -A -t 192.168.2.100:80 -s rr

配置ipvs真正服务器
ipvsadm -a -t 192.168.2.100:80 -r 192.168.2.101 -g -w 2
ipvsadm -a -t 192.168.2.100:80 -r 192.168.2.102 -g -w 2

查看ipvs配置
ipvsadm -L

配置lvs服务器的VIP
ifconfig eth0:0 192.168.2.100 broadcast 192.168.2.100 netmask 255.255.255.255

配置lvs服务器上的路由规则
/sbin/route add -host 192.168.2.100 dev eth0:0


配置真正服务器VIP(DR模式)
新建脚本
#! /bin/sh
vip=192.168.2.100
case $1 in             #------>$1表示执行脚本时传进的第一个参数

start)

    ifconfig lo:0 $vip broadcast $vip netmask 255.255.255.255 up
    /sbin/route add -host $vip dev lo:0
    echo "1" >/proc/sys/net/ipv4/conf/lo/arp_ignore   #-------->修改该系统变量为1,开启arp忽略
    echo "2" >/proc/sys/net/ipv4/conf/lo/arp_announce
    echo "1" >/proc/sys/net/ipv4/conf/all/arp_ignore
    echo "2" >/proc/sys/net/ipv4/conf/all/arp_announce
    sysctl -p->/dev/null 2>&1
    echo "start OK!"
    exit 0
;;

stop)

    ifconfig lo:0 down
    /sbin/route del $vip >/dev/null 2>&1
    echo "0" >/proc/sys/net/ipv4/conf/lo/arp_ignore
    echo "0" >/proc/sys/net/ipv4/conf/lo/arp_announce
    echo "0" >/proc/sys/net/ipv4/conf/all/arp_ignore
    echo "0" >/proc/sys/net/ipv4/conf/all/arp_announce
    echo "stop OK!"
    exit 1
;;
*)
    echo "Usage: $0 {start|stop}"     #--------->$0为该脚本的名称
;;
esac

执行脚本 sh xxx.sh start

启动后端服务器的nginx

访问VIP



###### lvs, 带负载均衡功能的VPN服务器?

>   ​	所谓的工作在网络层, 实际上就是操作系统收到ip数据包时, 就直接交给lvs程序处理, 然后lvs就把请求分发出去

三种模式

*   ***NAT模式*** 

    ​	说白了就是VPN服务器, 请求和响应都使用NAT的方法经过lvs服务器处理 

    ​	唯一的区别就是能够通过负载均衡策略把请求分配给各个服务器, 各个服务器可以都是内网机器, 不需要有公网地址, 但是请求包和响应包都得经过lvs服务器, 光靠lvs服务器的带宽也注定了其他服务器的数量多不了

*   ***IP TUN模式***

    ​	lvs服务器只负责把请求分发给各个服务器, 然后各个服务器自己响应, 这样就只有请求包经过lvs服务器, 那么它的带宽就能撑得住了

    ​	lvs服务器通过隧道技术与其他服务器直连, 所以各个服务器都可以不在一个子网内, 但是都需要公网ip

*   ***DR模式***

    ​	直接路由模式, 跟IP TUN的唯一区别就是各个服务器放到一个子网中, 不再使用很浪费时间的隧道

