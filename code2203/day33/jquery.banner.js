;(function($){
    "use strict";
    $.fn.extend({
        banner:function(items, ops={}){
            const that = this;

            // 1. 处理默认参数
            let {prev=true,next=true,list=true,autoPlay=true,index=0,moveTime=300,delayTime=3000} = ops;

            // 轮播图新思路：每张图片都在容器外等候，切换时，精准控制要离开的图片 和 要进来的图片

            // 假设的要离开的图片的索引
            let prevIndex;
            // 要进来的索引默认为index

            // 2. 创建基本布局(根据图片创建页面结构)
            let str = "";
            items.forEach(val=>{
                str += `<a href="##"><img src="${val.src}" alt="${val.src}" title="${val.title}"></a>`;
            })
            const imgs = $(`<div class="imgbox">${str}</div>`).appendTo(this).children("a").eq(index).css({left:0}).end();
            
            // 2. 创建左右按钮，并添加功能
            if(prev && next){
                $("<div class='btns'></div>")
                .appendTo(this).append($("<input type='button' class='prev' value='<'>")).append($("<input type='button' class='next' value='>'>")).on("click",".prev", leftClick).on("click", ".next", rightClick)
            }

            function leftClick(){
                if(index === 0){
                    index = imgs.length-1;
                    prevIndex = 0;
                }else{
                    index--;
                    prevIndex = index+1;
                }
                move(prevIndex, index, 1);
            }

            function rightClick(){
                if(index === imgs.length-1){
                    index = 0;
                    prevIndex = imgs.length-1;
                }else{
                    index++;
                    prevIndex = index-1;
                }
                move(prevIndex, index, -1);
            }

            // 3. 创建分页器，并添加功能
            if(list){
                let str = "";
                items.forEach((val,idx)=>{
                    str += `<span>${idx}</span>`
                })
                $(`<div class="list">${str}</div>`).appendTo(this).children("span").click(function(){
                    // index：要走的
                    // 点击的索引：要进来的
                    // 区分运动方向
                    if($(this).index() > index){
                        move(index, $(this).index(), -1);
                    }
                    if($(this).index() < index){
                        move(index, $(this).index(), 1);
                    }
                    index = $(this).index();
                }).eq(index).css({
                    background:"red",color:"#fff"
                })
            }

            // 公共运动（按钮和分页器）
            function move(p, n, d){
                // 设置要离开的图片
                    // 从哪离开：css控制
                    // 离开到哪：animate控制
                // 设置要进来的图片
                    // 从哪进来：css控制
                    // 进到哪：animate控制
                imgs.eq(p).css({
                    left:0
                }).stop().animate({
                    left:imgs.eq(0).width() * d
                }, moveTime).end().eq(n).css({
                    left:-imgs.eq(0).width() * d
                }).stop().animate({
                    left:0
                }, moveTime);

                // 分页器当前项的高亮显示
                that.children(".list").children("span").eq(n).css({
                    background:"red",color:"#fff"
                }).end().eq(p).css({
                    background: "",
                    color:""
                })
            }

            // 4. 自动播放
            if(autoPlay){
                // 开启计时器自动执行右按钮的事件处理函数
                let t = setInterval(() => {
                    rightClick()
                }, delayTime);
                this.hover(function(){
                    // 鼠标进入容器，停止自动
                    clearInterval(t);
                },function(){
                    // 鼠标离开，继续自动
                    t = setInterval(() => {
                        rightClick()
                    }, delayTime);
                })
            }

        }
    })
})(jQuery);