const http = require("http");
const fs = require("fs");
const url = require("url");
const qs = require("querystring");

// 路由设定
// 区分请求的资源类型：静态？非静态？
// 约定：url中存在/aaa字样，非静态资源，反之静态资源

// 需求：
    // 静态资源的响应：能够根据前端请求的地址，响应html，css，图片，js
    // 非静态资源的响应：

const serObj = http.createServer((req, res)=>{
    // 路由处理
    if(req.url.includes("/aaa")){
        // 非静态资源
        dataRes(req,res);
    }else{
        // 静态资源
        staticRes(req, res);
    }
})
// 挂载到端口
serObj.listen(3000, ()=>{
    console.log("服务器开启成功")
});

// 数据资源（非静态资源）
function dataRes(req, res){
    if(req.method === "GET"){
        // 接收并解析前端发送过来的get数据
        const u = url.parse(req.url, true);
        // get数据处理
        dataHandle(req, res, u.query);
    }else if(req.method === "POST"){
        // 接收并解析前端发送过来的post数据
        // post数据并在url上拼接，需要通过请求对象的data事件和end事件获取
        // data事件：在后端接收到post数据时触发，因为post数据可发送的数据量较大，data每次只能接收数据的一部分，并不能一次性接收所有数据。就算某次发送的数据量较小，一次可以接收完，但是data也不会直接处理，而是等到确定没有数据过来了，触发了另一个end事件，才会对数据做最终解析处理
        let str = "";
        req.on("data", (d)=>{
            // 在data事件中，事件处理函数的参数，只是数据的一部分，并没有得到解析，哪怕data执行一次就拿到了所有数据，也不会解析
            // console.log(d);
            str += d;
        })
        req.on("end", ()=>{
            // data事件中获取到的数据，在end事件触发后，才会被解析
            const obj = qs.parse(str);
            // post数据处理
            dataHandle(req, res, obj);
        })
    }
}

// 数据接收并解析之后，对于服务器来说，请求方式，已经不重要了，所以，将get数据和post数据，集中到一起，统一处理
function dataHandle(req, res, data){
    console.log(data);

    res.write("data");
    res.end();
}

// 静态资源的响应
function staticRes(req, res){
    const p = req.url==="/" ? "./static/index.html" : "./static"+req.url;
    
    fs.readFile(p, (err, data)=>{
        if(err){
            res.write("404");
        }else{
            res.write(data);
        }
        res.end();
    })
}

// 本地服务器的通用访问方式：
//     域名为：localhost
//     IP地址：127.0.0.1

// 每次服务器代码修改后，服务器都需要重启
