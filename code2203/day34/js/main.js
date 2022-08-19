// 当使用引入了require的script标签的自定义属性，引入主模块时，主模块内引入小模块的路径起始点，以主模块文件自身开始
// require(["../modules/B", "../modules/C", "../modules/A"], (obj1, obj2, obj3)=>{
//     console.log("a,b,c三个模块绝对已经被加载完成");
    
//     obj1.show(obj3.data);
//     obj2.show(obj1.data);
//     obj3.show(obj2.data);
// })


// 当使用独立的script标签引入主模块时，主模块内引入小模块的路径起始点，以当前html文件开始
// require(["./modules/B", "./modules/C", "./modules/A"], (obj1, obj2, obj3)=>{
//     console.log("a,b,c三个模块绝对已经被加载完成");
    
//     obj1.show(obj3.data);
//     obj2.show(obj1.data);
//     obj3.show(obj2.data);
// })


// 配置
require.config({
    // 配置基路径，基路径是以引入了当前主模块的html文件作为起始点
    baseUrl: "./modules",
    // 模块别名
    paths:{
        hello: "A",
        world: "B",
        haha: "C",
        abc: "goodsDetailDrag",
        jq: "https://lib.baomitu.com/jquery/3.6.0/jquery"
    }
})
require(["hello", "C", "world", "jq", "random"], (a, c, b, _jq, r)=>{
    console.log(a);
    console.log(b);
    console.log(c);
    console.log($);
    console.log(r);
})
