// ES6定义模块
function random(max, min){
    return Math.round(Math.random()*(max-min)+min);
}
// 暴露模块
export default random;



// require.js定义模块
// define(()=>{
//     function random(max, min){
//         return Math.round(Math.random()*(max-min)+min);
//     }
//     // 暴露模块
//     return random
// })