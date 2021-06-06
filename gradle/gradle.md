Gradle



>   gradle 使用 groovy 语言编写配置文件, 所以



###### groovy

>   在 idea > tools > groovy console 中可以直接执行 groovy 代码

```groovy
//1. 闭包以及使用闭包为参数
//定义一个闭包, 其实就相当于函数类型
def con = {
    println '这是闭包中的内容...'
}
//定义一个接收闭包为参数的函数
//注意这里的Closure就是groovy自带的类型, 不要导入任何包
def foo(Closure closure){
    closure()
}
//调用该函数, 传入闭包
foo(con)

//2. 带参数的闭包
def con1 = {
    p ->
        println "接收到参数: ${p}"
}
def foo1(Closure closure){
    closure('alice')
}
foo1(con1)
```





