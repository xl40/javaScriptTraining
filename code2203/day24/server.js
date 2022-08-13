// 搭建一个简易的web服务器
//    能响应静态资源
//    能处理get和post数据

// 引入所需模块
const http = require("http")
const fs = require("fs")
const url = require("url")
const qs = require("querystring")

// 设计路由
// 路径中有/api，认为非静态资源请求，数据请求
// 路径中没有/api，静态资源请求，文件请求

// 创建服务对象，并挂载到指定端口
http.createServer((req, res)=>{
    // 路由判断
    if(req.url.includes("/api")){
        // 非静态资源的路由处理
        dataRes(req, res);
    }else{
        // 静态资源的路由处理
        fileRes(req, res);
    }
}).listen(3000, ()=>{
    console.log("服务器开启成功，地址为：http://localhost:3000")
})

// 非静态资源的路由处理
function dataRes(req, res){
    // 区分get或post
    if(req.method === "GET"){
        // 接收并解析出get数据后，进行数据的下一步处理
        dataHandle(req, res, url.parse(req.url, true).query);
    }else if(req.method === "POST"){
        let str = ""
        req.on("data",(chunk)=>{
            str += chunk;
        })
        req.on("end",()=>{
            // 接收并解析出post数据后，进行数据的下一步处理
            dataHandle(req, res, qs.parse(str));
        })
    }
}
// get或post数据的下一步处理，准备要实现具体的功能了
function dataHandle(req, res, data){
    // 因为和前端进行了一些约定，约定在数据中使用type标记不同的功能
    // 所以接收到数据后，判断数据中type的值
    // 根据data的type的不同的值，进行不同的功能处理
    // 此处的处理概念，为二级路由处理
    switch(data.type){
        case "login":login(req, res, data);break;
        case "register":register(req, res, data);break;
        case "getData":getData(req, res, data);break;
        case "getBanner":getBanner(req, res, data);break;
        // ...参照login的判断和处理，继续添加自己的不同的各种功能处理...
        default:
            error(req, res, data);
    }
}

// 具体的功能实现
function login(req, res, data){
    // 实现登录功能
    // 登录完成后，给前端响应登录状态
    const obj = {};
    // if(条件){
        // 成功
        obj.title = "login success";
        obj.code = 666;
        obj.data = null;
    // }else{
        // 失败
        // obj.title = "login error";
        // obj.code2203 = 444;
        // obj.data = null;
    // }
    res.write(JSON.stringify(obj));
    res.end();
}
function register(req, res, data){
    const obj = {};
    obj.title = "这是一个register功能";
    obj.code = 1234;
    obj.data = {};
    res.write(JSON.stringify(obj));
    res.end();
}
function getData(req, res, data){
    const obj = {};
    obj.title = "这是一个获取数据的功能";
    obj.code = 1234;
    obj.data = [{d:"a"},{d:"b"},{d:"c"},{d:"hello"}];
    res.write(JSON.stringify(obj));
    res.end();
}
function getBanner(req, res, data){
    const obj = {};
    obj.title = "这是一个获取轮播图数据的功能";
    obj.code = 1234;
    obj.data = [{
        src:"../1.jpg",
        title:"这是一个图片",
        alt:"图片"
    },{
        src:"../2.jpg",
        title:"这是一个图片222",
        alt:"图片222"
    }];
    res.write(JSON.stringify(obj));
    res.end();
}
function error(req, res, data){
    res.write(JSON.stringify({
        title: data.type,
        code: 4444444,
        data:null
    }));
    res.end();
}

// 静态资源的路由处理
function fileRes(req, res){
    // 处理根路径时的默认文件
    let p = url.parse(req.url).pathname;
    p = (p === "/" ? "/index.html" : p);
    // 读取文件
    fs.readFile("./static" + p, (err, data)=>{
        if(err){
            res.write("not found");
        }else{
            // 响应文件内容
            res.write(data);
        }
        res.end();
    })
}