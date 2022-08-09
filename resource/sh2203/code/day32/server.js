const http = require("http")
const fs = require("fs")
const url = require("url")

// 只有静态资源处理
http.createServer((req, res)=>{
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
}).listen(3000, ()=>{
    console.log("服务器开启成功，地址为：http://localhost:3000")
})