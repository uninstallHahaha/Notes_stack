`-d "name=alice&age=20" `发送post请求体
`--data-urlencode "name=alice girl" `发送url编码的请求体, 数据有空格时使用
`-F "file=@文件路径;type=image/png"`发送文件
`-G -d "name=alice"`带参数的get请求
`-H "Content-Type: application/json"`自定义任何请求头
`-L` 跟随重定向
`-o xxx.xxx `保存响应为指定文件
`-O`保存响应为默认文件
`-v`输出整个通信过程
`-X GET `设置请求方式

