define(function() {
    console.log("A");
    return {
        data:"这是A的数据",
        show(d){
            console.log("这是在模块A中显示了：" + d);
        }
    }
});