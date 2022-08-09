const http = require("http")
const fs = require("fs")
const url = require("url")

http.createServer((req, res)=>{
    let p = url.parse(req.url).pathname;
    p = (p === "/" ? "/index.html" : p);
    fs.readFile("./static" + p, (err, data)=>{
        if(err){
            res.write("not found");
        }else{
            // 当接收到的请求是js文件时
            if(p.includes(".js")){
                // 设置文本类型（MIME）为javascript类型
                res.writeHead(200, {
                    "Content-type": "application/javascript"
                })
            }
            res.write(data);
        }
        res.end();
    })
}).listen(3000, ()=>{
    console.log("服务器开启成功，地址为：http://localhost:3000")
})