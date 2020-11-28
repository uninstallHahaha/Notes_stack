# VX program

### 准备工作

1. 注册小程序账号 https://mp.weixin.qq.com/wxopen/waregister?action=step1
2. 使用注册的账号登录 https://mp.weixin.qq.com , 从 ***开发设置*** 中获取***APPID***
3. 下载开发工具 https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html , 开发体验不佳 , 建议使用 vs code 编辑代码 , 在vs code 中可以安装 小程序开发助手 来使用小程序的代码提示 ( 唤起wx相关代码提示是输入 wx- )

### 开发项目

1. 新建小程序项目



#### 配置文件

* ##### 全局配置文件 ***app.json***

  ***pages 字段***: 

  * 该小程序中的所有页面, 在开发者工具中, 修改该字段, 会自动同步项目的目录结构
  * 这里面写在第一个的页面会成为主页

  ***window字段***: 全局的导航栏窗口样式设置 ( 字段参照官网 )

  ***tabBar 字段***: 设置小程序底部的功能导航栏 ( 其中包含的更多字段参照官网)

  * ***list*** : 导航栏功能数组
    * ***pagepath*** : 当前功能对应的页面路径
    * ***text*** : 功能文字描述
    * ***iconPath*** : 未被选中时的图标路径
    * ***selectedIconPath*** : 被选中时的图标路径
  * ***color***: 未被选中时的字体颜色
  * ***selectedColor***: 选中时的字体颜色
  * ***position*** : tabBar定位 , 放到top的时候不显示图片

* ##### 页面配置文件 ***<page_name>.json***

  * 单独指定该页面的 window 属性中的各个字段( 导航栏,窗口,etc... )
  * 直接在页面配置文件的根节点添加 app.json中window字段下的属性即可( 属性详情见官方文档 )

* ##### sitemap.json 索引配置文件

  * 用于配置在微信搜索小程序时是否能搜索到该小程序的页面





> 如果在开发者工具中无法输入代码, 点击功能栏中的编译, 就可以恢复



#### 模板语法 ( wxml )

* 标签必须写结束符号, 否则报错

---

##### 特有标签 

> 标签的用法同html标签( 可使用class,style,id之类的属性)

###### *text* *文本*

* 相当于 span, 行内标签 

* text中只能嵌套text 

* 可以开启长按复制功能 , 其他标签无这个功能

  ```html
  <!--开启长按复制功能-->
  <text selectable>123</text>
  ```

* 可以识别编码

  ```html
  <!--开启识别编码功能-->
  <text decode="{{true}}">123&nbsp;123&lt;</text>
  ```

###### *image 图片*

* 小程序规定程序大小不能超过2M, 所以图片资源要使用外网资源 , 这里可以使用 ***土豆图床*** 将本地图片上传到网上成为外网资源

* image默认宽度320px, 默认高度240px

* src属性  , 图片路径

* mode属性 , 设置图片裁剪缩放模式 , 有13种模式

  * aspectFit 保持纵横比, 同时保证长边的显示 , 常用
  * widthFix 以image标签宽度为准, 按照图片原比例设置image的高度 , 常用

* lazy-load属性 , 开启懒加载 ( 当图片位于视图窗口上下三个屏幕的范围内时开始加载 )

  ```html
  <image lazy-load src="xxx"></image>
  ```

###### *view ( div )*  

* 相当于div , 块级元素

###### *block*  占位标签

* 渲染时不会显示这个标签
* 应用场景: 在作列表循环时 , 如果不想让每一个元素都套在一个标签里 , 使用这个标签进行列表循环

###### *swiper + swiper-item 轮播图*

* swiper 默认宽度 100% , 默认高度 150px

* 使用swiper的比例和原图的比例算得swiper需要多高能刚好适应图片

  ```css
  /* 
  swiper宽 / swiper高 = 原图宽 / 原图高
  swiper宽为 100vm( 屏幕宽度的100% )
  原图宽高已知
  由此可得应当设置swiper的该为多少
  */
  swiper{
      height:calc(100vm*原图高/原图宽);
  }
  ```

swiper属性: 

* autoplay 自动轮播

* interval="1000" 轮播间隔

* circular=true 是否循环轮播( 衔接第一张图和最后一张图的动画 )

* indicator-dots 是否显示小圆点

  ```html
  <swiper autoplay>
  	<swiper-item><image src="xxx"/></swiper-item>
      <swiper-item><image src="xxx"/></swiper-item>
      <swiper-item><image src="xxx"/></swiper-item>
  </swiper>
  ```

点击预览: 

```js
// 1.给 swiper-item 绑定点击事件
// 2.在点击事件中调用 previewImage 方法
wx.previewImage({
    current: ...,
    urls: [...]
})
```



###### *navigator 导航组件  (a)*

* 类似于a标签( 超链接 )

* 块级元素

* url 要跳转的页面[ 绝对/相对 ]路径

  ```html
  <!--跳转路径不需要写.wxml后缀-->
  <navigator url="/pages/dome01/dome01">123</navigator>
  ```

* target 属性 , 选择跳转到自己程序内的页面还是其他程序的页面 , 可选 [ self/miniProgram ]

* open-type 属性 , 跳转方式 

  * navigate 保留当前页面进行跳转 , 不能跳转到tabBar页面
  * redirect 关闭当前页面进行跳转, 不能跳转到tabBar页面
  * switchTab 跳转到tabBar页面并关闭其他非tabBar页面
  * reLaunch 随便跳转到什么页面,并关闭所有页面
  * navigateBack 关闭当前页面返回上级页面, 相当于按了返回键
  * exit 退出其他小程序 , 仅在 target="miniProgram" 时有效


###### *rich-text 富文本标签*

  * nodes属性 

    * 可以将字符串解析为html文本
    * 可以将对象数组解析为html文本 ( 标签元素使用对象的方式表示 )

    ```html
    <!--这里的html是js中data的数据, html: "<div>123</div>"-->
    <rich-text nodes="{{html}}"></rich-text>
    ```

###### *button 标签*

  * open-type属性 , 使用按钮内置的功能

    * contact 打开客服功能, 需要后台配置 , 需要真机调试

      1. 将小程序appid修改为自己真实的appid
      2. 进入小程序官网 , 左侧 客服 -> 添加( 微信号作为客服 )

    * share 将当前页面分享给微信朋友

    * getPhoneNumber + bindgetphonenumber 获取用户手机号信息 , 只能是企业开发者才有这个权限

      ```html
      <button open-type="getPhoneNumber" bindgetphonenumber="getP">
          get
      </button>
      ```

      ```js
      //对应的js
      Page({
      	getP(e){
              //获取到的手机号信息在事件源对象e中
          }
      })
      ```

    * getUserInfo + bindgetuserinfo 获取用户账号信息, 用法同上

    * launchApp 打开app , 需要先使用app中的链接打开小程序 ,才能在小程序中打开app

    * openSetting 弹出授权页面 , 只会显示之前使用过的权限

    * feedback 弹出内置的意见反馈页面 , 需要真机调试

* *icon 内置字体图标*

  * type , size , color 属性

* *radio + radio group 单选框*

  * color 属性设置颜色

  ```html
  <radio-group bindchange="xxx">
  	<radio color="red" value="male">南</radio>
      <radio color="blue" value="female">女</radio>
  </radio-group>
  ```

* *checkbox + checkbox-group 复选框*

  * color 属性设置颜色

  ```html
  <checkbox-group bindchange="xxx">
  	<checkbox value="1">1</checkbox>
      <checkbox value="2">2</checkbox>
      <checkbox value="3">3</checkbox>
  </checkbox-group>
  ```

###### slot 插槽



> css中使用currentColor代表当前元素的color, 如 border : 1px solid currentColor
>
> js中使用 let dat = JSON.parse(JSON.stringify(dat)) 来实现数据深拷贝



###### ***自定义组件***

* 自定义的组件同样包括 wxml , js , wxss , json 四个文件
* 自定义组件的js中 ,  data放组件数据 , properties放父组件传过来的数据 , methods放组件方法 

1. 在项目根目录创建文件夹 `components`

2. 在该文件夹下创建 `tabs` 文件夹 ( 自定义的组件文件夹 )

3. 在开发者工具中右键 `tabs` 文件夹, 新建component , 会自动生成组件的四个文件

4. 在要使用自定义组件的页面的json文件中配置使用该组件

   ```json
   {
       "usingComponents":{
           //这个名字是在页面中使用自定义组件的标签名: 自定义组件的相对路径,不需要写.wxml后缀
           "tabs": "../../components/tab/tab"
       }
   }
   ```

5. 在页面中直接使用自定义组件

   ```html
   <tab></tab>
   ```

* 自定义一个navigate导航栏
  1. wxml中使用js数据 ***遍历选项*** 来实现该组件可通用
  
  2. 在js的data中提供数组以供遍历, 其中每个导航项应当包含 ***是否选中标示量***
  
  3. 在 wxml中使用 ***字符串加表达式*** 的方式来实现选中效果 
  
     如 < view class="item {{item.isActive?'active':''}}"></ view>
  
  4. 在 js 的 methods 中提供点击事件 修改 ***是否选中标示量*** 来实现点击切换导航项的效果



> 在开发者工具中, 控制台的AppData中, 可以查看页面的数据

* 使用父组件数据的方式来加载自定义组件的数据来实现组件通用 ( ***父子组件之间的传值*** ) 

  1. 在使用自定义组件的地方( 父组件 ) 传递值

     ```html
     <!--传递名为aa值为"123"的属性值-->
     <tab aaa="123"></tab>
     ```

  2. 在自定义组件的properties属性中添加接收值

     ```js
     properties:{
     	//设置要接收值的属性名
         aaa: {
             //设置这个值的类型, 参数类型是js内置的数据类型 String, Array...
             type: String,
             //设置这个值的默认值
             value:""
         }
     }
     ```

  3. 在自定义组件中直接使用这个属性

     ```html
     <view>{{aaa}}</view>
     ```

  4. 此时点击标签进行切换的逻辑需要修改, 应当为触发父组件的方法并传递要修改项的index, 然后在父组件中修改data , 从而实现标签的切换

  5. 在自定义组件的点击方法中添加触发父组件的方法

     ```js
     //这是自定义组件中点击tab触发的事件
     handle(e){
         const {index} = e.currentTarget.dataset
         //触发父组件方法并传递参数
         this.triggerEvent("itemChange",{index})
     }
     ```

  6. 在父组件使用自定义组件的标签上添加自定义事件绑定

     ```html
     <!--tabs是传递给子组件的数据-->
     <!--binditemChange设置绑定子组件中触发的方法, 
     这个名字应当是 bind+子组件中触发的方法名
     这个属性的值为父组件js中的方法名-->
     <tab tabs="{{tabs}}" binditemChange="handleiC"></tab>
     ```

  7. 在父组件中添加这个方法来接收子组件传递的参数

     ```js
     handleiC(e){
         const {index} = e.detail
         //使用这个传过来的index来修改data中传给子组件作为参数的数据,从而实现tab的切换
     }
     ```

* 使用 ***slot标签( 插槽 )*** 来实现tab标签切换时下面的内容区域也切换

  1. 在自定义组件中设置 slot

     ```html
     <!--自定义组件的页面文件-->
     <view> 
     	<slot></slot>
     </view>
     ```

  2. 在父组件中使用 slot

     ```html
     <!--父组件的页面文件-->
     <tab>
     	<!--使用block和if判断来实现页面的切换-->
         <block wx:if="{{tabs[0].isActive}}">0</block>
         <block wx:elif="{{tabs[1].isActive}}">1</block>
         <block wx:elif="{{tabs[2].isActive}}">2</block>
         <block wx:elif="{{tabs[3].isActive}}">3</block>
     </tab>
     ```

* 自定义组件js中的字段

  * properties ( Object Map) : 父组件传过来的数据
  * data ( Object ) : 组件自身数据
  * observers ( Object ) : 监听器 , 监听 properties和data 的变化 , 这个属性只在组件中有
  * methods ( Object ) : 组件方法
  * created ( Function ) : 生命周期函数 , 组件刚被创建时调用, 不能setData
  * attached ( Function ) : 生命周期函数 ,  组件进入页面节点树时调用
  * ready ( Function ) : 生命周期函数 ,  组件布局完成后调用( 在页面中可见组件 )
  * moved ( Function ) : 生命周期函数 ,  组件被移动到节点树另一个位置时调用
  * detached ( Function ) : 生命周期函数 ,  组件从节点树中移除时调用

###### scroll-view 滚动域

* 通过设置 scroll-x 和 scroll-y 实现可滚动
* 通过设置 scroll-top 指定距离顶部距离

###### rich-text 富文本

```html
<!-- 将文本按照 html 解析 -->
<rich-text nodes="..."></rich-text>
```

###### checkbox-group + checkbox 







##### *{{ }} 取值运算符*

> 使用在 wxml 中, 使用方法同 vue

* 四则运算
* 字符串拼接
* 逻辑运算
* 三元运算
* if/else/while之类的 不是运算, 是语句

##### *循环渲染*

* wx:for="{{ 数组或对象 }}"

* wx:for-item="循环项的名称"     

  * 不写的话, 默认循环项名称为 item  
  * 循环对象时, 这个是对象属性的值

* wx:for-index="循环项的索引"  

  * 不写的话, 默认索引名称为index
  * 循环对象时, 这个是对象属性名

* wx:key="唯一的值"  , 用于提高数组渲染性能, 不写的话控制台会警告

  * 如果数组中元素是对象, 且对象中有id属性是唯一的, 那么可以 wx:key="id"
  * 如果数组元素为普通类型 , 那么可以使用 wx:key="*this" , 使用元素本身作为唯一索引, 这个写法是文档规定的

  ```js
  //dome.js
  Page({
      data:{
          list:[
              {
                  id: '1',
                  name:'zhangsan',
                  age: 20
              },
              {
                  id: '2',
                  name:'lisi',
                  age: 20
              }
          ]
      }
  })
  ```

  ```html
  <!--dome.wxml-->
  <view> 
  	<view wx:for="{{list}}" wx:for-item="i" wx:for-index="index" wx:key="id">
      	索引: {{index}} -- 名字: {{i.name}}
      </view>
  </view>
  ```


##### *条件渲染*

* wx:if="{{ }}" 

* wx:else="{{ }}"

* wx:elif="{{ }}"  : else if

  * 标签不是频繁切换显示状态时使用if , 因为if的实现是直接移除标签, 性能开销大

  ```html
  <view wx:if="{{true}}">是</view>
  <view wx:else>否</view>
  ```

* hidden属性

  * 标签频繁切换显示状态使用hidden , hidden实现的方式是修改标签display样式属性而不是移除 , 所以不要手动设置该标签的display样式属性 , 否则hidden会失效

  ```html
  <!--直接写hidden属性为隐藏-->
  <view hidden>hidden</view>
  <!--也可以使用表达式来控制-->
  <view hidden="{{true}}"></view>
  ```

  

##### *标签事件*

* bindinput : 输入

  * 在wxml标签中设置该属性绑定事件 , 在对应的js文件中调用Page方法的参数对象中添加对应处理方法

    ```html
    <input type="text" bindinput="handle"/>
    ```

    ```js
    Page({
        data:{
            num
        },
        handle(e){
            //e为事件源对象, 可以获取到input的值
            //修改当前页面的data (方法同react)
            this.setData({
                num: e.detail.value
            })
        }
    })
    ```

* bindtap: 点击

  * 在调用方法时不能只能穿参, 会连同参数都认作函数名

    ```html
    <!--不能直接传参, 会认为调用函数名为handle(1)-->
    <view bindtap="handle(1)">+</view>
    ```

  * 使用自定义属性的方式传参

    ```html
    <view bindtap="handle" data-op="{{1}}">+</view>
    ```

    ```js
    Page({
    	handle(e){
            //以data_xxx形式命名的自定义属性, 会出现在事件源事件的数据属性下
            e.currentTarget.dataset.op
        }
    })
    ```


#### *js*

---

* 每个wxml都对应一个js文件, js文件中有一个Page方法的调用 , 初始化页面时, 会执行该js文件, 也就是调用Page方法

* 该Page方法接收一个对象参数

  * 该对象中的data属性为该页面使用的数据 , 在页面中使用 {{ }} 来使用数据

    如: 

    ```js
    //dome.js
    Page({
        data: {
            mes:'123',
            //可使用对象类型的数据
            person: {
                name:'zhangsna',
                age:20
            },
            //作为复选框的数据
            isCheck: true
        }
    })
    ```

    ```html
    <!--dome.wxml-->
    <text>{{mes}}</text>
    <view>{{person.name}}</view>
    <!--可以使用数据作为标签的属性值-->
    <view dat_unm="{{person.age}}">123</view>
    <checkbox checked="{{isCheck}}"></checkbox>
    ```

  * 该对象中还包含页面的生命周期函数



#### 样式(wxss)

相对于css扩展的功能:

* *样式单位 rpx(相对像素)* : 可以根据屏幕宽度进行自适应, 跟随屏幕大小而改变. 以iPhone6的宽度为标准, 规定屏幕宽度为 750rpx, 根据不同的屏幕宽度换算 rpx和px的对应关系, 从而自动改变宽度适应屏幕

  * 可以使用calc方法使用算式来设置样式

    * 750和rpx之间不能有空格
    * calc两边不能有空格

    ```css
    view{
        width:calc(750rpx * 100 / 375);
    }
    ```

* *同一个页面的wxml不用引入对应的wxss , 会自动引入*

* *导入样式*

  * 使用@import

  * 只支持相对路径导入样式文件

    ```css
    @import "../../styles/common.wxss";
    ```

* 选择器 :  支持除了 *(通配符) 以外的所有css选择器

* 在wxss中使用less

  1. 使用vs  code

  2. 安装插件 easy less

  3. 在vs code加入配置( 将less编译为wxss ) , settings(左下角设置)-> 设置 -> 点击右上角按钮进入settings.json文件 -> 在json的根节点加入以下配置

     ```json
     "less.compile":{
         "outExt": ".wxss"
     }
     ```

  4. 可以直接将页面的样式文件改为less格式编辑保存 , 然后会自动在当前文件夹中生成对应的wxss文件



#### 提示框

```js
wx.showToast({...})
//设置属性 icon 为 none 时, 就是 tip 框
```

#### 加载提示

> 加载提示的开启和关闭建议封装到 使用 promise 发送请求的方法中
>
> 同时为了应对同时发送多个请求, 而需要等待多个请求都完成之后才关闭加载提示的需求 , 应当在 封装中对发送的请求进行计数, 只有计数为 0 时才关闭加载提示

```js
//显示
wx.showLoading({...});
//关闭
wx.hideLoading() 
```

#### 弹窗提示

```js
wx.showModal({...})
```



#### 小程序生命周期

* 小程序入口为app.js文件 , 在该文件中对App的方法调用参数中传入生命周期函数

* ***onLaunch*** : 应用第一次启动的时候触发

* ***onShow*** : 应用被用户看到时触发

* ***onHide*** : 应用被隐藏时触发

* ***onError******(err)*** : 应用发生报错时触发 , 第一个参数就是报错提示对象

* ***onPageNotFound*** : 找不到启动页面时, 会触发此方法

  * 可以在此处添加跳转到另外一个主页的代码, 来防止前台页面报错

    ```js
    onPageNotFound(){
        //找不到启动页时跳转到另外一个页面
        wx.navigateTo({
            url: '/pages/dome/dome'
        })
    }
    ```

    

#### 页面生命周期

* ***data*** : 页面数据

* ***onLoad*** : 页面加载完后触发

* ***onShow*** : 页面显示完后触发

* ***onReady*** : 页面初次渲染完成后触发

* ***onHide*** : 页面隐藏时触发 ( 跳转也是隐藏 , 不显示了就是隐藏 )

* ***onUnload*** : 页面卸载时触发( 页面被关闭 )

* ***onPullDownRefresh*** : 页面下拉刷新时触发

* ***onReachBottom*** : 页面上拉触底时触发 ( 需要页面有滚动, 上拉加载下一页 )

* ***onShareAppMessage*** : 点击右上角转发时触发

* ***onPageScroll*** : 页面滚动时触发

* ***onResize*** : 页面尺寸变化时触发( 横竖屏 )

  * 横竖屏设置: 在`app.json`或者`页面.json`中添加开启横竖屏切换设置 , 然后在开发工具里点击模拟器右上角的横竖屏切换

    ```json
    "pageOrientation": "auto"
    ```

* ***onTabItemTap*** : 当前是tab页 , 点击tab按钮时触发



#### 异步请求

> 异步请求需要在开发者账户中设置请求的目标域名为安全地址
>
> 或者直接在开发者工具中设置 不检验任何不安全的请求地址

```js
//使用 wx 自带的 request 方法
//直接使用插件可自动补全
wx.request({...})
```

* 对于在回调函数再次发送request 的场景需求, 应当使用 promise 进行封装, 提高代码的可读性 , 也可以使用 es7 的 async 语法, 但是使用该方式时应当考虑兼容性问题



#### 下拉刷新

1. 在页面的 json配置文件 中添加 

   ```json
   {
       "enablePullDownRefresh": true,
       "backgroundTextStyle": "dark"
   }
   ```

2. 在页面的 js 文件中添加下拉逻辑

   ```js
   onPullDownRefresh(){
       ...
   }
   ```

3. 如果下拉刷新已经更新了数据, 此时刷新动画还没结束, 可以手动结束动画

   ```js
   wx.stopPullDownRefresh()
   ```

   





#### 本地缓存

> 请求的数据量大时, 应当使用缓存
>
> 这里的本地缓存能够存任何类型的数据
>
> js 中的 localStorage 中的值都是字符串存储

```js
//获取缓存数据
const localStorage = wx.getStorageSync("key_name")
//判断是否存在
if(!localStorage){}
//添加缓存数据
wx.setStorageSync("name", value)
```





#### 页面跳转参数设置

> 跳转页面传递的参数可在 开发者工具左下角 查看
>
> 设置跳转的目标页面为启动页面时, 可设置启动参数 , 即设置页面参数

1. 跳转的 url 中使用get 方式加上参数,如 `/pages/cart/index?cid={{item.cid}}`

2. 在跳转的目标页面的 js 中的 onload 方法的参数就是跳转页面url 中设置的参数

   ```js
   onload(options){
       //这个参数就是打开该页面时传递的参数
       console.log(options)
   },
   onshow(){
       //但是在onshow中不能通过参数直接获取传递过来的参数
       //需要先获取当前的页面栈, 从中获得当前的页面对象, 然后取该对象中的 options 属性的值, 才是传递过来的参数
       let pages = getCurrentPages()
       let options = pages[pages.length-1].options
   }
   
   ```



#### js 中跳转页面

```js
//跳转
wx.navigateTo({
    url: ''
})
//跳回
wx.navigateBack({
    delta: 1 //设置往回跳几层
})
```





#### 获取收货地址

> wx内置了获取收货地址功能
>
> 直接调用 wx.chooseAddress 即可打开选择收货地址页面
>
> 打开收货地址页面前, 会弹出授权页面, 授权成功后方可进入收货地址页面, 否则进入失败
>
> 在进入收货地址页面之前, 应当对授权信息进行判断, 如果之前拒绝了授权, 那么就打开授权页面, 否则直接进入收货地址页面
>
> 调用 wx.getSetting 获取授权信息

```js
//获取授权信息, 回调函数中的参数就是所有的授权信息, 其中 authSetting.scope.address 是获取收货地址的授权状态
//如果从未设置过该授权, 那么该字段是未定义
//如果确认过该授权, 那么该字段是 true
//如果拒绝过该授权, 那么该字段是 false
wx.getsetting({
    success: (result)=>{
        const scopeAddress = result.authSetting['scope.address']
        if(scopeAddress == true || scopeAddress == undefined){
            //未曾拒绝过该授权, 直接进入选择地址页面
            wx.chooseAddress({
                success: (res)=>{
                    //这里的返回值就是选择的地址
                	console.log(res)
            	}
            })
        }else{
            //如果拒绝过授权, 那么打开授权页面让用户自己打开授权
            wx.openSetting({
                success: (res2)=>{
			       wx.chooseAddress({
                       success: (res3)=>{
                           console.log(res3)
                       }
                   })
                }
            })
        }
    }
})
```







#### 登录功能

> 小程序中的登录功能实际上就是获取用户信息

1. 设置按钮功能为获取用户信息, 同时绑定获取到用户信息后的回调方法

   ```html
   <!-- 点击按钮会弹出确认授权访问用户个人信息的授权询问, 确认授权后会调用设置的回调函数 -->
   <button open-type='getUserInfo' bindgetuserinfo='handleGetUserInfo'>登录</button>
   ```

   ```js
   Page({
       //这个参数 e 就是获取到的用户信息
       handleGetUserInfo(e){
           console.log(e)
           //一般是将获取到的用户信息存储到本地缓存中
       }
   })
   ```

   



#### 选择图片并显示

1. 图片显示可通过自定义组件循环遍历渲染 data 中设置的图片路径数组来实现

2. 图片的选择直接调用内置的 api 

   ```js
   //图片选择
   wx.chooseImage({
       count: 9,
       sizeType: ['original','compressed'],
       sourceType: ['album','camera'],
       success: (res)=>{
       	//选择完图片的回调方法, 选择完图片会先存到本地
           //tempFilePaths 为图片的本地临时文件路径列表 (本地路径)
           res.tempFilePaths
   	}
   })
   ```

#### 上传图片

1. 直接使用内置 api

   ```js
   //不支持多张图片同时上传, 如果要上传多张图片, 需要循环上传
   wx.uploadFile({
       //要上传到哪里
       //常规的实现是这里写某图床 (土豆图床) 的上传文件接口, 然后在success回调函数中接收到图片上传到的外网url, 然后将这个外网 url 发送到自己的服务器存储起来.
       url: '',
       //被上传的文件在哪里
       filePath: '',
       //上传文件的名称, 后台通过这个名称获取图片
       name: '',
       //顺带提交的文本信息
       formData: {},
       success: (res)=>{
           
       },
       fail: (res)=>{
           
       }
   })
   ```

   



#### 项目发布

1. 要求项目打包后大小不能超过2M, 直接使用开发者工具中右上角的上传按钮进行上传
2. 登录小程序开发平台, 左侧 管理->版本管理, 使用开发者工具上传的项目为体验版, 此时还不能搜索到, 自己审核完毕后点击提交审核将小程序提交给微信管理人员进行审核, 待他们审核完毕后, 小程序才成为线上版本, 可直接在微信中搜索到





### 项目实践(原生vx小程序框架mina)

> 在项目中, 应当把请求的 url 路径中的公共的部分抽取出来, 那么在写 request 的 url 参数时只需写接口名即可

1. 创建项目

2. 创建目录结构 `styles样式`, `components组件` ,`lib第三方库`,`utils自己的帮助库`,`request自己的接口帮助库` , `icons 自己的图标`

3. 新建项目页面们

4. 使用阿里的图标库, 将图标添加至项目, 使用 font class 下的在线链接复制css代码, 在项目styles下创建wxss文件粘贴这些图标 , 在 `app.wxss`  中引入这个图标文件, 然后在任意页面使用类名的方式来使用图标

   ```css
   /*引入*/
   @import "/styles/iconfont.wxss";
   ```

   ```wxml
   /*使用*/
   <text class="iconfont icon-shoucang1"></text>
   ```

5. 构建tabbar, 配置 `app.json`  下的window和tabBar属性

6. 初始化样式

   ```wxss
   /* 设置app.wxss, 这里不支持*, 所以使用标签通配 */
   page, view, text, swiper, swiper-item, image, navigator{
   	padding: 0;
   	margin: 0;
   	box-sizing: border-box;
   }
   
   page{
   /* 使用wxss的变量定义主题颜色 */
   	--themeColor: #eb4450;
   /* 定义统一的字体大小 */
   /* 假设设计稿大小是375px, 那么1px=2rpx, 14px=28rpx */
   	font-size: 28rpx;
   }
   ```

   ```wxss
   /* 使用主题颜色变量 */
   view{
   	color: var(--themeColor);
   }
   ```

7. 创建搜索框组件在 `components` 下并在主页中使用

8. 在主页使用轮播图, 数据为页面数据, 在***onLoad***事件中进行异步请求轮播图数据 ( 可在开发者工具中控制台的AppData下查看页面数据 )

   ```js
   //异步请求 , 需要使用真实的appid
   wx.request({
       //使用这个地址需要在开发者工具中设置 不校验不合法域名
       //或者在小程序官网->开发->开发设置->服务器域名 中添加该域名
       url:'https://api.zbztb.cn/api/public/v1/home/swiperdata',
       data:{},
       //...参数参照官网文档 API->网络->wx.request
   })
   ```

   

