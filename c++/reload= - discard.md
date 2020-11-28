## 赋值运算符重载 ( 实现对自定义对象的深拷贝 )
```c++

class Person{

public:

    Person(){
        m_age = new int(18);
    }

    ~Person(){
        if(m_age != NULL){
            delete m_age;
            m_age = NULL;
        }
    }

    int *m_age;


    Person & operator=(Person  &p){

        //清除原有的指针信息
        if(m_age != NULL){
            //释放内存空间
            delete m_age;
            //指针设置为空
            m_age = NULL;
        }

        //在堆区开辟新的内存空间
        m_age = new int(*p.m_age);

        //返回对象本体, 实现链等操作 ( c=b=a )
        return *this;

    }

}


```