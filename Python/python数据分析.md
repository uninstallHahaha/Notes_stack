# Python 数据分析 

需要的相关包 : numpy , pandas , jupyter , scipy , sklearn , matplotlib , TensorFlow , seaborn , pyecharts

数据分析: numpy , pandas , matplotlib



## jupyter 

jupyter : 数据分析开发工具 , 相当于pycharm , 启动jupyter : jupyter notebook 

 jupyter notebook  时所处的目录位置就是在浏览器中显示的目录

jupyter的使用 :

* 在浏览器中映射的本地文件系统中新建python3文件进行编辑

* 点击run执行当前代码块加载到内存中

* 选中代码块按a/b, 在当前代码块的上/下面插入代码块

* 选中代码块 , 按两下 d 删除

* 按tab代码提示

* shift+tab 查看方法定义

* 魔法函数 

  ```python
  #返回执行这个函数消耗的时间
  %time 函数() 
  ```

  ```python
  %%time
  #返回该代码块中以下代码执行消耗的时间,这个%%time必须放到代码块第一行
  函数()
  函数()
  ...
  ```

  ```python
  %%timeit
  #运行了该代码块7000次然后返回平均消耗时间
  函数()
  函数()
  ...
  ```

  ```python
  #显示所有魔法指令(其实就是linux指令)
  %lsmagic
  ```

* 可以在工具栏设置代码块模式为markdown , 进行markdown的编辑, 快捷键M





## numpy

numpy中的核心是ndarray数组

ndarray中包含了很多数组的计算操作 , 而且运行速度快

看一个元素处于第几维就看它存在于第几层括号里 , 从0开始计算



![](python数据分析.assets/创建ndarray.png)

![](python数据分析.assets/创建ndarray使用iterable.png)



###### 创建ndarray

```python
#普通创建
la = np.array([[1,2,3],[4,5,6]])

#创建全是1的数组
np.ones(shape=(5,5), dtype=np.int8)

#创建全是0的数组
np.zeros(shape=(2,3,4), dtype=np.float16)

#创建全是同一个数的数组
np.full(shape=(3,4), fill_value=3.14)

#创建对角线为1, 其他全是0的方阵(单位矩阵)
np.eye(N=5)

#创建一维等差数组
np.linspace(0,100,num = 101)

#创建一维等差数组
np.arange(0,100,2)

#创建随机范围内的数组
np.random.randint(0,100,size=(5,5))

#创建正态分布数组
#数组平均值是0, 方差是1
np.random.randn(5,5)

#创建正态分布数组
#loc中值
#scala方差
#size数组大小
#.round(2) 保留两位小数
np.random.normal(loc=175, scala=10, size=10).round(2)

#生成指定个数的 0~1左闭右开的 随机数 数组
np.random.random(100)
```



###### ndarray的参数

1. .size 数组元素个数
2. .shape 数组形状
3. .ndim 数组维度
4. .dtype 数组数据类型



###### ndarray基本操作

```python
#作为以下示例中的数据
nd = np.random.randint(0,100,size=(4,5))

```

1. **索引**

   使用[] , 多维使用,隔开

   ```python
   #二维数组中取一个
   nd[1,1]
   #二维数组中取一行
   nd[1]
   ```

2. **切片**

   ```python
   #二维数组取前三行
   nd[0:3]
   #二维数组取最后两行
   nd[-2:]
   #取前三行前三列 
   nd[0:3, 0:3]
   ```

3. **变形**

   ```python
   #要求变形后元素总个数不变
   nd.reshape(2,10)
   ```

4. **转置**

   图片旋转90度

   ```python
   #高度0 , 宽度1, 像素2
   #转置
   np.transpose(cat_data, axes = (1,0,2))
   ```

5. **级联**

   将两个或多个数组拼到一块 , 要求数据行数相同或者列数相同

   ```python
   #axis设置将第几维对接到一块
   np.concatenate([数据1,数据2], axis=1)
   
   #水平级联
   np.hstack((数据1,数据2))
   
   #垂直级联
   np.vstack((数据1,数据2))
   ```

6. **切分**

   切分成多个array

   ```python
   #默认按行平均切分成2份
   np.split(nd, indices_or_section=2)
   
   #按行自由切分
   np.split(nd, indices_or_section=[1,2])
   
   #水平切分
   np.hsplit(nd, indices_or_section=[1,2])
   #竖直切分
   np.vsplit(nd, indices_or_section=[1,2])
   ```

7. **创建副本**

   默认的等号赋值操作只是传地址 , 使用复制操作会新创建一个

   ```python
   #复制
   nd1 = nd.copy()
   ```
   
8. ###### 排序

   ```python
   #np的排序方法
   np.sort(nd)
   #nd自身的排序方法
   nd.sort()
   #取最小的/最大的n个数放到数组最前面/最后面, 这个取决于kth的正负
   np.partition(nd, kth=5)
   ```


###### ndarray聚合操作

> 更多参见 numpy中文手册

```python
#以下操作使用的数据
nd = np.random.randint(0,100, size=(4,6))
```



1. **.sum / np.nansum**

   ```python
   #返回数组元素和 , 如果有np.NAN(空值)作为元素, 那么返回结果为nan
   nd.sum()
   
   #返回数组元素和 , np.NAN记为0来计算
   np.nansum(nd)
   ```

2. **.max/.min**

3. **.prod 累乘**

4. **.mean 平均值**

   ```python
   #axis指定只求哪个维度上的平局值
   nd.mean(axis=1)
   ```

5. **.std 标准差**

6. **.var 方差**

7. **.argmax/.argmin 最大/小值的索引**

8. **np.argwhere 满足条件的元素的索引**

   ```python
   #返回nd中大于50并且小于100的元素的索引 , 结果作为数组返回
   np.argwhere( (nd>50)&(nd<100) ) 
   ```

9. **.ravel 数据变一维**

   ```python
   nd.ravel()
   ```

10. **np.median 中位数**

    ```python
    np.median(nd)
    ```

11. **np.percentile 数组中指定大小为百分比排位的数**

    ```python
    #返回nd中元素按大小排列时 , 处于50%位置的元素
    np.percentile(nd, q=50)
    ```

12. **.any 是否包含true**

    ```python
    #只要包含true(非0)就返回true
    nd.any()
    ```

13. **.all 是否都是true**

    ```python
    #全部都是true(非0)才返回true
    nd.all()
    ```

    



###### numpy线性代数

```python
#方程组的解 x=2,y=1,z=5
#方程组
#	2x+y-z = 0
#	x+2y+z = 9
#	x-y+z  = 6

#定义系数矩阵
X  = np.array([[1,2,3],
			  [2,3,4],
			  [3,4,5]])
			  
#定义结果矩阵
Y = np.array([0,9,6])
```



1. **np.linalg.inv 逆矩阵**

   ```python
   #求逆矩阵
   X_inv = np.linalg.inv(X)
   ```

2. **np.dot 矩阵乘法**

   ```python
   np.dot(X_inv, Y)
   ```

   



###### numpy广播

1. 全员操作

   ```python
   #每个元素都加10
   nd + 10
   ```

   





###### numpy统计学

1. **np.corrcoef 相关性**

   ```python
   #a和b是两个数组
   #返回一个2*2的数组, 分别是从上至下,从左到右分别是 :
   #  a和a的相关度 a和b的相关度
   #  b和a的相关度 b和b的相关度
   np.corrcoef(a,b)
   ```

2. **np.histogram 直方图**

   ```python
   #bins 设置统计成为几个范围, 如果不指定range , 将会不是均分
   #range 指定均分总范围
   #返回两个数组
   #第一个是每个柱子的高度
   #第二个是x轴上的范围
   nd = np.random.randint(0,1000, size=100)
   np.histogram(nd, bins=10, range=[0,1000])
   ```



###### numpy金融学

> 包含一些财务方面的计算操作

...





###### numpy保存读取数据

1. **np.save**

   ```python
   #将数组nd保存为二进制后缀为npy(后缀必须为npy)的文件
   np.save('./data.npy', nd)
   ```

2. **np.load**

   ```python
   #读取npy数据文件
   np.load('./data.npy')
   ```

3. **np.savetxt / np.loadtxt**

   ```python
   #以txt格式默认科学计数法的方式保存和读取数据
   np.savetxt('./data.txt', nd)
   np.loadtxt('./data.txt')
   ```

   



## opencv-python

###### cv2基本操作

```python
#导包
import cv2

#读取图片
img = cv2.imread('路径')

#显示图片
cv2.imshow('窗口名',图片数据)

#窗口等待输入以保持显示 , 并判断是否输入的是q
#ord是将q转换为ASCⅡ码
while True:
	if ord('q') == cv2.waitKey(0):
        break
#接收到输入后关闭窗口
cv2.destroyAllWindows() 

#转换颜色
img = cv2.cvtColor(图片数据,code = cv2.COLOR_BGR2GRAY)
cv2.imshow('窗口名',img)
cv2.waitKey(0)
cv2.destroyAllWindows() 


#保存图片
cv2.imwrite('要保存的文件名及路径',图片数据)


#修改图片大小
img = cv2.resize(图片数据, dsize=(目标大小的宽,目标大小的高))
```



###### cv2人脸识别

1. 到github/opencv/data/ haarcascades / 下下载一个预训练好的xml文件

2. 加载人脸特征数据xml文件并检测图片中的人脸

   ```python
   #使用级联分类器加载特征数据, 返回一个可以识别指定特征的分类器
   detector = cv2.CascadeClassifier('人脸特征数据的xml文件')
   
   #使用黑白图片进行检测,然后在原图片中加框,可以提高运行效率
   
   #使用分类器检测图片,返回一个检测结果的范围
   #这里返回的是四个元素的数组, 代表目标区域的左上角和宽和高
   #该方法可通过参数调整识别的精度
   zone = detector.detectMultiScale(图片数据)
   
   #画框框出结果区域
   for x,y,w,h in zone:
       cv2.rectangle(目标图片数据,pt1=(x,y), pt2=(x+w,y+h), color=[0,0,255])
       
   #显示图片...
   ```

   



###### cv2操作视频

```python
#读取视频, 返回 VideoCapture 对象
#如果这个参数设置为0, 那么会调取本地的摄像头获取视频
cap = cv2.VideoCapture('视频路径')

#读取一帧
#返回: (是否拿到了一帧,这一帧的数据)
flag,frame = cap.read()

#读取所有帧
#isOpened() 返回是否视频流还开着
while cap.isOpened:
    flag,frame = cap.read()
    #判断是否到最后一帧了
    if flag == False:
        break
        
    #此处可加人脸识别...
    
    cv2.imshow('标题',frame)
    if ord('q') == cv2.waitKey(10):
        break
cv2.destroyAllWindows()


#获取视频参数
cap.get(propId = cv2.CAP_PROP_...)


#视频用完要释放资源
cap.release()


#保存视频
#新建一个captureWrite
#第二个参数指定视频保存的fourcc编码格式,为四个字符, 这里使用的是map4的编码格式
#第三个参数是视频的fps
#第四个参数是视频的宽高
vWriter = cv2.VideoWriter('目标文件路径',cv2.VideoWriter_fourcc('M','P','4','v'),24,(w,h))

#写一帧到视频中
vWriter.write(帧的数据)

#写完帧数据后要关闭输入流,才能保存视频
vWriter.release()
```



###### 拓展:ffmpeg

使用指令操作视频的软件, 可以使用PrCC代替



###### 拓展 : subprocess

```python
#用来执行cmd命令
import subprocess

cmd = 'cmd命令...'

#执行cmd,返回0是执行成功,1是失败
subprocess.call(cmd)
```



###### 音频操作

```python
import numpy as ny

#wav无损音乐格式
#导入wav操作工具wavfile
#音乐数据是二维的ndarray , 一行是左声道, 一行是右声道 
from scipy.io import wavfile

#读取音频
radio = wavfile.read('音频文件')
#radio是一个元组 : ( 音频采样率, 音频数据即二维的ndarray数组 )
#采样率: 1s采集多少个音频数据
#使用radio中音频数据的长度除以采样率就是音频的时长

#写音频
wavfile.write('文件名',采样率 ,音频数据数组)
```





## pandas

> 基于numpy的数据分析工具, 能够高效处理大型数据

> series 和 dataframe 是pandas中的数据类型
>
> series 是一维数组结构 , 其实是map
>
> dataFrame是二维数组结构 , 即数据表格

###### Series基本使用

> Series是numpy的升级, numpy中有的功能都有

```python
import numpy as np
import pandas as pd
from pandas import Series,DataFrame
import matplotlib.pyplot as plt

#创建series 
#data 数据
#index 索引
#name 该series的名字
s = Series(data=np.random.randint(0,150,size=10),index=list('abcdefghij'),name = 'series的名字')

#或者直接使用字典创建
s = Series({'a':123,'b':234,'c':345})

#使用索引获取元素
#如果给的是数组,那么返回的是这些索引对应的多个值
s[['a','a','b']]
#使用下标获取元素
s[0]
#或者使用方法获取元素
s.iloc[0]
s.loc['a']
#切片同数组
s['a':'b']
s[0:1]
s.loc['a':'b']
s.iloc[0:2]

#相关属性
s.shape
s.size
s.index
s.values #返回的是ndarray

#获取前几对数据和后几对数据
s.head()
s.tail()

#查询数据中是否有NaN
#先设置几个空
s[['a','b']] = np.NaN
s.isnull()
cond = s.notnull()
#筛选非空属性
s[cond]

#统计各个数字出现的次数
s.value_counts()

#两个series运算时, 是对应索引的值进行运算
```



###### DataFrame基本使用

```python
#!!!非常重要

#创建DataFrame
df = DataFrame(data={'python':np.random.randint(0,150,size=5),
                    'math':np.random.randint(0,150,size=5),
                    'english':np.random.randint(0,150,size=5)},
              index=list('ABCDE'))
df

#或者直接使用np创建
df = DataFrame(data=np.random.randint(0,150,size=(10,4)),
              index=list('abcdefghij'),
              columns=['python','math','english','physic'])
df


#============================================
#保存数据
#保存到剪切板
df.to_clipboard()
#保存为csv , csv:就是txt , 保存的时候后缀可以是txt
df.to_csv('保存的文件路径')
#保存为excel
df.to_excel('保存的文件路径')

#读取数据 
df = pd.read_excel('文件路径')
df = pd.read_csv('文件路径')
#重命名某一行的名字或列的名字
#axis为0则为重命名行名, 为1则为重命名列名
df = df.rename(mapper={'Unnamed: 0','index'},axis=1)
#设置某一列作为索引列 , 这里设置列名为index的列为索引列
df.set_index(keys='index')


#==========================================================
#df的一些属性
df.values
df.columns
df.index
df.shape


#============================================================
#df列索引
#使用. 或者[], 返回的是名字为python的列的数据 , 这个数据是Series类型的
df.python
df['python']
df[['python','math']]

#df行索引
#使用loc方法, 获取行名为a的行 , 或者直接使用iloc方法使用下标获取
df.loc['a']
df.iloc[0]

#df元素索引
#应当结合行索引和列索引的方法
df['python']['a']
df.loc['a']['python']
df.loc['a','python']

#=============================================================
#df切片
#使用[] 或 loc 或 iloc 对行切片
df['a':'d']
df.loc['a':'d']
df.iloc[0:4]

#使用 iloc 对列切片
df.iloc[:,1:3]


#=============================================================
#df常用方法
df.min()
df.max()
df.std() 
df.corr()
df.var() #方差
df.cov() #协方差



#=============================================================
#df运算
#全员运算
df + 10
df.pow(2)
#两个df的运算, 如果直接使用python的运算符+ - * /之类的,那么如果其中一个df包含NaN, 结果中那个位置也为NaN
#如果使用pandas中的运算方法, 可以通过参数设置使其不加完为NaN
df1 + df2
#也可以df加Series, df中与Series中属性匹配的值会被对应运算 , 可使用axis指定匹配行或列, 默认匹配列
df1.add(df2, fill_value=0)
```



###### pandas数据清洗

> 即空值(NaN)处理

```python
# 1. 创建空值
#TODO
import pandas as pd
from pandas import Series,DataFrame
import numpy as np

df = DataFrame(np.random.randint(0,150,size=(150,3)),columns=['python','math','eng'])
df
for i in range(15):
    index = np.random.randint(0,150,size=1)[0]
    column = np.random.randint(0,3,size=1)[0]
    df.iloc[index,column] = None
    
df
#0号轴:x方向 , 1号轴:y方向
#在1号轴上使用any, 也就是y方向
#返回一个同行数的一维数组, 只要原数组某一行包含None,对应的这一行的值就是true
cond = df.isnull().any(axis = 1)
#使用cond做df的下标数组取数据
#如果位置上为false ,则不返回, 位置上为true , 则返回, 使用该下标数组返回的是包含None的行
df[cond]

#同理, 返回的数组中, 不含None的行是true , 包含None的行是false
cond = df.notnull().all(axis = 1)
#使用该数组筛选数据, 返回的是不包含None的数据, 即过滤掉了df中的带有None的行
df[cond]

#可以使用pandas自带的方法过滤带None的行
df.dropna()

#删除行或列, 默认删除行, 指定axis=1删除列
df.drop(labels=['eng'], axis=1)
#使用drop过滤包含None的行
cond = df.isnull().any(axis=1)
index = df[cond].index
df.drop(labels=index)

#使用drop过滤掉包含 <60 的行
cond = (df < 60).any(axis=1)
index = df[cond].index
df.drop(labels=index)

#同时使用两个过滤条件,平均分 大于60 且 小于100
cond1 = (df.mean(axis=1) > 60)
cond2 = (df.mean(axis=1) < 100)
cond = cond1 & cond2
df[cond]


#numpy中的NaN, 能参与运算不报错, 结果总是None , 本质是float
np.NaN + 10 
#py中的None , 不能参与运算会报错
None + 10

#使用fillna()填充None
#通过指定method参数 向前填充或向后填充, 默认使用同一行的前后进行填充, 可通过指定axis修改, axis=0 行, axis=1 列
df.fillna(60)
```

###### pandas多层索引

```python
import numpy as np 
import pandas as pd
from pandas import Series,DataFrame

#创建多层索引, 即有多个索引
#使用from_product指定多层索引
s = Series(np.random.randint(0,150,size=6),index = pd.MultiIndex.from_product([['A','B','C'],['期中','期末']]))
    
#在DataFrame中使用多层索引 , 即嵌套表头
#多层索引同样可使用在列即columns属性上
df = DataFrame(np.random.randint(0,150,size=(10,3)),columns=['py','math','en'],
              index=pd.MultiIndex.from_product([list('ABCDE'),['期中','期末']]))

#多层索引的切片
df.loc['A':'B']
df.iloc[0:3]

#多层索引的聚合操作
#其他操作都类似于mean, 使用level指定使用第几层索引
df.mean()
#设置level以指定使用第几层索引进行计算
df.mean(axis=0, level=0)
 
#调整多层索引行和列的结构
#可设置level参数指定调整第几层索引
df.stack() #列索引变行索引
df.unstack() #行索引变列索引 
#多层索引的Series可使用unstack转换成DataFrame
```

###### pandas分组聚合

```python
#创建 100*4 的二维数组
df = DataFrame({'item':np.random.randint(0,10,size=100),
               'sailer':np.random.randint(0,10,size=100),
               'weigth':np.random.randint(30,300,size=100),
               'price':np.random.randint(1,20,size=100)})
#对数组内容调整
def convert_item(x):
    if x<2:
        return '萝卜'
    elif x<7:
        return '白菜'
    else:
        return '黄瓜'
    
df['item'] = df['item'].map(convert_item)
df

def convert_sailer(x):
    if x<5:
        return '张大妈'
    if x<7:
        return '李大妈'
    else:
        return '王大妈'
    
df['sailer'] = df['sailer'].map(convert_sailer)
df

#统计 张大妈, 李大妈, 王大妈 各自总共买了多少斤菜
#1.分组
ret = df.groupby(['sailer'])
ret
#2.求和
ret.sum()
#2.求条数
ret.count()
#2.求最小
ret.min()
#...
#对分组使用自定义的方法处理
def myapply(x):
    return (x.size, x.sum())
ret.apply(myapply)

#按照多个属性分组 ,结果为多层索引
g = df.groupby(['sailer','item'])
#将分组结果使用聚合操作计算 ,agg 同apply对分组对象执行指定de操作 , 不同的是接收的参数是字符串类型, 而且可以接收字典类型的值对不同列执行不同的聚合操作
#对weight列执行sum操作, 对 price 列执行mean操作
g.agg({'weight':'sum','price':'mean'})
```

###### pandas数据继承

> 就是数据的拼接合并

```python
df1 = DataFrame(np.random.randint(0,150,size=(5,3)),columns=['py','math','en'],index=list('ABCDE'))
df2 = DataFrame(np.random.randint(0,150,size=(5,3)),columns=['py','math','en'],index=list('HIJKL'))

#显示数据
display(df1,df2)
#拼接数据
#默认把相同列的数据拼接到一起
#设置 join 属性指定连接方式 , 内连接, 外连接 ... 
#设置 join_axes 属性指定合并时使用哪个列作为依据
#设置 keys 属性指定在合并中出现相同的index时, 依次按照指定keys作为二级索引出现在结果中
pd.concat([df1,df2])

#使用 append() 追加数据
df1.append(df2)

#使用 merge() 合并数据
#相同属性相同值的记录进行合并, 其他的不相同的数据被丢弃
#设置 on 属性指定以哪一列相同为标准进行合并
#一对一合并
df1 = DataFrame({'id':[1,11,1025],'name':['alice','blice','clice'],'sex':['m','f','f']})
df2 = DataFrame({'id':[1,10,1024],'weight':[40,60,50],'height':[100,110,120]})
df1.merge(df2)
#多对一合并
df1 = DataFrame({'id':[1,11,1025],'name':['alice','blice','clice'],'sex':['m','f','f']})
df2 = DataFrame({'id':[1,1,1],'weight':[40,60,50],'height':[100,110,120]})
df1.merge(df2)
#多对多合并
df1 = DataFrame({'id':[1,1,1],'name':['alice','blice','clice'],'sex':['m','f','f']})
df2 = DataFrame({'id':[1,1,1],'weight':[40,60,50],'height':[100,110,120]})
df1.merge(df2)
 
#合并时设置 left_on 和 right_on 指定使用左边表的哪一列和右边表的哪一列作为合并依据列
df1 = DataFrame({'id':[1,11,1025],'name':['alice','blice','clice'],'sex':['m','f','f']})
df2 = DataFrame({'Id':[1,10,1024],'weight':[40,60,50],'height':[100,110,120]})
pd.merge(df1,df2, left_on='id', right_on='Id')

#使用 pd.merge() 合并时, 可设置 left_index=True , right_index=True 来使用行索引进行合并,即列合并
#使用 pd.merge() 合并时, 可设置 how='left' 来指定两个表的连接方式, left,right,outer,inner ...
```

###### pandas数据查询

```python
df = DataFrame({'id':[1,11,1025],'name':['alice','blice','clice'],'sex':['m','f','f']})
#使用query函数进行查询, 参数即为sql中的条件
df.query("id == 1 and name == 'alice'")
```

###### pandas排序

```python
df = DataFrame({'id':[1,11,1025],'name':['alice','blice','clice'],'weight':[147,150,120]})
#使用某一列的值排序
df.sort_values(by = 'weight')
```

###### pandas读取文件数据

```python
#设置 sep 指定文件数据的分隔符
#可直接读取url
pd.read_csv('数据文件地址')
```

###### pandas读取数据库

```python
#1.读取sqlite : 该类型数据文件可通过软件 SQLite Expert Personal 查看

#导包
import sqlite3
#读取sqlite文件
con = sqlite3.Connection('./data.sqlite')
#执行sql
df = pd.read_sql('select * from 表名', con)
df.shape
#保存数据到sqlite文件中
#chunksize 设置数据是否分块读写数据以及每个分块多大, 适用于数据量很大的情况
#设置 if_exists 指定如果文件存在时的操作
df.to_sql('datafile',con, index=False, chunksize=1024)
```

###### pandas操作mysql

1. 需要先安装 
   1. pymysql   `pip install pymysql`
   2. mysqlclient  `pip install mysqlclient`
   3. sqlalchemy `pip install sqlalchemy`
2. 

```python
import numpy as np
import pandas as pd
from pandas import Series,DataFrame
import pymysql
from sqlalchemy import create_engine

#获取连接
con = pymysql.Connection(host='127.0.0.1', port=3306, user='root',password='123',database='test',
                        charset='utf8')
con
#执行sql - 读
sql = 'select ...'
df = pd.read_sql(sql, con)
df

#获取数据库的写引擎
engine = create_engine('mysql-pymysql://softpo:root@localhost:3306/database_name?charset=utf8')
engine
#执行sql - 写 , 使用df的数据创建名为create_table_name的新表
df.to_sql('create_table_name',engine)
```

###### pandas数据处理

```python
#删除重复元素
# duplicated() 函数检测重复的行, 返回元素为bool类型的 Series对象, 每个元素对应一行, 如果该行不是第一次出现, 则元素为true
df = DataFrame({'color':['red','blue','yellow','red'], 'price':[10,20,30,10]})
df
df.drop_duplicates()

#使用 replace() 替换元素
#把值为10的元素替换成15 , 把值为20的元素替换成25
df.replace({10:15, 20:25})

#使用 map() 函数对每一个元素进行操作, 相当于js的 forEach
df = DataFrame(np.random.randint(0,150,size=30,3), columns=['py','math','eng'])
df['py'] = df['py'].map(lambda x: x+10)
df

#增加一列数据
def convert_level(x):
    if x<60:
        return '不及格'
    elif x<90:
        return '及格'
    else:
        return '优秀'
df['level'] = df.mean(axis=1).map(convert_level)
df
#transform() 和 map() 功能相同

#使用 rename() 重命名索引
#默认重命名行索引, 设置 axis=1 重命名列索引
df.rename({0:'A', 1:'B'})
```

###### pandas数据抽样

> 就是检测数据中不符合逻辑的数据并过滤, 比如 年龄为200

```python
df = DataFrame(np.random.randint(0,1000,size=(100000,3)),columns=['red','blue','green'])
df
#创建行索引数组
index = np.random.randint(0,100000,size=50000)
index
#使用行索引数组获取DataFrame中对应的行
df.take(index)
```

###### pandas日期类型转换

```python
#apple 为一个表 , Date 为一列, 类型为object, 使用 pd.to_datetime() 将其转换为时间类型
apple['Date'] = pd.to_datatime(apple['Date'])
```

###### pandas分组重采样

```python
#首先得使用日期时间类型的列作为index
apple.set_index('Date',inplace=True)
# 随便使用一列进行分组
res = apple.groupby('列名')
# 使用时间重新采样, D代表按照天分组, M按照月分组, Y按照年分组
res.resample('M')
```

###### pandas数据绘制图表

```python
#导包
import matplotlib.pyplot as plt

#使用Series绘图
s = Series(np.random.randint(0,10, size=10))
#设置kind 指定图表的类型
s.plot()

#使用DataFrame绘图
df = DataFrame(np.random.randint(0,150,size(10,2)),columns=['py','en'], index=list('ABCDEFJKIH'))
df
df['math'] = df['py'].map(lambda x: x+np.random.randint(-10,10,size=1)[0])
df
#设置kind 指定图的类型
df.plot()

#在一个图中显示多个类型的图
#同时显示直方图和概率分布图, bins指定直方图的柱子个数,默认是10, density设置是否归一化显示
#设置 c 指定颜色
s.plot(kind='hist', bins=100,density=True)
s.plot(kind='kde', c='red')

#绘制散点图 : 用于观察两个一维数据数列之间的关系
#需要指定 x 和 y 参数, 分别指定df中的两个列, 然后根据这两列的数据作为x,y坐标绘制点
df.plot(x='py', y='math', kind='scatter')

#散点图矩阵 : 就是同时把所有的列属性两两之间的散点图同时绘制出来呈现出现类似九宫格的图
pd.plotting.scatter_matrix(df)
```



## scipy

> python的科学计算库
>
> scipy 依赖于 numpy
>
> scipy是高级的科学计算包, numpy是基础的科学计算包

##### scipy 傅里叶变换

> 傅里叶变换 :  时域波谱  ->(分解)-> 多个正弦波 ->(转换)-> 多个频域波谱  -> 滤波之类操作  

###### 傅里叶变换图片滤波

> 图片中的噪声 : 把图片数据想象成波谱 , 那么波谱中不平滑而且明显和周围数据不是一个级别的部分就是噪声
>
> 使用傅里叶变换滤波 : 把图片数据对应的波谱变换成多个正弦波 . 然后去除噪声波, 再把剩下的波合成一个波, 最后将处理后的波还原成图片.

```python
import numpy as np
import scipy as sp
import matplotlib.pyplot as plt
#fft2 包含傅里叶变换的函数, ifft2 包含把傅里叶变换结果再还原成时域波谱的函数
from scipy.fftpack import fft2,ifft2

#读取图片
#灰度图的数据只是一个二维数组, 因为只有一个颜色通道
#彩色图的数据是三维数组, 第三维数据的个数是通道的个数, 如rgb格式的图片第三维有三个数
pic = plt.imread('图片路径')
plt.imshow(pic) 

#傅里叶变换图片数据
f_pic = fft2(pic)
f_pic

#计算所有数据波动的平均值, 后面使用这个值作为滤波标准
f_mean = np.abs(f_pic).mean()

#定义大于平均值10倍的频率被过滤掉
#这里只是简单的将原来的频率替换成0
cond = np.abs(f_mean*10) > 500
f_pic[cond] = 0

#将频域还原成时域数据
res_pic = ifft2(f_pic)
#去除结果中的虚数部分
res_pic = np.real(res_pic)

#显示结果
plt.imshow(res_pic)
```

##### scipy积分

> 积分: 以直代曲,无限接近, 求面积

```python
#导包
from scipy import integrate

#定义函数方程
c = lambda x : x**2 -1
#求定积分, 第一个参数是函数方程, 第二个和第三个参数是定积分的区间
#返回两个值, 第一个是结果, 第二个是误差
integrate.quad(c, -1, 1)
```

##### scipy 的 io 操作

###### 二进制文件操作

```python
#导包
from scipy import io

#保存数据
#设置mdict以指定数据的索引名
io.savemat('xxx.mat', mdict = {'数据索引名字': 数据})

#读取数据
io.loadmat('文件路径')
```

###### 图片操作

```python
#导包
from scipy import misc

#读取图片
pic = misc.imread('图片路径')
pic
plt.imshow(pic)

#操作图片
pic = misc.imrotate(pic, 45)
plt.imshow(pic)
pic = misc.imresize(pic, 10)
plt.imshow(pic)
#滤波
#第二个参数选择滤波类型, 只有内置的几种可选择类型 , 光滑,锐化,浮雕,边缘检测...
pic = misc.imfilter(pic, 'blur')
plt.imshow(pic)
```

###### ndimage

```python
#这个方法返回的是 scipy 自带图片的数据
pic = misc.face()
plt.imshow(pic)

#移动图片
#shift : y轴位移量, x轴位移量, 颜色偏移量
#cval : 指定移动后空白处填充颜色
#model : 指定填充的模式 , 默认是单色填充
pic = ndimage.shift(pic, shift=[0,200,0], cval = 255)
plt.imshow(pic)

#旋转 : 不会切除超出部分
#mode : 指定填充模式
pic = ndimage.rotate(pic,angle = 60)

#缩放
#zoom的第三个参数:颜色 -> 1:原样 1/3:去色 4/3:透明
pic = ndimage.zoom(pic, zoom=[0.5, 0.5, 1])

#卷积滤波=====================================
#1.高斯滤波 : 使用高斯函数为卷积核的卷积运算滤波方式
# sigma : 指定高斯函数方差值
# 该方式同 misc 中的 smooth 滤波方式
pic = ndimage.gaussian_filter(pic, sigma=2)
plt.imshow(pic)
#2.中值滤波
# size 设置卷积核的大小
pic = ndimage.median_filter(pic, size=5)
```

##### scipy矩阵和稀松矩阵

> scipy 中的矩阵是对象

```python
#导包
from scipy import matrix

#创建矩阵
m = matrix(np.random.randint(0,10,size=(4,5)))
m
#调用矩阵相关方法...
m.xxx()

#稀松矩阵 
#1.创建10000*10000的普通矩阵
s = np.random.randint(0,100,size=(10000, 10000))
#2.该矩阵保存后占用的内存大小大约为400M : 32/8*10000*10000/1024/1024
np.save('./s.npy', s)
#3.如果该矩阵大部分都是0
s[s<98] = 0
s
#4.此时该矩阵保存为文件占用大小仍然是400M, 虽然大部分是0
np.save('./s.npy', s)
#5.改用稀松矩阵存储该数据
#导包
from scipy import sparse
#转换为稀松矩阵, 以列压缩的方式
cs = sparse.csc_matrix(s)
#或者以行压缩的方式
cs = sparse.csr_matrix(s)
print(cs)
#保存稀松矩阵
sparse.save_npz('./sparse.npz',cs)
#此时查看保存的文件大小将会大大缩小
```

##### scipy插值

```python
import matplotlib.pyplot as plt
#导包
from scipy.interpolate import lagrange
from scipy import interp

#创建sin函数
#x轴, 等差数列
x = np.linespace(0, 2*np.pi, 10)
#y轴, sin函数
y = np.sin(x)
#绘制折线图
plt.plot(x,y)

#线性插值: 即线性的求出函数中两个点之间的值 
X = np.linspace(0, 2*np.pi, 40)
Y = interp(X, x, y)
plt.plot(X, Y, marker='o')

#使用拉格朗日插值法进行插值....
```

## matplotlib

###### matplotlib画曲线

```python
#设置字体, 默认中文显示不了
from matplotlib import rcParams
#设置一个中文字体(楷体)
rcParams['font.sans-serif'] = 'KaiTi'
#设置了中文字体后, 负号会显示不了, 设置这个属性使得负号可以显示
rcParams['axes.unicode_minus'] = False

#画函数曲线
x = np.linspace(0, 2*np.pi)
y = np.sin(x)
plt.plot(x, y)
#也可以不传x, 使用默认的x坐标
plt.plot(y)
#可以指定绘制曲线的marker, 可选范围 o , v ,. , * , d
plt.plot(y, 'o')
#指定 marker 参数时, 即画线, 也画marker
plt.plot(y, marker = 'o')

# plot 函数中可设置参数直接指定曲线的, 颜色, 透明度, 线型, 线宽......

#同时画多条曲线
y2 = np.cos(x)
plt.plot(x, y)
plt.plot(x, y2)
#也可以直接传入多个x和y来绘制多条曲线
plt.plot(x,y,x,y2)


#画网格
plt.plot(x,y)
plt.grid() 

#同时画多个图
#一行三列
ax = plt.subplot(1,3,1)
ax.plot(x,y)
ax.grid()
ax = plt.subplot(1,3,2)
ax.plot(x,y)
ax.grid(color='red', alpha = 0.2, linestyle = '--')
ax = plt.subplot(1,3,3)
ax.plot(x,y)
ax.grid()

#设置坐标系刻度
plt.plot(x,y)
plt.axis([-2,8, -1,1])

#设置曲线颜色
#plot返回的是曲线类型列表
line, = plt.plot(x,y)
line.set_color('red')

#默认的横坐标和纵坐标刻度长度是不一样的
#设置为 equal 使其一样
#设置为 off 关闭坐标轴
plt.plot(x, y)
plt.axis('equal')

#设置 xlim 和 ylim 设置横纵坐标范围
plt.xlim([-1.5, 1.5])
plt.ylim([-1, 1])

#xlabel 设置横坐标标签
plt.xlabel('X', fontsize=20, color='red')

#设置曲线标题
plt.title('标题')

```

![1614046756615](python数据分析.assets/1614046756615.png)

```python
#设置图例
#设置 loc 属性设置图例位置
# ncol 属性设置图例分列显示
x = np.linspace(0, 2*np.pi)
plt.plot(x,np.sin(x), x, np.cos(x))
plt.legend(['正弦','余弦'])
```

```python
#保存曲线为图片
# 可保存的格式 jpg , png , ps ,pdf , svg
# dpi 设置分辨率
# facecolor 设置背景颜色
plt.plot(x, np.sin(x))
plt.savefig('./fig.jpg')
```

```python
import numpy as np
import matplotlib.pyplot as plt
%matplotlib inline

# plt 全局设置横纵坐标
plt.xticks(np.arange(7), list('abcdefg'))
plt.yticks(np.arange(7))
```

```python
#总结设置曲线属性的方法

# 1. 直接在 plot 的时候传参设置属性

# 2. 对 plot 返回的对象使用 set_XXX 方法

# 3. 使用 plt 下的 setp 方法设置指定曲线的属性
```

###### matplotlib画统计图

```python
# plt.hist() 直方图 , 反映数据分布情况
# plt.bar() 条形图 , 就相当于离散的曲线点生成的柱子
# plt.pie() 饼图
# plt.scatter() 散点图

# 设置坐标系为极坐标系
plt.axes(polar = True) 

# plt.text() 设置统计图中的文本

# plt.annotate() 设置统计图的中的注释, 可设置注释的同时设置一个箭头指向某个点
```

###### matplotlib画3D图形

```python
#导包
from mpl_toolkits.mplot3d.axes3d import Axes3D

#生成数据
x = np.linspace(-2,2,100)
y = np.linspace(-2,2,100)
#网格交叉x 和 y 的数据 ( 就是取 x 中的所有值与 y 中的所有值依次组合成为坐标值)
#因为x 和 y 的只有足够多, 所以交叉组合后的点会很密集以至于组成一个面
X, Y = np.meshgrid(x,y)
Z = (X**2 + Y**2)**0.5

#画图
fig = plt.figure(figsize=(12,9))
axes3D = Axes3D(fig)
axes3D.plot_surface(X,Y,Z)
```



## pyechart

> 百度出品的图表绘制

lu
