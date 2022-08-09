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
    },
    // jq插件的配置
    shim:{
        "jquery.cookie": {
            deps: ["jq"]
        },
        "jquery.banner":{
            deps: ["jq"]
        }
    }
})

require(["hello", "C", "world", "jquery.cookie", "jquery.banner"], (a, c, b)=>{
    console.log(a);
    console.log(b);
    console.log(c);
    console.log($);
    console.log($.cookie);
    console.log($.banner);
})