# 一、复习
1. 对象的本质：键值对
2. 对象的意义：存储数据，编程
3. 对象的创建：
    - 字面量
    - 构造函数
4. 对象的操作
    - 点语法：当对象的键是一个具体的值
    - 中括号语法：当对象的键不是一个具体的值，是一个变量时
5. 对象的分类
    - 宿主对象：寄生于某个平台的对象
        - window, document
    - 本地对象：内置的构造函数，及时对象又是函数，还可以被new执行
        - String，Number，Boolean，Date，...
    - 内置对象：官方提供的，可以直接使用的对象
        - Math
6. 关键字this
    - this一般存储在函数中，是一个指向，指向了：当前函数的执行对象
7. 内置对象Math
    - 属性
    - 方法
8. 范围随机数
    - Math.round( Math.random() * (max-min) + min )
9. 进制的转换
    - 其他转十进制：parseInt(str, n)
    - 十进制转其他：num.toString(n)

# 二、作业
2. 定义一个30项的数组，数组的每一项要求都是1~9之间的随机数，每间隔5个数字，求出这五个数的平均值
3. 通过循环制造一个5 x 5的二维数组，这个数组中的数据是1~9之间的随机数，试编程
4. 编写函数，功能为：生成4位(每位都是1~9之间随机)数字的随机验证码，并生成10次，同时将结果存入数组，返回出来

5. 创建一个对象，该对象存储一个学生的信息，该对象包含学号、身份证、年龄、性别、所学专业等属性信息，同时该对象包含一个自我介绍的方法，用来输出该对象的所有信息
    - 属性，类似于变量
    - 方法，类似于函数
    ```js
    var stu = {
        id:"001",
        name:"张三",
        age:18,
        sex:"男",
        job:"程序员",
        show:function(){
            console.log("你好，我是"+ stu.name +"，今年"+ stu.age +"岁，性别"+ stu.sex +"，工作是" + stu.job)
        }
    }
    stu.show();
    ```

6. 随机生成一个五位以内的数（0~99999），然后输出该数共有多少位，每位分别是什么
7. aabccd统计每个字符出现的次数，使用对象显示结果，如：{a:2, b:1, c:2, d:1}
8. 生成4位数字字母混合的验证码（数字，大写字母，小写字母）

9. 编写一个函数，获得一个十六进制的随机颜色的字符串，如#20CD4F
10. 编写一个函数，获得一个rgb的随机颜色的字符串，如rgb(123,216,45)

# 三、本地对象 - Date
1. Date是日期对象，可以获取当前系统日期，通过设置日期拿到指定的日期对象
    - 本地对象的使用：直接作为对象使用，作为函数执行，被new执行
2. 获取
    - 获取时间戳
    - 获取日期对象
        - 解析出日期对象的每个部分：年月日周时分秒毫秒
3. 设置
    - 创建日期对象时
        - new Date(...)
    - 创建日期对象后
        - var d = new Date()
        - d.setxxxx()
4. 计算两个日期之间的差值
    - 运用时间戳
    - 记得将毫秒数转换

# 四、BOM
1. BOM，浏览器对象模型，提供了浏览器的操作，浏览器对象是window
    - 提供了当前页面的url服务
    - 提供了当前窗口的历史记录的操作
    - 提供了浏览器信息的查询
    - 提供浏览器窗口与窗口之间的交互
    - 以及一些其他操作
    - window自身是一个对象，自身的某些属性又是一个对象，叫子对象
        - location
        - history
        - navigator
        - localStorage和sessionStorage
        - frames
        - screen
        - document
    - window是js的顶层对象，使用过程中，可以被省略
    - 没有明确隶属对象的函数被直接执行时，内部的this，指向window
    - BOM并没有严格的规范，采用了ECMAScript的规范，在此之上做出一些细微的调整
2. window身上的方法 - 全局函数都是window的方法
    - 弹出信息框：alert()
    - 弹出选择框：confirm()
        - 选择结果，以返回值的形式呈现
    - 弹出对话框：prompt()
        - 点确定之后，输入的信息，以返回值的形式呈现
        - 点取消之后，返回值为null
    - 打开一个新窗口：open(url, target, style)
        - `open("https://www.baidu.com","_blank","width=300,height=300,left=200,top=100");`
    - 关闭一个窗口：close()
        - 不同的浏览器支持度不同
            - 火狐：不允许关闭非脚本打开的页面
    - 交互的体现
4. window身上的事件
    - load：加载完成事件
        - 页面结构加载完成
        - 页面中引入的别的资源加载完成
        - 如：img标签自身属于页面结构，img引入的图片属于外部资源
    - scroll：滚动事件
        - 获取滚走了的距离
        - document.documentElement.scrollTop
        - document.documentElement.scrollLeft
    - resize：改变大小
        - 获取当前浏览器可视区域的尺寸
        - document.documentElement.clientWidth
        - document.documentElement.clientHeight
5. window身上的子对象
    - 地址栏对象：location
        - 提供了地址栏的操作
        - 属性：
            - 锚点连接：location.hash
                - 标志是#后的部分
            - 服务器地址：location.host
                - 包含端口
            - 域名：location.hostname
            - 完整地址：location.href
            - 协议和服务器地址：location.origin
            - 服务器路径：location.pathname
            - 服务器端口：location.port
            - 通信协议：location.protocol
            - 向服务器发送的查询数据：location.search
                - 标志是?后，#前的部分
        - 方法：
            - 重载当前页面：location.reload()
            - 跳转到指定地址：location.assign(url)
                - url表示要跳转到的地址，如果是空字符，表示刷新当前页面
    - 历史记录对象：history
        - 提供了历史记录的操作（当前窗口）
        - 属性：
            - 当前窗口产生了几个历史记录：history.length
        - 方法：
            - 前进一步：history.forward()
            - 后退一步：history.back()
            - 前进或后退指定步数：history.go(n)
                - 正：前进
                - 负：后退
                - 0：刷新
    - 浏览器信息对象：navigator
        - 提供了浏览器信息的查看
        - 属性
            - navigator.userAgent
                - 包含了浏览器名称，版本，运行系统，等信息
    - 显示器视口对象：screen
        - 可查看显示器的分辨率
    - 页面框架对象：frames
        - 配合iframe标签，控制每个iframe标签对应的子窗口
    - 页面对象：document
        - 提供了页面操作
    - 本地存储对象：localStorage和sessionStorage
        - 提供了可以操作本地存储的对象
6. 定时器
    - 计时器：每隔指定时间，执行一次指定功能
        - 开启：setInterval(回调函数, 毫秒数)
            - 功能：每隔指定毫秒数，执行一次指定回调函数
            - 返回值：当前计时器在内存中的唯一标志，用来被清除
        - 关闭：clearInterval( 要清除的计时器的唯一标志 )

    - 延时器：延迟指定时间，只执行一次指定功能
        - 开启：setTimeout(回调函数, 毫秒数)
            - 功能：延迟指定毫秒数，只执行一次指定回调函数
            - 返回值：当前延时器在内存中的唯一标志，用来被清除
        - 关闭：clearTimeout( 要清除的延时器的唯一标志 )


# 作业
1. 持续构建个人公共工具库：public.js
    - 放一些会被重复使用到的函数封装
2. 封装可以对日期进行格式化的函数
    - 格式，如：2022年04月22日 星期五 09:05:35
3. 封装可以计算任意两个日期之间差值的函数
    - 格式，如：n天x时y分z秒
4. 课堂上的所有案例

5. 以下案例，需要预习，之后也不一定能完成，暂时先不建议做，做好复习即可

6. 倒计时
7. 随机点名
8. 进度条
9. 模拟弹出框