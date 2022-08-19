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
});

require(["cookie", "getGoods", "cartRender", "changeLocal", "allCheck"],(_cookie, gg, cr, cl, ac)=>{
    // 1. 获取本地存储中的数据
    let goods = $.cookie("goods") ? JSON.parse($.cookie("goods")) : [];
    // 购物车空状态判断和处理
    if(goods.length < 1){
        $("tbody").html(`<td colspan="7">当前购物车为空，<a href="./list.html">去选购商品</a></td>`);
        return;
    }
    // 2. 获取后端的所有商品数据
    const url = "http://localhost:3000/api"
    gg(url, "getGoods", res=>{
        // 3. 购物车页面渲染
        cr($("tbody"), res, goods);
    })
    // 4. 绑定选中状态改变事件
    $("tbody").on("click", ".check", function(){
        const id = $(this).parent().parent().attr("data-id");
        const f = this.checked;
        // 5. 修改本地存储中的数据
        cl(goods, id, i=>{
            goods[i].flag = f;
        })
        // 单个选中影响全选（单个选项状态改变行为）
        $("#allCheck")[0].checked = goods.every(val=>val.flag);
        // 修改选中状态，重新计算总数量
        $("#allNum").html( goods.reduce((prev,val)=>prev+(val.flag ? val.num : 0), 0) );
        // 总价
        $("#allPrice").html( goods.reduce((prev, val)=>prev+(val.flag ? val.num*val.price : 0), 0) );
    })
    // 5. 绑定输入框的输入事件
    $("tbody").on("input", ".setNum", function(){
        const id = $(this).parent().parent().attr("data-id");
        const n = $(this).val()-0;
        // console.log(id, n);
        // 6. 修改本地存储中的数据
        cl(goods, id, i=>{
            goods[i].num = n;
        })
        // 修改单个商品数量，重新计算总数量
        $("#allNum").html( goods.reduce((prev,val)=>prev+(val.flag ? val.num : 0), 0) );
        // 总价
        $("#allPrice").html( goods.reduce((prev, val)=>prev+(val.flag ? val.num*val.price : 0), 0) );
    })
    // 7. 绑定删除功能的点击事件
    $("tbody").on("click", ".del", function(){
        const id = $(this).parent().attr("data-id");
        $(this).parent().remove();
        // 8. 修改本地存储中的数据
        cl(goods, id, i=>{
            goods.splice(i, 1);
        })
        // 单个选中影响全选（删除商品时如果删除了未选中状态的商品行为）
        $("#allCheck")[0].checked = goods.every(val=>val.flag);
        // 删除商品时，重新计算总数量
        $("#allNum").html( goods.reduce((prev,val)=>prev+(val.flag ? val.num : 0), 0) );
        // 总价
        $("#allPrice").html( goods.reduce((prev, val)=>prev+(val.flag ? val.num*val.price : 0), 0) );
    })
    // 8. 全选和单个商品选中状态的双向绑定
    // 8.1 全选影响单个选中
    $("#allCheck").change(function(){
        ac(goods, this.checked, $(".check"));
        // 修改全选状态，重新计算总数量
        $("#allNum").html( goods.reduce((prev,val)=>prev+(val.flag ? val.num : 0), 0) );
        // 总价
        $("#allPrice").html( goods.reduce((prev, val)=>prev+(val.flag ? val.num*val.price : 0), 0) );

    })
    // 8.2 单个选中影响全选（初始行为）
    $("#allCheck")[0].checked = goods.every(val=>val.flag);
    // let f = true;
    // for(let i=0;i<goods.length;i++){
    //     if(!goods[i].flag){
    //         f = false;
    //         break;
    //     }
    // }
    // $("#allCheck")[0].checked = f;
    // 9. 总数量的计算（初始行为）
    let sum = 0;
    goods.forEach(val=>{
        sum += (val.flag ? val.num : 0);
    })
    // let sum = goods.reduce((prev,val)=>prev+(val.flag ? val.num : 0), 0);
    $("#allNum").html( sum );
    // 10. 总价的计算（初始行为）
    $("#allPrice").html( goods.reduce((prev, val)=>prev+(val.flag ? val.num*val.price : 0), 0) );
    // 11. 删除选中
    $("#delCheck").click(function(){
        // 删除DOM
        [...$(".check")].forEach(val=>{
            if(val.checked){
                $(val).parent().parent().remove();
            }
        })
        // 删除本地存储中的数据
        goods = goods.filter(val=>{
            return !val.flag;
        })
        $.cookie("goods", JSON.stringify(goods));
    })
})