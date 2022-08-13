// 引入小模块
// import random from "../modules/moduleA.js";
// console.log(random);

// require.js引入小模块
// require(["../modules/moduleA"],(random)=>{
//     console.log(random)
// })

// =======

// import obj from "../modules/moduleB.js";
// console.log(obj)
// console.log(obj.randomColor());
// console.log(obj.random(0,9));

// ======

// import {random, str} from "../modules/moduleC.js";
// console.log(random);
// console.log(str);

// import {randomColor} from "../modules/moduleC.js";
// console.log(randomColor);

// 只有使用了default关键字暴露的模块才能不使用{}
// import randomColor from "../modules/moduleC.js";
// console.log(randomColor);


// =======

// import { message, show } from "../modules/moduleD.js";
// console.log(message);
// show(message);

// // 引入后改名
// import { message as m, show as s } from "../modules/moduleE.js";
// console.log(m);
// s(message);
// s(m);
// s("hello");

// import { msg, display } from "../modules/moduleF.js";
// console.log(msg);
// display(msg);


// =======

// import { num } from "../modules/moduleG.js";
// console.log(num);
// setTimeout(()=>{
//     console.log(num);
// },1000)

// import { str, obj } from "../modules/moduleG.js";
// console.log(str);
// // str = "world";
// console.log(str);

// console.log(obj);
// obj.a = "30"
// console.log(obj)

// 不被允许
// const name = "str";
// import { name } from "../modules/moduleG.js";

// 只执行整个模块文件
// import "../modules/moduleG.js";

// import * as haha from "../modules/moduleG.js";
// console.log(haha);
// console.log(haha.num);
// console.log(haha.obj);
// console.log(haha.str);

