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
        case "select":select(req, res, data);break;
        case "insert":insert(req, res, data);break;
        case "update":update(req, res, data);break;
        default:
            error(req, res, data);
    }
}
function update(req, res, resData){
    // 读取虚拟数据库
    fs.readFile("./databases/stu.json", "utf-8", (err, data)=>{
        const arr = JSON.parse(data);
        // 根据数据的id查找要修改的数据，修改
        for(let i=0;i<arr.length;i++){
            if(arr[i].stuId === resData.id){
                arr[i].stuName = resData.name;
                arr[i].result = resData.result;
                break;
            }
        }
        // let i = 0;
        // const flag = arr.some((val,idx)=>{
        //     i = idx;
        //     return val.stuId === resData.id;
        // })
        // if(flag){
        //     arr[i].stuName = resData.name;
        //     arr[i].result = resData.result;
        // }

        // 将数据添加到数据库（其实应该先判断数据是否重复，但是只是一个简易功能，就不做判断了）
        fs.writeFile("./databases/stu.json", JSON.stringify(arr), (err)=>{
            const obj = {};
            if(err){
                obj.title = "修改失败";
                obj.code = 444;
                obj.data = null;
            }else{
                obj.title = "修改成功";
                obj.code = 666;
                obj.data = arr;
            }
            // 响应给前端
            res.write(JSON.stringify(obj));
            res.end();
        })
    })
}
function insert(req, res, resData){
    // 读取虚拟数据库
    fs.readFile("./databases/stu.json", "utf-8", (err, data)=>{
        const arr = JSON.parse(data);
        arr.push({
            stuId: resData.id,
            stuName: resData.name,
            result: resData.result
        })
        // 将数据添加到数据库（其实应该先判断数据是否重复，但是只是一个简易功能，就不做判断了）
        fs.writeFile("./databases/stu.json", JSON.stringify(arr), (err)=>{
            const obj = {};
            if(err){
                obj.title = "添加失败";
                obj.code = 444;
                obj.data = null;
            }else{
                obj.title = "添加成功";
                obj.code = 666;
                obj.data = arr;
            }
            // 响应给前端
            res.write(JSON.stringify(obj));
            res.end();
        })
    })
}
function select(req, res, resData){
    // 读取虚拟数据库
    fs.readFile("./databases/stu.json", "utf-8", (err, data)=>{
        const obj = {};
        if(err){
            obj.title = "读取失败";
            obj.code = 444;
            obj.data = null;
        }else{
            obj.title = "读取成功";
            obj.code = 666;
            obj.data = JSON.parse(data);
        }
        // 响应给前端
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