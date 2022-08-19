// 封装之前，规划当前功能会如何执行
// request({
//     type:"get",     // 请求方式：默认get，post，jsonp
//     url:"123",         // 请求地址
//     data:{
//         cb:"jahsgfjadkf"
//     },        // 请求数据，默认为空对象
//     success:(res)=>{},  // 请求成功之后要执行的功能
//     error:(code)=>{},   // 请求失败之后要执行的功能
//     timeout:3000        // 超时时间
// });

// request({
//     type:"jsonp",
//     data:{
//         callback:"jahgsfuagv"
//     },
//     jsonp:"callback"
// });

// request({
//     type:"jsonp",
//     data:{
//         cb:"jdahjgsdagv"
//     },
//     jsonp:"cb"
// });

function request({type="get", url, data={}, success, error, timeout=10000,jsonp=""}={}){
    // 1. get,post,jsonp需要拼接好的query数据
    let str = "";
    for(let i in data){
        str += `${i}=${data[i]}&`
    }
    // 2. get,jsonp需要在url后拼接数据
    if(type !== "post"){
        url = url + "?" + str.slice(0,-1);
    }
    if(type !== "jsonp"){
        // 3. get和post需要使用ajax请求
        const xhr = new XMLHttpRequest();
        xhr.open(type, url);
        xhr.onload = function(){
            if(xhr.status === 200){
                success && success(xhr.responseText);
                // 只要成功了，肯定不存在超时
                clearInterval(t);
            }else{
                error && error(xhr.status);
                // 只要请求失败了，肯定不存在超时失败
                clearInterval(t);
            }
        }
        if(type === "get"){
            xhr.send();
        }else{
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(str.slice(0,-1));
        }
    }else{
        // 4. 非get或post，是jsonp的功能
        const s = document.createElement("script");
        s.src = url;
        document.body.appendChild(s);
        // 定义全局函数
        window[data[jsonp]] = function(res){
            success && success(res);
            // 只要成功了，肯定不存在超时
            clearInterval(t);
        }
    }

    // 5. 超时功能
    let t = setTimeout(()=>{
        error && error("timeout");
        // 只要报错了，肯定不存在成功
        success = null;
    },timeout);
}
