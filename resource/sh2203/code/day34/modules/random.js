// 定义了一个符合AMD（require.js）规范的模块
define(function(){
    return function(max,min){
        return Math.round(Math.random()*(max-min))+min;
    }
})
