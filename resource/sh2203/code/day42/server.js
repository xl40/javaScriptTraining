const http = require("http");
const url = require("url");
const fs = require("fs");

http.createServer((request, response)=>{
    if(request.url.includes("/api")){
        // get数据在解析之后的url对象的query属性
        const d = url.parse(request.url, true).query;
        // console.log(d);
        switch(d.type){
            case "login":
                login(request, response, d);break;
            case "register":
                register(request, response, d);break;
            default:
                error(request, response, d);
        }
    }else{
        file(request, response);
    }
}).listen(4000,()=>{
    console.log("开启成功：http://localhost:4000")
});

function register(req,res,reqData){
    // 在数据库中找到了和本次要写入的用户名相同的用户名
    fs.readFile("./databases/user.json", "utf-8", (err,data)=>{
        if(err){
            res.write(JSON.stringify({
                title: "数据库读取失败",
                code: 0,
                data: null
            }))
            res.end();
        }else{
            const arr = JSON.parse(data);
            const flag = arr.some(val=>val.username === reqData.username);
            if(flag){
                res.writeHead(200, {
                    "Content-type": "text/html;charset=utf-8"
                })
                res.write(JSON.stringify({
                    title: "用户名重名",
                    code: 1,
                    data: null
                }))
                res.end();
            }else{
                arr.push({
                    username: reqData.username,
                    password: reqData.password
                })
                fs.writeFile("./databases/user.json", JSON.stringify(arr),err=>{
                    if(err){
                        res.write(JSON.stringify({
                            title: "数据库写入失败",
                            code: 2,
                            data: null
                        }))
                        res.end();
                    }else{
                        res.write(JSON.stringify({
                            title: "成功",
                            code: 3,
                            data: reqData
                        }))
                        res.end();
                    }
                })
            }
        }
    })
}
function login(req,res,reqData){
    // 将数据库中的数据，和前端发过来的数据进行比对
    fs.readFile("./databases/user.json", "utf-8", (err, data)=>{
        if(err){
            res.write(JSON.stringify({
                title: "数据库读取失败",
                code: 0,
                data: null
            }))
            res.end();
        }else{
            const arr = JSON.parse(data);
            let i = 0;
            const flag = arr.some((val, idx)=>{
                i = idx;
                return val.username === reqData.username;
            });
            if(flag){
                if(arr[i].password === reqData.password){
                    res.write(JSON.stringify({
                        title: "登录成功",
                        code: 3,
                        data: arr[i]
                    }))
                    res.end();
                }else{
                    res.write(JSON.stringify({
                        title: "密码不对",
                        code: 2,
                        data: null
                    }))
                    res.end();
                }
            }else{
                res.write(JSON.stringify({
                    title: "用户不存在",
                    code: 1,
                    data: null
                }))
                res.end();
            }
        }
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
    fs.readFile("./static" + p, (err, data)=>{
        if(err){
            response.write("404");
        }else{
            response.write(data);
        }
        response.end();
    })
}

