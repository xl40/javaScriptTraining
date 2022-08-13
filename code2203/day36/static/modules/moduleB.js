
function random(max, min){
    return Math.round(Math.random()*(max-min)+min);
}
function randmColor(){
    return `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`;
}
const str = "hello";

// 一个js文件暴露多个功能
export default {
    random,
    randomColor: randmColor,
    str
};


// const abc = "hello"
// const qwe = "world"
// const fn = function(){}
// ES6提供的对象新语法：当对象的属性名和作为属性值的变量名一致时，可缩写
// const obj1 = { abc, qwe, fn }
// obj1类似于obj2
// const obj2 = { abc:abc, qwe:qwe, fn:fn }