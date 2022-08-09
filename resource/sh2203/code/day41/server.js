// 引入服务器工具
const http = require("http");

const fs = require("fs");

const url = require("url");

// 创建服务对象
const serverObj = http.createServer((request, response)=>{
    // 定义服务器的功能

    // 接收前端请求，根据前端请求
    if(request.url.includes("/api")){
        const query = url.parse(request.url, true).query;
        if(query.type === "menu"){
            menu(request, response);
        }
    }else{
        file(request, response)
    }
});
// 将服务器对象挂载到指定计算机的指定端口
serverObj.listen(5000);

function menu(request, response){
    // 读取数据库中导航的数据
    fs.readFile("./databases/menu.json", (err, data)=>{
        // 将导航的数据发送给前端
        response.write(data);
        response.end();
    })
}

function file(request, response){
    // 解析前端请求时，需要获取的文件的路径
    const p = url.parse(request.url).pathname;

    // 当请求的文件时js文件时，设置文件的解析格式为对应格式：
    if(p.endsWith(".js")){
        response.writeHead(200, {
            "Content-type":"application/javascript"
        });
    }

    // 使用文件系统管理工具直接读文件
    fs.readFile("./www" + p, (err, data)=>{
        // 将读取到的文件直接发送给前端
        if(!err){
            response.write(data);
            response.end();
        }
    })
}