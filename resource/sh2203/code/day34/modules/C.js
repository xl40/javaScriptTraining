define(function() {
    console.log("C");
    return {
        data:"这是C的数据",
        show(d){
            console.log("这是在模块C中显示了：" + d);
        }
    }
});