// 范围随机数
function random(max,min){
    return Math.round(Math.random()*(max-min)+min);
}

// 随机4位数字的验证码
function randomNumber(){
    var str = "";
    for(var i=0;i<4;i++){
        str += random(0, 9);
    }
    return str;
}

// 求数组的平均值
function avg(myarr){
    var sum = 0;
    for(var i=0;i<myarr.length;i++){
        sum += myarr[i];
    }
    return sum / myarr.length;
}

// 随机4位数字字母混合验证码
function randomString(){
    var str = "";
    for(var i=0;i<4;i++){
        str += random(0, 9);
        str += String.fromCharCode(random(97,122));
        str += String.fromCharCode(random(65,90));
    }
    var randomStr = "";
    for(var i=0;i<4;i++){
        randomStr += str[random(0, str.length-1)]
    }
    return randomStr;
}

// 随机十六进制的颜色值
function randomColor(){
    var r = random(0,255).toString(16);
    var g = random(0,255).toString(16);
    var b = random(0,255).toString(16);
    return "#" + addZero(r) + addZero(g) + addZero(b);
}

// 字符不足两位，首位补零功能
function addZero(n){
    if(n.length < 2){
        return "0"+n;
    }else{
        return n;
    }
}

// 随机RGB颜色值
function randomRGB(){
    return "rgb("+ random(0,255) +","+ random(0,255) +","+ random(0,255) +")";
}

// 获取非行内样式的兼容封装
function getStyle(ele, css){
    if(ele.currentStyle){
        return ele.currentStyle[css];
    }else{
        return getComputedStyle(ele)[css];
    }
}

// 阻止默认事件
function stopDefault(e){
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
}

// 阻止冒泡
// 监听式绑定
// 监听式删除

// 事件委托
// eventProxy(父元素, 要委托的元素, 事件, 触发事件时要执行的功能)
function eventProxy(parent, target, type, f){
    parent.addEventListener(type, function(eve){
        var e = eve || window.event;
        var targetElement = e.target || e.srcElement;
        // 因为要委托的元素可能使用class或者id的标志，所以要进行单独判断
        switch(target[0]){
            case ".":
                if(targetElement.className === target.slice(1)){
                    // 如果找到对应的元素，执行外部传入的功能
                    // 同时将当前触发事件的元素，传给外部函数
                    f(targetElement);
                }
                break;
            case "#":
                if(targetElement.id === target.slice(1)){
                    f(targetElement);
                }
                break;
            default:
                if(targetElement.tagName === target){
                    f(targetElement);
                }
                break;
        }
    })
}