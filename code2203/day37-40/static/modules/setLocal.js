define(()=>{
    return function(id, price){
        // 本地存储中数据结构的设计
        // [{id:"",num:1},{id:"",num},...]
    
        // 根据本地存储是否为空判断购物车是否为空
        // 先读取本地存储（将来计划存goods，现在就读goods）
        const goods = $.cookie("goods") ? JSON.parse($.cookie("goods")) : [];
        // 判断是否是重复商品
        let i=0;
        const flag = goods.some((val,idx)=>{
            i = idx;
            return val.id === id;
        })
        if(flag){
            // 是重复，增加数量
            goods[i].num ++;
        }else{
            // 不是重复，push添加
            goods.push({
                id:id,
                num:1,
                flag:true,
                price: price
            })
        }
        // 一定要将处理之后的数据，存入本地存储
        $.cookie("goods", JSON.stringify(goods));
    }
})