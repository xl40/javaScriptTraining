const http = require("http");
const url = require("url");
const fs = require("fs");

http.createServer((request, response)=>{
    if(request.url.includes("/api")){
        // get数据在解析之后的url对象的query属性
        const d = url.parse(request.url, true).query;
        switch(d.type){
            case "menu":
                menu(request, response, d);break;
            default:
                error(request, response, d);
        }
    }else{
        file(request, response);
    }
}).listen(4000,()=>{
    console.log("开启成功：http://localhost:4000")
});

function menu(req, res, reqData){
    PReadFile("./databases/menuToc.json").then((data1)=>{
        const pArr = [];
        data1.forEach(val => {
            pArr.push(PReadFile(`./databases/${val}.json`));
        });
        Promise.all(pArr).then(data2=>{
            res.writeHead(200, {
                "Content-type": "text/json;charset=utf-8"
            })
            const obj = {}
            data2.forEach((val,idx)=>{
                obj[data1[idx]] = val;
            })
            res.write(JSON.stringify(obj));
            res.end();
        })
    })
}
function PReadFile(path){
    return new Promise((resolve, reject)=>{
        fs.readFile(path, "utf-8", (err, data)=>{
            if(err){
                reject(err);
            }else{
                resolve(JSON.parse(data));
            }
        })
    })
}

function error(req,res,reqData){
    res.write(JSON.stringify({
        title: "本次响应信息描述",
        code: 444,
        data: null
    }))
    res.end();
}

function file(request, response){
    // 文件请求
    const p = url.parse(request.url).pathname;
    fs.readFile("./www" + p, (err, data)=>{
        if(err){
            response.write("404");
        }else{
            response.write(data);
        }
        response.end();
    })
}

