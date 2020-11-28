# C++



>库文件实际上是所有函数逻辑打包后的文件

>静态库文件 : 包含了全部的包括调用函数的代码 window: .lib , linux: .a , 因为代码比较全所以比较大

>动态库文件 : 只包含本身代码的逻辑, 不包含其调用的其他库文件中函数的逻辑代码 , windows: .dll , linux: .so

>关于常量的定义 : c++中的 const int N = 100其实就是c里面的#define N 100

>重定向输入流 : 使用文件内容作为程序的输入
>
>```
>#这里使用abc.txt中的内容作为程序test.exe的输入, 然后将程序执行结果输出到res.txt中
>>test.exe < abc.txt > res.txt
>```


>对于程序中的浮点数 : 
>
>​		因为浮点数在内存中都是非精度存储 , 所以判断浮点数是否相等一律使用 fabs(a,b)<1e-05

>c++中的两种字符串 : 
>
>1. c-string : 
>    - c语言中的字符串 , 本质是字符数组(常量字符指针)
>    - 结束符为 '\0'
>    - 实际长度为字符串长度+1
>    - 保存位置 : 栈 -> 全局数据区
>2. string类 : 
>    * c++中的字符串类 , 包含各种内置方法


> system("pause"); 是显示 按任意键退出...
>
> system("cls"); 清屏



> 由于局部变量保存在栈区, 由编译器控制其生命周期, 所以不能将其地址作为函数返回值, 会使得这个返
>
> 回的地址是无意义的. (编译器为防止这个问题,会保存一次这个地址上的值)



> ***new 和 delete***
>
> 使用new在堆区开辟内存: int * p = new int(10);  开辟int大小的内存,并且赋初值为10,最后返回这段内存的地址
>
> 使用delete 释放堆区开辟的内存: delete p;   
>
> 释放开辟的数组空间: delete[] arr;
>
> 如果arr是一个数组 , 使用 delete arr; 那么只会归还 arr 数组第一个元素所占的内存, 后面的内存不会归还, 这些没被归还的内存无法再被使用, 这就造成了内存泄漏 , 如果内存泄漏过多 , 会导致内存越来越不足.  



> ***mutable*** 
>
> 用于修饰变量 , 该变量为可变的 , 即使该变量在const函数或者const类中



>c++项目结构：
1. 创建外部方法的 .h **头文件**， 其中写方法的声明
2. 在类的头文件中 写 #pragma once (**防止多次包含**)
3. 创建外部方法的**源文件**， 其中引用包含该方法声明的头文件，在源文件中写直接写各个类成员方法的实现, 其中在每个方法名的前面加上   类属:: (类属为类的名字)
4. 在要使用该方法的cpp文件中使用**引用包含声明的头文件**， 然后直接使用方法即可
* 建议把函数定义写到h文件中, 把函数实现写到cpp中, cpp文件可打包为库文件, 从而达到隐藏函数实现的效果, 别人在调用这个库文件时, 只要引入对应的h文件, 然后就可以知道函数的定义并且可以使用, 但是不知道源码.





## *指针*

>指针变量的本质是 unsigned int (4个字节)
>32位操作系统中, 指针变量占用4个字节, 64位操作系统中, 指针变量占用8个字节





>***空指针*** : 指向内存地址为0的指针变量 , 内存地址为0~255的内存为系统占用内存,不允许用户访问

>空指针定义 : int *p = NULL; 用于初始化指针变量

>***野指针***: 指向非法内存空间的指针变量 , 比如 int *p = (int *)0x0011;

>***常量指针*** : const int * p = &a;  指针的指向可以修改,指向的值不可以修改 (指向常量的指针)
>
>***指针常量***: int * const p = &a; 本身是个常量的指针, 指向不可以修改,指向的值可以修改
>
>***常量指针常量*** : const int * const p = &a; 本身是个常量, 而且指向的值也不能修改的指针, 指向不能改, 指向的值也不能改

>***结构体指针*** : student * p = s; 使用指针访问成员变量: p->name;

>***函数指针*** : 指向函数的指针 
>
>==> 函数指针指向的函数必须和其类型相同  
>
>==> 函数的类型为 : 把函数的定义中的函数名去掉
>
>==> 函数指针的类型 : 把函数指针中的指针名去掉
>
>==> 函数指针的定义 : <返回类型>  (* 指针名)(函数的参数列表) : 如 int (*p) (int);
>
>```c++
>//定义一个函数
>int g(int);
>//定义指向该函数的指针
>int (*gp)(int)=g;
>```
>
>==> 使用函数作为形参
>
>```c++
>//定义一个函数 , 参数列表为 int类型的指针, (返回int类型的)(参数列表为int的)函数地址(即函数名)
>void f(int*,int(*)(int));
>```



>将函数的形参设置为指针, 可以防止因为复制数据而占用过多的内存空间
>
>同时为了防止在调用函数的过程中对原数据进行误操作, 可以使用const 修饰形参指针变量





## *引用*

> ***引用的本质 :*** 
>
> ​	引用的本质是指针常量: int &p = a; --> int * const p = &a; 所以引用的指向不可以修改,但是值可以修改.
>
> ​	对引用的赋值操作时 , 编译器会自动转化为指针操作. p = 10; --> *p = 10;
>
> ​	引用就相当于给变量起别名.  
>
> ​	int a = 10; int &b = a; 相当于a的别名是b, 对b的操作等同于对a的
>
> ***引用的使用***
>
> ```c++
> //创建引用时, 必须赋初值, 而且初始化之后, 不能再改变引用的指向. 
> int a = 10; 
> int &b = a; //创建引用b指向a
> int c = 20;
> b = c; //没有改变b引用的指向, 实际上只是改变的b的值,也就是改变了a的值
> ```
>
> 使用引用进行地址传参 -- 传递的是变量本身
>
> 例如: 
>
> ​	---> 原函数中: swap(a,b);
>
> ​	---> 调用的函数: void swap(int &a, int &b){ int tmp = a; a=b; b=temp; }




>***引用作为函数的返回值***
>
>使用引用类型作为函数的返回值(  eg: int& test(){xxx}  ): 相当于返回某个变量本身(不要返回局部变量)
>
>返回引用类型的函数的调用可以作为表达式的左值(表达式左边), 相当于对返回的变量进行操作.



>***常量引用***
>
>​	使用常量引用防止引用指向的变量被误修改
>
>​	例如 : void print(const int &p){ xxx } -> 该函数中对引用p只能进行读操作,防止了误修改.(本质就是常量
>
>指针常量)



> ***使用引用实现链式编程 :*** 在函数中返回对象类型的引用 ( 如 Person & )



## *函数*

>***函数的默认参数***
>
>​	void fun( int a, int b = 10, int c = 20 ){ xxx }
>
>​	---> 默认参数必须在形参列表的末尾
>
>​	---> 如果是先声明后定义的函数, 在声明和实现中只能有一个指定默认参数

>***函数的占位参数***
>
>​	void fun( int a , **int = 10** ){   }
>
>​	---> 如果占位参数没有默认值, 则调用函数时必须传这个参数. 同时占位参数可以有默认值.

>***函数的重载*** 
>
>​	即相同的函数名, 不同的参数
>
>​	---> 加const的引用形参和不加const的引用形参可以作为函数参数重载( const int &a 和 int &a, 调用分别	为 10 和 a )
>
>​	---> 使用默认函数时重载要注意不能因为默认参数而引起冲突



> ***常函数( const 函数 )***
>
> ​	使用 : void fun() const { ... }  
>
> ​	在常函数中不能修改任何成员变量
>
> ​	如果一定要修改某个成员变量 , 使用 mutable 修饰该成员变量
>
> ​	本质:  void fun() const { ... } 就是 const Person * const this; ( 设置this为常量指针常量,故不可修改其他成
>
> ​	员变量 )



## *类*

* 没有任何属性的类的对象占1个字节
* 只有类上的非静态成员变量跟类的对象存储到一块 ( 静态的成员存到了全局数据区 )



> ***成员初始化列表***

```c++
class Person{
	int a,b,c;
	//成员初始化列表在构造函数体之前执行
	Person(int a , int b, int c):m_A(a), m_B(b), m_C(c){
	//构造函数体
	}
}
```

- **对象类型的成员属性只能在成员初始化列表中赋值** ,  传给初始化列表的实参为传给该对象构造函数的形参

- 类中的**常量类型和引用类型的成员变量**只能在成员初始化列表中赋值

- c++规定, 类中任何成员变量不能在声明时赋值

    ```c++
    class Person{
    	//不允许在声明时赋值
    	//int a=10;
    }
    ```

    

> ***构造函数和解构函数***
>
> ​		Person(){ xxx } 和 ~Person(){ xxx }  解构函数不可加参数, 因此不可重载
>
> * 如果对象中包含指针成员, 在构造函数中对指针进行在堆区的内存申请, 则在解构函数中应当释放在堆区申请的内存.



> ***拷贝构造函数***
>
> * 使用该类的一个实例去初始化另外一个实例时调用该构造函数
>
> * 编译器默认提供拷贝构造函数 , 就是将每个字段都直接等号赋值 , 这被称之为 浅拷贝 , 如果对象包含指针成员变量, 则浅拷贝会拷贝指针上地址的值 , 从而使编译器在对不同的对象实例进行解构时会因为堆区内存被重复释放而报错.
>
> * 
>      为了避免浅拷贝带来的重复解构问题, 应当重写解构函数对指针成员变量进行深拷贝.(重新申请堆区内存)
>
>    * 深拷贝 与 浅拷贝 (如果构造函数有在堆区进行申请内存空间的操作, 使用深拷贝方法 , 即手动写构造函数)
>
> * Person( const Person &p ){ 使用p进行初始化操作... } (调用该构造函数实现拷贝)
>
> * 在值传参的函数调用时, 自动调用该参数类型的拷贝构造函数拷贝一份供函数使用
>
> * 如果只在拷贝函数中修改部分数据, 则只按照自定义中修改的属性来修改 , 其余的保持原来的拷贝逻辑(同react中的setState()). 
>* 在值返回对象的函数中, 执行到返回那句代码时, 会调用拷贝函数, 返回一个拷贝的对象.



> ***新建实例的方法***
>
> 1. (推荐)括号法 👍👍👍👍👍
>     * Person p;(默认调用无参) 
>     * Person p1(10); (默认调用有参) 
>     * Person p2(p); (默认调用拷贝)
> 2. 显式法(就是java法然后去掉new)
>     * Person p;(默认调用无参) 
>     * Person p1 = Person(10); (调用有参) 
>     * Person p2 = Person(p); (调用拷贝)
> 3. 隐式调用法
>     * Person p = 10; (调用有一个int参数的构造) 
>     * Person p = p1; (调用拷贝构造)



> ***匿名对象***  
>
> ​	Person(10); 编译器在该行代码运行结束就解构该对象
>
> ​	不要使用拷贝构造初始化匿名对象: Person(p); 编译器会解析为 Person p; 认为是对p的重定义而报错.



>***静态成员函数***
>
>​	static void fun(){ xxx }  (静态成员函数只能访问静态成员变量)
>
>==> 调用的方式 
>
>1. 通过实例调用  Person p;  p.fun(); 
>
> 		2. 通过标明类属调用  Person::fun();(静态成员变量的访问 Person::m_A = 10;)
>
>* 静态成员函数也可设置访问权限(public, private, protected)



>***this: 对象指针***  
>
>实质是指针常量,不可修改指向, 使用: this->age 
>
>java中的指针, 是实例本身, 并不是指针类型



>***对于为NULL的对象指针***
>
>对象的空指针可以访问类的成员函数(Person *p = NULL), 但如果调用的函数中涉及到成员变量, 就会因指针为空而报错. 
>
>所以为了防止空指针的非法调用而报错 , 在成员函数中加: if( this == NULL ) return;



>***常对象***
>
>const Person p; 对于该对象, 除了mutable属性外都不可修改
>
>常对象只能调用它的常函数( 因为普通函数可以修改普通属性, 如果能调用普通函数, 则意味着常对象能修改普通属性, 则与其本身特性矛盾 )



>***类的声明***
>
>class Person;



>***类的声明和实现分离***
>
>1. 类内写声明. 
>2. 类外写实现 , 实现要加从属域 void Person::fun(){ ... }



>***友元***
>
>可以访问类内private的元素 
>
>1. 全局函数为友元
>
>```c++
>class Person{  
>	//定义fun这个函数为当前类的友元
>	friend void fun( );
>  	public: ...  
>    private: ...  
>}   
>//写友元定义时不需写权限范围
>```
>
>2. 类作为友元
>
>friend class GoodGay;
>
>3. 类中的成员函数做友元
>
>friend void GoodGay::visit( );



>***运算符重载*** 
>
>==> 使用原有的运算符对自定义的类对象进行操作
>
>==> 重载函数也可根据参数重载: 实现如 Person + Int , Person + Person + Person 等
>
>==> 内置数据类型的默认运算操作不可重载
>
>1. +的重载: 
>    ① 成员函数重载 class Person{ public: Person operator+( const Person &p ){ ... } }
>
>    ​          实现Person + Person 
>
>    ​          使用:  Person c = a.operator+(b) 或 Person c = a + b;( a,b都是Person )
>
>    ② 使用全局函数重载 Person operator+( Person a, Person b ){ ... }
>
>    ​          使用:  Person c = operator+(a,b) 或 Person c = a + b;( a,b都是Person )
>
>2. <<(左移运算符)的重载
>
>    使用cout对自定义对象的自定义输出
>
>    ① 只能全局函数重载  
>
>    ```c++
>    ostream & operator<<( ostream & o, Person &p ){
>        o<< p.m_age << "," << p.m_name;  return o;
>    }
>    //cout是ostream类型的对象
>    //函数实质是: operator<<(cout, p)
>    //返回ostream &实现链式编程
>    ```
>
>3. ++(递增运算符)的重载
>
>    ```c++
>    #include <iostream>
>    using namespace std;
>    
>    class Myint
>    {
>    	//设置左移重载函数可以访问私有成员
>    	friend ostream & operator<<(ostream & o, Myint myint);
>    
>    public :
>    	Myint(){
>    		this->num= 0;
>    	}
>    
>    	//重载前置递增符号, 返回的是对象本体, 目的是可连续前置递增
>    	Myint&  operator++(){
>    		(this->num)++;
>    		return *this;
>    	}
>    	//重载后置递增符号, 参数为一个int的占位参数, 标记此函数重载的是后置递增
>    	//返回的是值, 目的是实现先用后算
>    	Myint operator++(int){
>    		//记录当前状态
>    		Myint temp = *this;
>    		//进行递增操作
>    		(this->num)++;
>    		//返回记录的值
>    		return temp;
>    	}
>    
>    private :
>    	int num;
>    };
>    
>    //重载左移运算 , 参数为 输出流对象, 输出目标对象, 返回的是 输出流本体 , 目的是链式编程
>    ostream & operator<<(ostream & o, Myint myint)
>    {
>    	cout<< myint.num;
>    	return o;
>    }
>    
>    //测试前置递增
>    void testBefore(){
>    	Myint myint;
>    	cout<< ++myint <<endl;
>    }
>    //测试后置递增
>    void testAfter(){
>    	Myint myint;
>    	cout<< myint++ << endl;
>    }
>    
>    int main(){
>    	
>    	testBefore();
>    	testAfter();
>    
>    
>    	system("pause");
>    	return 0;
>    }
>    ```
>
>4. =(赋值运算符)的重载
>
>    ```c++
>    //使用赋值运算符的重载实现对自定义对象的深拷贝
>    class Person{
>    
>    public:
>    
>        Person(){
>            m_age = new int(18);
>        }
>    
>        ~Person(){
>            if(m_age != NULL){
>                delete m_age;
>                m_age = NULL;
>            }
>        }
>    
>        int *m_age;
>    
>    
>        Person & operator=(Person  &p){
>    
>            //清除原有的指针信息
>            if(m_age != NULL){
>                //释放内存空间
>                delete m_age;
>                //指针设置为空
>                m_age = NULL;
>            }
>    
>            //在堆区开辟新的内存空间
>            m_age = new int(*p.m_age);
>    
>            //返回对象本体, 实现链等操作 ( c=b=a )
>            return *this;
>    
>        }
>    
>    }
>    ```
>
>5. == 和 != 关系运算符的重载
>
>    ```c++
>     bool operator==(Person & p){ ... } 
>     bool operator!=(Person & p){ ... }
>    ```
>
>6. () (函数调用运算符) 的重载
>
>    ```c++
>    //使得类对象可以像函数一样调用并且返回值, 也叫 仿函数
>    void operator() ( ... ){ ... }
>    ```
>
>    例子:
>    (设类名为MyAdd , 且重载了函数调用运算符)
>    使用: 
>    	① 新建类对象调用 MyAdd myadd;    myadd( ... );
>    	② 使用匿名对象调用 MyAdd()( ... )  ( MyAdd() 相当于创建了一个匿名对象 )




>***类的继承***
>
>class Child : public Parent{ ... } 
>
> ***继承方式***
>
>①public : 父中的public 继承为 public, protected 继承为 protected
>②protected: public 和 protected 都继承为 protected
>③private: public 和 protected 都继承为 private
>
>==> 在继承过程中, 父类的非静态成员变量全部被继承下来, 只是编译器做了处理使得不同的数据类型在子类中有不同的访问权限 (例如 : 父类中3个属性, 子类中1个属性, 则子类的长度为4个属性)



>***使用visual studio自带的开发人员命令行工具 查看类的结构***
>
>①打开该工具
>②cd 切换到cpp源文件目录下
>③dir 查看目录下的文件
>④cl /d1 reportSingleClassLayoutXXX "cpp的文件名"  ( XXX是源文件中包含的要查看的类的名字 )
>⑤命令行会列出类的结构



>***继承中的构造和解构的顺序*** ( 栈 )
>
>父类构造
>子类构造
>子类解构
>父类解构



>***继承中的同名成员***
>
>访问 子类中的属性 , 直接访问 s.m_A;
>访问 父类中的属性 , 加上从属域访问 s.Base::m_A;
>访问 子类中的函数 , 直接访问 s.fun();
>访问 父类中的函数 , 加上从属域访问 s.Base::fun();
>
>==> 父类中的所有同名重载函数, 都需要加从属域来访问
>
>继承中的同名静态成员属性: 
>
>①通过对象访问 s.m_A; 和 s.Base::m_A;  ( 访问父类中的同名属性要加从属域 )
>②通过类名直接访问 Son::m_A; 和 Son::Base::m_A; ( 访问父类中的同名属性要加从属域 )
>
>函数: 
>
>①通过对象访问 s.fun(); 和 s.Base::fun(); 
>②通过类名直接访问 Son::fun(); 和 Son::Base::fun();



> ***类的多继承***
>
> ```c++
> class Son : public Base1, protected Base2, ....{ ... } 
> ```
>
> 多继承中使用重名的来自不同父类的属性 :
>
> ```c++
> //就是加上所属域
> Son s; 
> s.Base1::m_A;
> s.Base2::m_A';
> ```
>
> ***不建议使用多继承***



> ***类的菱形继承***

* Base, Sheep, Too, SheepToo 四个类, Sheep 和 Too 继承 Base, SheepToo 同时继承 Sheep 和 Too 类, 此时对于在 Base 上的属性, SheepToo的父类作用域上各有一份 . 若场景需要将两份属性视为一种属性, 则使用虚继承.

```c++
class Sheep: virtual public Base { ... };
class Too: virtual public Base { ... };
class SheepToo: public Sheep, public Too { ... };
```

* 虚继承实际上是在子类中创建一个属性的指针, 指向父类中的属性值的地址, 所以在多个虚继承的共有子类中调用父类中的属性实际上都指向一个地方.



***



> ***多态***

* 静态多态: 函数重载

* 动态多态: 

  ```c++
  class Animal{
      public :
      virtual void speak(){
          cout<< "动物在说话"<< endl;
      }
  }
  class Cat: public Animal{ 
      public :
      void speak(){
          cout<< "小猫在说话" << endl;
      }
  }
  class Dog: public Animal{
      public :
      void speak(){
          cout<< "小狗在说话" << endl;
      }
  }
  
  void doSpeak(Animal &animal){
      animal.speak();
  }
  void test(){
      Cat cat;
      doSpeak(cat);
      Dog dog;
      doSpeak(dog);
  }
  int main(){
      
      test();
      
      system("pause");
      return 0;
  }
  ```

  1. 父类写 ***虚函数***  .
  2. 子类中重写 虚函数.
  3. 在调用时设置形参为 父类型 的 ***引用***
  4. 传入实参为子类的对象
  5. 在调用函数时即可调用传入对象上的 函数实现, 即 ***动态多态***

  * 实现原理:
    - 直接在父类中写普通函数并且在调用时 传入的参数为 父类的引用时 , 会在***编译阶段就绑定好函数***, 所以无论是传入什么子类对象, 执行的都是***父类的 函数*** (早加载)
    - 在父类中每添加一个虚函数, 父类对象中就会添加一个 ***vfptr( 虚函数指针 )***, 该指针占4个字节, 指向虚函数表中***该函数的地址***.
    - 子类继承父类, 是***完全***将父类中的内容继承下来, 此时子类对象中也有 vfptr ***指向父类中函数的地址***
    - 在子类中***重写***父类的 虚函数, 会使得 vfptr 的指向改为***子类中函数的地址***.
    - 当实现了以上的操作后, 给 父类的引用形参 传入 子类对象 并且调用 函数时, 会运行重写后的 vfptr 的指向函数, 即实现了 ***动态多态*** .



***



> ***纯虚函数 和 抽象类***

在多态的实现中, 父类中的虚函数的实现并无意义, 所以可以把父类中的虚函数变为 ***纯虚函数***, 此时父类也变成了 ***抽象类***.  

```c++
//纯虚函数 
virtual 返回类型 函数名 ( 参数列表 ) = 0;
```

* 抽象类无法实例化
* 子类应当实现父类中的所有 ***纯虚函数***  , 否则子类也为 抽象类



> ***虚解构 和 纯虚解构***

在多态的实现中, 使用 ***父类的指针*** 指向 ***子类的对象*** .

在使用delete释放开辟在堆区的 由父类指针指向的 子类对象 时, 是不会调到 子类中的解构函数的,只会调用到父类中的解构函数.

因此 如果 子类对象中有属性是开辟到堆区 的情况, 那么以上机制就会产生 ***内存泄漏***  的问题.

为了解决这个问题, 将父类中的解构函数改为 ***虚解构函数***  或者 ***纯虚解构函数*** . 那么系统在对父类指针进行 内存释放的操作时, 会先调用子类中的解构函数, 从而 释放子类中开辟在堆区的内存.

* ***虚解构函数*** : `virtual ~Base(){ ... }`

* ***纯虚解构函数*** : ( 注: 哪怕是纯虚解构函数, 也要写函数的实现, 因为系统总会调用到父类的解构函数 )

  ```c++
  //类内声明
  virtual ~Base() = 0;
  //类外实现
  Base::~Base(){ ... } 
  ```



***

## *文件操作*

1. 包含头文件 `include <fstream>`

2. 创建流操作对象

   * ofstream: 输出文件流对象 `ofstream ofs;`
   * ifstream: 输入文件流对象 `ifstream ifs;`

3. 指定打开文件方式 

   * 写文件 `ofs.open("test.txt", ios::out);` ( 直接写文件名,则文件创建在cpp文件同目录下 )

   * 读文件 

     ```c++
     ifs.open("test.txt", ios::in);
     if( !ifs.is_open() ){
         cout<< "打开文件失败" << endl;
         return;
     }
     ```

4. 读写文件

   *  写文件`ofs << "123" << endl;`

   *  读文件

     * 第一种( 推荐: ※※※※※ )

       ```c++
       char buf[1024] = {0};
       while( ifs>>buf ){
           cout<< buf << endl;
       }
       ```

     * 第二种

       ```c++
       char buf[1024] = {0};
       //读一行
       //读到哪里, 总共要读多少个字节
       while( ifs.getline( buf, sizeof(buf) )){
           cout << buf << endl;
       }
       ```

     * 第三种

       ```c++
       string 	buf;
       //全局函数
       //输入流对象, 输入到哪里
       while( getline( ifs,buf ) ){
           cout<< buf <<endl;
       }
       ```

     * 第四种( 单个字符的读, 不推荐 )

       ```c++
       char c;
       while( (c=ifs.get()) != EOF ){
           cout << c << endl;
       }
       ```

5. 关闭操作流 

   * ` ofs.close(); `
   * `ifs.close();`



> ***二进制的读写文件***

* ***二进制的写文件***

1. 包含头文件`#include <fstream>`

2. 创建流操作对象 `ofstream ofs("person.txt", ios::out | ios::binary );` 这里采用构造函数的方式设置创建的文件名和打开方式.

3. 使用二进制写文件

   ```c++
   //要写的对象类
   class Person{
      public:
       char m_name[64]; //对文件的二进制操作时, 应使用字符数组取代字符串
       int m_age;
   }
   //创建流对象的其他代码...
   //使用二进制写文件
   Person p = {"张三", 18};
   ofs.write( ( const char *)&p, sizeof(p) );
   //参数: 要写的数据的地址 (应当强转为 const char *), 要写的数据的大小
   ```

4. 关闭流操作对象

   `ofs.close();`

* ***二进制的读文件***

  ```c++
  //引入头文件
  #include <fstream>
  
  //要读的对象类
  class Person{
     public:
      char m_name[64]; //对文件的二进制操作时, 应使用字符数组取代字符串
      int m_age;
  }
  void test(){
      //创建文件操作流对象
      ifstream ifs;
      //打开文件
      ifs.open("person.txt", ios::in | ios::binary);
      //判断是否打开
      if( !ifs.is_open() ){
          cout << "打开文件失败" << endl;
          return;
      }
      //读文件
      Person p;
      //参数: 读到哪里(目标变量的地址,要强转为const *), 读多少个字节
      ifs.read( (const *)&p, sizeof(Person) ); 
      //关闭流对象
      ifs.close();
  }
  ```

  

***

***

## *泛型*

> ***模板函数***

1. 声明

   ```c++
   //typename关键字可以使用class代替
   //在使用的时候, 无论使用自动类型推导还是手动设定, 必须指定T的类型
   //使用模板实现交换的函数
   template<typename T>
   void swap(T &a, T &b){
       T temp = a;
       a = b;
       b = temp;
   }
   ```

2. 使用

   * 自动类型推导( 必须推出一致的数据类型 )

   ```c++
   int a =10; int b = 20;
   swap(a,b);
   ```

   * 手动指定类型

   ```c++
   int a = 10; int b = 20;
   swap<int>(a,b);
   ```

   

   > ***普通函数和模板函数的区别***
   
   * 普通函数可以发生隐式类型转换
   * 模板函数的自动类型推导无法发生隐式类型转换
   * 模板函数的手动指定类型可以发生隐式类型转换
   
   
   
   > ***普通函数和函数模板的调用规则***
   
   * 如果普通函数和函数模板都能调用, 优先调用函数模板
   
     ```c++
     //普通函数, 优先调用
     void print(int a, int b){
         ...
     }
     
     //函数模板
     template<class T>
     void print(T a, T b){
         ...
     }
     void test(){
         int a = 10;
         int b = 20;
         print(a,b);
     }
     ```
   
   * 使用空模板参数强制调用模板函数
   
     将第一条中的调用改为 `print<>(a,b);`
   
   * 函数模板可以发生重载
   
   * 如果函数模板可以更好的匹配传入的参数类型, 则优先调用模板
   
     将第一条中的调用改为 `print('a', 'b');`  , 会调用模板

> ***使用模板实现对非内置的数据类型的操作***

```c++
//模板本体
template<class T>
bool compare(T &a, T &b){
	...    
}
//对特定的数据类型的模板操作
template<> bool compare(Person &p1, Person &p2){
    ...
}
```



> ***类模板***

1. 定义

   ```c++
   //定义模板类型参数列表
   template<class NameType, class AgeType>
   class Peson{
   public:
   	//使用类型参数
   	NameType m_Name;
   	AgeType m_Age;
   	Person(NameType name, AgeType age){
   		this->m_Name = name;
   		this->m_Age = age;
   	}
   }
   ```

2. 使用

   ```c++
   void test(){
       //在类型后面加上类型列表来使用
       Person<string, int> p1("张三", 18);
   }
   ```

   

3. 类模板和函数模板的区别

   * 类模板没有自动类型推导

   * 类模板的类型列表可以指定默认类型

     `template<class NameType, class AgeType = int>`

> *类模板中函数的调用时机*

* 普通类中的函数在新建对象的时候就会创建出来
* 类模板中的成员函数在对象调用的时候才会创建

```c++
class Peson1{
    public:
     void showPerson1(){
         cout << "Person1" << endl;
     }
}
class Person2{
    public:
     void showPerson2(){
         cout << "Person2" << endl;
     }
}
//在模板函数中调用其他类中的成员函数
template<class T>
class MyClass{
        public:
        T obj;
        
        void fun1(){
            obj.showPerson1();
        }
        
        void fun2(){
            obj.showPerson2();
        }
}
//在使用模板类对象的时候,只有调用了传入类型不存在的成员函数,才会编译出错
void test(){
    MyClass<Person1>p;
    //创建了个Person1的对象,调用Person1中的方法时不会报错
    p.fun1();
    //而调用Person2的方法时,就会报错
    //p.fun2();
}
```



> > > ***查看变量的类型***   `typeid(变量).name()`



> ***模板类对象作为函数的参数的使用方法***

* 背景

  ```c++
  //类模板
  template<class T1, class T2>
  class Person(){
  public:
  	
  	Person(T1 name , T2 age){
  		this->name = name;
  		this->age = age;
  	}
  	T1 name;
  	T2 age;
  
  	void showPerson(){
  		cout<< name << " , " << age << endl;
  	}
  }
  ```

1. 直接传入指定的类型 ( 推荐: ※※※※※ )

   ```c++
   //直接指定作为参数的类对象的类型列表
   void print(Person<string, int>&p){
       p.showPerson();
   }
   void test(){
       Person<string , int>p("张三",18);
       print(p);
   }
   ```

2. 将类对象的类型列表作为函数的类型列表 ( 啥玩意 )

   ```c++
   //将对象的类型列表作为函数的类型列表
   template<class T1, class T2>
   void print(Person<T1 , T2>&p){
   	p.showPerson();
   }
   void test(){
   	Person<string , int>p("张三",18);
   	print(p);
   }
   ```

3. 直接将类作为函数的类型列表 ( 啥玩意 )

   ```c++
   //将对象总体作为函数的类型列表
   template<class T>
   void print( T &p){
       p.showPerson();
   }
   void test(){
       Person<string , int>p("张三",18);
       print(p);
   }
   ```



>  ***类模板的继承***

1. 如果父类是类模板, 子类中要指定父类中的类型列表

   ```c++
   template<class T>
       class Base{
           T name;
       }
   
   //子类指定父类中的类型
   class Son : public Base<int>{
       ...
   }
   ```

   

2. 如果子类不指定父类中的类型列表, 那么子类也要编程类模板

   ```c++
   template<class T>
       class Base{
           T name;
       }
   
   //子类也变为类模板
   //这里子类也有自己的泛型T2
   template<class T1, class T2>
   class Son : public Base<T1>{
      T2 age;
   }
   ```



> ***类模板成员函数的类外实现***

```c++
//类模板
template< class T1, class T2>
class Person{
public :	
	Person(T1 name, T2 age);
	T1 name;
	T2 age;
	void showPerson();
}
//类外实现
template<class T1, class T2>
Person<T1, T2>::Person(T1 name, T2 age){
	this->name = name;
	this->age = age;
}
template<class T1, class T2>
void Person<T1, T2>::showPerson(){
	...
}
```



> ***关于类模板的分文件编写问题***

问题:

1. 将类模板的本体及其成员函数的声明写到 h 后缀的头文件中
2. 将类模板中的成员函数的实现写道 cpp 后缀的源文件中
3. 然后在其他文件中调用该类模板中的函数
4. 发现语法无报错, 但是编译不通过

原因:

1. 类模板中的成员函数在调用的时候才会创建
2. 所以只包含类的头文件, 编译器找不到类的实现, 所以报错

解决:

1. 直接包含类的 cpp 后缀的源文件 ( 不推荐 )
2. 将类模板中的声明和实现都写在头文件中, 并且将头文件的后缀改为 hpp ( 推荐方法, 其实就是类模板并没有分文件编写, hpp不是强制要求的 , 只是约定俗成, 方便别人知道这是一个类模板文件 )



> ***类模板中全局友元函数的使用***

```c++
//类模板
template<class T1, class T2>

//因为友元函数的类外实现中用到了Person类, 所以要先声明这个类
template<class T1, class T2>
class Person;

//友元函数的类外实现应当写在类模板实现的上面, 如果写在下面, 那么会使得编译不通过, 因为链接不到函数实现 
template<class T1, class T2>
void showPerson2(Person<T1, T2> &p){
	cout<< p.name << " , " << p.age;
}

class Person{

//1.全局函数做友元, 类内实现, 就是声明和实现写在一块( 推荐方法,简单 )
friend void showPerson(Person<T1, T2> &p){
	cout<< p.name << " , " << p.age;
}

//2.全局函数做友元, 类外实现, 就是这里只写函数声明( 实现要写在上面 )
friend void showPerson2(Person<T1, T2> &p);

public:
 	Person(T1 name, T2 age){
 		this->name = name;
 		this->age = age;
 	}
private:
	T1 name;
	T2 age;
}
```



> 释放堆区的数组空间

`delete[] 数组指针`



***

***



## STL: 标准模板库

* 六大组件:

1. 容器
   1. 序列式容器
   2. 关联式容器
2. 迭代器(理解为指针)
   1. 双向迭代器
   2. 随机访问迭代器
3. 算法
   1. 质变算法
   2. 非质变算法
4. 适配器
5. 空间配置器
6. 仿函数



#### *vector 数组*

* 数组类型

* 构造函数

    - vector<T> v;  //默认构造函数创建空的对象
    - vector<T>(v.begin(), v.end());  //使用v对象中[begin(), end()) 范围内的数据来创建, 不包括end()上的数据
    - vector<T>( n , ele);  //使用n个ele创建对象
    - vector<T>( const vector& vec );  //使用拷贝构造函数创建

* 赋值操作

    - = 等号赋值
    - assign(begin, end)    //区间赋值
    - assign(n , ele);    //n个ele赋值

* vector的容量和大小

    - empty(); //是否为空
    - capacity();  //容器的容量, stl算法会动态预留容量供用户使用, 容量不够时,重新找一块更大的内存并将数据复制进去
    - size();  //元素个数
    - resize(int num);  //重新制定容器的长度, 如果容器变长则以默认值填充, 否则删除超出的元素
    - resize(int num, ele);  //重新制定容器的长度, 如果容器变长则以ele填充, 否则删除超出的元素	

* vector的插入和删除

    - push_back(ele);  //尾部插入ele
    - pop_back();  //尾部删除一个
    - insert(const_iterator pos, ele);  //pos位置插入ele
    - insert(const_iterator pos, n, ele);  //pos位置插入n个ele
    - erase(const_iterator pos);  //删除pos位置的元素
    - erase(const_iterator start, const_iterator end);  //删除从start到end之间的元素
    - clear();  //清除所有元素

* vector元素的存取

    - at(index);  //index位置的数据
    - 使用[]访问
    - front();  //返回容器第一个元素
    - back();  //返回容器最后一个元素

* vector对象元素互换

    - 使用方法:  `v1.swap(v2);  //交换v1和v2中的元素`  ( 实则是指针的交换 )

    - 用途: 收缩内存空间

        场景:  

        1. `vector<int> v1; //创建一个占用内存很大的v1`

            `for(int i=0;i<100000;i++) v1.push_back(i);`

        2. `v1.resize(3); //将v1重新定义大小, 此时容量不变, 大小变小, 所以占用了很多不必要的内存`

        3. `vector<int>(v1).swap(v1); //前半部分vector<int>(v1)使用拷贝构造创建了一个和v1数据相同的匿名对象,该对象大小和v1一样, 但是容量是系统根据大小重新划定的. 后半部分将两个对象进行交换, v1最后指向了新的容量合适的对象上, 所以实现了内存的收缩, 节省了内存` 

* vector预留空间

    - `v1.reserve( n ); //给v1预留n个空间,减少动态分配内存的次数, 提高性能. 但是预留的空间没有默认值,不能直接访问.`

* 使用vector类型对内置的数据类型进行操作

  ```c++
  //包含头文件
  #include <vector>
  #include <algorithm>
  
  //用于for_each中的回调
  void print(int val){
      cout << val << endl;
  }
  
  void test(){
      //新建vector数组实例
      vector<int> v;
      
      //在数组中添加元素
      v.push_back(10);
      v.push_back(20);
      v.push_back(30);
      v.push_back(40);
      
      //遍历打印1
      //每个容器都有自己的迭代器
      //v.begin()返回数组的第一个元素的地址
      //v.end() 返回数组中最后一个元素的下一个地址
      for(vector<int>::iterator it = v.begin(); it!=v.end(); it++){
          cout << *it << endl;
      }
      
      //遍历打印2, 使用stl算法中的for_each
      //参数: 起始指针 , 截止指针, 回调函数	
      for_each( v.begin(); v.end(); print );
      
  }
  ```

* 使用vector容器对自定义的数据类型进行操作

  ```c++
  ...
  ```

* 使用vector容器嵌套vector容器

  ```c++
  ...
  ```

  

  #### *string 字符串*

  * string是c++风格的字符串, 本质是一个类

  * string的构造方法:

    * string(); //创建空字符串 string str;
    * string( const char* s); //使用字符串s初始化
    * string( const string & str );  //使用一个string对象初始化
    * string( int n, char c );  //使用n个c来初始化

  * assign( 用途不大 )

    * 函数原型
      * string & assign( const char *s );	//把字符串s赋值给字符串
      * string & assign( const char *s, int n );    //把字符串s的前n个赋值给当前字符串
      * string & assign( const string & s );  //把字符串s赋值给当前字符串
      * string & assign( int n, char c );    //把n个c赋值给字符串

  * 字符串拼接

    * += ( 后接字符串或者字符 )
    * append 
      * string &append( const char *s );	//将s连接到末尾
      * string &append( const char *s, int n ); //将s的前n个连接到末尾
      * string &append( const string &s );   //将s连接到末尾
      * string &append( const string &s, int pos, int n );//将s中从第pos位置开始的n个字符连接到末尾

  * 字符串查找和替换

    * 查找 ( 没查到返回 -1 )
      * int find( 字符串 或 字符 , int pos=0 ); //从pos位置开始找 字符串 或 字符 第一次出现的位置
      * int find( 字符串, int pos, int n );  //从pos位置开始找字符串的前n个字符第一次出现的位置
      * int rfind( 字符串 或 字符, int pos = npos );  //从pos位置开始找 字符串 或 字符 最后一次出现的位置 ( 从右往左 )
      * int rfind( 字符串, int pos  , int n );  //从pos位置开始查找字符串的前n个字符的最后一次出现位置 ( 从右往左 )
    * 替换
      * string & replace( int pos, int n, 字符串 );  //替换从pos位置开始的n个字符为字符串

  * 字符串比较 : `int compare( const 字符串 ) const;`  ( 返回 -1 , 0 ,1 )

  * 字符串长度: `str.size()`

  * 字符串存取

    * 使用`str[i];`
    * 使用`str.at(i);`

  * 字符串插入 

    * 使用 `str1.insert(pos, 字符串); //在pos位置插入字符串`
    * 使用 `str.insert(pos, n, c);  //在pos位置插入n个c`

  * 字符串删除 `str.erase(pos, n); //删除从pos位置开始的n个字符`

  * 字符串的字串 `str.substr(pos, n);  //返回从pos位置开始的n个字符`

     

  

  #### *deque*

  * 内部实现: **中控器** 存放各缓冲区的地址, 缓冲区存放数据 ( 数据结构和特点类似于链表 )

  * 构造函数: 

    *  deque<T>  //默认构造
    *  deque(begin, end)  //区间构造
    *  deque(n, ele)  //n个ele构造
    *  deque(d1)  //拷贝构造

  * 迭代器

    * deque<T>::iterator it; //形式同vector
    * deque<T>::const_iterator it;   //当deque是const类型时用这个

  * 赋值

    * 等号赋值   //d2=d1
    * assign(n ,ele)  //n个ele赋值
    * assign(begin, end)  //区间赋值

  * 大小操作      ( 无容量, 因为容量无限 )

    * empty() //判断是否为空
    * size()  //返回元素个数
    * resize(n) //重新指定大小
    * resize(n, ele)  //重新指定大小,用ele填充

  * 插入和删除

    * push_back(ele)  //尾插
    * push_front(ele)  //头插
    * pop_back()   //尾删
    * pop_front()   //头删
    * insert(pos, ele)  //在pos位置插入ele,返回新数据的地址
    * insert(pos, n, ele)  //在pos位置插入n个ele, 无返回值
    * insert(pos, begin, end)  //在pos位置插入区间, 无返回值
    * clear()   //清空
    * erase(begin, end)  //删除区间, 返回下一个数据的位置
    * erase(pos)   //删除pos位置数据, 返回下一个数据的位置

  * 数据存取

    * at( n )   //返回第n个元素
    * []方式
    * front()   //返回第一个元素
    * end()   //返回最后一个元素

  * 排序

    sort(iterator begin, iterator end) 

     //对区间进行排序,默认从小到大,支持有随机访问器的容器,如vector

    //需要#include<algorithm>



#### *stack*

* 先进后出,不允许遍历

* 构造函数
  * stack<T> stk;  //默认构造
  * stack(const stack&stk);   //拷贝构造
* 赋值操作
  * 等号赋值
* 数据存取
  * push(ele)   //栈顶添加ele
  * pop()   //移除栈顶元素
  * top()  //返回栈顶元素
* 大小操作
  * empty()    //是否为空
  * size()   //栈的大小



#### *queue* 

* 先进先出,不允许遍历

  * 构造函数
    * queue<T> que  //默认构造
    * queue(const queue &que)   //拷贝构造
  * 赋值操作
    * 等号赋值
  * 数据存取
    * push(ele)  //入队ele
    * pop()   //出队
    * back()   //返回最后一个元素
    * front()  //返回第一个元素
  * 大小操作
    * empty()  //判断是否为空
    * size()   //返回队列大小



#### *list*

*  链表,链式存储, 双向循环结构, 链表的迭代器是双向迭代器

  * 构造函数

    * list<T> ls  //默认构造
    * list(begin, end)   //区间构造
    * list( n, ele )  //n个ele构造
    * list( const list &ls)  //拷贝构造

  * 赋值和交换

    * assign( begin, end )   //区间赋值
    * assign( n, ele )  //n个ele赋值
    * 等号赋值
    * swap( ls )  //将ls中的元素与本身的交换

  * 大小操作

    * size()  //返回元素个数
    * empty()  //返回是否为空
    * resize(n) //重新指定长度为n
    * resize(n, ele)  //重新指定长度为n,用ele填充

  * 插入和删除

    * push_back( ele ) //尾插
    * pop_back()   //尾删
    * push_front(e)  //头插
    * pop_front()   //头删
    * insert(p,e)  //在p位置插入e,返回新元素位置
    * insert(p,n,e)  //在p位置插入n个e,无返回值
    * insert(p,beg,end)  //在p位置插入区间beg和end之间的数据,无返回值
    * clear()  //清空
    * erase(beg, end)  //删除区间内元素,返回下一个元素位置
    * erase(p)  //删除p位置元素, 返回下一个元素位置
    * remove(e)  //删除链表中所有与e匹配的元素	

  * 数据存取 ( 不支持[]访问, 可以使用迭代器的 ***自增和自减操作*** 访问中间元素 )

    * front()  //返回第一个元素
    * back()  //返回最后一个元素

  * 元素反转和排序

    * 反转 `reverse()` 

    * 排序 `ls.sort()`   (这个方法是list中的成员函数,不是来自algorithm中的全局函数,  默认升序)

    * 排序的重载  ( 自定义为降序 )

      ```c++
      //自定义的排序方法
      bool mySort(int v1, int v2){
          //如果目的是降序操作,就返回>号, 意为大于的时候为真
          return v1>v2;
      }
      
      void test(){
       list<int>ls;
          
       	ls.push_back(20);
          ls.push_back(40);
          ls.push_back(10);
          ls.push_back(90);
          
       ls.sort(mySort);   
      }
      ```



#### *set / multiset*


*  插入元素自动排序, set不能插入重复元素, multiset允许插入重复元素

  * 引入

    * #include<set>

  * 构造函数

    * set<T> s  //默认构造
    * set( const set &s )  //拷贝构造

  * 赋值

    * 等号赋值

  * 插入和删除

    * insert(e)  //插入元素, set的insert返回pair类型, multiset的insert返回iterator类型

      ```c++
      set<int>s;
      
      //得到对set的insert操作的结果
      //insert函数的返回值是pair类型,包含两个泛型, 该结果的second属性为插入结果
      pair<set<int>::iterator , bool> res = s.insert(10);
      if(res.second){
          //插入成功
      }
      else{
          //插入失败
      }
      ```

    * clear()  //清空

    * erase(pos)  //删除pos位置的元素,返回下一个元素的位置

    * erase(begin, end)  //区间删除,返回下一个元素的位置

    * erase(e)  //删除为e的元素    

  * 大小和交换

    * size()  //返回元素个数
    * empty()  //返回是否为空
    * swap(s)  //和s交换元素

  * 查找和统计

    * find(e)  //查找e是否存在 , 存在则返回e的位置, 不存在则返回set.end()
    * count(e)  //统计e的个数

  * 排序 ( 默认为升序排序, 使用仿函数修改排序规则 , 由于默认进行排序, 所以***自定义的数据类型必须自定义排序规则***)

    ```c++
    //这个类的仿函数作为排序规则
    class myCompare{
        public:
        bool operator()(int v1, int v2){
            return v1>v2;
        }
    }
    
    void test(){
        //将带有排序规则仿函数的类传入set的类型列表
        //此时排序规则改为降序
        set<int,myCompare>s;
        
    }
    ```




#### *pair对组*


*   c++中内置的用于同时存放两个数据的数据类型, 两个数据的类型可以不一样 , 类似于map 

  * 创建
    * pair<type, type> p(value1, value2);  //默认构造函数
    * pair<type, type> p = make_pair(value1, value2);  //使用函数make_pair创建
  * 数据获取
    * p.first  //第一个数据
    * p.second  //第二个数据

* ##### map/ multimap  ( 所有元素都为pair类型的数组, 且会根据pair的第一个元素进行排序,multimap中同样会根据key进行分组和排序.  map不允许key重复, multimap允许. 使用迭代器获取的值是pair类型 )

  * 构造函数

    * map<t1,t2> m;   //默认构造函数
    * map(const map&m);  //拷贝构造

  * 赋值

    * 等号赋值

  * 大小和交换

    * size()  //返回元素个数
    * empty() //判断是否为空
    * swap(m)  //交换元素

  * 插入和删除

    * m.insert(pair<int , int>(1,10));  

      //插入的是一个pari元素, 这种形式为创建一个匿名的pair并初始化, 也可使用make_pair()来创建

    * clear()  //清空

    * erase(pos)  //删除pos位置的元素,返回下一个元素位置

    * erase(begin, end)  //区间删除,返回下一个元素位置

    * erase(key)  //根据key值删除元素

  * 查找和统计

    * find(key)  //按照key查找, 找不到则返回map.end()
    * count(key)  //按照key进行统计

  * 排序 (  默认按照key进行升序排序, 使用***仿函数***进行自定义排序规则)

    ```c++
    //使用这个类的仿函数来进行自定义排序规则
    class myCompare{
        public:
        bool operator()(int v1, int v2){
            return v1>v2;
        }
    }
    
    void test(){
        //将自定义仿函数排序规则的类加入到类型列表中作为第三个类型,即可实现自定义排序规则
        map<int ,int ,myCompare>m;
    }
    ```

> > ##### 在for循环中, 第三个参数可以使用 逗号 分割, 同时使多个数据进行自增或自减

***



### ***函数对象***

* 重载了小括号的类的对象称为函数对象

* 函数对象可以维护自己的状态 ( 操作类内的成员变量 )

  ```c++
  class print{
      public:
      print(){
         	this->count = 0;
      }
      int count;
      void operator()(string str){
          cout<<str<<endl;
          //每调用一次, 类内的count变量加一, 通过访问count变量实现调用统计的功能
          this->count++;
      }
  }
  ```

* 函数对象可以作为参数传递

  ```c++
  class print{
      public :
      void operator()(string str){
          cout<<str<<endl;
      }
  }
  //函数对象作为参数传递
  void doPrint(print&p,string str){
      //调用函数对象的仿函数
      p(str);
  }
  void test(){
      print p;
    	doPrint(p, string("ABC"));
  }
  ```

  

### ***谓词*** ( 返回bool类型的仿函数成称为谓词 )

* **一元谓词** ( 接收一个参数的仿函数为**一元谓词** )

  ```c++
  //使用find_if函数需导入
  #include<algorithm>
  
  //作为find_if的一元谓词参数使用
  class Bigzhanfive{
      public: 
      //返回bool类型, 接收一个参数, 一元谓词
      bool operator()(int v){
          return v>5;
      }
  }
  
  void test(){
      vector<int>v;
      for(int i=0;i<10;i++){
          v.push_back(i);
      }
      //使用find_if函数, 返回符合条件的数据的迭代器(指针)
      //前两个参数是查找范围, 第三个参数接收一个一元谓词, 这里使用创建匿名对象的方式传入
      //find_if函数将使用传入的一元谓词作为查找规则, 返回符合规则的第一个数据的指针
      vector<int> it = find_if(v.begin(), v.end(), Bigzhanfive());
      cout << " 查找到符合条件的数据为: " << (*it) << endl;
  }
  
  ```

* **二元谓词**

  ```c++
  //使用二元谓词自定义sort算法的排序规则
  #include<algorithm>
  
  class Compare{
      public :
      //自定义为降序
      bool operator()(v1, v2){
          return v1>v2;
      }
  }
  
  void test(){
  	vector<int>v;
      v.push_back(10);
      v.push_back(40);
      v.push_back(20);
      v.push_back(30);
      
      //第三个参数为自定义的排序规则, 使用匿名对象方式创建二元谓词作为参数传入
      sort(v.begin(), v,end(), Compare());
  }
  ```

  

### **内建函数对象** ( stl中内置的实现了仿函数的类 )

* 使用时应 `#include<functional>`

* 算数仿函数

  * 加法

    ```c++
    #include<functional>
    void test(){
    	cout << plus<int>()(10,20) << endl;
    }
    ```

  * 取反

    ```c++
    #include<functional>
    void test(){
        cout << negate<int>()(50) << endl;
    }
    ```

* 关系仿函数

  * 大于

    ```c++
    #include<functional>
    #include<vector>
    
    void test(){
        vector<int>v;
        v.push_back(10);
        v.push_back(40);
        v.push_back(20);
        v.push_back(30);
        
        //使用sort算法默认升序, 因为sort的第三个参数默认是less的仿函数
        //将greater仿函数作为第三个参数传入sort,可实现降序排列
        //greater的仿函数实现:
        //bool operator()(T v1, T v2){
        //	return v1>v2;
    	//}
        sort(v.begin(), v.end(), greater<int>());
    }
    
    ```

    

* 逻辑仿函数

  * 逻辑非

    ```c++
    void test(){
        vector<bool>v;
        v.push_back(true);
        v.push_back(false);
        v.push_back(true);
        v.push_back(false);
        
        //搬运的目的变量
        vector<bool>v2;
        //给目的变量开辟足够的空间以完成搬运操作
        v2.resize(v.size());
        //使用transform算法,实现可加操作的搬运
        //前两个参数是要搬运的数据区间
        //第三个参数是目的地的起始位置
        //第四个参数接收一个一元谓词, 用于在搬运过程中对数据进行操作, 这里使用逻辑非实现对每个元素取反
        transform(v.begin(), v.end(), v2.begin(), logical_not<bool>());
        
        //此时v2中的数据为false,ture,false,true, 与v中的每一项都相反
    }
    ```

    

### **常用算法**

* ***for_each遍历算法***

  ```c++
  //使用普通函数进行遍历
  void print(int val){
      cout << val << endl;
  }
  //使用仿函数进行遍历
  class MyPrint{
      public:
      void operator()(int val){
          cout << val << endl;
      }
  }
  
  void test(){
      vector<int>v;
      v.push_back(10);
      v.push_back(20);
      v.push_back(30);
      v.push_back(40);
      
      //第三个参数是遍历方法, for_each会执行参数的第三个参数, 其实就是在第三个参数后面加小括号来执行
      
      //使用普通函数进行遍历
      for_each(v.begin(), v.end(), print);
      //使用仿函数进行遍历
      for_each(v.begin(), v.end(), MyPrint());
  }
  ```

* ***transform 搬运函数*** ( 将一个容器中的数据经过操作后搬运到另外一个容器中 )

  ```c++
  class Transform{
      public :
      //经过操作后返回新的数据
      int operator()(int val){
          return val+100;
      }
  }
  void test(){
      //数据容器
      vector<int>v;
      for(int i=0;i<10;i++){
          v.push_back(i);
      }
      //目标容器
      vector<int>v2;
      //给目标容器开辟足够的空间
      v2.resize(v.size());
      //使用transform
      transform(v.begin(), v.end(), v2.begin(), Transform());
  }
  ```

* ***find*** 

  ```c++
  //对内置数据类型进行查找
  void test01(){
      vector<int>v;
      for(int i=0;i<10;i++){
          v.push_back(i);
      }
      //查找5
      vector<int>::iterator it = find(v.begin(), v.end(), 5);
  }
  
  //对自定义数据类型进行查找
  class Person{
      public:
      Person(name, age){
          this->name = name;
          this->age = age;
      }
      bool operator==(const Person&p){
          if(this->name == p.name && this->age == p.age){
              return true;
          }else{
              return false;
          }
      }
      string name;
      int age;
  }
  void test02(){
      vector<Person>v;
      Person p1("a",10);
      Person p2("b",20);
      Person p3("c",30);
      Person p4("d",40);
      v.push_back(p1);
      v.push_back(p2);
      v.push_back(p3);
      v.push_back(p4);
      
      Person pp("d",40);
      
      //find底层就是单纯的进行遍历然后==判断, Person类型无==操作, 所以要重载==号
      vector<Person>::iterator it = find(v.begin(), v.end(), pp);
  }
  	
  ```

* **find_if 条件查找**

  ```c++
  //内置数据类型查找
  class Condition{
  	public:
      bool Condition(const int& val){
  		return val>5;
      }
  }
  void test01(){
      vector<int>v;
      for(int i=0;i<10;i++){
          v.push_back(i);
      }
      //第三个参数要一个一元谓词
      vector<int>::iterator it = find_if(v.begin(), v.end(), Condition());
  }
  
  //自定义的数据类型查找
  class Person{
      public:
      string name;
      int age;
      Person(string name, int age){
          this->name = name;
          this->age = age;
      }
  }
  class FInd{
      public:
     	bool FInd(const Person&p){
  		return p.age>10;
      }
  }
  void test02(){
  	vector<Person>v;
      Person p1("a",10);
      Person p2("b",20);
      Person p3("c",30);
      Person p4("d",40);
      v.push_back(p1);
      v.push_back(p2);
      v.push_back(p3);
      v.push_back(p4);
      
      vector<Person>::iterator it = find_if(v.begin(), v.end(), FInd());
  }
  ```

* **adjacent_find(begin, end)   查找相邻的重复元素**

  * 参数是查找区间, 返回第一个相邻重复元素的位置

* **binary_search(begin, end, val) 二分查找数据是否存在**

  * 返回bool类型
  * 只能用于有序序列

* **count( begin, end, val) 统计元素个数**

  * 参数是统计区间和要统计的值

  * 由于内部实现是直接用==判断的, 所以对于自定义的数据类型, 要重载==

    ```c++
    class Person{
        public :
        Person(string name, int age){
            this->name = name;
            this->age = age;
        }
        string name;
        int age;
        //重载==号以使用count函数
        bool operator==(const Person&p){
            if(p.name == this->name && p.age == this->age){
                return true;
            }else{
                return false;
            }
        }
    }
    ```

* **count_if( begin, end, _Pred) 带条件的统计**

  * 第三个参数为一元谓词

* **sort( begin, end, [_Pred]) 可自定义规则的排序**

  * 第三个参数是一元谓词, 默认为升序排列 (可直接使用 greater<T>()内建函数对象来改为降序排列)

* **random_shuffle( begin, end ) 洗牌算法 **

  * 同随机数函数一样, 需要指定随机数种子, 执行 `srand( (unsigned int)time(NULL) );`

* **merge( begin1, end1, begin2, end2, target) 合并算法**

  * 两个来源容器中的数据必须是有序的( 而且两个容器的 *序列方向要相同* )
  * 最后一个参数是目标容器的起始位置
  * 目标容器要有足够的空间存放值

* **reverse( begin, end ) 反转算法**

* **copy( begin, end, target ) 拷贝算法**

  * 第三个参数是目标容器的起始位置
  * 目标容器要有足够的空间

* **replace( begin, end, oldval, newval ) 替换算法**

* **replace_if( begin, end, _Pred, newval ) 按条件替换**

  * 第三个参数是一元谓词

* **swap( c1, c2) 交换元素算法**

  * c1和c2应当是同种容器



> ##### 算数算法 (`#include <numeric>`) 

* **accumulate( begin, end, initval) 累加算法**
  * 第三个参数是累加前的初始值
* **fill( begin, end, val ) 填充算法**
  * 第三个参数是要填充的值



> ##### 集合算法 (`#include <alogrithm>`)

* **min( v1, v2) 返回较小的值**
* **max(v1, v2) 返回较大的值**
* **set_intersection( begin1, end1, begin2, end2, target ) 求两个容器中元素的交集算法**
  * 目标容器要有足够的空间
  * 函数的返回值是交集最后一个元素的下一个位置, 不一定是目标容器的end迭代器位置, 如果想遍历结果,应使用函数的返回值作为end迭代器位置
  * 源容器必须是有序序列
* **set_union( begin1, end1, begin2, end2, target ) 求两个容器中元素并集的算法**
  * 两个源容器必须是有序序列
  * 目标容器要有足够的空间
  * 返回的迭代器是并集最后一个元素的下一个位置
* **set_difference( begin1, end1, begin2, end2, target ) 求两个容器中元素差集的算法**
  * 源容器必须是有序序列
  * 差集: v1对v2的差集是在v1中且不在v2中的元素 ,  v2对v1的差集是在v2中且不在v1中的元素 . 
  * 返回的迭代器是差集最后一个元素的下一个位置

> ##### **csv文件**
>
> 可以直接用excel表格打开
>
> 文件中每个格子的数据中间用" , "隔开



> ##### **文件操作中的清空文件操作**
>
> 打开文件方式设定为 ios::trunc , 则会在打开的同时清空文件



