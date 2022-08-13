const http = require("code/day23/http");

// 要挂载到端口的程序
const serObj = http.createServer((req, res)=>{
    // 有人来了
    // console.log("有人访问了服务器");
    // 谁呀不知道，但是可以查询来源：前端到后端的信息
        // 回调函数的第一个参数：请求对象：前端到后端的信息
        // 回调函数的第二个参数：响应对象：后端到前端的信息

    // 前端到后端携带的来源url
    // console.log(req.url);

    let u = req.url;
    // 路由处理
    if(u === "/"){
        // 服务器功能 - 默认
        index(req, res);
    }else if(u === "/login"){
        // 服务器功能 - 登录
        login(req, res);
    }else if(u === "/register"){
        // 服务器功能 - 注册
        register(req, res);
    }else if(u === "/getUser"){
        // 服务器功能 - 获取用户信息
        getUser(req, res);
    }
    // 拜拜
    res.end();
})
// 挂载到端口
serObj.listen(3000, ()=>{
    console.log("服务器开启成功")
});

// 具体的服务器功能
function login(req, res){
    // 实现登录功能
    console.log("前端想要执行咱的登录功能，同时前端需要把账号和密码携带过来")
    // ...
    res.write("success, login");
    res.end();
}
function register(req, res){
    // 实现注册功能
    console.log("前端想要执行咱的注册功能，同时前端需要把账号和密码携带过来")
    // ...
    res.write("success, register");
    res.end();
}
function getUser(req, res){
    // 实现获取用户信息功能
    console.log("前端想要获取咱的用户，同时前端需要把登录状态和用户id携带过来")
    // ...
    res.write("success, data is this");
    res.end();
}
function index(req, res){
    // 实现默认功能
    console.log("默认功能")
    // ...
    res.write("success, default");
    res.end();
}

// 本地服务器的通用访问方式：
//     域名为：localhost
//     IP地址：127.0.0.1

// 每次服务器代码修改后，服务器都需要重启

// 服务器程序，类比成一家放贷公司
// 该公司人员，踏实的坐在公司里，等人上门，借钱或者讨债或者慈善

// 某一天，有人来了，来干什么，识别目的，查看他的信息，针对不同的目的或信息，做出不同的处理
    // 借钱，给他
    // 讨债，轰出去
    // 慈善，谈一谈

