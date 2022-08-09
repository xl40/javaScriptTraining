define(()=>{
    return function(url,type,cb){
        $.ajax({
            url:url,
            data:{
                type:type
            },
            success:res=>{
                res = JSON.parse(res)
                if(res.code === "666"){
                    cb(res.data);
                }else{
                    console.log("可以渲染错误提示页面了", res.title);
                }
            }
        })
    }
})