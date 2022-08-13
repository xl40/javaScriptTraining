// 商品列表的主模块，用来引入何种小模块，并组合成最终效果
// 模块的相关配置
require.config({
    baseUrl:"./modules",
    paths:{
        jq: "../libs/jquery",
        "cookie": "../libs/jquery.cookie"
    },
    shim:{
        cookie:{
            deps:["jq"]
        }
    }
})
// 引入各种小模块，实现商品列表功能
require(["cookie", "code/day35/static/modules/getGoods", "listRender", "setLocal"],(_cookie, gg, lr, sl)=>{
    // 1. 请求数据
    const serUrl = "http://localhost:3000/api";
    gg(serUrl, "getGoods", res=>{
        // 2. 渲染页面
        lr($(".box"), res);
    });
    // 3. 绑定事件
    $(".box").on("click", ".add", function(){
        const id = $(this).attr("data-id");
        // 此处获取当前商品价格的方式，受不同页面布局的影响而改变
        const price = $(this).parent().prev("p").prev("p").html()-0;
        // 4. 将当前商品相关信息，存储到本地存储
        sl(id, price);
    });
})

