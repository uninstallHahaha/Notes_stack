Express

> 基于 nodejs 开发的web框架

> 实现了路由, 不用自己写 if else 判断请求 url 了
>
> 扩展了 req 和 res , 添加了一些常用的字段
>
> 实现了中间件功能, 就是直接写接口函数并指定路由, 用户发起请求时可以分发到对应的函数上
>
> 本身没集成模板引擎, 但是可以扩展模板引擎

> 中间件 实际上就相当于拦截器, 对请求进行预处理

> `npm install express`

#### 起步

1. 创建项目文件夹

2. 在其中创建 index.js

3. `npm init -y` 初始化 package.json 

4. `npm install express` 安装

5. 在 index.js 中创建服务并启动

   ```js
   const express = require('express')
   
   // 创建服务
   var app = express()
   
   // 添加接口
   app.get('/index', (req, res)=>{
       res.setHeader('Content-type','text/html;charset=utf-8')
       res.end('首页')
   })
   
   // 启动服务
   app.listen(8080,()=>{
       console.log('localhost:8080')
   })
   ```

   

#### express

> 这里的 express 是导入的 express 变量 `const express = require('express')`

###### express.static(路径)

> 给定静态资源的路径, 该函数返回一个函数
>
> 返回的函数 先将指定路径下的静态资源文件加载, 然后设置 res 的mime属性 , 最后通过 res 返回给前端

```js
// 设置返回静态资源
app.use('/static', express.static(path.join(__dirname, 'static')))
```

###### express.Router()

> 创建一个路由对象, 该路由对象上可绑定路由, 
>
> 然后将该路由对象可绑定到 app 上, 就相当于将注册在该路由对象上的路由在 app 上全部注册

> 该方法主要用于路由模块的封装, 首先新建一个 router.js 作为路由模块, 然后在该文件中创建 Router对象, 对其绑定路由并 exports 
>
> 在主模块中导入 Router 对象, 然后将 Router 注册到 app 的 '/' 路径上, 就实现了路由模块的封装,
>
> 这样实现的优点在于无需将 app 实例传递给 router.js , 避免 app 在 router.js 中被误操作, 从而提高了安全性

> 在项目的结构搭建中, 应当遵循模块化开发的准则, 路由模块只负责路由分发, 具体业务处理应当单独写在一个文件中

```js
//services.js  (services)
const express = require('express')
const path = require('path')

// 主页接口
module.exports.index = (req, res) => {
    res.setHeader('Content-type', 'text/html;charset=utf-8')
    res.end('首页')
}

// 使用use定义接口
module.exports.use = (req, res) => {
    res.send('使用use方法的请求响应')
}

// 路径接收参数
module.exports.news = (req, res) => {
    res.send(req.params)
}

// 返回json
module.exports.json = (req, res) => {
    res.json({ name: 'alice', age: 18 })
}

// 重定向
module.exports.redirect = (req, res) => {
    res.redirect('/index')
}

// 返回文件
module.exports.get_file = (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'gq5.exe'))
}

// 设置响应码
module.exports.get_404 = (req, res) => {
    res.status(404).end('404 not found!')
}
```

```js
// router.js  (controllers)
const express = require('express')
const path = require('path')

const services = require('./services.js')

// 创建 Router 对象
var router = express.Router()

// 主页接口
router.get('/index', services.index)

// 使用use定义接口
router.use('/use', services.use)

// 路径接收参数
router.get('/news/:year/:month/:day', services.news)

// 返回json
router.get('/json', services.json)

// 重定向
router.get('/redirect', services.redirect)

// 返回文件
router.get('/get_file', services.get_file)

// 设置响应码
router.get('/get_404', services.get_404)

// 设置返回静态资源
router.use('/static', express.static(path.join(__dirname, 'static')))


module.exports = router
```

```js
// index.js
const express = require('express')
const path = require('path')
const router = require('./router.js')

// 创建服务
var app = express()

// 加载路由
app.use('/', router)

// 启动服务
app.listen(8080, () => {
    console.log('localhost:8080')
})
```





#### app

> 这里的 app 是 express 的对象实例

###### app.请求方法( 路径,callback )

> 定义指定请求方法和url对应的接口, 请求路径必须 === 完全匹配

> 本api以及以下定义接口的路径中都可以使用正则
>
> ```js
> //使用正则定义路径
> app.get(/^\/index$/, (req,res)=>{})
> ```

> 本api以及以下定义接口的路径中都可以定义接收参数
>
> ```js
> //路径中分别接收三个参数 year, month, day
> app.get('/news/:year/:month/:day', (req, res, next)=>{
> 	// 在 req 中获取参数值
>  	res.send(req.params)
>     // 调用next()可执行完该接口后继续向下匹配接口
> })
> ```
>
> ![1604561614944](express.assets/1604561614944.png)
>
> 

###### app.use( 路径, callback )

> 定义不限请求方法, 指定 url 对应的接口, 请求路径只要第一部分和设置路径匹配就可以成功匹配

```js
// 使用use定义接口
app.use('/use', (req, res) => {
    res.send('使用use方法的请求响应')
})
```

![1604560792418](express.assets/1604560792418.png)

```js
// 使用use作为中间件
// 不定义路径时, 所有的请求都会经过该接口, 调用next()放行请求到下一个中间件或接口
// 放到所有接口前面就可以实现 登录判断, 流量统计, ip统计 等功能
// 放到所有接口后面就是兜底接口, 可以实现错误页面的定制
app.use((req,res,next)=>{
    console.log('use getted...')
    next()
})
```



###### app.all( 路径, callback )

> 定义不限请求方法, 但是需要路径 === 完全匹配的接口



#### req

> 这里的 req 是接口中 callback 提供的 req

###### req.params

> 获取 通过 restful方式 路径传递的参数

###### req.query

> 获取get方式传递的参数





#### res

> 这里的 res 是接口中 callback 提供的 res

###### res.send()

> 升级版的 res.end()  
>
> 可以接收更多类型的参数作为返回
>
> 默认设置一些响应头, 其中包括设置编码为 utf-8

###### res.json()

> 将数据变成 json 字符串并返回

> res.send() 也有这个功能, 直接使用 res.send() 就行

```js
// 返回json
app.get('/json', (req, res) => {
    res.json({ name: 'alice', age: 18 })
})
```

![1604563388694](express.assets/1604563388694.png)

###### res.redirect()

> 封装了重定向的方法

```js
// 重定向
app.get('/redirect', (req,res)=>{
    res.redirect('/index')
})
```

###### res.sendFile()

> 读取文件并返回

```js
// 返回文件
app.get('/get_file',(req,res)=>{
    res.sendFile(path.join(__dirname, 'static','gq5.exe'))
})
```

> 如果返回的文件浏览器不能加载, 就会提示下载

![1604564018150](express.assets/1604564018150.png)

###### res.status()

> 设置响应码, 返回 res 对象, 可链式编程

```js
// 设置响应码
app.get('/get_404',(req,res)=>{
    res.status(404).end('404 not found!')
})
```



###### res.render()

> 使用模板引擎加载数据到页面中并返回
>
> 因为 express 本身不自带 模板引擎, 所以这个方法默认是无法使用的, 需要首先配置使用的模板引擎
>
> express 兼容部分模板引擎 , 其中包括 ejs 





#### 使用 ejs 模板引擎

> `npm install ejs`

###### 基本使用

1. 设置使用的模板引擎为 ejs

   ```js
   const app = express()
   app.set('view engine', 'ejs')
   ```

2. 在项目根目录下创建 views 文件夹 (ejs 默认的模板位置), 在其中新建 index.ejs 模板文件

   ```ejs
   <h1>index模板 : <%=name%></h1>
   ```

3. 在接口中返回 ejs 模板

   ```js
   app.get('/',(req, res)=>{
       //使用 res.render 直接返回模板, 第一个参数是模板位置, 默认为 views 文件夹中, 不用写views, 也不用后缀
       //第二个参数是模板数据
   	res.render('index',{name: 'alice'})
   })
   ```

###### 模板语法

<%=xxx%> 输出值

<%-xxx%> 作为html解析

<% xxx %> 写js代码

<%- include('xxx.ejs') %> 引入其他页面

###### 其他设置

1. `app.set('views', __dirname+'/templates')` 设置模板文件的所在位置

2. 如果看 ejs 后缀不爽, 想改成 html 后缀

   ```js
   //引入ejs
   const ejs = require('ejs')
   //创建app
   const app = express()
   //设置模板引擎
   app.engine('html',ejs.__express)
   app.set('view engine','html')
   ```

3. 然后就可以把 ejs 后缀改成 html 来使用

 





#### 第三方

##### supervisor

> supervisor也可以使用在express项目中 , 其本质就是监听文件夹文件的改变 , 然后重新运行入口文件

##### body-parser

> `npm install body-parser --save`

> 用于解析 post方式 传递的参数 , 其实就是先对req中post参数解析, 然后作为 body 属性添加到 req 上

```js
//引入
const bodyParser = require('body-parser')
//设置
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())
//使用
app.get("/",(req,res)=>{
	req.body
})
```



##### cookie-parser

> 解析请求中的 cookie

> `npm install cookie-parser --save`

```js
//引入
const cookieParser = require('cookie-parser')
//设置
app.use(cookieParse)
//使用
app.get('/',(req,res)=>{
    //获取cookie
    req.cookies
    //设置cookie, 第三个参数设置项可参照源码
    res.cookie('name',"alice",{maxAge:1000*60*60})
})
```



##### express-session

> `npm install express-session`

> 实际上就是实现了在服务器内存中保存 session 键值对的功能

###### 基本使用



```js
//引入
const session = require('express-session')
const app = express()
//设置
app.use(session({
  name: 'sessionID', //设置在cookie中保存数据的键名称 
  secret: 'keyboard cat', //设置session签名
  resave: false,  //强制保存session,即使它没有变化
  saveUninitialized: true, //强制将未初始化的session存储
  cookie: { 
      maxAge: 1000*60, //设置过期时间
      secure: false //true代表只有https协议才能访问cookie
  },
  rolling: true //设置是否自动续期session,自动续期:只要在session有效期内访问,就会为session重置过期时间
}))
//使用
app.get('/',(req,res)=>{
	//设置session
    req.session.username = 'alice'
    //获取session
    if(req.session.username){
        console.log('获取session成功')
    }
    //销毁session
    //1.直接设置过期时间为零( 销毁所有的session )
    req.session.cookie.maxAge = 0
    //2.设置为空, 可销毁指定session
    req.session.username = ""
    //3.使用destroy方法, 销毁所有session
    req.session.destroy()
})
```

###### 将session保存到远程数据库

> 默认的session是存在于服务器的内存中的, 如果后台服务是分布式架构, 那么就不能实现session共享
>
> 在分布式服务系统中, 应当单独开设一台数据库服务器, 将session 保存至该服务器上的数据库中, 就可以实现session共享

1. 使用 mongodb 数据库存储 session

> 将会使用到第三方包 connect-mongo
>
> 1. `npm install connect-mongo`
>
> 2. ```js
>   //引入
>   const session = require('express-session')
>   const MongoStore = require('connect-mongo')(session)
>   const app = express()
>   //设置
>   app.use(session({
>   name: 'sessionID', 
>   secret: 'keyboard cat',
>   resave: false,  
>   saveUninitialized: true,
>   cookie: { 
>    maxAge: 1000*60, 
>    secure: false 
>   },
>   rolling: true,
>   store: new MongoStore({
>    url: 'mongodb://密码:用户名@127.0.0.1:27017/库名'
>   })
>   }))
>   ```
> ```
> 3. 然后再使用 session 时, 会将session数据存储到mongodb中
> ```

2. 使用 redis 保存 session 数据

> 下载使用 connect-redis 包, 用法同上

3. 使用 mysql 保存 session数据

> 下载使用 connect-mysql , 文档见 npm





##### multer

> 封装了文件上传功能的第三方包

> `npm install multer`

###### 上传单个文件

1. 在 form 表单中设置 enctype="multipart/form-data" , 在表单中添加 file 控件

2. 在项目静态资源文件夹下创建 upload 文件夹, 在哪里创建都行, 放到静态资源文件夹下是为了规范

3. ```js
   const path = require('path')
   //引入
   const multer = require('multer')
   //创建实例
   var storage = multer.diskStorage({
     destination: function (req, file, cb) {
         //设置文件保存路径
         cb(null, 'static/upload') 
     },
     filename: function (req, file, cb) {
         //设置保存上传文件的名字
         let extname = path.extname(file.originalname)
         cb(null, file.fieldname + '-' + Date.now() + extname)
     }
   })
   var upload = multer({ storage: storage })
   //在路由中使用, 将其设置为路由的第二个参数, 其中的pic为页面中文件控件的name 
   app.get('/', upload.single('pic'), (req,res)=>{
   	req.file //获取上传文件的信息
   })
   ```

4. 此时通过表单上传的文件将保存至设置的目录

###### 同时上传多个文件

> 表单中同时存在多个 file 控件时使用这个
>
> 表单中一个控件可同时接收多个文件的情况参照 npm 上文档

1. 在表单中添加多个 file文件框, 分别设置不同的 name

2. ```js
   //将接口中改为 upload.fields([{name:'pic1',maxCount:1},{name:'pic2',maxCount:1}])
   app.get('/',upload.fields([{name:'pic1',maxCount:1},{name:'pic2',maxCount:1}]),(req,res)=>{
       //获取多个图片的信息
       req.files
   })
   ```

   











#### express-generator

> express 项目生成工具

1. `npm install -g express-generator`

2. `express -h` 验证安装结果

3. `express --view=ejs [项目名]`  --view设置使用的模板引擎

4. 生成的项目结构为

   ![1605012485964](express.assets/1605012485964.png)

5. `npm install` 安装项目所需依赖包

6. `node bin/www` 启动服务

7. 默认服务开启在 3000 端口上







#### mongoose

> 对 mongodb 的操作再次封装, 使得操作更方便安全
>
> 安全主要体现在它使用了传统关系型数据库的模式, 首先建立固定模型来对应数据库表, 然后通过创建模型实例实现对数据库数据的操作, 因为模型是固定的, 所以就限制了字段的个数 , 类型和大小

> `npm install mongoose`

###### 基本使用

1. ```js
   //引入
   const mongoose = require('mongoose')
   //连接mongodb
   mongoose.connect('mongodb://127.0.0.1:27017/库名',(err)=>{
       if(err){
           console.log('数据库连接失败')
           return
       }
       console.log('数据库连接成功')
   })
   //创建User表对应的Schema
   var UserSchema = mongoose.Schema({
       name: String,
       age: {
           type:Number,
           default: 22 //设置默认值
       }
   })
   //创建用于操作数据库的model
   //第一个参数是数据库中表的名称变成单数形式然后首字母大写, 用于设置该model操作的是哪个表
   //如果想自定义操作的是哪个表, 将表的名字作为第三个参数传递进去
   //第二个参数设置Schema, 用于设置该数据表映射的是哪个Schema
   var User = mongoose.model('User',UserSchema)
   
   //1.查询操作
   User.find({},(err,data)=>{
   	console.log(data)
   })
   //2.添加操作, 首先得新建model实例
   var u = new User({
       name: 'alice',
       age: 22
   })
   u.save((err)=>{
   	if(err){
           console.log('添加失败')
           return
       }
       console.log('添加成功')
   })
   //3.修改操作
   //参数: 要修改的数据, 要修改的字段, 回调函数
   User.updateOne({name:'alice'},{age:20},(err,data)=>{
       if(err){
           console.log('修改失败')
           return
       }
       console.log(data)
   })
   //4.删除操作
   User.deleteOne({name:'alice'},(err,res)=>{})
   ```

###### 模块化代码

> 以上的基本使用方法中将连接数据库和对各个数据表的操作都放到一个文件中不利于维护
>
> 应当按照模块化的思想将代码拆分

1. 在项目根目录创建 dao 文件夹

2. 在 dao 文件夹中创建 db.js , 该文件用于初始化连接, 并将初始化完成后的 mongoose 实例返回

   ```js
   //引入
   const mongoose = require('mongoose')
   //连接mongodb
   mongoose.connect('mongodb://127.0.0.1:27017/库名',(err)=>{
       if(err){
           console.log('数据库连接失败')
           return
       }
       console.log('数据库连接成功')
   })
   //export mongoose实例
   modules.exports = mongoose
   ```

3. 在 dao 文件夹中根据不同的数据表创建不同的 dao 文件, 比如 UserDao.js , 其中封装对 user 表的数据库操作

   ```js
   //导入mongoose实例
   const mongoose = require('dao/db.js') 
   //创建对 user表 的操作方法
   var UserSchema = mongoose.Schema({
       name: String,
       age: {
           type:Number,
           default: 22 //设置默认值
       }
   })
   var UserModel = mongoose.model('User',UserSchema)
   //export user model
   modules.exports = UserModel
   ```

4. 在其他地方直接引入 UserDao 中 export 的对象对数据库进行操作

###### Schema中的预定义设置

> 就相当于定义模型时设置 getter 和 setter 方法

```js
var UserSchema = mongoose.Schema({
    name: String, //未加任何预定义的设置
    desc:{
        type: String,
        trim: true, //增加数据时自动对值trim
    },
    nickname:{
        type:String,
        set(data){  //自定义增加数据前的预处理逻辑
            return 'alice:' + data
        }
    },
    sn:{
        type: String,
        index: true, //该字段设置索引
        unique: true, //设置唯一索引
    },
    //数据校验部分
    address:{
        type: String,
        required: true, //该字段必须传入
        max: 100, //用于Number类型数据, 最大值
        min: 0, //用于Number类型数据, 最小值
        enum: ['a','b','c'],  //用在String类型数据, 只能是这里面的其中一个
        match: /^alice(.*)/, //必须符合该正则
        maxlength: 10, //最大长度
        minlength:3, //最小长度
        validate: (data)=>{  //自定义校验规则, 通过返回true, 否则返回false
            if(data>10) return true
            else return false
        }
    }
})
```



###### model中内置的CRUD方法

参照官方文档 : https://mongoosejs.com/docs/api/model.html



###### 自定义model中的CRUD方法

> 扩展自定义方法的本质就是调用内置的 CRUD方法

直接在 Schema类 上扩展静态方法

```js
//定义 Schema
var UserSchema = mongoose.Schema({
    name: String,
    age: Number
})
//在 Schema 上扩展静态方法
UserSchema.statics.findByName = function(name, callback){
    //这里的 this 就是当前的 model对象
    this.find({name:name},(err,data)=>{
        callback(err,data)
    })
}
//创建 model 对象
var UserModel = mongoose.model('User',UserSchema)
//使用自定义的扩展方法
UserModel.findByName('alice',(err,data)=>{
    console.log(data)
})
```



###### mongoose中实现聚合查询

> 使用  Model.aggregate([ ... ])
>
> 各种聚合操作同 mongodb



