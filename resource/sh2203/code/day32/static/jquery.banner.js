;(function($){
    "use strict";

    // 对象的语法进行自定义功能添加
    // $.banner = function(){
    //     console.log("全局banner1")
    // }

    // 所有DOM对象的原型链添加一个自定义方法
    // 所有的DOM对象才都可以使用
    // jq的DOM对象的原型链对象是：$.fn
    // $.fn.banner = function(){
    //     console.log("这是DOM的banner方法1")
    // }

    // jq提供的专门用来向自身，绑定自定义功能的方法
    // $.extend({
    //     banner:function(){
    //         console.log("全局banner2")
    //     }
    // })

    // $.fn.extend({
    //     banner:function(){
    //         console.log("这是DOM的banner方法2")
    //     }
    // })
    

    // 开始实现插件功能
    $.fn.extend({
        banner:function(){
            // 写轮播图的功能
        }
    })


})(jQuery);