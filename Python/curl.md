#### ***curl*** 

>  命令行的http请求工具

> curl  http://www.baidu.com

-A "xxx" 设置请求时的 user-agent

> curl -A "Chrome"  http://www.baidu.com

-X xxx 设置请求方式

> curl -X POST  http://www.baidu.com

-I 只要返回的响应头

> curl -I  http://www.baidu.com

-d a=123 使用post方式发送请求, 并设置请求参数

> curl -d "a=1&b=2&c=3"  http://www.baidu.com
>
> 或者
>
> curl -d @参数文件路径  http://www.baidu.com
>
> ​	参数文件中写 a=1&b=2&c=3

-O 保存url返回的文件

> curl -O http://httpbin.org/mage/jpeg
>
> ​	这个url返回一个图片
>
> curl -o fox.jpeg http://httpbin.org/mage/jpeg 
>
> ​	设置自定义的保存文件名

-L 如果返回的是请求重定向, 直接再次请求转发地址并获取返回数据

> curl -L https://baidu.com

-H "xxx:xxx" 设置请求头信息

> curl -H "accept:image/webp" http://httpbin.org/image
>
> ​	这里设置请求头的 accept 参数

-k 允许请求没有 ssl证书的网站 (比如12306)(不安全的请求)

> curl -k https://12306.cn 不加这个参数就无法请求12306,因为12306没有安全证书

-b "xxx=xxx" 设置请求中的cookie参数

> curl -b a=1 http://httpbin.org/cookies

-s 不显示其他无关信息

-v 显示连接过程中的所有信息