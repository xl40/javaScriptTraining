
let num = 10;
var str = "hello";
const obj = {
    a:10,b:20
}

export {num};
export {str};
export {obj};

setTimeout(()=>{
    num = 20;
},1000)


console.log("hello");

[1,2,3,4].forEach(val=>console.log(val));
