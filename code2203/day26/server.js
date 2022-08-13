const http = require("http")
const fs = require("fs")
const url = require("url")
const qs = require("querystring")

http.createServer((req, res)=>{
    if(req.url.includes("/api")){
        dataRes(req, res);
    }else{
        fileRes(req, res);
    }
}).listen(3000, ()=>{
    console.log("服务器开启成功，地址为：http://localhost:3000")
})
function dataRes(req, res){
    if(req.method === "GET"){
        dataHandle(req, res, url.parse(req.url, true).query);
    }else if(req.method === "POST"){
        let str = ""
        req.on("data",(chunk)=>{
            str += chunk;
        })
        req.on("end",()=>{
            dataHandle(req, res, qs.parse(str));
        })
    }
}
function dataHandle(req, res, data){
    switch(data.type){
        case "login":login(req, res, data);break;
        case "register":register(req, res, data);break;
        case "getData":getData(req, res, data);break;
        case "getBanner":getBanner(req, res, data);break;
        case "jsonp1":jsonp1(req, res, data);break;
        case "jsonp2":jsonp2(req, res, data);break;
        case "jsonp3":jsonp3(req, res, data);break;
        default:
            error(req, res, data);
    }
}

function login(req, res, data){
    const obj = {};
    obj.title = "login success";
    obj.code = 666;
    obj.data = null;
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
function jsonp1(req, res, data){
    // 只是在测试原理
    res.write("const world6='你好6';console.log(world6);");
    res.end();
}
function jsonp2(req, res, data){
    // 获取数据库
    // 获取文件内容
    // 获取....
    // const d = "这是从其他位置获取到的17645284数据只在后端存在";
    // const d = 12312312;
    // const d = JSON.stringify({name:"admin"});
    const d = JSON.stringify([{},{},{}]);

    // 实现jsonp获取数据
    res.write(`
        // 执行函数
        fn('${d}');
    `);
    res.end();
}
function jsonp3(req, res, data){
    const d = JSON.stringify([{a:1},{a:2},{a:3}]);
    res.write(`
        ${data.callback}('${d}');
    `);
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
function fileRes(req, res){
    let p = url.parse(req.url).pathname;
    p = (p === "/" ? "/index.html" : p);
    fs.readFile("./static" + p, (err, data)=>{
        if(err){
            res.write("not found");
        }else{
            res.write(data);
        }
        res.end();
    })
}