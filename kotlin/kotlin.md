# Kotlin

> 代码行尾不需要分号

> 可以下载 kotlin 命令行工具交互式编程
>
> 1. 配置java 环境变量
> 2. 配置kotlin 环境变量
> 3. 命令行中 kotlinc 进入kotlin


## 变量类型

> 变量自带 MAX_VALUE 和 MIN_VALUE 两个属性, 表示该变量的取值范围

###### var 

  >  自动类型, 声明的时候会根据给定的值自动推断出适合的类型, 但是声明后就不能再给该变量赋其他类型的数据, 其实还是强类型
  >
  > 声明时不给值, 需要显示指定类型

  

  ```kotlin
  var a = 10  //自动推断a为Int类型
  var b:Long = 10 //手动指定b的类型为long
  ```


###### val 

  > 常量类型    

###### String 

  > 使用 """ 定义多行字符串

  > 字符串模板
  >
  > ```kotlin
  > //使用 ${} 在字符串模板中使用变量
  > var tem = "hahahahah ${变量}"
  > ```

  > 字符串使用 == 比较时, 比较的是值

> 字符串转数字
>
> ```kotlin
> var a = "10"
> a.toInt()
> //不为空时执行转数字
> a?.toInt()
> ```

###### list

```kotlin
//数组 [1,100]
var arr = 1 .. 100
//数组 [1,100)
var arr = 1 until 100
//数组 [1,100]
var arr = 1 .. 100
//数组翻转
var arr1 = arr.reversed()
//数组长度
arr.count()
//创建数组
var l = listOf("A","B","C")
var l2 = listOf<String>("a","b","c") //可以定义泛型
//数组带下标
l.withIndex()
```

数组函数

> 使用 it 代表当前子项

```kotlin
//元素为对象的数组, 使用maxBy返回根据某一属性的最大值的项
数组.maxBy{it.属性}
//同理minBy

//filter 过滤子项
数组.filter{
    返回值为boolean的表达式
}

//map使用原数组元素创建新的数组
数组.map{
    返回数组子项的组成
}

//any有一个符合条件的元素就返回true
数组.any{
    返回boolean的表达式
}

//count统计符合条件元素的个数
数组.count{
    返回Boolean的表达式
}

//find返回第一个符合条件的元素
数组.find{
    条件
}

//groupBy分组, 数组元素应当是对象, 分组条件是对象的属性
//返回值是值为数组的map
数组.groupBy{
    it.属性名
}

//forEach遍历
数组.forEach{
    使用it代表当前元素
}
```



###### map

```kotlin
var map = TreeMap<String ,String>()
map["A"] = 1
map["B"] = 2
println(map["A"])
```

###### enum

```kotlin
enum class Week{
    星期一,星期二,星期三,星期四,星期五,星期六,星期日
}

fun main(args:Array<String>){
    println(Week.星期一)
    println(Week.星期一.ordinal)
}
```



## 函数

* 主函数

  ```kotlin
  fun main(args:Array<String>){
      println("...")
  }
  ```

* 函数

  > 函数返回值写 Unit 为无返回值, 此时可以省略不写

  

  ```kotlin
  fun 函数名(参数名:参数类型):返回值类型{
      函数体
  }
  //参数类型后面加 ? 表示该参数可以传 null
fun 函数名(参数名:参数类型?):返回值类型{}
  ```
  
* 函数简写

  ```kotlin
  fun add(x:Int, y:Int):Int{
      return x+y
  }
  //等同于
  fun add(x:Int, y:Int):Int = x+y
  ```

* 函数表达式

  ```kotlin
  fun add(x:Int, y:Int):Int{
      return x+y
  }
  //等同于
  var i = {x:Int, y:Int -> x+y}
  //等同于
  var j:(Int, Int)->Int = {x,y -> x+y}
  //函数变量可直接调用
  i(5,5)
  j(5,5)
  ```

* 默认参数

  ```kotlin
  //设置默认参数
  fun function(x:Int=10, y:Int):Int = x+y
  //调用的时候传参需要给出参数名
  function(y=10)
  ```

  



## 条件和分支

###### if/ else 

> 同 java



###### when 

> 其实就是 switch

```kotlin
var a = 10
//when有返回值
var res = when(a){
    10 -> "10"
    9 -> "9"
    8 -> "8"
    7 -> "7"
    else -> "6"
}
```

###### for 

```kotlin
//1~100的数组, 相当于python 中的range, 通常结合for使用
var nums = 1 .. 100
//普通for
for(num in nums){
    print("${num},")
}
//设置步长
for(num in nums step 2){}
//拆包循环项
for((i,e) in nums.withIndex()){
    println("$i $e")
}
```

###### while

> 同java





## 流

###### 输入流

```kotlin
//从键盘接收输入
var a = readLine()
```



## 异常

###### try/catch

```kotlin
try{
    
}catch(e:Exception){
    
}
```

###### 递归优化

```kotlin
//该函数是递归函数, 如果可能因递归次数过多而造成栈溢出, 可以加 tailrec 关键字进行优化
tailrec fun function(){}
```





## 面向对象

> 使用 is 关键字判断是否是某类型, 就是 instanceof

###### 封装

```kotlin
//定义类, 括号内即是构造函数参数, 也是成员字段, 没有成员方法时直接这样写即可
class 类名(var 属性名:类型)
class 类名(var 属性名:类型){
    var 属性名 //里面也可以定义字段
    fun function(){} //定义成员方法
    private fun function1(){} //定义私有成员方法
}

class Rect(var heigth:Int, var width:Int)

//创建实例
fun main(args:Array<String>){
    var r = Rect(20,10)
    r.height
    r.function()
}
```

###### 继承

```kotlin
//父类要用 open 修饰才能被继承
open class father{
    open fun function(){} //需要加上 open 关键字才能在子类中被重写
}
//子类继承父类
class son:father(){
    override fun function(){} //重写父类方法
}
```

###### 抽象类

> 抽象类反映事物的本质
>
> 接口反映事物的能力

```kotlin
abstract class Person{
    abstract fun function()
} //定义抽象类

class Man:Person(){
    override fun function(){}
} //继承抽象类
```

###### 接口

```kotlin
//定义接口
interface Person{
    fun function()
}
//实现接口
class Man:Person{
    override fun function(){}
}
```

###### 代理类

> 就是将一个功能委托给另外一个类去实现, 然后通过代理该类实现对该类中功能的增强

```kotlin
//创建功能接口
interface IWash{
    fun wash()
}
//被委托类, 实现了接口的功能
class Son:IWash{
    fun wash(){
        println("被委托方执行方法")
    }
}
//将接口功能的实现委托给另外一个类, 就是使用另外一个类的实现来作为自己的实现
//这里 Son 后面加 () 实际上是创建实例
class Father:IWash by Son(){
    override fun wash(){
        print("委托之前执行") //在执行被委托方的方法前执行操作
        Son().wash() //执行被委托方的实现方法
        print("委托之后执行") ////在执行被委托方的方法后执行操作
    }
}
```

###### 单例类

> 这里的单例就相当于静态类, 直接通过 类名 调用 其方法和属性

```kotlin
//使用 object 关键字定义单例类, 该类在声明时就被创建在内存中, 所以不可以多次实例化
object class Son:IWash{}
//如果使用单例模式定义该类, 那么在使用代理时就不需要加 () 来实例化对象
class Father:IWash by Son{
    Son.wash()
}
```

###### 印章类

> 其实就是类中类
>
> 印章类不能实例化, 只能实例化它的类中类
>
> 印章类的类中类都可以调用它的方法

```kotlin
sealed class Son{
    fun say(){
        println("hello")
    }
    class Son1():Son()
    class Son2():Son()
}
fun main(){
    var s = Son.Son1()
    s.say()
}
```

###### 实体类

```kotlin
//相当于直接定义了一个javaBean, 属性有name和pass, 自带了get和set方法, 但是没有无参构造函数, 只有全参构造函数
data class User(name: String , pass:String)
```





## 奇淫技巧

###### 扩展函数

> 在不继承某一个类或使用装饰器模式的情况下, 给该类添加方法或者属性
>
> 实际上实现的功能就如同 js 中给对象加属性和方法直接加就可以
>
> 在扩展函数中, 使用 this 代指当前对象
>
> 内部实现实际上就是另外又定义了一个静态类和它的静态方法或属性, 这个静态方法的形参类型就是被扩展的类的类型, 在调用这个扩展函数时, 其实就是调用这个静态方法

```kotlin
//给Int类型扩展一个函数, 这个函数实现给当前数加 1 的功能
fun Int.addOne(){
    return this + 1
}
```

###### infix

> 使得可以使用自然语言的风格编写代码
>
> infix 关键字用于修饰方法
>
> 被修饰的方法只能是 成员函数 或 扩展函数
>
> 被修饰的方法的参数只能有一个 且不能是可变参数或默认参数

```kotlin
fun main(){
    var man = Man()
    //使用infix的函数在调用的时候可以省略 . 和 括号, 这样看起来就像是自然语言
    man say "hello"
}
class Man{
    infix fun say(word:String){
        println("$name")
    }
}
```





# Gradle

1. 下载解压

2. 添加环境变量

3. 在idea中创建 gradle 项目 , 后面哪个选择语言的选 java , 后面步骤采用默认设置

4. 创建完的项目中 gradle/wrapper/gradle-wrapper.properties 文件是 gradle 的配置文件 ,修改该文件中的 distributionUrl=file:///下载的压缩包的位置 ( 该项默认是旧版本的gradle, gradle4.0之后的版本才支持kotlin, 所以这个应当改为自己下载的 )

5. 重命名 /build.gradle 这个文件为 build.gradle.kts

6. 为防止 idea 的bug , 先关闭该项目然后重新打开

7. 打开 /build.gradle.kts 文件, 删除原有内容, 改为如下, 此时便可以编译 java 或 kotlin

   ```kts
   plugins{
   	application   //添加 java 应用程序支持
   	kotlin("jvm") //添加 kotlin 应用程序支持
   }
   application{
   	mainClassName="Main" //设置 java 应用程序的入口
   }
   dependencies{
   	compile(kotlin("stdlib")) //添加编译kotlin的依赖库
   }
   repositories{
   	jcenter() //指定从哪里下载依赖
   }
   ```

8. 在 /src/main 中创建 kotlin 文件夹, 在其中创建 kotlin 的实体类

9. 创建 /src/main/java 文件夹 (如果创建项目时选择了java,那么这个文件夹自动创建) , 其中创建名为 Main 的类, 在其中添加 main 方法, main 方法中调用使用 kotlin 创建的实体类

10. 在 gradle projects 窗口中选择该项目-> Tasks -> application -> run , 此时会将java代码中 Main类 中的 main 方法编译执行

11. 在 gradle projects 窗口中选择该项目-> Tasks -> distribution -> distZip , 此时会将java代码压缩输出到 /build/distributions/xxx.zip , 该压缩包里包含该项目打成的 jar包 和 执行该 jar 包的 bat 文件和 linux二进制执行文件 