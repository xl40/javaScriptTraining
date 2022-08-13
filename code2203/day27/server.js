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