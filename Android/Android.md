# Android

工具下载 : https://www.androiddevtools.cn/





#### 页面

> 使用xml文件定义页面布局
>
> 线性布局, 相对布局, 绝对布局, 表格布局, 层布局

###### shape文件

> 一种模板文件, 可以在布局文件中使用 @ 进行引用, 定义一套样式

> 应当放到 drawable 目录下



###### selector文件

> 一种模板文件, 可以在布局文件中使用 @ 进行引用, 定义控件不同状态下的样式, 其中可使用 @ 引用 shape文件

> 可通过 press 属性设置控件被点击时的样式

> 应当放到 drawable 目录下

###### include

> 页面文件中可以使用 include 标签包含其他页面





#### 控件点击事件

###### onClick

> 直接在xml中控件上添加 onClick 属性绑定方法, 方法定义在对应的 activity.java 中

###### 在onCreat方法中绑定

1. 先给控件添加 id

2. 在activity中的onCreate方法中使用 `View v = this.findViewById(R.id.xxx)` 来获取控件

3. 给控件对象设置设置点击事件

   ```java
   v.setOnClickListener(new View.OnClickListener(){
       @Override
       public void onClick(View v){
           //...
       }
   })
   ```

   

#### 数据存储

###### 文件存数据

> 在Android系统中, 每个应用只对自己应用目录有读写权限, 所以使用文件存储数据时应当将文件存储到自己的目录下
>
> 各个应用对应的文件目录为 /data/data/应用的包名
>
> 在应用的文件目录下, 有 cache 和 files 两个目录
>
> cache 目录中的文件系统会在存储空间紧张时自动清除
>
> files 目录中的文件可手动通过  设置->应用程序->清除数据  来清除
>
> sd卡目录默认为 /storage/sdcard , 读写该路径需要在清单文件中根节点下添加权限声明
>
> ```xml
> <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
> <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
> ```
>
> ```java
> //sd卡相关api
> //不同的厂商对sd卡的挂载命名会不相同, 所以应使用api来获取sd卡的目录
> File esd = Environment.getExternalStorageDirectory();
> //获取sd卡状态(是否有sd卡), 根据返回的状态进行判断
> String state = Environment.getExternalStorageState();
> if(stata.equals(Environment.MEDIA_MOUNTED)){
>     //存在sd卡且可用
> }
> //获取sd卡的各种信息
> long freeSpace = exFile.getFreeSpace();
> String sizeText = Formatter.formatFileSize(this, freeSpace);
> ```
>
> 

存数据

```java
//获取当前应用文件夹下的 cache 文件夹的路径
File cachePath = this.getCacheDir();
//获取当前应用文件夹下的 file 文件夹的路径
File filePath = this.getFilesDir();
File file = new File(filePath, "test.txt");
        try{
            if(!file.exists()){
                file.createNewFile();
            }
            FileOutputStream fos = new FileOutputStream(file);
            fos.write("test_String".getBytes());
            fos.close();
            Log.d(TAG, "保存成功...");
        }catch (Exception e){
            e.printStackTrace();
        }
```

取数据

```java
try {
    //直接打开files目录下指定文件的文件输入流
            FileInputStream fis = openFileInput("test.txt");
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(fis));
            String line = bufferedReader.readLine();
            Log.d(TAG, line);
        } catch (Exception e) {
            e.printStackTrace();
        }
```

###### SharedPreference

> SharedPreference 一般用于保存应用的设置信息
>
> 该文件存储为应用数据目录中的 shared_prefs/sp名字.xml 

```java
//存储数据
SharedPreferences sp = this.getSharedPreferences("settings", MODE_PRIVARE);
SharedPreferences.Editor editor = sp.edit();
editor.putString("name","value");
editor.commit();
//读取数据
String value = editor.getString("name","默认值");
```

###### sqlite

> 内置数据库
>
> 每个应用维护自己的数据库, 路径为 data/data/包名/databases/数据库文件
>
> 一个数据库是一个文件, 该文件可通过 sqlExplore 软件查看内容

1. 创建一个类继承 SqliteOpenHelper 并实现 onCreate 和 onUpdate 方法
   * onCreate 当数据库创建时调用 , 当调用 对象实例 的 getReadableDatabase / getWriteableDatabase 方法时如果数据库不存在会创建数据库
   * onUpdate 当数据库的版本号发生变化时调用, 覆盖安装应用时, 如果新的应用版本号和原应用版本号不同, 则视为版本号发生变化, 在 onUpdate 中应当考虑对应不同老版本采用不同的升级逻辑 

```java
public class DBHelper extends SQLiteOpenHelper {

    private static String TAG = "db";

    public DBHelper(@Nullable Context context) {
        super(context, DB_Contants.db_name, null, DB_Contants.db_version);
    }

    //初次安装应用时的逻辑
    @Override
    public void onCreate(SQLiteDatabase db) {
        Log.d(TAG, "onCeate执行");
        //创建数据库后创建表
        String sql = "create table test_table(_id varchar, name varchar, age integer)";
        db.execSQL(sql);
    }

    //更新应用时的逻辑
    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        Log.d(TAG, "onUpdate执行");
        String sql = "";
        switch (oldVersion){
            //版本1需要更新两个字段
            case 1:
                sql = "alter table test_table add phone varchar";
                String sql1 = "alter table test_table add address varchar";
                db.execSQL(sql);
                db.execSQL(sql1);
                break;
                //版本2需要更新一个字段
            case 2:
                sql = "alter table test_table add address varchar";
                db.execSQL(sql);
                break;
                //版本3无需更新字段
            case 3:break;
        }
    }
}
```

2. 创建一个 Dao 类, 其中使用 上一步中定义的类实例作为 字段, 在构造方法中初始化该字段 , 在接口方法中使用该字段获取操作数据库的 db 对象

   ```java
   public class TestDao {
       private static String TAG = "TEST_DAO";
   
       public DBHelper dbHelper;
   
       public TestDao(Context context){
           dbHelper = new DBHelper(context);
       }
   
       //crud接口
       public void insert(){
           SQLiteDatabase db = dbHelper.getWritableDatabase();
           db.execSQL(""); //使用 execSQL 执行插入
           //或者直接使用api操作
           ContentValues values = new ContentValues();
           values.put("_id","safjk12");
           values.put("name","alice");
           db.insert("test_table", null,values);
           //api-end
           db.close();  //注意需要关闭
       }
       public void delete(){
           SQLiteDatabase db = dbHelper.getWritableDatabase();
           db.execSQL(""); //使用 execSQL 执行删除
           //或者直接使用api操作
           db.delete("test_table",null,null);
           //api-end
           db.close();
       }
       public void update(){
           SQLiteDatabase db = dbHelper.getWritableDatabase();
           db.execSQL(""); //使用 execSQL 执行更新
           //或者直接使用api操作
           ContentValues values = new ContentValues();
           values.put("name","blice");
           db.update("test_table",values,null,null );
           //api-end
           db.close();
       }
       public void select(){
           SQLiteDatabase db = dbHelper.getWritableDatabase();
           Cursor cursor = db.rawQuery("", new String[]{});//使用 rawQuery 执行查询, 返回游标
           //或者直接通过api获取游标
           Cursor cursor1 = db.query("test_table",null,null,null,null,null,null);
           //通过遍历游标获取数据
           //游标每次指向一条数据
           while(cursor.moveToNext()){
               int index = cursor.getColumnIndex("name"); //获取name列的下标
               String name_value = cursor.getString(index);//使用下标获取该列上的数据
               Log.d(TAG, name_value);
           }
           cursor.close(); //注意需要关闭
           db.close();
       }
       
      //事务
      //开启了事务的操作是先将执行结果保存到内存中,待到执行结束时一次性加到数据库中,所以对比未加事务的操作效率高
       public void tran(){
           SQLiteDatabase db = dbHelper.getWritableDatabase();
           db.beginTransaction();
           try{
               db.execSQL("");
               db.execSQL("");
               //执行成功时事务置为成功状态
               db.setTransactionSuccessful();
           }catch (Exception e){
               //未执行成功时则不会置为成功状态
           }finally {
               //结束事务 ,检查事务状态做对应的提交或者回滚操作
               db.endTransaction();
               db.close();
           }
       }
   }
   ```

3. 直接调用 Dao 实例中的 方法进行数据库操作

   ```java
   TestDao td = new TestDao();
   td.select();
   ```

   



#### utils

###### 提示

> Toast.makeText( this, "xxx", Toast.LENGTH_SHORT).show()

###### 打印日志

> Log.d( "Tag", "contain" )

###### 判断字符串是否为空

> TextUtils.isEmpty( "xxx" )

###### 格式化存储大小

> 自动转换成合适的单位
>
> android.text.format.Formatter.formatFileSize( this, 文件的byte大小 )





#### 测试

> 在项目的 java 文件夹中和代码包同级有一个 test 包, 在此处写测试代码

1. 创建类继承 AndroidTestCase, 在其中写测试方法

   ```java
   public class TestCase extends AndroidTestCase{
       public void testAAA(){
           //获取测试类提供的伪上下文
           getContext();
       }
   }
   ```

   1. 右键方法名使用 Run 进行测试





#### Activity

> 一个Activity对应一个页面
>
> 所有的Activity都需要注册
>
> 显式注册: 直接在清单文件中添加

##### 显示意图跳转

> 直接在创建 Intent 对象时就指定要跳转到的确定页面
>
> 一般用于应用内的页面跳转, 因为应用内的页面都是自己开发的, 知道它的包名和类名

1. 新建activy 继承自 Activity 并实现 onCreate 方法, 在其中设置对应的页面

2. 新建对应页面的xml

3. 在原页面中使用创建 Intent 设置起始页面和目标页面, 并传递参数,  然后直接使用 startActivity方法 传入Intent对象 跳转页面

   ```java
   private void handleClick_to(View view) {
           Intent intent = new Intent(this, SecondActivity.class);
           intent.putExtra("name","alice");
           intent.putExtra("pass","123") ;
           startActivity(intent);
   }
   ```

4. 在新页面中直接使用 getIntent 方法获取到 Intent 对象

   ```java
   @Override
       protected void onCreate(@Nullable Bundle savedInstanceState) {
           super.onCreate(savedInstanceState);
           setContentView(R.layout.activity_second);
   
           Intent intent = getIntent();
           String name = intent.getStringExtra("name");
           Log.d(TAG, name);
       }
   ```

##### 隐式意图跳转

> 先在清单文件中设置跳转的目标页面的 action 和 catalog 属性, 然后创建 Intent 对象, 通过 setAction 和 addCatalog 方法来设置要跳转的页面的 action 和 catalog , 没有指明要跳转到哪个页面, 因此所有符合条件的页面都会被唤起
>
> 一般用于跳转到第三方应用页面 , 因为不知道第三方应用页面的类名和包名

1. 新建 activity 以及在清单文件中注册, 并在清单文件中添加 action 信息和 catalog 信息

   ```xml
   <activity android:name=".SecondActivity">
               <action android:name="com.alice.test.second" />
               <category android:name="android.intent.category.DEFAULT" />
   </activity>
   ```

2. 在起始页面中新建 Intent 对象 , 通过 setAction 和 addCatalog 方法设置目标页面的 action 和 catalog , 仍然直接调用 startActivity 方法来跳转页面

   ```java
   private void handleClick_to(View view) {
           Intent intent = new Intent();
           intent.setAction("com.alice.test.second");  //设置action
           intent.addCategory(Intent.CATEGORY_DEFAULT); //设置catalog
           intent.putExtra("name","alice");
           intent.putExtra("pass","123") ;
           startActivity(intent);
       }
   ```

##### 带返回结果的跳转

1. 先使用 startActivityForResult 替代 startActivity , 第一个参数是 intent 对象, 第二个参数是请求码, 用于标识向哪个页面跳转

   ```java
   private void handleClick_result(View view) {
           Intent intent = new Intent(this, ForResultActivity.class);
           startActivityForResult(intent, 1);
       }
   ```

2. 在起始页面中重写 onActivityResult 方法, 当在目标页面中执行 setResult 方法时, 该方法会被调用. 在该方法中分别对请求码( 哪个页面 )和结果码( 哪个结果 )进行判断, 执行相应的逻辑

   ```java
   @Override
       protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
           super.onActivityResult(requestCode, resultCode, data);
           if(requestCode==1){
               if(resultCode==1){
                   Toast.makeText(this, "for result : suc", Toast.LENGTH_SHORT).show();
                   result_value_textView.setText(data.getStringExtra("res"));
               }
               if(resultCode==2){
                   Toast.makeText(this, "for result : fail", Toast.LENGTH_SHORT).show();
                   result_value_textView.setText(data.getStringExtra("res"));
               }
           }
       }
   ```

3. 在目标页面中调用 setResult 方法返回结果, 第一个参数为结果码, 第二个参数可选, 为返回的数据, 注意调用 setResult 后应当 finish 目标页面以显示起始页面

   ```java
   return_suc.setOnClickListener(new View.OnClickListener() {
               @Override
               public void onClick(View view) {
                   Intent intent = new Intent();
                   intent.putExtra("res","成功");
                   setResult(1,intent);  //返回结果
                   finish();    //结束页面
               }
           });
   ```

   





##### 使用 Intent 传递对象数据

   > 被传递的对象需要实现 Parcelable 接口, 即可序列化为字符串
   >
   > 实际上就是将对象的属性按照顺序存储为一个字符串进行传递, 然后取数据的时候再按照相同的顺序解析出对象属性

##### 使用 Intent 传递Data数据

> 使用 setData 方法设置 清单文件中页面的 data标签 设置的所需格式的数据 , 一般用于唤起第三方页面时传递的数据
>
> 如果 在清单文件中的 Activity 中设置了data 标签,  < data  android:scheme="xxx" /> 那么 setData 中设置的数据就需要按照给定的格式传递数据,  格式就是 xxx:xxxx ( 冒号前面是scheme约束 ), 然后在目标页面中使用 intent.getData() 方法来获取 data 数据 , 获取到的数据将会包含 scheme部分

例: 使用 Intent 唤起打电话页面

1. 先查看Android源码中打电话应用的 清单文件, 找到目标页面的 action 和 catalog

2. 设置 Intent 对象的 action 和 catalog , 然后设置页面所需的 Data 即要拨打的电话号码

   ```java
    private void handleClick_to(View view) {
           Intent intent = new Intent();
           intent.setAction("android.intent.action.CALL");
           intent.addCategory(Intent.CATEGORY_DEFAULT);
           Uri uri = Uri.parse("tel:10086");
           intent.setData(uri);
           startActivity(intent);
       }
   ```

3. 在清单文件中添加拨打电话的权限声明

   ```xml
   <uses-permission android:name="android.permission.CALL_PHONE"/>
   ```

4. startActivity 跳转页面

##### 生命周期

> 横竖屏切换时 Activity会先销毁然后重新创建, 因为重新创建 Activity会重新执行一遍生命周期, 所以会造成如 视频进度信息重置 , 游戏状态重置的问题
>
> 可以在 清单文件的 activity 标签上设置 保持竖屏/保持横屏 ( 适合游戏 )
>
> ```xml
> <activity 
>           android:name=".MainActivity"
>           android:screenOrientation="landscape"/>
> <!--设置保持横屏-->
> ```
>
> 或者 在清单文件的 activity 标签上设置不重新执行声明周期的事件 ( 适合视频 )
>
> ```xml
> <activity 
>           android:name=".MainActivity"
>           android:configChanges="keyboardHidden|screenSize|orientation"/>
> <!--设置当键盘隐藏/屏幕大小变化/屏幕方向变化时, 不重新创建 activity-->
> ```
>
> 

###### onCreate

> 页面创建时调用

###### onDestroy

> 页面被销毁时调用 , 通常用于自动保存草稿

###### onStart

> 页面可见 但未获取到焦点时执行

###### onResume

> 页面可见 且获取到焦点时执行

###### onPause

> 页面失去焦点时执行

###### onStop

> 页面不可见时执行



##### 启动模式

> 在清单文件中的 activity标签上可以设置启动模式
>
> ```xml
> <activity 
>           android:name=".MainActivity"
>           android:launchMode="启动模式名称"/> <!--设置启动模式-->
> ```

###### standard

> 默认的标准启动模式, 使用常规任务栈

###### singleTop

> 如果当前 activity 已经是栈顶页面, 那么不会创建
>
> 反之则正常创建
>
> 该模式可以实现一个页面不会被连续多次打开, 通常用于 浏览器的书签页面

###### singleTask

> 如果该页面在任务栈中不存在, 则创建该页面置于栈顶
>
> 如果该页面在任务栈中存在 , 则将该页面以上的其他页面全部出栈
>
> 适用于页面占资源较大的场景, 可以确保该页面在栈中只有一份

###### singleInstance

> 单独存放到一个任务栈中, 且该页面在任务栈中只能存在一份, 不会再创建, 只会将其所在的任务栈提前
>
> 总是先将当前界面显示的页面所在的任务栈中的页面全部弹出后, 才依次执行其他任务栈
>
> 适用于 系统的 launcher , 或者词典软件的取词页面 , 在整个系统中只存在一个实例



#### 广播

##### 广播接收者

###### 动态注册

例: 收听系统的电量变化广播和usb连接状态广播

1. 创建一个广播接受者类继承 BroadcastReceiver 并实现 onReceive 方法, 当接收到广播时会执行该方法

   ```java
   public class BatteryBroadcastReceiver extends BroadcastReceiver {
       private static final String TAG = "BatteryBroadcastReceive";
   
       @Override
       public void onReceive(Context context, Intent intent) {
           String action = intent.getAction();
           //判断是什么广播
           if(action.equals(Intent.ACTION_BATTERY_CHANGED)){
               Log.d(TAG, "接收到:"+action);
               Log.d(TAG,"当前电量: "+ intent.getIntExtra(BatteryManager.EXTRA_LEVEL,0));
           }
           if(action.equals(Intent.ACTION_POWER_CONNECTED)){
               Log.d(TAG,"usb已连接");
           }
           if(action.equals(Intent.ACTION_POWER_DISCONNECTED)){
               Log.d(TAG,"usb已断开");
           }
       }
   }
   ```

2. 在activity 的 onCreate 方法中创建一个广播接受者实例, 然后创建一个 IntentFilter, 通过调用 registerReceiver方法并传入 广播接收者实例 和 IntentFilter 对象添加对 系统电量变化广播的收听

   ```java
    //同时收听多个系统广播
           IntentFilter intentFilter = new IntentFilter();
           intentFilter.addAction(Intent.ACTION_BATTERY_CHANGED);
           intentFilter.addAction(Intent.ACTION_POWER_CONNECTED);
           intentFilter.addAction(Intent.ACTION_POWER_DISCONNECTED);
           BatteryBroadcastReceiver batteryBroadcastReceiver = new BatteryBroadcastReceiver();
           this.registerReceiver(batteryBroadcastReceiver, intentFilter);
   ```

3. 同时应当在 activity 的 onDestroy 方法中取消广播的注册, 为防内存泄漏

   ```java
   @Override
       protected void onDestroy() {
           super.onDestroy();
           if(batteryBroadcastReceiver!=null){
               this.unregisterReceiver(batteryBroadcastReceiver);
           }
       }
   ```

4. 在清单文件中添加收听电量广播的权限声明

   ```java
   <uses-permission-sdk-23 android:name="android.permission.BATTERY_STATS"/>
   ```

5. 当系统电量发生变化或者usb连接状态发生变化时, 会向所有收听了该广播的接收者发送广播, 进而执行 回调方法

###### 静态注册

> 静态注册的广播接收者不需要开启应用就可生效

例: 收听系统开机广播

1. 创建一个广播接受者类继承 BroadcastReceiver 并实现 onReceive 方法, 当接收到广播时会执行该方法

   ```java
   public class BootReceiver extends BroadcastReceiver {
       @Override
       public void onReceive(Context context, Intent intent) {
           Toast.makeText(context, "开机完成了...", Toast.LENGTH_SHORT).show();
       }
   }
   ```

2. 在清单文件中注册广播接收者, 通过设置 action 来指定要收听的广播

   ```xml
   <!--添加权限-->
   <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED"/>
   ```

   ```xml
   <receiver android:name=".BroadcastReceiver.BootReceiver">
               <intent-filter>
                   <action android:name="android.intent.action.BOOT_COMPLETED"></action>
               </intent-filter>
   </receiver>
   ```

3. 无需启动应用该广播接收者即可生效

例: 收听应用安装和卸载的广播

> 可以通过此方式收集用户信息

1. 创建一个广播接受者类继承 BroadcastReceiver 并实现 onReceive 方法, 当接收到广播时会执行该方法

   ```java
   public class PackageReceiver extends BroadcastReceiver {
       private static final String TAG = "PackageReceiver";
   
       @Override
       public void onReceive(Context context, Intent intent) {
           String action = intent.getAction();
           if(action.equals(Intent.ACTION_PACKAGE_ADDED)){
               Log.d(TAG, "安装了: "+intent.getData());
           }
           if(action.equals(Intent.ACTION_PACKAGE_REMOVED)){
               Log.d(TAG, "卸载了: "+intent.getData());
           }
       }
   }
   ```

2. 在清单文件中注册广播接收者, 通过设置 action 来指定要收听的广播 , 这里需要设置 data 的 scheme

   ```xml
   <receiver android:name=".BroadcastReceiver.PackageReceiver">
               <intent-filter>
                   <action android:name="android.intent.action.PACKAGE_ADDED"></action>
                   <action android:name="android.intent.action.PACKAGE_REMOVED"></action>
                   <data android:scheme="package"></data>
               </intent-filter>
   </receiver>
   ```

3. 当应用安装或卸载时会收到广播



##### 广播发送

###### 发送无序广播

> 自定义广播并发送

1. 在 activity 中调用 sendBroadcast, 通过传入设置了 action 和 数据 的 Intent 对象来发送广播

   ```java
   private void handleClick_send_myBroadcast(View view) {
           Intent intent = new Intent();
           intent.setAction("com.alice.myBroadcast");  //设置广播名字
           intent.putExtra("name","123");	//设置广播数据
           sendBroadcast(intent);
       }
   ```

2. 定义一个广播接收者并在清单文件中注册收听自己的广播

   ```java
   public class MyReceiver extends BroadcastReceiver {
       private static final String TAG = "MyReceiver";
   
       @Override
       public void onReceive(Context context, Intent intent) {
           String action = intent.getAction();
           String value = intent.getStringExtra("name");
           Log.d(TAG, "接收到了广播: "+action+ ", 数据是: "+ value);
       }
   }
   ```

   ```xml
   <receiver android:name=".BroadcastReceiver.MyReceiver">
               <intent-filter>
                   <action android:name="com.alice.myBroadcast"></action>
               </intent-filter>
   </receiver>
   ```

###### 发送有序广播

1. 在 activity 中调用 sendOrderedBroadcast并传入 intent 对象来发送有序广播

   ```java
    private void handleClick_send_order_Broadcast(View view) {
           Intent intent = new Intent();
           intent.setAction("com.alice.orderBroadcast");
           sendOrderedBroadcast(intent,null);
       }
   ```

2. 分别创建三个广播接收者收听发送的广播, 在清单文件中分别设置不同的优先级

   ```java
   public class HighBroadcastReceiver extends BroadcastReceiver {
       private static final String TAG = "HighReceiver";
   
       @Override
       public void onReceive(Context context, Intent intent) {
           String action = intent.getAction();
           Log.d(TAG, "high 收到了广播: "+ action);
       }
   }
   //三个基本一样
   ```

   ```xml
   <!--ordered-->
           <!--priority为 1000 ~ -1000-->
           <receiver android:name=".BroadcastReceiver.orderedBroadcast.HighBroadcastReceiver">
               <intent-filter android:priority="1000">
                   <action android:name="com.alice.orderBroadcast"></action>
               </intent-filter>
           </receiver>
           <receiver android:name=".BroadcastReceiver.orderedBroadcast.DefaultBroadcastReceiver">
               <intent-filter android:priority="0">
                   <action android:name="com.alice.orderBroadcast"></action>
               </intent-filter>
           </receiver>
           <receiver android:name=".BroadcastReceiver.orderedBroadcast.LowBroadcastReceiver">
               <intent-filter android:priority="-1000">
                   <action android:name="com.alice.orderBroadcast"></action>
               </intent-filter>
           </receiver>
   ```

3. 当发送广播后, 三个接收者会按优先级先后收到广播

4. 在广播的传播过程中, 可以在 广播接收者的 onReceive 中调用 abortBroadcast() 终止广播

###### 发送需要权限才能接收的广播

> 实际上是发送者定义一个权限, 然后接收者必须声明使用该权限才能接收到此广播

1. 在发送者的清单文件中定义一个权限

   ```xml
    <!--声明想要接收此广播需要使用的权限-->
   <permission android:name="com.example.myapplication.RECEIVE_BROADCAST"></permission>
   ```

2. 调用 sendBroadcast 方法时设置上权限

   ```java
   private void handleClick_send_permission_Broadcast(View view) {
           Intent intent = new Intent();
           intent.setAction("com.alice.usePermissionBroadcast");
       //这里注意要使用自己包中的Manifest对象
           sendOrderedBroadcast(intent,Manifest.permission.RECEIVE_BROADCAST,null,null, Activity.RESULT_OK,null,null);
       }
   ```

3. 在接收者的清单文件中需要声明使用上述权限才能接收广播

   ```xml
   <!--声明使用接收广播的权限-->
   <uses-permission android:name="com.example.myapplication.RECEIVE_BROADCAST"></uses-permission>
   ```

###### 接收有权限的发送者发送的广播

> 就是在接收者中设置权限, 只有符合条件且拥有权限的发送者发送的广播, 才会被该接收者接收到, 而不是随便谁都可以给这个接收者发送广播

1. 在接收者的清单文件中定义权限并设置使用该权限

   ```xml
     <!--声明想要发送广播需要使用的权限-->
       <permission android:name="com.example.myapplication.REQUIRE_SEND_PERMISSION"></permission>
   ```

   ```xml
   <receiver android:name=".BroadcastReceiver.RequirePermissionReceiver" android:permission="com.example.myapplication.REQUIRE_SEND_PERMISSION">
               <intent-filter>
                   <action android:name="com.alice.requirePermission2Send"></action>
               </intent-filter>
           </receiver>
   ```

2. 对应的发送者需要在清单文件中声明使用上述权限 , 才能成功向接收者发送广播

   ```xml
   <!--声明使用了发送广播需要的权限-->
       <uses-permission android:name="com.example.myapplication.REQUIRE_SEND_PERMISSION"></uses-permission>
   ```

   



#### 服务

> 服务就是没有界面的activity
>
> 下面两种启动服务的方式, 都可以使用隐式意图的方式来启动, 同时 , 在android5.0之后, 使用隐式意图启动服务时, 需要使用 intent.setPackage("包名") 同时指定服务所在的包名
>
> 如果服务想要被其他引用调用, 那么需要在清单文件的 service 标签中添加 export="true" 属性

##### 生命周期

> startService 方式下的生命周期是 onCreate ---> onstartCommand ---> onDestroy
>
> bindService 方式下的生命周期是 onCreate ---> onBind ---> onUnBind ---> onDestroy

###### onbind

###### onUnbind

###### onCreate

###### onStartCommand

###### onStart(已过时)

###### onDestroy



##### startService开启服务

> 当在 activity 中使用 startService 开启服务后且没有调用 stopService关闭服务时 , 即使activity被销毁, 服务也会一直运行在后台

1. 创建服务类继承 Service 类, 并实现 onBind 方法

   ```java
   public class MyService extends Service {
       private static final String TAG = "MyService";
       @Nullable
       @Override
       public IBinder onBind(Intent intent) {
           return null;
       }
   
       @Override
       public void onCreate() {
           super.onCreate();
           Log.d(TAG, "onCreat...");
       }
   
       @Override
       public int onStartCommand(Intent intent, int flags, int startId) {
           Log.d(TAG, "onStartCommand...");
           return super.onStartCommand(intent, flags, startId);
       }
   
       @Override
       public void onDestroy() {
           super.onDestroy();
           Log.d(TAG, "onDestroy...");
       }
   }
   ```

2. 在清单文件中注册 Service 

   ```xml
   <service android:name=".Service.MyService"></service>
   ```

3. 在 activity 中使用 startService 方法, 通过传入 Intent 对象来开启服务

   ```java
   private void handleClick_start_service(View view) {
           Intent intent = new Intent();
           intent.setClass(this, MyService.class);
           startService(intent);  //开启服务
       }
   ```

4. 在 activity 中使用 stopService 方法,  通过传入 Intent 对象来关闭服务

   ```java
   private void handleClick_stop_service(View view) {
           Intent intent = new Intent();
           intent.setClass(this, MyService.class);
           stopService(intent);  //停止服务
       }
   ```

   

##### bindService开启服务

> 在 activity 中调用 bindService 绑定并开启服务, 开启的服务与该 activity 绑定在一起
>
> 当 activity 被销毁时, 绑定的服务也应当被销毁, 否则会报错

1. 创建服务继承 Service 类, 并实现 onBind 方法, onBind 方法要求返回一个 IBinder 类型的变量 , 可通过获取到该变量来调用服务内部的方法 . 

   IBinder 是一个接口 , 所以需要创建一个类实现该接口 并给其添加调服务内部方法的方法 , 以便通过该类的实例来调用服务内部的方法. 

   通常创建一个类继承 Binder 类, Binder 类已实现 IBinder 接口, 所以只需继承后添加调用内部方法的方法即可.

   为了方便开发 , 应当将调用内部方法的功能抽象为接口 , 自定义的MyBinder则实现该接口

   ```java
   public interface ICommunicate {
       void callInnerMethod();
   }
   ```

   ```java
   public class MyService extends Service {
       private static final String TAG = "MyService";
       public class MyBinder extends Binder implements ICommunicate {
           @Override
           public void callInnerMethod(){
               innerMethod();
           }
       }
       @Nullable
       @Override
       public IBinder onBind(Intent intent) {
           return new MyBinder();
       }
       @Override
       public void onCreate() {
           super.onCreate();
           Log.d(TAG, "onCreate...");
       }
       @Override
       public int onStartCommand(Intent intent, int flags, int startId) {
           Log.d(TAG, "onStartCommand...");
           return super.onStartCommand(intent, flags, startId);
       }
       @Override
       public void onDestroy() {
           super.onDestroy();
           Log.d(TAG, "onDestroy...");
       }
       //服务内部的方法
       private void innerMethod(){
           Toast.makeText(this, "服务的内部方法",Toast.LENGTH_SHORT).show();
       }
   }
   ```

2. 在清单文件中注册服务

3. 在activity 中调用 bindService 绑定服务, 该方法需要传入 一个 serviceConnection 类型对象作为参数 , 该对象需要实现 onServiceConnect 方法 和 onServiceDisconnect 方法 

   当服务和activity绑定成功时, 会执行服务内的 onBind 方法, 返回IBinder 类型的对象给 onServiceConnect 方法, 此时应当在 该方法中将 IBinder 对象保存起来 , 以便使用该对象调用服务内部的方法

   ```java
   //activity类中...
   //作为本地变量的binder, 用来调用服务内部的方法
       private ICommunicate myBinder;
       //服务连接对象, 在绑定完成时将binder对象保存下来以便今后使用, 在解绑完成时将binder对象置为空
       private ServiceConnection serviceConnection = new ServiceConnection() {
           @Override
           public void onServiceConnected(ComponentName componentName, IBinder iBinder) {
               myBinder = (ICommunicate) iBinder; //保存binder对象为本地变量
           }
           @Override
           public void onServiceDisconnected(ComponentName componentName) {
               myBinder = null; //将binder本地变量置为空
           }
       };
       //执行activity与服务的绑定操作
       public void bindService(View view){
           boolean ifBinded = bindService(new Intent(this, MyService.class), serviceConnection, BIND_AUTO_CREATE);
           if(ifBinded){
               Toast.makeText(this, "绑定服务成功",Toast.LENGTH_SHORT).show();
           }else{
               Toast.makeText(this, "绑定服务失败",Toast.LENGTH_SHORT).show();
           }
       }
   ```

4. 可以通过调用 unbindService 方法, 并传入 serviceConnection 对象来结束 activity 与 服务的绑定

   可以通过调用上一步保存下来的 binder 对象中的方法来调用服务内部的方法

   ```java
   //在activity类中... 
   //执行activity与服务的解绑操作
       public void unbindService(View view){
           unbindService(serviceConnection);
           myBinder = null; //将binder本地变量置为空
           Toast.makeText(this, "解绑服务成功",Toast.LENGTH_SHORT).show();
       }
       //当activity与服务绑定成功之后, 通过保存下来的binder对象调用服务内部的方法
       public void callInnerMethod(View view){
           if(myBinder!=null){
               myBinder.callInnerMethod();
           }else{
               Toast.makeText(this, "还没有绑定服务...",Toast.LENGTH_SHORT).show();
           }
       }
   ```


##### 混合开启服务

> 混合开启服务其实就是使用 startService 的方法开启一个可独立运行的服务, 然后绑定该服务使得可以调用服务的内部方法, 当不需要使用该服务时, 先解绑然后停止

> 混合启动的方式就同时具有 独立于activity运行 且 能够调用服务内部方法 的优点

> 使用 startService 开启服务后又通过 bindService 绑定的服务, 如果想要停止该服务, 需要先 unBindService 然后才能 stopService

1. 先使用 startService 开启服务
2. 然后使用 bindService 绑定服务
3. 然后调用服务内部的方法
4. 然后使用 unbindService 解绑服务
5. 然后使用 stopService 停止服务



#### 内容提供者

> android系统中一个应用就相当于一个独占一个分组的系统用户 , 每个应用创建的数据库只能供自己读写

> 内容提供者就是将应用的数据读写权限开放, 使得其他应用可以访问到本应用的数据
>
> 一般开发系统应用时会提供内容提供者 , 如日历应用, 联系人应用, 可供其他应用读取本应用的数据

> 内容提供者实际上就相当于开启了一个服务, 提供了接口, 然后使用 对应的 uri 对接口进行访问

###### 创建内容提供者

1. 首先准备数据库和操作数据表的 dbHelper

2. 创建内容提供者继承 ContentProvider 并实现方法, 其中创建一个 UriMatcher 类型的字段作为请求 Uri检校的工具, 并在 static 代码块中对 UriMatcher 添加检校规则

3. 在 内容提供者的 crud 方法实现中, 应当先使用 UriMatcher 对传递过来的参数 uri 进行检校 , 通过检校则可进行 crud, 否则不予执行

   ```java
   public class UserProvider extends ContentProvider {
   	//数据表操作对象
       private UserDao userDao;
       //参数码为匹配成功时的返回码
       private static UriMatcher uriMatcher = new UriMatcher(1);
       static {
           //uriMatcher中添加的检校规则应当包含authority(域名)和path(地址)
           uriMatcher.addURI("com.example.myapplication","user",1);
       }
       @Override
       public boolean onCreate() {
           //创建是初始化数据表操作对象
           userDao = new UserDao(getContext());
           return false;
       }
       //查询接口
       @Nullable
       @Override
       public Cursor query(@NonNull Uri uri, @Nullable String[] projection, @Nullable String selection,@Nullable String[] selectionArgs, @Nullable String sortOrder) {
           int matchRes = uriMatcher.match(uri);
           if(matchRes == 1){
               //验证成功, 正常查询
               userDao.select();
           }else{
               //验证不通过
           }
           return null;
       }
   
       @Nullable
       @Override
       public String getType(@NonNull Uri uri) {
           return null;
       }
   
       @Nullable
       @Override
       public Uri insert(@NonNull Uri uri, @Nullable ContentValues contentValues) {
           return null;
       }
    
       @Override
       public int delete(@NonNull Uri uri, @Nullable String s, @Nullable String[] strings) {
           return 0;
       }
   
       @Override
       public int update(@NonNull Uri uri, @Nullable ContentValues contentValues, @Nullable String s, @Nullable String[] strings) {
           return 0;
       }
   }
   ```
   
4. 在清单文件中注册内容提供者 , 标签的 authorities 属性为调用内容提供者时提供的检校标识, 一般直接填包名, 可设置多个检校标识 , 还应当设置 exported 为 true , 即可供第三方应用访问

   ```java
   <provider
               android:exported="true"
               android:authorities="com.example.myapplication"
               android:name=".provider.UserProvider"></provider>
   ```

5. 再创建一个应用作为调用内容提供者的第三方应用 , 使用按钮点击作为测试

6. 在需要请求内容提供者接口的地方使用 getContentResolver 方法获取 contentResolver 对象, 然后创建 content 协议的uri 地址 , 将其作为 请求地址传入 contentProvider的方法进行调用

   ```java
   //应当提供对应的uri地址才能访问对应的内容提供者接口, 即 content://authority/path
   Uri.parse("content://com.example.myapplication/user")
   ```


###### 为内容提供者添加观察者

1. 在以上拥有内容提供者的情况下

2. 在内容提供者的 crud 接口方法中添加通知观察者的逻辑

   ```java
   @Nullable
       @Override
       public Uri insert(@NonNull Uri uri, @Nullable ContentValues ntValues) {
           Log.d(TAG, "insert...");
           //通知观察者我的数据改变了
           getContext().getContentResolver().notifyChange(Uri.parse("content://com.exmaple.myapplication/user"),null);
           return null;
       }
   ```

3. 在需要对内容提供者的通知进行监听的地方添加监听逻辑, 这里是在 activity 的onCreate 中对其监听

   ```java
   //添加对内容提供者的观察
   //第二个参数为是否严格匹配通知的uri
           getContentResolver().registerContentObserver(Uri.parse("content://com.exmaple.myapplication"),
                   false, new ContentObserver(new Handler()) {
                       @Override
                       public void onChange(boolean selfChange) {
                           super.onChange(selfChange);
                           Log.d(TAG, "我知道内容提供者那边的数据变化了...");
                       }
                   });
   ```

   



#### 网络编程

> 安卓中本机地址是 10.0.2.2

> 抓包可以使用 fiddler 软件

###### 使用原生 javanet

1. 清单文件中添加网络权限

   ```xml
   <uses-permission android:name="android.permission.INTERNET"/>
   ```

2. 使用 javanet 提供的方法

   ```java
   //访问网络的逻辑不能在主线程中使用, 这里直接新建子线程运行的方式也不可取
   new Thread(new Runnable(){
       @Override
       public void run(){
           try{
                URL url = new URL("http://10.0.2.2:8080/接口");
   		    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
   		    connection.setConnectTimeout(10000);
   		    connection.setRequestMethod("GET");
   		    connection.connect();
   		    int responseCode = connection.getResponseCode();
   			if(responseCode == 200){
       			Map<String, List<String>> headers = connection.getHeaderFields();
       			Set<Map.Entry<String, List<String>>> entries = headers.entrySet();
       			for(Map.Entry<String, List<String>> entry: entries){
           			Log.d(TAG, entry.getKey() + " == " + entry.getValue());
       			}
                   Object content = connection.getContent();
                   Log.d(TAG, "content --> " + content);
                   InputStream is = connection.getInputStream();
                   BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(is));
                   String line = bufferedReader.readLine();
                   Log.d(TAG, line);
   			}
           }catch(Exception e){}
       }
   }).start();
   ```

3. 如果是api27版本及以后, 需要配置网络设置

   > 在 api27 以后不允许直接访问 http 协议的地址, 此类地址被认为是不安全的, 所以需要在清单文件中配置网络设置

   

   ```xml
   //可以直接在 application 标签中添加此属性, 但是此方式不被推荐, 建议单独新建网络配置文件, 然后使用该配置文件
   android:cleartextTrafficPermitted="true"
   ```

###### 处理 json 数据

1. 给项目添加 Gson 包
   1. 在安卓项目视图中右键项目 -> open module settings -> Dependencies -> + -> Library Dependency  -> 搜索gson -> 选择 com.google.code.gson -> apply -> ok
   2. 待下载完毕
   
2. 菜单栏 -> Build -> ReBuild 

3. 在  gradle 的 build.gradle 文件中查看 dependency 中是否已经添加了 gson 依赖

4. 使用 gson 解析 json 

   ```java
   Gson gson = new Gson();
   //此处的json数据为上一步中获取到的json数据
   //json映射的实体类应当事先创建, 可以使用 as 的 jsonformatter 插件直接创建
   实体类 Objs = gson.fromJson(line, 实体类.class);
   ```

   











#### 其他

> 在 activity 中 `this.finish()` 为关闭当前页面

###### 在activity中动态获取权限

> 就是弹出授权确认框

```java
//检查权限, 这里是检查是否有读取日历的权限
int readPermission = checkSelfPermission(Manifest.permission.READ_CALENDAR);
if(readPermission == PackageManager.PERMISSION_GRANTED){
    //有权限
}else{
    //无权限, 提示用户手动授权, 第二个参数是请求码, 当用户操作了授权之后会调用 onRequestPermission 方法
    requestPermission(new String[]{Manifest.permission.READ_CALENDAR},1)
}

@Override
public void onRequestPermissionResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResult){
    if(requestCode == 1){
        if(grantResult.length == 1 && grantResult[0] == PackageManager.PERMISSION_GRANTED){
            //授权权限成功
        }else{
            //用户未授权
        }
    }
}
```



###### 倒计时类

```java
private CountDownTimer  mCountDownTimer = new CountDownTimer(60*1000, 1000){
    @Override
    public void onTick(long millsUntilFinished){
        
    }
    @Overried
    public void onFinish(){
        
    }
} 

//开始倒计时
mCountDownTimer.start();
```



###### 更新UI

> 更新UI的操作应当在主线程中执行
>
> 但是如果更新 UI 的操作比较耗时 , 那么在主线程中执行会使得卡顿 , 此时可以在 UI 线程中执行
>
> ```java
> runOnUiThread(new Runnable(){
>     @Override
>     public void run(){
>     }
> });
> ```