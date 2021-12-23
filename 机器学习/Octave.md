% 注释

~= 不等于

xor(a,b) 异或

PS1('>> ') 修改命令行行首样式为自定义内容

pi 派

disp(xxx) 打印

A=[1 2; 3 4; 5 6] 三行两列矩阵

v=[1: 0.1: 2] 从1开始，步长为0.1, 到2截止，生成数列行向量

v=1:6 从1开始，步长为1, 到6截止，生成数列行向量

ones(2, 3) 生成2行3列全是1的矩阵

zeros(2, 3) 生成2行3列全是0的矩阵

sqrt(x) 根号x

rand(2, 3) 生成2行3列全是0-1随机数的矩阵

randn(1, 3) 生成1行3列符合高斯分布随机数的矩阵，均值为1, 方差为1

eye(n) 生成n*n的单位矩阵

size(w) 返回矩阵w的形状

length(w) 返回矩阵w中较大的维度值，比如3*2的矩阵，返回3



pwd显示工作路径

ls列出文件

cd切换工作路径

load xxx 加载xxx文件中的矩阵数据

who列出当前内存中保存的所有变量

whos详细列出当前内存中保存的所有变量

clear 删除内存中所有变量

clear x 删除内存中指定变量

save xxx x [-ascii] 将变量x [以文本字符串的方式（默认为二进制）] 保存为文件xxx



假设A和B都是一个矩阵

A(2,3) 获取矩阵中第二行第三列的值

A(2,: ) 获取矩阵中第二行所有元素

A(: 2,) 获取矩阵中第二列所有元素

A=[A, [1；2；3]] 在A后面加上一列

A(:) 将A中所有的元素放到一个列向量中

C=[A B] 将A和B横向拼接赋值给c

C=[A; B] 将A和B纵向拼接赋值给C



A*B 矩阵乘法

A.*B 对应元素相乘

A.^B 对应元素n次方

log(A) 对每个元素以e为底，进行log

abs(A) 每个元素绝对值

A+1 全员加一

A' 转置

[val, index] = max(A) 返回最大值以及索引

A<1 全员比较

find(A<1) 筛选元素

sum(A) 元素求和

prod(A) 元素累乘

floor(A) 元素向下取整

ceil(A) 元素向上取整

pinv(A) 对A求逆矩阵





hist(x, [n]) 将矩阵x中的值绘制成直方图，横轴时数值，纵轴是出现次数, n设置柱子的个数

plot(x, y, [color]) 绘制曲线图

 hold on 将上一步中绘制的图像保持，继续绘制接下来的图像，用于多条曲线的绘制

xlabel('xxx') 设置x轴的label

ylabel('y') 设置y轴的label

legend('xx','yy') 设置去下图例，按照绘制图像的顺序标记

title('xxx') 设置图像标题

print -dpng 'xxx.png' 保存图像

figure(n) 开始绘制第n个图像，每个图像都是单独一个窗口显示

subplot(m,n, i) 绘制m乘n的图像格子，然后将当前图像绘制到第i个格子中

axis([ 1 2 3 4 5 ]) 设置x轴刻度

clf 清理当前图像





```octave
% for
for i=1:10, 
    <expression> ;
    <expression> ;
end;

% while
while i<5,
	<ex>;
end;

# if
if i<10,
	<ex>;
elseif i<20,
	<ex>;
else
	<ex>;
end;
```





函数

函数需要单独定义在文件中

```octave
# 在文件中定一个函数, y就是返回值
function y = add(x)
y=x+1

# 可以同时返回多个值
function [y1, y2] = add(x)
y1=x+1
y2=x+2
```

然后直接在 octive 命令行中调用该函数，注意需要将该文件放到当前工作目录下

否则使用 addpath() 将函数所在目录添加到搜索路径也可

```octave
add(5)
```

