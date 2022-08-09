function setCookie(key, value, ops={}){
    let e = "";
    if(ops.expires){
        const d = new Date();
        d.setDate(d.getDate()+ops.expires);
        e = ";expires=" + d;
    }
    let p = "";
    if(ops.path){
        p = ";path=" + ops.path
    }
    document.cookie = `${key}=${value}${e}${p}`;
}

function removeCookie(key, ops={}){
    ops.expires = -1;
    // 删除cookie的原理，是设置cookie的有效期为过去的日期
    setCookie(key, "", ops);
}

function getCookie(key){
    const arr = document.cookie.split("; ");
    let i = 0;
    const flag = arr.some((val,idx)=>{
        if(val.split("=")[0] === key){
            i = idx;
            return true;
        }
    });
    if(flag){
        return arr[i].split("=")[1];
    }else{
        return "";
    }
}
