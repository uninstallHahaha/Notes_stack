## c++的递增运算符重载

```c++
#include <iostream>
using namespace std;

class Myint
{
	//设置左移重载函数可以访问私有成员
	friend ostream & operator<<(ostream & o, Myint myint);

public :
	Myint(){
		this->num= 0;
	}

	//重载前置递增符号, 返回的是对象本体, 目的是可连续前置递增
	Myint&  operator++(){
		(this->num)++;
		return *this;
	}
	//重载后置递增符号, 参数为一个int的占位参数, 标记此函数重载的是后置递增
	//返回的是值, 目的是实现先用后算
	Myint operator++(int){
		//记录当前状态
		Myint temp = *this;
		//进行递增操作
		(this->num)++;
		//返回记录的值
		return temp;
	}

private :
	int num;
};

//重载左移运算 , 参数为 输出流对象, 输出目标对象, 返回的是 输出流本体 , 目的是链式编程
ostream & operator<<(ostream & o, Myint myint)
{
	cout<< myint.num;
	return o;
}

//测试前置递增
void testBefore(){
	Myint myint;
	cout<< ++myint <<endl;
}
//测试后置递增
void testAfter(){
	Myint myint;
	cout<< myint++ << endl;
}

int main(){
	
	testBefore();
	testAfter();


	system("pause");
	return 0;
}
```