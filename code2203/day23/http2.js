const http = require("http");
const fs = require("fs");

// 需求：
    // 静态资源的响应：能够根据前端请求的地址，响应html，css，图片，js
    // 非静态资源的响应：

const serObj = http.createServer((req, res)=>{
    // let u = req.url;
    // 路由处理
    staticRes(req, res);
})
// 挂载到端口
serObj.listen(3000, ()=>{
    console.log("服务器开启成功")
});


// 静态资源的响应
function staticRes(req, res){
    // res.write(`
    // <head><meta charset="UTF-8" /></head>
    // <style>h1{background:red}</style>
    // <h1>this is H1 title中文</h1>
    // `);
    // res.end();
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
