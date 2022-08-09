
const message = "今天天气一般"

const show = function(msg){
    console.log(msg, 456);
}

// 暴露前改名
export {message as msg};
export {show as display};