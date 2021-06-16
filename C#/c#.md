## *C#*

> visual studio中 
>
> alt+> 显示方法提示
>
> ctrl + shift + B 编译
>
> F5 运行
>
> 使用 #region 名字 和 #endregion 可以折叠代码段
>
> ctrl+m+o 折叠所有方法

> 三目运算符 , 同java

#### c#console app

1. 在visual studio中新建项目->visual C#->windows->console application->ok

2. 在main方法中添加代码 , 点击工具栏运行

   ```c#
   static void main(string[] args){
       //输出
       Console.WriteLine("hello world");
       //等待输入
       Console.ReadLine();
   }
   ```

   

#### c#中的数据类型

##### *引用类型*

* object (System.Object) 是所有类型的基类

  ```c#
  //引用系统库
  using System;
  
  namespace lesson{
      class Pro{
          static void main(){
              //新建object变量,两种方式一样
              //这种方式使用的是object别名
              object a = new object();
              //这种方式使用的是System.Object , 因为使用 using System 引用了库, 所以System可以省略不写
              object b = new Object();
              //使用object下的常用方法
              a.GetType();
              a.ToString();
          }
      }
  }
  ```

  

* string (System.String) 字符串类型 , 初始化后长度固定 , 对于修改长度的操作比较消耗性能

  * `string a = "abc";` 新建字符串
  * `a == b` 判断字符串a和b是否值相等 ,而不是判断地址是否相等
  * `a[2]` 获取字符串中的字符
  * `string a = "\\\u0006\n";` 字符串默认解析unic码 , 该字符串被解析为 `\f换行`
  * `string a = @"\a\b";` 使用@关闭unic码解析 , 该字符串解析为 `\a\b`
  * `a.Contains("abc");` 判断是否包含字串
  * `a.Length` 返回字符串长度
  * `a.IndexOf("v");` 子串首次出现的位置

* StringBuilder 可变长度的字符串 , 对于经常修改长度的字符串 , 应当选用这种类型

  * `StringBuilder s = new StringBuilder();` 新建
  * `s.Append("a");` 追加
  * `s.AppendFormat(hello{0}-{1}, "a", "b");` 使用格式追加字符串 

* dynamic ( System.Dynamic ) 在编译阶段不进行类型检查 ,而是在运行阶段进行类型检查的变量类型

##### *值类型*

* int (System.Int32) 整型 , 默认为0 , 自带常用方法

* bool ( System.Boolean ) 布尔类型

* struct 构造体类型 和 enum 枚举类型

  ```c#
  //声明枚举类型
  enum Days { Monday, Tuesday , Wenesday , Thursday, Friday, Saturday, Sunday}
  
  static void main(){
      //主函数
      //新建结构体变量
      Person p = new Person();
      p.age=10;
      //使用枚举类型
      Console.WriteLine(Days.Monday);
  }
  
  //定义结构体
  struct person{
      //公共
      public int age;
      //私有
      private string name;
      //内部 , 在命名空间内可访问
      internal string fname;
      //保护 (仅继承于该类的类可访问)
      protected string lname;
  }
  ```

* char 字符类型

* var 任意类型





#### C#类型转换

* 强类型语言, 编译的时候进行类型检查 ,同java

##### ***隐式转换***

* 同java

##### ***显式转换***

* 使用 () 进行转换 ,同java

##### ***类型判断***

* 使用 is 关键字进行判断, 返回bool类型 `a is Person`

##### ***更加安全的强制类型转换***

* 直接强转不报错 , 如果强转不来就置为空再转换
* 只能用于引用类型和可置为null的类型
* 使用方法 : `B b = a as B;`  , 将a强转为B赋值给b

##### ***使用内置的方法进行类型转换***

* 字符串转整型 `int a = Convert.ToInt32("100");`
* 字符串转整型 `int a = Int32.Parse("100");`
* 字符串转整型 , 忽略异常 `int a = Int32.TryParse("100", out b);` , 如果转化失败, 则输出b的值而不是异常





#### 可为null的类型

* ```c#
  //创建一个可为null的int类型的变量a
  int? a = null;
  //或者
  System.Nullable<int> a = null;
  ```

* 为空运算符??

  ```c#
  int? a = null;
  //判断a是否为空 , 为空则返回后面的值 , 不为空则返回a
  //这里a是空 , 所以返回100
  int b = a ?? 100;
  ```









#### C#中的集合类型

> 使用同java , 需要引入其命名空间

* 所有的数组都继承于 System.Array

* 数组

  ```c#
  //一维数组
  int[] a = new int[5];
  //二维数组
  string[,] b = new string[5,4];
  //数组的数组 , 就是以数组为元素的数组
  //这是一个长度为5的数组数组
  //每一个成员数组的长度是可变的
  byte[][] sc = new byte[5][];
  
  ```

  * 数组的初始化

    ```c#
    //创建时初始化
    int[] a = new int[5]{1,2,3,4,5};
    //或者
    int[] a = new int[]{1,2,3,4,5};
    //或者
    int[] a = {1,2,3,4,5};
    
    //多维数组初始化
    string[,] b = {{"a","b"},{"d","b"}};
    
    //数组数组初始化
    int[][] c = {new int[]{1,2,3} , new int[]{4,5}};
    
    ```

  * 数组元素的使用 ,使用 [下标] , 同java

* ArrayList 链表

  * 需要 `using System.Collections;`

  * 可以在一个列表中存储不同的数据类型元素

  * 基本使用

    ```c#
    ArrayList al = new ArrayList();
    al.Add(5);
    al.Add(6);
    al.Add("abc");
    al.Remove(5);
    
    ```

* List 带类型规定的链表 

  * 需要 `using System.Collections;`

  * 只能在链表中使用同一种类型的元素

  * 基本使用

    ```c#
    List<int> l = new List<int>();
    l.Add(500);
    l.AddRange(new int[]{600,700});
    l.Contains(200);
    l.IndexOf(500);
    l.Remove(500);
    l.Insert(1,1000);
    
    ```

    





#### C#类

##### 访问修饰符

> * 如果想要使用同一个项目下的其他命名空间中的类 , 需要 using 先引用命名空间, 相当于 java 中的 import xxx.*;
>
> * 在同一个解决方案下新建类型为 class library的项目( 程序集 ) ,然后在主项目中使用这个程序集时需要先在项目设置中使用该程序集 ,然后使用using 引入 , 然后就可以使用下面的类

* public 公共 , 同java
* private 私有 ,同java
* internal 同一个程序集下可用
* protected 本类或子类, 同java
* internal protected 本程序集或子类

##### 类

* 包含字段和函数

* class默认访问修饰符为 internal 为命名空间内可访问

* class内的成员默认访问修饰符为 private

* 有默认无参构造函数

* class 中可以使用 this

* class 中可以使用 static 修饰成员 , 该成员通过类调用而不能通过实例调用

  ```c#
  namespace abc{
      class person{
          int age;
          int getAge(){
              return age;
          }
      }
  }
  ```

* class 中可以使用属性 , 就是封装了默认的set和get方法的成员字段

  ```c#
  class Person{
      
      //这个age是属性 , 相当于成员变量
      public int age{
          //设置该属性的get方法
          //p为实例 , 则可以通过 p.Age 直接获取属性Age
          //如果无需在get方法中进行操作 , 可以直接写为 get;
          get{
              return age+10;
          }
          //设置属性的set方法 , value为传入的参数值
          //如果使用的set方法是默认的set方法, 直接写成 set;
          set{
              age = value+10;
          }
      }
  }
  ```

> ***C#类中的初始化器***
>
> ```c#
> public class Student{
> 	public int id{get;set}
> 	public string name{get;set}
> 	public Student(){}
> 	public Student(int id,string name){
> 		this.id = id;
>      	this.name = name;
> 	}
> }
> 
> ...
>  
> //使用初始化器的方式来创建对象
>  //这种方式默认调用无参构造函数, 然后使用set方法对属性赋值
>  Student s = Student{ id=1, name="alice" };
> //也可以指定调用有参构造函数
> Student s1 = Student(2,"blice"){name="clice"};
> ```
>



##### 匿名类

```c#
//直接使用初始化器创建一个匿名类 , 匿名类的属性是只读的
var pet = new {	Age=10, Name="Mioa" };

//匿名类可用于linq语句中select返回内容的定义
```



##### interface接口

* 定义同java , 起名应当以 I 开头
* `class Person : ISuper{...}` 实现接口



##### abstract抽象类

* 抽象类不能被实例化

* 抽象类中可以有普通字段和方法

  ```c#
  //继承抽象类Man , 实现接口ISuper
  class Person : Man , ISuper{
      //实现抽象类中的抽象方法
      public override int GetAbs(){
          //...
      }
  }
  
  //抽象类
  abstract class Man{
      //抽象类中的抽象方法
  	public abstract int GetAbs();
      //抽象类中的普通字段
      public string name;
      //抽象类中的普通方法
      public string GetName(){
          return this.name;
      }
  }
  ```

* ***抽象类和接口的区别***

  * 抽象类中能包含普通的字段和方法, 接口中不能包含这些
  * 一个类只能继承一个类( 抽象类 ) , 可以实现多个接口



##### 继承

* 使用 : 继承

* 使用 virtual + override 重写方法

* 使用 new 重写方法

* 使用 sealed 规定不能被继承

* 被override覆盖的方法就调用不到了

* 被new重写的方法还可以调用的到

  ```c#
  class Main{
      public static void main(){
          //使用父类接收子类对象
          Animal dog = new Dog();
          //调用的是子类中override的方法
          dog.bite();
          //调用的是父类中的原方法
          dog.getAge();
          //使用类型转换调用子类中new的方法
          ((Dog)dog).getAge();
      }
  }
  
  class Animal{
      //virtual表示可被override覆盖的方法
      public virtual void bite(){
          //...
      }
      //使用new重写普通方法
      public void getAge(){
          //...
      }
  }
  //使用: 继承
  class Dog: Animal{
  	//覆盖virtual的方法
    public override void bite(){
          //...
      }
      //重写普通方法
      public new void getAge(){
         //... 
      }
  }
  //不能被继承的类
  sealed class God{
      //...
  }
  ```

  

##### 多态

* ***静态多态*** : 就是方法参数重载
* ***动态多态*** : 不同的子类对方法进行不同的override , 使用父类对象接收子类实例, 调用该对象的方法 , 实现了动态多态







#### c#引用传参

* 相当于c++中的&参数传递

  ```c#
  public void m1(ref int a){}
  ```

  



#### c#异常处理

* try/catch/finally , 同java

  ```c#
  try{
  	//...
  }catch(Exception e){
      Console.WriteLine(e.Message);
  }
  finally{
    //总会执行的部分
  }
  ```

* 手动抛异常

  ```c#
  throw new NullReferenceException();
  ```

* Exception是所有异常的基类

  * ArgumentException 
  * ArgumentNullException
  * ArgumentOutOfRangeException
  * DirectoryNotFoundException
  * FileNotFoundException
  * InvalidOperationException
  * NotImplementedException





#### c#I/O操作

* 需要 `using System.IO;`

* File 文件工具类 , 包含了关于文件的操作方法

  * File.Exists(@"文件路径");
    * 检查文件是否存在 ,返回bool
    * 使用@来表明该字符串中不使用转义 , 即字符串本身
  * 其他方法可通过查看file类的定义来获取

* Directory 文件夹工具类 , 包含了关于文件夹的操作方法

  * Directory.Exists(@"文件夹路径")
    * 同上

* DirectoryInfo 文件夹类, 实例化后使用其方法

  * 实例化 `DirectoryInfo dir = new DirectoryInfo(path)`
  * [使用格式匹配]获取文件夹下的文件 `dir.GetFiles("*.exe")`

* **写文件**

  * 新建并编辑文件

    ```c#
    //新建文件流(文件信息): 文件名, 文件流的操作模式
    FileStream fs = new FileStream("test.txt",FileMode.Create);
    //使用文件流创建字节写入器
    BinaryWriter w = new BinaryWriter(fs);
    //使用字节写入器写入数据
    for(int i=0;i<10;i++){
        w.Write("a");
    }
    //关闭文件流和字节写入器
    w.Close();
    fs.Close();
    ```

  * **对已有文件进行追加编辑**

    ```c#
    static void main(){
        //使用using代码段, 在执行完该段代码后, 会自动释放括号中的资源 , 文件操作建议使用using
        //使用File.AppendText()获取被追加编辑文件的写入器
        using(StreamWriter w = File.AppendText("test.txt")){
            Log("hello",w);
            Log("hello1",w);
        }
    }
    //使用写入器的公共父类TextWriter进行参数接收
    public void static Log(string mes, TextWriter w){
        //写入
        w.Write("\r\n Log Entry: ");
        w.Write(" :{0}",mes);
        //清空缓存区
        w.Flush();
    }
    ```

  * **文件读取**

    ```c#
    //使用文件流和字节读取器
    //只读的方式创建文件流
    FileStream fs = new FileStream("test.txt",FileMode.Open, FileAccess.Read);
    //使用文件流创建字节读取器
    BinaryReader r = new BinaryReader(fs);
    //读取字符串 ,这里的字符串按照空格来区分
    for(int i=0;i<10;i++){
        Console.WriteLine(r.ReadString);
    }
    //关闭文件流和文件读取器
    r.Close();
    fs.Close();
    
    
    //或者
    //使用streamreader读取
    using(StreamReader sr = File.OpenText("test.txt")){
        string input;
        //按行来读
        while((input = sr.ReadLine())!=null){
            Console.WriteLine(input);
        }
        sr.Close();
    }
    ```

    



#### c#索引器

* 对类实例使用 [ ] 符号的自定义重载

  ```c#
  class IndexNames{
      //类中的成员变量 , 为一个字符串数组
      private string[] nameList = new string[10];
      
      //无参构造函数
      public IndexNames{
          for(int i=0;i<10;i++){
              nameList[i] = "无";
          }
      }
      
      //重载 [] 来操作成员变量数组
      public string this[int index]{
          //自定义get方法
          //返回成员字段nameList中的数据
          get{
              string tmp;
              if(index >= 0 && index < nameList.Length){
                  tmp = nameList[index];
              }else{
                  tmp = "";
              }
              return tmp;
          }
          //自定义set方法
          //设置成员变量nameList中的数据
          set{
              if(index >= 0 && index < nameList.Length){
                  //value为使用[]时等于号右边的值
                  nameList[index] = value;
              }
          }
      }
      
      //可以同时对[]操作符中间的数值类型进行重载
      public int this[string name]{
          get{
              ...
          }
          set{
              ...
          }
      }
  }
  ```

* 对接口[ ]的重载和使用

  ```c#
  //带[]重载的接口
  public interface ISomeInterface{
      int this[int index]{
          get;
          set;
      }
  }
  //实现带[]重载的接口, 那么就要实现[]的get和set方法
  class IndexClass : ISomeInterface{
      private int[] arr = new int[100];
      public int this[int index]{
          get{
              return arr[index];
          }
          set{
              arr[index] = value;
          }
      }
  }
  ```

  



#### c#通过委托调用方法

> 就是通过指针调用方法

> 其实就是c++中的函数指针

* 普通的单个方法委托

  ```c#
  //通过委托可动态地调用方法
  namespace aaa{
      //定义一个委托 . 该委托的目标方法返回值为int,参数列表为一个int
      delegate int NumberChanger(int n);
      class Program{
          static int num = 10;
          static void Main(){
              //通过静态方法创建一个委托实例 
              //传入参数为被委托的方法的名字 , 该方法的返回值和参数应当符合委托定义
              NumberChanger nc = new NumberChanger(Add);
              //直接像使用方法一样来使用委托实例 , 来对目标方法进行调用
              nc(20);
              
              //通过实例化对象的方法创建一个委托实例
              MyClass mc = new MyClass();
              NumberChanger nc1 = new NumberChanger(mc.Add);
              nc1(20);
          }
          //被委托的方法 , 该方法为静态方法 , 同时符合委托的返回值和参数的要求
          public static int Add(int p){
              num += p;
              return num;
          }
      }
      
      //包含要被委托方法的类
      class MyClass{
          private int num = 10;
          public int Add(int p){
              num += p;
              return num;
          }
      }
  }
  ```

* 包含多个方法的多重委托

  ```c#
  namespace n{
      //定义一个委托
      delegate void D(int m);
     
      class C1{
          static void Main(){
              //创建一个委托
              D d1 = new D(C2.m1);
              //创建一个委托
              D d2 = new D(C2.m2);
              //使用一上两个委托创建一个多重委托
              D d3 = d1 + d2;
              C2 c2 = new C2();
              D d4 = new D(c2.m3);
              //使用 += 修改链式委托
              d3 += d4;
              //使用 -= 修改链式委托 , 会减去方法链中最后被添加的方法
              d3 += d1;
              d3 -= d1;
              //调用多重委托
              //方法链不能为空 ,否则在调用的时候报错
              d3(10);
          }
      }
      
      //包含多个要被委托方法的类
      class C2{
          public static void m1(int m){
              ...
          }
          public static void m2(int m){
              ...
          }
          public void m3(int m){
              ...
          }
      }
  }
  ```








#### c#泛型

###### *类上的泛型*

* 同c++

* **限制泛型参数类型** : 可在定义泛型的时候限定类型只能为值类型或者引用类型

  ```c#
  //限定第一个泛型的类型只能为值类型 , 那么在使用的时候就不能传入 string 等引用类型
  public class MyArray<T,K> where T : struct{
      ...
  }
  
  //限定第一个泛型的类型只能为引用类型
  public class MyArray<T,K> where T : class{
      ...
  }
  
  //限定第一个泛型的类型只能为接口类型
  public class MyArray<T,K> where T : interface{
      ...
  }
  
  //限定第一个泛型的类型只能为指定的类型或该类型的子类 , 这里的IClass为自定义的类型
  public class MyArray<T,K> where T : IClass{
      ...
  }
  
  ```

* **泛型类的继承**

  * 将子类作为普通类来继承

    ```c#
    class ParentClass<T> where T : struct{...}
    
    //设置了父类的泛型, 那么就相当于继承了一个普通类
    class Sub : ParentClass<int>{...}
    ```

  * 将子类仍然作为泛型类

    ```c#
    class ParentClass<T> where T : struct{...}
    
    //不设置泛型进行继承
    class Sub<T> : ParentClass<T> where T : struct{...}
    ```

###### *方法上的泛型*

* ```c#
  //定义
  public void FMethod<T>(T t){...}
  
  //使用
  FMethod<string>("abc");
  ```

###### *委托delegate上的泛型*

* ```c#
  //定义
  delegate T D<T>(T t);
  
  //使用 , AddNum为符合委托的方法名
  D<int> d = new D<int>(AddNum);
  ```

###### *泛型还可以在interface等地使用*





#### c#attribute

* 相当于java中的注解

* Conditional 设置方法的运行条件

  ```c#
  //该方法只有在debug模式下才能运行
  [Conditional("DEBUG")]
  public void test(){}
  
  ```

* Obsolete 设置为过时的方法

  ```c#
  //调用时会报此错误
  [Obsolete("don`t use old method")]
  public void test(){}
  
  ```

* 通过继承 System.Attribute 来实现自定义的attribute

  ```c#
  //定义一个attribute , 命令应当是 名字+Attribute , 使用的时候直接使用名字
  //设置该自定义的Attribute的使用范围 (这里为class) 和 是否允许在同一个类及其方法上同时使用(这里设置为不允许) 和 设置当该注解所在的类被继承时,注解是否同时被继承(这里设置为不同时被继承)
  [AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited=false)]
  public class HelpAttribute : Attribute{
      protected string name;
      public HelpAttribute(string name){
          this.name = name;
      }
      //attitude中的property就是使用该Attribute时传入的参数列表
      public string name{
          get{
              return this.name;
          }
      }
  }
  
  //使用自定义的Attribute
  [Help("this is name")]
  public class AnyClass{}
  
  ```

  



#### c#反射

* 通过实例来获取类

  ```c#
  string s = "this is a string";
  Type t = s.GetType();
  Console.WriteLine(t.FullName);
  
  ```

* 通过类型字符串获取类型

  ```c#
  //类型字符串 , 如果根据该字符串没找到类型是否报错. 是否忽略该字符串大小写
  Type t = Type.GetType("System.String", false, true);
  Console.WriteLine(t.FullName);
  
  ```

* 使用typeof获取类型

  ```c#
  Type t = typeof(string);
  Console.WriteLine(t.FullName);
  
  ```

* 通过类型获取类型下的方法

  ```c#
  Type t = typeof(string);
  //获取所有方法
  MethodInfo[] mis = t.GetMethods();
  
  //获取指定方法
  MethodInfo mi = t.GetMethod("Copy");
  
  //使用BindingFlags枚举类来限定获取方法的类型
  //传入参数设置返回的方法为 public 或者 是非静态方法(能够实例化的方法)
  MethodInfo[] mis = t.GetMethods(BindingFlags.Public | BindingFlags.Instance);
  
  ```

* 通过类型获取类型下的字段和属性

  ```c#
  Type t = typeof(string);
  
  //获取所有的字段
  t.GetFields();
  //获取所有属性
  t.GetProperties();
  
  ```

* 动态加载Assembly程序集 ( 相当于导包 )

  ```c#
  class Progrem{
  	static void Main(){
  		//新建程序集变量
  		Assembly obja;
  		//加载程序集
  		obja = Assembly.Load("mscorlib,2.0.0.0,Neutral,b77a5c561934e089");
  		//使用程序集 , 获取该程序集下包含的类型
  		Type[] types = obja.GetTypes();
  	
  		//加载当前程序集
  		obja = Assembly.GetExecutingAssembly();
  		//获取当前程序集下的类型 , 这里获取的是下面的Car类
  		Type t = obja.GetType("Reflection.Car", false, true);
  		//创建该类的实例
  		object obj = Activator.CreateInstance(t);
  		//获取该类的方法
  		MethodInfo mi = t.GetMethod("Ins");
  		//使用上面创建的实例执行该方法
  		var res = (bool)mi.Invoke(obj, null);
  	}
  }
  
  //当前命名空间下的另外一个类Car
  public class Car{
      public bool Ins(){
          return true;
      }
  }
  
  ```





#### 流程控制

* if/else 同java

* switch 同java

* for 同java

* foreach 同js

  ```c#
  foreach(var i in alist){
      //...
  }
  
  ```

  * 被循环的对象必须实现了 IEnumerable 接口

* while 同java

* do/while 同java







#### C#预处理

* define 

  * 预定义参数 , 不能指定该参数对应的值

  ```c#
  #define DEBUG
  ```
  
* undef 

  * 取消预定义

  ```c#
  #define  DEBUG
  #undef DEBUG
  ```
  
* region / endregion 

  * 可折叠代码段 , 仅在vs中有效

  ```c#
  #region 这段代码可折叠,这句是折叠后的备注
      //代码段...
  #endregion
  ```
  
* if / else / elif / endif

  * 条件预处理 , 结合 define 使用

  ```c#
  //预定义了DEBUG
  #define DEBUG
     
      //...
      #if (DEBUG) //如果DEBUG预定义了,那么为true
      	Console.WriteLine("DEBUG is defined");
  	  #endif
      //...
  ```
  
* warning

  * 警告预处理指令 , 直接抛出警告 , 编译完就会在控制台产生警告

  ```c#
  #warning this is a warning
  ```
  
* error

  * 错误预处理指令 , 编译完直接在控制台产生错误

* line

  * 行数预处理 , 该指令下一行为指定的行数 , 可结合waning和error使用
  * 可添加文件名来修改输出的文件名
  * 使用default参数来使用默认的行数

  ```c#
  #line 200 "newFile"
      #warning 这一行的警告显示的是第200行, 显示警告的文件名为newFile
      
  #line default //下一行开始使用默认的行数
  ```
  
* pragma

  * 可禁用默认的预处理指令
  * 可恢复默认的预处理指令

  ```c#
  namespace Pre{
      //禁用 编号为 414 和 3021 的warning指令
  	#pragma warning disable 414,3021
          //这一行会产生3021号warning
          //这里禁用了3021的warning, 所以不会显示该警告
          [CLSCompliant(false)]
          class Pro{
              //...
          }
      //重新启用warning指令
      #pragma warning restore 3021
          //这里启用了3021号warning, 所以会显示该警告
      [CLSCompliant(false)]
          public class D{
              //...
          }
  }
  ```
  




#### C#正则

1. 使用c#内置的正则表达式命名空间

```c#
using System.Text.RegularExpressions;
namespace ttt{
    class Progrem{
        static void Main(){
            var str = "abc";
            var pattern = "abc";
            Console.WriteLine(Regex.IsMatch(str,pattern));
            Console.ReadLine();
        }
    }
}

```

2. 或者使用vs中安装的正则插件 , 这里使用 Regular Expression Tester





#### C#匿名函数

```c#
namespace Anp{
	class Program{
        //定义一个委托函数
        delegate void testDelegate(string s);
        //定义一个要被委托函数调用的函数
        static void M(string s){
            Console.WriteLine(s);
        }
        static void Main(){
            //可以使用传函数指针的方式来创建委托
            testDelegate td = new testDelegate(M);
            //也可直接使用匿名函数来创建委托
            testDelegate td = delegate(string s){Console.WriteLine(s);};
            //也可以使用lambda函数的方式写匿名函数
            testDelegate td = (x) => { Console.WriteLine(x); };
            
            //执行委托
            td("hahaha");
            
            Console.ReadLine();
        }
    }
}
```





#### C#lambda表达式

```
(x) => { x==5 };
```





#### C#LINQ语句

> Lanuage Intergarted Query  : 用于对数据进行遍历查询的语句

```c#
{
    //作为linq数据源的类型必须实现了 IEnumerate 接口, 这里数据源类型是数组, 已经实现了该接口
	int[] numbers = [5,10,8,3,6,12];
    //1.使用语句查询
    	//from in 相当于 foreach
    	//where 相当于 if 过滤 , 使用 && 和 , || 或
    	//orderby对结果排序 , 默认升序 , 使用 orderby num descending指定降序
    	//group ... by ... , 对某个属性分组, 返回的结果为组的列表 
    		//通过key属性获取组名, 遍历每一个组获取其成员
    		//group ... by ... into ... 将分组结果命名 , 接下来可以使用这个命名来操作
    		//例如 group c by c.City into cusGroup where cusGroup.Count()>=2
    	//join ... on <条件> 连接查询 
    		//例如 from c in customers join e in employees on c.Name equals e.Name
    	//let 创建中间变量
    		//例如 from word in words let w=word.ToUpper() select w
    	//select 相当于 return
    var numQuery1 = from num in numbers 
        			where num %2 == 0 
        			orderby num
        			select num;
    //linq语句默认在使用其查询结果时才会执行, 可以调用查询结果的方法来使其执行
    int numCount = numQuery1.Count();
    numQuery1.ToList();
    numQuery1.ToArray();
    foreach(var i in numQuery1){
        Console.Write(i+" ");
    }
    //2.使用方法查询
    var numQuery2 = numbers.Where(n => n%2==0).OrderBy(n=>n);
    foreach(var i in numQuery2){
        Console.Write(i+" ");
    }
}

```





#### C#Linq库中的扩展方法

> 通过引入Linq的命名空间可使用对实现了 IEnumerable 的类型的扩展方法

```c#
using System.Linq;

...
    
    //int数组,本身无操作方法
    int[] ints = {1,2,34,4,3,5,6,6,};
	//使用linq对其的扩展方法
	var res = ints.OrderBy(g=>g);
	foreach(var i in res){
        Console.Write(i+" ");
    }

```

> 自定义扩展方法

```
//扩展方法应当写在静态类中
public static class StringExtention{
	//扩展方法应当是静态方法
	//参数应为: this <要扩展的类型> 形参 , 这里的this表示这是个扩展方法
	public static int WordCount(this string str){
		return str.split(' ').length();
	}
}
...
//使用扩展方法应当先包含扩展方法所在的命名空间
{
	string s = "aahha h shjks hk s";
	int count = s.WordCount();
}
```





> XAMPP :  用于开启后台服务的服务器

### *H5*

* iframe 框架标签

  * iframe应当处于和body同一级别上

  ```html
  <html>
      <head>
      </head>
      <!--src设置使用iframe框架文件的路径-->
      <iframe src="frameA.html"> 
      </iframe>
  </html>
  ```

  

### JQuery

* api.jquery.com 查看api
* 可以使用jQuery的链式调用实现连续的动画



### css3

* ***变化***

  * translate 移动

    ```css
    {
        transform: translate(200px,200px);
        -webkit-transform: translate(200px,200px); /*safari chrome*/
    }
    ```

  * rotate 旋转

    ```css
    {
        transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
    }    
    ```

  * scale 缩放

    ```css
    {
        transform: scale(1 ,2); /* 宽和高的缩放程度 */
        -webkit-transform: scale(1 ,2);
    }
    
    ```

  * skew 倾斜

    ```css
    {
        transform: skew(50deg , 50deg); /*x轴倾斜角度 , y轴倾斜角度*/
        -webkit-transform: skew(50deg , 50deg); 
    }
    
    ```

  * matrix 矩阵效果

  * rotateX  x轴旋转 和 rotateY y轴旋转 (3D)

    ```css
    {
        transform: rotateX(120deg);
        -webkit-transform: rotateX(120deg);
    }
    
    ```

* ***过渡 ( 变化加过渡才能有动态改变的效果 )***

  * transition 设置过渡的四个属性

    ```css
    .div{
        width: 100px;
        height: 100px;
        /*宽的过渡时间, 高的过渡时间, 变化的过渡时间*/
        transition: width 2s, height 2s, transform 2s;
        -webkit-transition: width 2s, height 2s, -webkit-transform 2s; 
    }
    .div:hover{
       /*设置宽和高以及变化*/ 
        width: 200px;
        height: 200px;
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
    }
    
    ```

* ***动画animate***

  * 需要设置动画的名称和动画时间

  * 需要设置动画不同执行节点的状态

    ```css
    div{
        width: 100px;
        height: 100px;
        background-color: red;
        position: relative;
        /*设置一个动画 , 名字为anim , 执行5s , 无限循环*/
        animate: anim 5s infinite alternate;
        -webkit-animate: anim 5s infinite alternate;
    }
    
    /*设置这个名字为 anim 的动画具体如何执行*/
    @keyframes anim{
        0%{background-color: red;left:0px;top:0px;} 
        25%{background-color: blue;left:100px;top:0px;} 
        75%{background-color: red;left:100px;top:100px;} 
        100%{background-color: red;left:0px;top:0px;} 
    }
    /*浏览器适配: chrome*/
    @-webkit-keyframes anim{
         0%{background-color: red;left:0px;top:0px;} 
        25%{background-color: blue;left:100px;top:0px;} 
        75%{background-color: red;left:100px;top:100px;} 
        100%{background-color: red;left:0px;top:0px;} 
    }
    
    ```

* ***多列 (将一块区域分割成多个部分)***

  * 该功能需要浏览器适配

  * column-count 分割成几块

  * column-gap 块之间的间距

  * column-rule 分割线的样式

    ```css
    .di{
        column-count: 4;
        column-gap: 30px;
        column-rule: 2px outset #666;
        -webkit-column-count: 4;
        -webkit-column-gap: 30px;
        -webkit-column-rule: 2px outset #666;
    }
    
    ```

* ***css3实现瀑布流 :  直接使用分列即可实现***





### ***less*** 

* 安装less编译器 

  1. `npm install -g less`
  2. 或者直接将 `less.js`下载到本地

* 使用

  * 变量

    ```less
    //声明变量
    @color: #4D926F;
    //使用变量
    #header{
        color: @color;
    }
    
    ```

  * 编译 

    * 使用命令 `lessc test.less > test.css` 生成css文件
    * 在html中引入 `less.js` 和 `less` 文件即可

  * 使用样式类

    ```less
    //创建一个样式类, 名字是radius , 参数是rad , 默认值为 5px
    //在这个类中设置使用该rad变量作为属性的数值
    .radius(@rad:5px){
        border-radius: @rad;
    }
    
    //使用这个样式类, 这里使用默认的参数值
    #header{ 
        .radius;
    }
    //使用这个样式类, 这里使用参数值为10px
    #footer{
        .radius(10px);
    }
    
    ```

  * 嵌套选择器

    ```less
    //相当于 #header h1{ font-size: 10px; }
    #header{
        h1{
            font-size: 10px;
            //&相当于当前元素 , 也就是h1
            &:hover{
                font-size: 12px;
            }
        }
    }
    
    ```

  * 属性运算

    ```less
    //变量bor
    @bor: 1px;
    
    //使用变量进行计算
    #header{
    	border-left: @bor*3;
    }
    
    ```

  * 监视模式 ( 自动更新编译 )

    1. 在url后面加上 `#!watch`
    2. 刷新页面
    3. 或者在终端执行 `less.watch()` 来启动监视模式



### sass

* scss样式库 , 包含了大量的 mixin 片段 , 函数

* 安装

  1. 因为sass基于ruby , 所以要先安装ruby  , 安装时选择将ruby命令添加到系统path中
  2. 使用管理员打开命令行 , 使用 `gem install sass` 安装sass
  3. 此时因为网络的原因 , 直接使用第二步安装是安装不上的
  4. 删除gem默认安装源地址 `gem sources --remove https://rubygems.org/`
  5. 设置gem安装源地址为淘宝镜像地址 `gem sources -a https://ruby.taobao.org/`
  6. 更新安装源文件列表 `gem sources -l`
  7. 安装sass `gem install sass`

* 使用 (.scss)

  * 变量

    ```scss
    //定义变量
    $color: #333;
    //使用变量
    body{
        color: $color;
    }
    ```

  * 嵌套 , 同less

  * 导入

    * 被导入的文件 `_reset.scss`

    * 导入文件

      ```scss
      //文件命名要加下划线 , 使用时直接使用名称
      @import 'reset';
      ```

  * 可重用的代码片段 ( 常用于浏览器兼容 )

    ```scss
    //设置代码片段 , 名字是 box-s , 参数是sizing
    @mixin box-s($sizing){
        -webkit-box-sizing: $sizing;
        -moz-box-sizing: $sizing;
        box-sizing: $sizing;
    }
    //使用名字为 box-s 的代码片段 , 传入参数 border-box
    .box{
        @include box-s(border-box);
    }
    ```

  * 继承样式

    ```scss
    //被继承的样式
    .mes{
    	border: 1px solid #666;
    }
    //继承样式
    .success{
    	@extend .mes;
    }
    ```

  * 运算

    ```scss
    .article{
        width: 600px / 960px;
    }
    ```

  * 颜色函数

    ```scss
    $baseColor: #08c;
    
    //使用颜色函数
    a{
        color: darken($baseColor, 10%);
    }
    ```

* 编译 `sass index.scss > index.css ` 默认生成到当前文件夹

