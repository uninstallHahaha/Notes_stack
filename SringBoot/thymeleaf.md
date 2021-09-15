## thymeleaf

* 标准变量表达式 ${xxx}, 直接从scope中取值

* 选择变量表达式 ( 属性变量表达式 ) *{},  *代表当前最小域, 

  如果它的上级标签中使用了th:object绑定了对象, 那么这个最小域就变成了这个对象,

  亦可以不使用th:object, 直接使用 *{}, 此时的最小域就是整个网页的scope, 那么此时用法同${}, 例如 *{user.name}

  1. 在controller接口中的model封装一个实体类实例对象 `model.addAttribute("user",user);`

  2. 在模板标签中先使用th:object绑定这个对象

  3. 然后在绑定对象标签的子标签中使用*{}直接取对象属性

     ```html
     <div th:object="${user}">
         <p th:text="*{name}"></p>
         <p th:text="*{age}"></p>
         <p th:text="*{email}"></p>
     </div>
     ```

* url表达式, @{}, 与th:href属性同时使用,  用于动态地设置标签的href属性

  * 例如  < a href="info.html" th:href="@{'/user/info?id='+${user.id}}"> 查看< /a >
  * 这个例子中的路径拼接可以使用|来实现 @{|/user/info?id=${user.id}|}
  * 这个例子中的路径前有/, 那么在编译后会被自动加上项目名

### 标签属性

- th:text="${xxx}"标签, 设置元素的text属性
- th:object="${xxx}", 绑定一个对象到这个标签上, 那么该标签的子标签可以使用*{}直接取属性

* th:href="@{xxx}" ,设置标签的href属性

* th:action="@{xxx}" 动态地设置表单的提交地址

  ```html
  <form th:action="@{|/user/update/${user.id}|}"></form>
  ```

* th:each 循环

  ```html
  <!--
  userList是后台传过来的数组数据
  user是数组中的一个元素
  interStat是整个循环体的状态对象,其中包含属性, 可以不写, 默认名字是数组元素变量后面加上Stat:
  index: 当前迭代对象的index(从0开始)
  size: 数组的大小
  count: 当前迭代到哪一个元素 (从1开始)
  current: 当前循环到的变量
  even/obb: 布尔值, 当前循环的index是否是偶数/奇数
  first: 布尔值, 当前循环的元素是否是第一个
  last:布尔值, 当前循环的元素是否是最后一个
  -->
  <tr th:each="user, interStat : ${userList}">
  	<td th:text="${interStat.index}"></td>
      <td th:text="${user.id}"></td>
      <td th:text="${user.name}"></td>
  </tr>
  
  <!--map类型的遍历-->
  <div th:each="item: ${mapData}">
      <p th:text=${item.key}></p>
      <p th:text=${item.value}></p>
      <br/>
  </div>
  ```

* th:id 动态设置标签的id

  ```html
  <p th:id="${userId}"></p>
  ```

* th:if 值判断

  ```html
  <!--只会显示一个 , 也可以使用 ${sex eq '1'}或者${sex == '1'}来判断-->
  <p th:if="${sex}==1">男</p>
  <p th:if="${sex}==2">女</p>
  ```

* th:unless if的相反判断

* th:switch和th:case 分支

  ```html
  <!--一旦一个情况判断为true,其他的都会被判断为false, * 代表默认-->
  <div th:switch="${sex}">
  	<p th:case="1">女</p>
      <p th:case="2">男</p>
      <p th:case="*">无</p>
  </div>
  ```

* th:src 动态设置src属性, 常与@{}一起使用

* th:value 动态设置value属性

* th:attr 动态设置一对属性键值

  ```html
  <!--设置value属性值为${username}-->
  <span th:attr="value=${username}"></span>
  ```

* th:onclick="'xxx()'" 动态设置点击事件 ( 注意方法名要用''引起来, 没用 )

* th:style=" 'color:red;' "  设置样式 ( 同样需要多加一个'' , 没用)

* th:method="post" 设置表单提交的方法, 用于form标签中 ( 没用 )

* th:name="${}"  动态设置name属性

* th:inline 设置内联文本text, 内联脚本javascript, 普通none

  ```html
  <!--设置为text, 设置为内联文本, 即设置[[...]]中的数据以文本的形式来展示-->
  <!--在标签内使用${}取值的方式-->
  <!--使用[[...]]时, 父标签中的th:inline默认为text, 即默认解析为文本展示-->
  <span th:inline="text">hello, [[${username}]]</span>
  <!--等同于-->
  <span>hello, <span th:text="${username}"></span></span>
  ```
```
  
  设置内联脚本 ( 在js中使用后台传过来的值 )
  
  ```html
  <!--设置里面的[[...]]解析为js代码, type是script自带的属性-->
  <script th:inline="javascript" type="text/javascript">
  	var username = [[${user.name}]]
      alert(username)
  </script>
```

  



#### thymeleaf字面量 ( 数据类型 )

* 文本字面量 : 用''引起来
* 数字字面量 : 数字
* Boolean字面量 : true 和 false
* null字面量 : null



#### 字符串拼接

* 普通的+字符串拼接

  ```html
  <span th:text="'aaa'+${name}+'bbb'"></span>
  ```

* 使用|的拼接

  ```html
  <span th:text="|aaa${name}bbb|"></span>
  ```

  

#### 三元表达式

```html
<span th:text="${sex eq 1}?'女':'男'"></span>
```



#### 运算和关系判断

+,-,*,/,%,>(gt),<(lt),>=(ge),<=(le),==(eq),!=(ne)



#### 内置基本对象 , 对应网页域对象

* 使用#前缀来使用
* #request 
  * 相当于HttpServletRequest对象, 如果是2.x版本, 使用#httpServletRequest来使用
  * ${#request.getContextPath()}  //获取上下文
  * ${#request.getAttribute("name")}  //获取数据

* #session

  * 相当于HttpSession对象, 如果是2.x版本, 使用 #httpSession 来使用
  * 需要在后台controller中设置了session
  * ${#session.getAttribute('name')} //获取数据
  * ${#session.id}  //id
  * ${#session.lastAccessedTime} //最近访问时间

  > controller中设置session
  >
  > ```java
  > request.getSession().setAttribute("name","abc");
  > ```



#### 内置功能对象 , 提供常用的方法

* 内置功能对象前都需要加#, 一般以s结尾

* #dates 时间对象

  * ```html
    <!--使用dates的format方法, 其中date是后台传过来的数据-->
    <span th:text="${#dates.format(date, 'yyyy-MM-dd HH:mm:ss')}"></span>
    ```

* #calendars 时间对象, 同java.util.Calendar

* #numbers 格式化数字的对象

* #strings 字符串对象

* #objects 

* #bools

* #arrays
* #lists
* #sets
* #maps 
* #aggregates 聚合操作





> 在idea中写thymeleaf可能会有报错 , 属正常现象