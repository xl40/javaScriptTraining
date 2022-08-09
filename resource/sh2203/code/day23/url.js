const url = require("url");

const urlStr = "http://liyang:123456@www.liyang.com:3000/abc/qwe/zxc/index.html?stuName=张三&age=18&sex=男#top";
console.log(urlStr);

const urlObj = url.parse(urlStr, true);
console.log(urlObj);

const uO = {
    protocol: 'http:',
    slashes: true,
    auth: 'liyang:123456',
    host: 'www.liyang.com:3000',
    port: '3000',
    hostname: 'www.liyang.com',
    hash: '#top',
    search: '?stuName=张三&age=18&sex=男',
    query: 'stuName=张三&age=18&sex=男',
    pathname: '/abc/qwe/zxc/index.html',
    path: '/abc/qwe/zxc/index.html?stuName=张三&age=18&sex=男',
    href: 'http://liyang:123456@www.liyang.com:3000/abc/qwe/zxc/index.html?stuName=张三&age=18&sex=男#top'
}
const uS = url.format(uO);
console.log(uS);


