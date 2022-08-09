# 一、复习
1. 设计模式
    - 一套经过封装的，多人使用的，代码设计经验的总结。
    - 代码通用，程序复用性强，耦合低，流程化编程
    - 常见的设计模式：单例，组合，观察者，适配器，代理，策略，抽象工厂，MVC模式
# 二、ES6新增的Promise
1. 回调地狱
    - 多层异步的回调函数的嵌套
    - 是获取异步数据的一种解决方式
    - 不方便调错
    - 浪费性能
    - 可以使用ES6提供的Promise语法，优化回调地狱
2. Promise基本语法
    - Promise是一个构造函数，需要被new执行
    - new Promise时，需要立即给Promise传递一个回调函数
        - 这个回调函数又接收了两个参数
            - 参数1：表示成功后要执行的功能
            - 参数2：表示失败后要执行的功能
            - 参数1和参数2的具体功能，可以在Promise的实例方法内定义
    - new之后，会得到一个Promise的实例
        - Promise的实例的then方法，又有两个回调函数的参数
            - 参数1：用来传输成功时要执行的功能
            - 参数2：用来传输失败时要执行的功能
        - Promise的实例的catch方法，用来传输失败时要执行的功能
    - Promise：承诺
    - 发起一个承诺：疫情结束后，好好聚聚
        - 等待期，等待结束的时间，正在执行中...，pending
        - 承诺成功，将来，fulfilled
        - 承诺失败，将来，rejected
        - 成功和失败，二选一
    ```js
    const p = new Promise((resolve, reject)=>{
        console.log("正在执行中...");
        // 使用延时器模拟异步
        setTimeout(()=>{
            // 执行成功的功能
            resolve("success");
        }, Math.random()*500);
        // 使用延时器模拟异步
        setTimeout(()=>{
            // 执行失败的功能
            reject("error");
        }, Math.random()*500);
    })
    p.then((res)=>{
        // 成功的功能定义
        console.log("成功了" + res)
    }, (code)=>{
        // 失败的功能定义
        console.log("失败了1" + code)
    })
    p.catch(()=>{
        // 失败的功能定义
        console.log("失败了2")
    })
    console.log(p);
    ```
3. Promise链式调用 - 解决回调地狱
    - Promise实例的then方法的返回值
        - 如果then方法的回调函数内，没有主动返回新的Promise实例，那么此时then方法的返回值是当前Promise实例
        - 否则，就是新的Promise实例
    - Promise实例的catch方法的返回值
        - 如果catch方法的回调函数内，没有主动返回新的Promise实例，那么此时catch方法的返回值是当前Promise实例
        - 否则，就是新的Promise实例
    - Promise构造函数自身的批处理方法：all，race
        - all的规则：所有都成功，才会执行then的成功；只要有一个失败，就会执行then的失败或catch的失败
        - race的规则：只拿第一个结束的请求，如果第一个结束的请求是成功，执行then的成功；第一个结束的请求是失败，执行then的失败或cathc的失败

# 三、自定义js工具库
- 见liyang.js

# 四、第三方js工具库 - jQuery
1. 官网：jquery.com
2. 看看介绍，大致提供了什么功能
3. 找找下载链接，下载jquery.js的文件
    - 官网下载
    - 第三方下载：静态资源库
4. 引入
5. 使用
    - 参考文档

# 五、jq的使用 - DOM操作
1. 选择器
2. 过滤器（类似于选择器，也是用来选择元素的，但是选择形式，和选择器不一样）

# 六、jq的使用 - 事件处理

# 七、jq的使用 - 动画

# 八、jq的使用 - 数据请求

# 作业
1. 复习本周知识点
2. 前后端交互项目
    - 查，增，改
    - 删
3. 购物车
    - 商品列表，存储购物车数据
