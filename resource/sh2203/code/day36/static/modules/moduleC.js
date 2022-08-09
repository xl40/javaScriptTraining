
function random(max, min){
    return Math.round(Math.random()*(max-min)+min);
}
function randomColor(){
    return `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`;
}
const str = "hello";

// 一个js文件暴露多次功能
export {random};
export {randomColor};
export {str};
