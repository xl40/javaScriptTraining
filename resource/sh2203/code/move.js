function move(ele, data, cb){
    if(ele.t === undefined){
        ele.t = setInterval(() => {
            let flag = true;
            for(let i in data){
                let now = i==="opacity" ? getStyle(ele, i) * 100 : parseInt(getStyle(ele, i));
                let speed = (data[i] - now) / 3;
                speed = speed<0 ? Math.floor(speed) : Math.ceil(speed);
                ele.style[i] = i==="opacity" ? (now + speed) / 100 : now + speed + "px";
                if(now !== data[i]) flag = false;
            }
            if(flag){
                clearInterval(ele.t);
                ele.t = undefined;
                cb && cb();
            }
        }, 30);
    }
}
function getStyle(ele, attr){
    return getComputedStyle ? getComputedStyle(ele)[attr] : ele.currentStyle[attr];
}