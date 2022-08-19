# 一、复习

# 二、node的内置模块 - url
1. url模块，网页的服务器地址，如：http://www.baidu.com
    - 用来解析网页的服务器地址的每一部分
    - 默认情况下，服务程序获取到的url都是字符的形式，不方便解析
    - url模块可以将url字符解析成对象，以键值对的形式呈现url的每个部分
2. 将url字符转成对象
    - url.parse(urlStr)
3. 将url对象转成字符
    - url.format(urlObj)
4. 通过url模块解析url字符之后，得到的url对象的常见属性说明
    - 协议：protocol
    - 端口：port
    - 域名：hostname
    - 锚点：hash
    - get请求数据：query
    - 路径：pathname
    - 完整url：href

# 三、node的内置模块 - querystring
1. querystring，专门用来解析，前端向后端发送的请求数据
    - 格式："名字=值&名字=值&名=值"
2. 将qs字符转成对象
    - qs.parse(qsStr);
3. 将对象转成qs字符
    - qs.stringify(qsObj);

# 四、node的内置模块 - http
1. http：服务器模块，用来开启服务，挂载程序，发起请求，发起响应
2. 创建服务对象：http.createServer((参数1, 参数2)=>{})
3. 挂载到端口：服务对象.listen(端口, 挂载成功后执行的回调函数)
4. 服务对象的回调函数的参数1：表示请求对象，前端到后端携带的信息对象
    - 请求对象，简称：req
    - 请求地址：req.url
    - ...
5. 服务对象的回调函数的参数2：表示响应对象，后端到前端携带的信息对象
    - 响应对象，简称：res
    - 向前端响应文本：res.write(向前端响应的字符数据)
    - 通知前端结束本次响应：res.end()
    - ...

# 五、使用node搭建简易web服务器 - 作业
0. 区分静态和非静态请求
    1. 静态资源的响应
        - 利用了fs模块，读取文件
        - 注意：静态资源路径中不要出现中文路径
    2. 非静态资源的响应
        - 前端发送数据 - 利用表单，get或post
            - username：admin
            - password：123123
        - 后端接收数据，
            - 接收到前端数据：get或post方式接收数据的方法
            - 统一处理get和post数据
