;(function(){
    "use strict";
    window.ly = function(aaa){
        const arr = [...document.querySelectorAll(aaa)];
        arr.css = function(ops){
            this.forEach(val=>{
                for(let i in ops){
                    val.style[i] = ops[i];
                }
            })
            return this;
        }
        arr.html = function(bbb){
            this.forEach(val=>{
                val.innerHTML = bbb;
            })
            return this;
        }
        // 参考以上格式可以继续定义很多很多个操作当前选中的DOM元素的各种功能，如
        // arr.xxx = function(){}
        return arr;
    };
    ly.random = function(max, min){
        return Math.round(Math.random()*(max-min)+min);
    }
    ly.randomColor = function(){
        return `rgb(${this.random(0,255)},${this.random(0,255)},${this.random(0,255)})`;
    }
    // 参考以上格式可以继续定义很多很多个不操作DOM的工具功能，如
    // arr.xxx = function(){}
})();