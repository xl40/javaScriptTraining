define(function() {
    console.log("B");
    return {
        data:"这是B的数据",
        show(d){
            console.log("这是在模块B中显示了：" + d);
        }
    }
});