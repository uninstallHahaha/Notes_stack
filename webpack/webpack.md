# webpack

#### webpack做什么

​	光杆webpack只有打包功能, 其他任何功能还需使用 loader 和 plugin

​	在打包之前借助 loader 和 plugin 将 less 之类浏览器不能直接识别的需要预处理的文件 , 以及使用了 es6 语法而导致浏览器不能运行的js文件 , 预处理成为 css 和 普通 js , 生成最终浏览器可直接执行的文件, 这些文件成为 bundle

> 实际上就是利用了 es6 中可以在 js 文件中导入其他文件的特性, 将整个前端项目汇总为一个 js 文件, 使用这个 js 文件作为入口, 就可以串连整个项目

#### webpack五个核心概念

1. Entry

   入口, 指webpack 使用哪个文件作为打包的入口文件开始分析依赖关系进行打包

2. output

   输出, 指 webpack 打包生成的 bundle 文件叫什么名字, 保存到哪里

3. loader

   其实 webpack 本身只能处理 js 和 json 文件, 如需预处理如 less 之类的文件, 还需要借助对应的 less 编译器, 这些编译器就被称为 loader , webpack 调用 loader 实现对不同类型的文件的预处理

4. plugin

   插件, loader只能执行基本的编译操作, plugin可以实现更大范围的功能

5. mode

   模式, 两种模式

   * 开发模式, 能够把代码跑起来就行的环境
   * 生产模式, 包含了优化相关的环境



#### webpack 开发环境

###### webpack 基本打包

1. 首先需要安装 nodejs  , 因为要适用 npm 来管理项目的依赖

2. 创建一个文件夹, 在文件夹内打开命令行, `npm init` 初始化为一个 npm 项目

    这步操作实际上是生成 package.json 文件, 也就是将当前文件夹作为 nodejs 的项目文件夹, 在其中可以使用 nodejs 的包

3. `npm i webpack webpack-cli -g` 全局安装webpack, 是安装到本机, 可以直接在命令行中使用 webpack 命令

4. `npm i webpack webpack-cli -D` 局部安装webpack , 安装到当前的 npm 项目下

5. 在文件夹中新建  

   1. src 文件夹 : 存放源代码
   2. build 文件夹 : 存放经过webpack 打包后生成的文件

   *   <span style='color:cyan'>开发模式是 : 在src中按照任何模块化的规范(比如 CMD,AMD,CommonJs,Es6)进行开发, 开发完成后使用webpack命令打包这些模块到build文件夹下为一个浏览器可识别的es5的js文件, 然后在html页面中直接引用这个js文件即可</span>

6. 在 src 文件夹中新建 index.js 作为 webpack 打包的入口文件, 随便写点 js

7. 使用webpack 命令来打包这个 index.js, 当然如果使用了webpack配置文件, 那么直接执行 webpack 命令即可

   使用开发环境模式打包 : `webpack ./src/index.js -o ./build/build.js --mode=development`

   使用生产环境模式打包 : `webpack ./src/index.js -o ./build/build.js --mode=production` 生产环境模式会将生成的 js 文件压缩

8. 打包生成的 js 文件可以直接使用 node 运行  `node .\build\build.js`

9. 打包生成的 js 文件也可以直接引入到 html 中使用

10. 在 src 中新建 data.json 文件, 随便写点 json

11. 在 src 下的 index.js 中使用 es6 的语法导入上述 json 文件, 并使用 json 中的数据

    ```js
    import data from './data.json';
    console.log(data)
    ```

12. 再次使用 webpack 指令对 index.js 进行打包  , 然后在 html 中引用打包后的文件进行测试

13. 在 src 中新建 index.css 文件

14. 然后在 index.js 中使用 Es6 语法引入该 css 文件

    ```js
    import './index.css';
    ```

15. 使用 webpack 命令对 index.js 重新打包, 此时会报错 , 这就证明了 webpack 本身不能翻译 css 文件

###### webpack 打包样式文件

16. 在项目根目录新建 webpack.config.js 文件作为 webpack 的配置文件 , 该配置文件使用 commonjs 语法 , 也就是 nodejs 的语法

    这个配置文件中的配置项就是 五个核心概念

    ```js
    //引入nodejs 中的path模块中的 resolve
    const { resolve } = require('path');
    
    module.exports = {
        //webpack配置
        //入口起点
        entry: './src/index.js',
        //输出
        output:{
            //输出文件名
            filename: 'build.js',
            //输出路径 , 使用nodejs的path模块中的 resolve 方法(相当于java中的join)
            // __dirname 为 nodejs 中的一个变量, 为当前文件的所在路径
            path: resolve(__dirname, 'build')
        },
        //配置loader
        module:{
            //配置什么文件用什么loader处理
        	rules:[
                {
                    //test用正则
                    test: /\.css$/,
                    //use 设置这种文件使用哪些loader 处理, css文件被这些loader处理的顺序是列表中的从尾到头
                    use: [
                       'style-loader', //在html中创建style标签,将js中的样式字符串添加进去
                        'css-loader'  //将css文件变为commonjs模块加载到js中
                    ]
                }
            ]
    	},
        //配置插件, 插件需要现在上面引入, 然后才能在这里配置
        plugins:[
            
        ],
        //设置模式 -- 开发模式
        mode:'development',
    }
    ```

17. 使用 npm 局部下载解析 css 需要用到的 css-loader 和 style-loader

    `npm i css-loader style-loader -D`

18. 在项目根目录, 也就是有 webpack 配置文件的目录直接使用命令  `webpack` 即可使用该文件夹中的 webpack.config.js 作为打包的配置文件进行打包

19. 此时就可对 css 文件打包 , 可以使用 html 引入打包后的 build.js 文件测试 css 文件的打包结果

###### webpack 自动生成html文件

> 就是自动在output目录生成一个html 文件, 这个文件已经引入了 生成的 build.js 文件

20. 在src 下新建 index.html 文件 , 随便写点内容

21. `npm i html-webpack-plugin -D`  下载 html 打包的插件

22. 配置webpack 的 配置文件, 使用 html 打包插件, 此处配置不是完整配置

    ```js
    //先引入
    const htmlwebpackplugin = require('html-webpack-plugin');
    
    ...
    
    //在插件中配置
    plugins: [
        //默认生成一个没有任何内容仅仅是引入了 build.js 的html 文件
        //设置 template 参数来指定生成的 html 使用哪个html 中的结构 
        new htmlwebpackplugin({
            template: './src/index.html'
        })
    ]
    ```


###### webpack 打包图片文件

23. 下载包 `npm i url-loader file-loader -D`

24. 在配置文件中的 rules 中添加 图片的 loader , 该loader 根据图片内容生成一个hash值,这个值作为打包生成文件的名字

    ```js
    {
        //这种处理方式只能处理 css 中使用的图片
        test: /\.(jpg|png|gif)$/,
        //仅使用一个loader时, 直接写 loader 属性
        loader: 'url-loader',
        //loader设置
        options:{
            //图片小于8k时, 就把图片转换为 base64 加载在页面中
            //优点: 减少请求次数
            //缺点: 转换为 base64 之后体积会变大, 所以适合对小图片进行base64转换
            limit: 8*1024,
            //因为 url-loader 使用es6中的模块化方式引入图片, 而下面使用的 html-loader 使用的是commonjs,所以设置 url-loader 不使用 es6的模块化方式, 从而使得 下面的 html-loader 可正常使用
            esModule: false,
            //生成的文件名太长, 重新设置
            // [hash:10] 取hash值前十位 , [ext] 原本文件的后缀
            name: '[hash:10].[ext]'
        }
    }
    ```

25. 使用 webpack 命令打包, 图片会生成在 build 文件夹中

26. 因为打包生成的图片名字会被改变, 所以对于直接在 html 中设置图片的 src 的引用方式, 使用 loader 的方式会使得生成的页面中加载不到图片

27. 下载 `npm i html-loader -D`

28. 在配置中添加 html-loader 的配置 , 该loader 负责将 原来html 中 img 标签的 src属性变成 对应的打包生成的文件名

    ```js
    //在rules 中添加
    {
        test: /\.html$/,
        loader: 'html-loader'
    }
    ```


###### webpack 打包其他文件

> 就是一些只需要原样打包的文件 , 例如 woff , eot , svg

29. 在 webpack 配置文件的 rules 中添加配置使用 file-loader 打包其他资源

    ```js
    {
        //使用exclude 排除文件类型
        exclude: /\.(css|js|html)$/,
        loader: 'file-loader',
        //设置打包生成的文件名
        options:{
            name: '[hash:10].[ext]'
        }
    }
    ```

30. 使用 webpack 命令打包

###### webpack 使用devServer

31. 此时每次修改代码都要手动执行 webpack 重新打包, 然后手动刷新浏览器

32. 在 webpack 的配置文件中配置 devserver , 这个配置和五个核心配置同级

    ```js
    //设置了开发服务器后, 每次其实都是将更新编译的文件存到内存中, 不会更新本地的文件
    devServer: {
        //设置要更新和运行的文件在哪里, 就是编译后的路径
        contentBase: resolve(__dirname, 'build'),
        //设置使用 gzip 压缩, 这样能够提高更新速度
        compress : true,
        //服务开在哪个端口上
        port : 3000,
        //自动打开浏览器
        open: true
    }
    ```

33. `npm i webpack-dev-server -D` 下载启动服务的工具包

34. `npx webpack-dev-server` 启动开发服务器

35. `localhost:3000` 查看页面

###### 整理源文件目录结构

36. 在 src 下分别创建 js , css , img , asset 文件夹, 分别将不同类型的资源对应放到目标文件夹中
37. 修改 index.js 中对其他各个文件的引用路径即可

###### 整理编译后的文件目录结构

38. 现在编译后生成的各种文件都是放到一起的, 想要将它们放到不同的文件夹中

39. 修改 webpack 配置

    ```js
    //修改 output 下的 filename 参数, 就会在生成目录下创建对应的文件夹
    filename : 'js/build.js'
    
    ...
    // css 和 less 不用设置, 因为它们打包后就直接加到 html 文件中的 style标签中了
    //在各个 loader 中的 options 下添加 outputPath 参数指定将文件生成到哪个文件夹下 , 例如url-laoder
    {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options:{
            limit: 8*1024,
            name: [hash:10].[ext],
            esModule: false,
            outputPath: 'imgs'
        }
    }
    ```

    

#### webpack 生产环境

> 提升项目的运行效率, 兼容性 和 稳定性

###### 提取 css 文件为单独文件

> 开发环境中会直接把 css 文件加载到 js 中, 如果 css 很多就会很臃肿影响性能
>
> 现在将 css 单独打包

1. `npm i mini-css-extract-plugin -D` 下载插件

2. 在 webpack 配置文件中添加使用该插件

   ```js
   //引入插件对象
   const MiniCssExtrctPlugin = require('mini-css-extract-plugin')
   
   
   ...
   //修改css中使用的loader
   {
       test: /\.css$/,
       use:[
           MiniCssExtractPlugin.loader,//将js中的css单独提取成文件,不再需要style-loader将css加到html中
           'css-loader'  //将css整合到js中
       ]
   }
   
   
   ...
   //在plugins中添加插件实例
   plugins:[
       new MiniCssExtractPlugin({
           filename: 'css/main.css' //设置输出文件的路径
       })
   ]
   ```

3. 使用 webpack 命令打包, 会在  build 目录下生成 css/main.css 并且被 index.html 引用

###### css 兼容性处理

> 不同的浏览器使用某些css 属性可能需要添加不同的前缀
>
> 现在对css 进行兼容性处理, 使得它能够根据不同的浏览器做不同的兼容性变化

4. `npm i postcss-loader postcss-preset-env -D` 下载需要的包

5. 修改 webpack 配置文件

   ```js
   //如果要使用 browserlist 中的开发环境设置 , 修改nodejs 的环境变量
   process.env.NODE_ENV = 'development'
   
   
   ...
   //修改 css 的loader 部分
   {
       test: /\.css$/,
       use:[
           MiniCssExtractPlugin.loader,
           'css-loader', //直接写字符串就是使用默认配置
           {  //使用对象的方式可设置参数, 先让 css 经过兼容性处理
               loader: 'postcss-loader',
               plugins:()=>[
               //通过调用这个插件从 package.json 中读取 browserlist 子项的内容,也就是做哪些浏览器的兼容处理
               //默认使用 browserlist 中关于 production 的设置, 如果想使用 development 的设置,使用上面的代码修改 nodejs 的运行时环境变量
                   require('postcss-preset-env')()
               ]
           }
       ]
   }
   ```

6. 在 package.json 也就是 npm 项目配置文件中添加 browserlist 子项

   ```json
   {
       "browserlist":{
           "development":[
               "last 1 chrome version",
               "last 1 firefox version",
               "last 1 safari version"
           ],
           "production":[
               ">0.2%",
               "not dead",
               "not op_mini all"
           ]
       }
   }
   ```

7. 执行 webpack 命令重新生成, 查看 生成的 main.css 中的兼容性处理

###### 压缩 css

8. `npm i optimize-css-assets-webpack-plugin -D` 下载

9. 修改 webpack 配置文件

   ```js
   //引入
   const optimizecssassetswebpackplugin = require('optimize-css-assets-webpack-plugin')
   
   ...
   //添加plugin
   plugins:[
       new optimizecssassetswebpackplugin()
   ]
   ```

10. 执行 webpack 查看 main.css 的压缩打包结果

###### js 语法检查(有何屌用)

> 设置一套写js 的规范 , 在对js 打包之前会先使用规范对代码检查, 如果不符合设置的规范, 那么就会报错然后打包失败
>
> 这里使用 airbnb 的 js 的代码规范

11. ` npm i eslint-loader eslint eslint-config-airbnb-base eslint-plugin-import -D` 下载

12. 修改 webpack 配置文件

    ```js
    //添加 rules 子项
    {
        test: /\.js$/,   
        exclude: /node_modules/,  //不检查来自node_modules中第三方的js文件
        loader: 'eslint-loader',
        options:{
            //默认使用的语法检查规则来自于package.json 中 eslintConfig 的设置
            //这里在 eslintConfig 中设置的语法检查规则为 airbnb 
            //设置发现不规范后自动修改源文件
            fix: true
        }
    }
    ```

13. 在 package.json 中添加 eslintConfig 子项

    ```json
    "eslintConfig": {
        "extends": "airbnb-base"
    }
    ```

14. 在 index.js 中不按照严格的缩进和空格随便写点东西

    ```js
    //注
    //如果想要eslint忽略检查, 使用如下注释设置忽略一行检查
    // eslint-disable-next-line
    console.log("123")
    ```

15. 使用 webpack 打包, 会发现打包失败, 提示代码不规范 , 如果设置了自动修改, 那么就不会报错, 而是会先自动修改, 然后打包

###### js 兼容性处理

> 转换 es6 等新版语法成为通用的语法

16. `npm i babel-loader @babel/core @babel/preset-env -D` 下载

17. 修改 webpack 配置文件

    ```js
    //添加rules 子项
    {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
            //设置使用什么规则做js 的兼容性处理
            presets:['@babel/preset-env']
        }
    }
    ```

18. 使用 webpack 打包, 查看打包后的 index.js 中的兼容性处理结果 , 此时只能处理基本的兼容性处理, 不能处理如 promise 的转换

19. `npm i @bable/polyfill -D` 下载

20. 在 源js 文件中引入 @bable/polyfill 

    这种方式能够解决所有的兼容性问题, 因为它将所有的新版 js 中的对象都重新定义了一遍并引入, 这是一种很暴力的方法, 会使得生成的文件很大

    ```js
    import '@bable/polyfill' 
    ```

21. 使用 webpack 再次打包, 查看打包结果, 此时能够对 promise 之类的语法进行转换

22. 鉴于上面两种兼容性的劣势, 所以上面兼容性处理的规则都是在***放屁***

23. `npm i core-js -D` 下载, 使用 core-js 对源文件进行按需处理

24. 修改 babel 的兼容性处理规则

    ```js
    {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'bable-loader',
        options: {
            presets: [
                [
                    '@bable/preset-env',
                    {   //设置使用corejs版本3作为按需加载的规则
                        useBuiltIns: 'usage',
                        corejs: {
                            version: 3
                        },
                        //设置兼容性做到哪个版本的浏览器
                        targets: {
                            chrome: '60',
                            firefox: '60',
                            ie: '9',
                            safari: '10',
                            edge: '17'
                        }
                    }
                ]
            ]
        }
    }
    ```

25. 注意: 使用 corejs 的兼容性处理的方式就不能在 源js 文件中 `import '@bable/polyfill'`

26. 使用 webpack 打包, 查看兼容性处理结果

###### 压缩 js

27. 只需要在配置中改为 `mode: 'production'` 即可启用js 压缩

###### 压缩 html 

28. 修改配置文件中的 htmlwebpackplugin 插件参数

    ```js
    new htmlwebpackplugin({
        template: './src/index.html',
        minify: {
            //移除空格
            collapseWhitespace: true,
            //移除注释
            removeComments: true
        }
    })
    ```

###### 调整loader 的执行顺序

29. 到目前为止, 有多个对 js 文件处理的 loader , 按照逻辑上来看, 应当是 eslint 语法检查在前, bable 兼容性转换在后, 所以应当设置 eslint 先执行

    ```js
    {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre', //设置这个 loader 先执行
        loder: 'eslint-loader',
        options: {
            fix: true
        }
    }
    ```



#### webpack 优化配置

##### 开发环境优化

> 到目前为止配置的开发环境, 如果其中任何一个 css 文件或 js 文件被修改后, 所有的模块文件都会重新加载, 这样会影响编译速度
>
> 使用 hot module replacement 热模块加载功能, 实现仅仅重新加载修改的文件的功能

###### 热更新

1. 修改 devserver 配置

   ```js
   devServer:{
       contentBase: resolve(__dirname, 'build'),
       compress: true,
       port: 3000,
       open: true,
       hot: true //开启热模块加载功能
   }
   ```

2. `npx webpack-dev-server` 重启服务

3. 此时 会发现 css 能够热更新, 因为 css 的热更新在 style-loader 中已经实现了 

   js 文件不能热更新, 

   而对于 html, 出现了即使被修改, 页面也不会更新的问题

   ```js
   //修改entry 设置, 这样就能解决现在 html 不更新的问题
   entry: ['./src/js/index.js', './src/index.html']
   ```

4. 此时 js 文件不能做到热更新, 在入口 index.js 文件中添加热更新的代码

   ```js
   //引入其他的自己写的js文件
   import print from './print.js'
   
   //初次加载 index.js 时, 会执行这段代码, 添加对其他模块 js 文件的监听 
   //如果发生变化, 则调用回调函数, 设置回调函数为 对应模块的调用 
   //这样就实现了修改一个 js文件 时, 仅仅重新加载该文件的功能
   if(module.hot){ //判断是否开着hot功能
       //添加对 print.js 的监听
       module.hot.accept('./print.js',function(){
           print()
       })
       //有多少个其他的js 模块, 这里就写多少个监听...
   }
   ```

   ```js
   /*这是其他的自己写的js 模块 : print.js*/
   console.log('print模块被加载了')
   function print(){
       console.log('这里是print.js')
   }
   
   export default print
   ```

###### 源代码映射

> 打包后的代码已经是面目全非, 如果出错, 那么将会无法定位错误在源代码中的位置
>
> 使用 source-map 功能建立打包后代码和源代码的映射, 从而使得可以在源代码中定位错误

5. 修改 webpack 配置, 添加 devtool 子项, 和 五大核心配置同级

   ```js
   devtool: 'source-map' 
   //这个前面可加参数, 参数有很多种, 不同的对应不同的模式, 推荐使用 eval-source-map, 既能保证生成映射文件的速度, 又能使得调试友好
   ```

6. 执行 webpack 命令构建, 会在 build.js 同级目录中生成一个 build.js.map 保存映射关系的文件

7. 此时 `npx webpack-dev-server` 开启开发服务器 

   如果 js 中出现了错误, 可以在浏览器控制台中查看到对应的源码的出错位置

   因为此时开发服务器将源代码和打包后代码都发布了出来, 然后使用 map 文件对应得出源代码出错位置



##### 生产环境优化

###### bable 缓存

> 开启 bable 缓存, 每次更新 js 文件仅编译被修改的 js 文件

1. 修改 bable 的配置

   ```js
   {
       test: /\.js$/,
       exclude: /node_modules/,
       loader: 'bable-loader',
       options: {
           presets: [...],
           cacheDirectory: true //开启缓存
       }
   }
   ```

###### tree sharking

> tree sharing 就是摇晃大树, 去掉没有被引用的 js 代码, 从而使得打包后的体积更小

2. 设置 mode 为 production 即开启了 tree sharing 功能

3. 某些版本该功能可能把 css 文件也干掉 , 此时在 package.json 中添加配置

   ```json
   {
       "sideEffects": ["*.css"]
   }
   ```

###### 代码分割

> 将最终打包生成的一个 js 文件变成多个文件
>
> 可以实现按需加载, 可以使用并行加载提高加载速度

第一种方式

1. 修改 entry 和 output 配置为多入口打包

```js
entry: {
    //设置多入口打包, 会生成对应个数的文件, 这里的 test.js 是自己写的另外一个文件
    main: './src/js/index.js',
    test: './src/js/test.js'
},
output:{
    //设置输出的多个文件名字为各自在上面 entry 设置中的属性名
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build')
}
```

第二种方式

1. 修改 webpack 配置

   ```js
   //在五大核心配置同级添加该配置
   //会将来自node_modules 中的第三方代码单独打包成一个 chunk , 自己写的代码打包成一个 chunk
   //如果设置了多入口代码, 那么生成的多个入口 chunk 会共用那个第三方代码的chunk, 从而避免重复对第三方代码的打包
   optimization:{
       splitChunks:{
           chunks: 'all'
       }
   }
   ```

第三种方式

1. 在单入口打包的情况下又想对某个模块js 文件单独打包, 那么就在 index.js 入口文件中使用 es10 的方式 import 模块文件

   ```js
   //使用es10 的语法导入名为 test.js 的文件, 那么在打包时会将该模块文件单独打包
   //这种方式实际上就是调用 import 函数, 这个函数能够保证只加载一次, 不会重新加载
   //使用下面这种方式的注释指定打包后的文件名
   import(/* webpackChunkName: 'test' */'./test')
   	.then((result)=>{})  //result 就是加载的模块对象, 可以使用拆包直接得到该对象的内容{ xxx, yyy }
   	.catch(()=>{})
   ```

###### 懒加载

1. 如果想实现点击按钮才加载某一模块的需求, 在点击事件的回调函数中调用 es10 中的 import 函数即可

   ```js
   document.getElementById('test').onclick= function(){
       //点击时才加载
       import('./test').then(({xxx, yyy})=>{
           xxx() //直接拆包使用模块中的方法
       })
   }
   ```

###### 预加载 (兼容性差, 了解即可 )

1. 预加载是指使用 import 函数的加载方式, 加载的目标文件会在其他 使用 es6 import 加载完之后才加载

   ```js
   //使用 webpackPrefetch 参数设置预加载
   import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test').then(({xxx, yyy})=>{})
   ```

###### PWA 离线访问

> 使得即使在断网的情况下也可以访问网页
>
> 其实就是生成一个可以替代原网页 service-worker.js 文件, 第一次有网络的时候使得浏览器保存下这个文件, 再次访问时如果没有网络, 浏览器就加载 service-worker.js 文件来显示页面

1. `npm i workbox-webpack-plugin -D` 下载

2. 在 webpack 配置中使用该插件

   ```js
   //引入
   const workboxwebpackplugin = require('workbox-webpack-plugin')
   
   ...
   //在插件中使用
   //使用webpack 打包时, 该插件会在build 根目录生成 service-worker.js 文件
   plugins: [
       new workboxwebpackplugin({
           clientsClaim: true,
           skipWaiting: true
       })
   ]
   ```

3. 在 index.js 中添加注册 serviceWorker 的代码

   ```js
   if( 'serviceWorker' in navigator){  //判断浏览器是否支持service worker
       window.addEventListener('load',()=>{
           navigator.serviceWorker
           .register('/service-worker.js')
           .then(()=>{ console.log('注册成功') })
           .catch(()=>{ console.log('注册失败') })
       })
   }
   ```

4. 修改 package.json 中的 eslintconfig 属性 , 不改的话编译时会报错, index.js 中的 window 和 navigator 变量未定义

   ```json
   {
       "eslintConfig": {
           "extends": "airbnb-base",
           "env": {
               "browser" : true
           }
       }
   }
   ```

5. 使用 webpack 命令构建, 会在build 目录下生成 service-worker.js 文件

6. ` npm i serve -g` 下载开启静态服务器的工具包, 使用 build 目录开一个服务

7. 执行命令 `serve -s build` 使用build目录作为资源目录启动服务器 

8. 服务启动成功后在浏览器查看 service-worker 注册结果, 如果注册成功, 可以在 浏览器f12 -> application ->service worker 中查看到注册的 service-worker

9. 然后将浏览器网络调为 offline , 再次刷新页面, 会发现页面仍然可以使用, 且资源文件来自 service worker 

###### 多进程打包

1. `npm i thread-loader -D` 下载

2. 修改webpack 配置文件, 在想要使用多进程打包的 loader 列表中添加这个loader, 开启进程消耗时间较长, 所以仅适合消耗时间较长的打包过程, 一般用在 bable-loader 上

   ```js
   //设置对js文件 使用 bable-loader 打包时使用多进程
   test: /\.js$/,
       exclude: /node_modules/,
           use: [
               //在bable-loader 打包时使用多进程
               'thread-loader',
               {
                   loader: 'bable-loader',
                   options: { ... }
               }
           ]
   ```

###### external 忽略打包

> 为了避免打包后的文件过大, 对于一些第三方的 js 库文件, 采用 html 中链接的方式引入, 此时使用 external 设置排除打包目标库文件

1. 修改 webpack 配置文件, 添加 external 子项, 和五大核心配置同级

   ```js
   externals: {
       //忽略库名: npm包名
       jquery: 'jQuery'
   }
   ```

2. 此时在 js 中使用 import 引入的 jquery 就不会被打包到输出文件中, 应当在 html 中使用链接引入 jquery 

###### dll 打包

> 之前将第三方的库单独打包会打包成为一个文件
>
> 现在使用 dll 可以将第三方库打包成多个文件

1. 在 webpack 配置文件同级新建 webpack.dll.js 配置文件

   ```js
   const {resolve} = require('path')
   const webpack = require('webpack')
   
   module.exports= {
       entry: {
           //将列表中的库打包成名为 jquery 的文件
           jquery: ['jQuery']
       },
       output:{
           filename: '[name].js',
           path : resolve(__dirname, 'dll'),
           library: '[name]_[hash]' //设置打包的库向外暴露出去的内容的名字
       },
       plugins: [
           //创建一个映射文件, 包含不需要打包的第三方库的名称和 使用 dll 打包的这些库向外暴露的名称
           new webpack.DllPlugin({
               name: '[name]_[hash]',
               path: resolve(__dirname, 'dll/manifest.json')
           })
       ],
       mode: 'production'
   }
   ```

2. 运行 `webpack --config webpack.dll.js` 使用webpack.dl.js 作为配置文件打包第三方库, 同时生成 manifest 清单文件

3. `npm i add-asset-html-webpack-plugin -D` 下载插件

4. 修改 webpack 配置文件

   ```js
   //引入插件
   const webpack = require('webpack')
   const addassethtmlwebpackplugin = require('add-asset-html-webpack-plugin')
   
   ...
   plugins: [
       //在plugin 中使用插件, 配置 manifest 清单文件的位置
       new webpack.DllReferencePlugin({
           manifest: resolve(__dirname, 'dll/manifest.json')
       }),
       //使用插件将上面单独打包的 jquery.js 文件引入到生成的 index.html 中,同时将这个 jquery.js 在build目录下复制一份
       new addassethtmlwebpakplugin({
           filepath: resolve(__dirname, 'dll/jquery.js')
       })
   ]
   ```

5. 运行 webpack 指令打包, 此时因配置了 dll , 将不再对 manifest 清单中所列条目进行打包, 同时使用 add-asset 插件将 jquery 引入到了 index.html 主页中, 从而实现了将某些第三方库单独打包并使用

6. 此时对 第三方库的单独打包, 能够使得不用每次修改都重新打包第三方库, 从而提高了打包效率



#### webpack 配置详解

###### entry 配置

* 配置为一个字符串 , 即常规的指定一个入口文件, 输出也为一个文件
* 配置为一个字符串数组 , 多入口文件, 输出为一个文件
* 配置为一个对象, 即多入口打包成为多个文件, key 为 打包后文件的名字, value 为入口文件路径
* 配置为一个对象, key 为打包后的文件名, value 为字符串数组, 会将这个数组中的多个包打包成一个文件, 适用于对某系列第三方库的单独打包

###### output 配置

* 配置一个对象  
  * filename 属性设置 入口文件的输出路径  
  * path 属性指定所有输出文件的目录
  * publicPath 属性设置在自动生成的页面中引用资源文件的前缀, 一般用于生产环境
  * chunkFilename: '[name]_chunk.js'  , 设置非入口文件 的输出文件的路径和名称
  * library: '[name]'  默认生成的main.js 中将所有代码放到函数中执行, 不会对外暴露对象, 使用该属性设置打包生成的 js 文件将内容根据设置的名称作为对象向外暴露出去
  * libraryTarget: 'window'  将上面 library属性中设置的向外暴露的对象添加到 window 对象中

###### loader(module) 配置

* 配置一个对象, 包含一个类型为 数组的 rules 属性,  rules 数组中包含 loader 的配置对象

###### resolve配置(同级五核心配置)

> 用来配置解析模块的规则

* 配置为一个对象

  * alias 属性配置解析路径的别名
  * extensions: [ '.js', '.json', '.css'] 配置解析路径的后缀名
  * modules: ['node_modules']  设置解析模块时在哪个目录中找

  ```js
  resolve: {
      alias: {
          //相当于定义了路径变量 $css , 在 js 中使用 import 导入css 文件的路径中就可以直接使用这个 $css变量
          // import '$css/index.css'  直接使用 $css 变量
          $css: resolve(__dirname, 'src/css')
      },
      //配置了文件的后缀名, 当引入文件没有写后缀名时, 使用该列表依次匹配, 匹配成功则使用该后缀
      extensions : ['.js', '.json', '.css'],
      //设置解析模块时在哪个目录中找
      modules: ['node_modules']
  }
  ```

###### devServer 配置

* 配置为一个对象

  * contentsBase 设置资源文件目录

  * compress 设置是否压缩

  * port 设置端口号

  * open 设置是否自动打开浏览器

  * hot 设置是否开启热更新功能

  * watchContentBase 设置是否监视资源文件目录变化 , 一旦变化则重新加载

  * clientLogLevel : 'none'  设置日志显示等级

  * quiet : true 设置是否安静模式启动, 安静模式: 除了基本的启动信息都不显示

  * overlay : false 设置出错时不会全屏提示

  * proxy 设置转发对接口的请求

    ```js
    proxy: {
        //设置当接收到来自浏览器的包含 /api 的请求(请求数据的接口)时, 将该请求转发给指定地址
        //因为直接通过浏览器对目标地址发送请求存在跨域问题, 而服务器向服务器发送请求不存在跨域问题, 所以通过该 devServer 转发请求可以解决跨域问题
        '/api': {
            target: 'http://localhost:8080',
            //设置在转发请求之前, 将访问路径中头部的 api/ 替换为 空
            pathRewrite: {
                '^api/': ''
            }
        }
    }
    ```

    





