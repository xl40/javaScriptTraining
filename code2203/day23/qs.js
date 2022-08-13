const qs = require("querystring");

const qsStr = "name=张三&age=18&sex=男";

const qsObj = qs.parse(qsStr);

console.log(qsObj);

const qsO = { name: '张三', age: '18', sex: '男' };

const qsS = qs.stringify(qsO);

console.log(qsS);


