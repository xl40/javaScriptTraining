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
        case "getGoods":getGoods(req, res, data);break
        case "getMenu":getMenu(req, res, data);break
        case "register":register(req, res, data);break
        case "login":login(req, res, data);break
        default:
            error(req, res, data);
    }
}
function login(req, res, d){
    // 登录的状态：用户名不存在，密码错误，成功
    // 先读数据库
    fs.readFile("./databases/userMsg.json", "utf-8", (err, data)=>{
        if(err){
            res.write(JSON.stringify({
                code:0,
                title:"获取初始用户信息失败",
                data:null
            }))
            res.end();
        }else{
            const arr = JSON.parse(data);
            let i = 0;
            const flag = arr.some((val,idx)=>{
                i = idx;
                return val.username === d.username
            });
            if(flag){
                // 用户名存在，该判断密码了
                if(arr[i].password === d.password){
                    res.write(JSON.stringify({
                        code:1,
                        title:"登录成功",
                        data:arr[i]
                    }))
                    res.end();
                }else{
                    res.write(JSON.stringify({
                        code:2,
                        title:"密码错误",
                        data:null
                    }))
                    res.end();
                }
            }else{
                res.write(JSON.stringify({
                    code:3,
                    title:"用户名不存在",
                    data:null
                }))
                res.end();
            }
        }
    })
}

function register(req, res, d){
    // console.log(d);
    // 注册的状态：成功，用户名重复失败
    // 先读数据库
    fs.readFile("./databases/userMsg.json", "utf-8", (err, data)=>{
        if(err){
            res.write(JSON.stringify({
                code:0,
                title:"获取初始用户信息失败",
                data:null
            }))
            res.end();
        }else{
            const arr = JSON.parse(data)
            // 遍历，比对，some
            const flag = arr.some(val=>val.username === d.username);
            if(flag){
                res.write(JSON.stringify({
                    code:1,
                    title:"用户名重复",
                    data:null
                }))
                res.end();
            }else{
                arr.push({
                    username:d.username,
                    password:d.password
                })
                // 再存回数据库
                fs.writeFile("./databases/userMsg.json", JSON.stringify(arr), err=>{
                    if(err){
                        res.write(JSON.stringify({
                            code:2,
                            title:"写入新用户信息失败",
                            data:null
                        }))
                        res.end();
                    }else{
                        res.write(JSON.stringify({
                            code:3,
                            title:"注册成功",
                            data:{username:d.username,password:d.password}
                        }))
                        res.end();
                    }
                })
            }
        }
    })
}
// http://localhost:3000/api?type=getGoods
function getGoods(req, res, data){
    fs.readFile("./databases/goods.json", "utf-8", (err, data)=>{
        const arr = JSON.parse(data);
        // 可以在此处对数据进行筛选，过滤，排序，添加，更新，删除
        // ...
        const obj = {};
        if(err){
            obj.code = "444";
            obj.title = "获取商品数据失败";
            obj.data = [];
        }else{
            obj.code = "666";
            obj.title = "获取商品数据成功";
            obj.data = arr;
        }
        res.write(JSON.stringify(obj));
        res.end();
    })
}

function getMenu(req, res, data){
    fs.readFile("./databases/menu.json", "utf-8", (err, data)=>{
        const arr = JSON.parse(data);
        const obj = {};
        if(err){
            obj.code = "444";
            obj.title = "获取商品数据失败";
            obj.data = [];
        }else{
            obj.code = "666";
            obj.title = "获取商品数据成功";
            obj.data = arr;
        }
        res.write(JSON.stringify(obj));
        res.end();
    })
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