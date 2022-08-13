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
require(["cookie", "code/day37-40/static/modules/getGoods", "listRender", "setLocal"],(_cookie, gg, lr, sl)=>{

    // 守卫去购物车的链接
    $(".goCartLink").click(function(){
        if(!localStorage.getItem("token")){
            return false;
        }
    })

    // 1. 请求数据
    const serUrl = "http://localhost:3000/api";
    gg(serUrl, "getGoods", res=>{
        // 2. 渲染页面
        lr($(".box"), res);
        // 4. 搜索功能：按下回车键搜索
        $(document).keydown(function(){
            if(event.keyCode === 13){
                const kw = $(".search").val();
                const arr = res.filter(val=>{
                    return val.brand.includes(kw) || val.proName.includes(kw) || val.kind.includes(kw)
                });
                lr($(".box"), arr);
            }
        })
        // 5.排序功能：切换下拉菜单，修改排序规则
        $("#priceSort").change(function(){
            // 因为排序操作会修改原数组，所以提前拷贝一份，用于默认顺序
            let arr = [...res];
            switch($(this).val()){
                case "2":
                    // 升序排序
                    arr.sort((a, b)=>a.price - b.price);
                    // 重新渲染页面
                    lr($(".box"), arr);
                    break;
                case "3":
                    // 降序排序
                    arr.sort((a, b)=>b.price - a.price);
                    lr($(".box"), arr);
                    break;
                case "1":
                    // 默认，不排序，渲染默认数据
                    lr($(".box"), res);
                    break;
            }
        })
    });
    // 3. 绑定事件
    $(".box").on("click", ".add", function(){

        // 登录守卫
        if(!localStorage.getItem("token")){
            if(confirm("没有登录，不能加入购物车，是否要跳转到登录呢？")){
                location.assign("../login.html");
            }
            return;
        }

        const id = $(this).attr("data-id");
        // 此处获取当前商品价格的方式，受不同页面布局的影响而改变
        const price = $(this).parent().prev("p").prev("p").html()-0;
        // 4. 将当前商品相关信息，存储到本地存储
        sl(id, price);
    });

})

