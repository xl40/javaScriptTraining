const f = require("code/day22/fs");

// console.log(f);

// 1. 增
// f.writeFile("要增加到的路径+文件名", "文件的内容", 执行结束的回调函数)
// const data = "你好node，这是使用fs模块增加的记事本文件";
// f.writeFile("./hello.txt", data, (abc)=>{
//     // 回调函数的参数表示报错信息
//         // 为null表示增加成功
//         // 为实际对象，表示增加失败
//         console.log(abc);
// })

// 2. 查
// f.readFile("要读的文件所在的路径+文件名", "读取到的数据的字符编码", 执行结束的回调函数)
// f.readFile("./hello.txt", "utf-8", (aaa, bbb)=>{
//     // 回调函数的第一个参数表示报错信息
//         // 为null，表示读取成功
//         // 为实际对象，表示读取失败
//         console.log(aaa);
//     // 回调函数的第二个参数表示读取到的文件数据
//         // 如果读取失败，为undefined
//         // 如果读取成功，为文件数据
//         console.log(bbb);
// })

// 3. 改
// 改内容，不是新方法，使用增方法，增加一个重复的文件，不同的内容，即可覆盖源文件
// const data = "hahahahhhahhahhaha";
// f.writeFile("./hello.txt", data, (abc)=>{
//     // 回调函数的参数表示报错信息
//         // 为null，表示增加成功
//         // 为实际对象，表示增加失败
//         console.log(abc);
// })

// 需求：保留源文件内容，在原内容的基础之上增加新数据？读旧增新！
// 先读原始内容
// f.readFile("./hello.txt", "utf-8", (aaa, bbb)=>{
//     // 在原始内容的基础上增加新数据，再存回去
//     f.writeFile("./hello.txt", bbb + "这是新增的数据", (abc)=>{
//         // 想看修改之后的数据，再读一次
//         f.readFile("./hello.txt", "utf-8", (ccc, ddd)=>{
//             console.log(ddd);
//         })
//     })
// })

// 改文件名
// f.rename("原文件路径+文件名", "改之后的路径+文件名", 执行结束后的回调函数)
// f.rename("./world.txt", "./hello.txt", (aaa)=>{
//     // 回调函数的参数表示报错信息
//         // 为null，表示改名成功
//         // 为实际对象，表示改名失败
//         console.log(aaa);
// })


// 4. 删
// f.unlink("要删除的文件所在的路径+文件名", 执行结束后的回调函数)
// f.unlink("./hello.txt", (aaa)=>{
//     // 回调函数的参数表示报错信息
//         // 为null，表示改名成功
//         // 为实际对象，表示改名失败
//         console.log(aaa);
// })


// 如何向json文件增加数据
f.readFile("./databases/data.json", "utf-8", (aaa, bbb)=>{
    // console.log(typeof bbb);
    const arr = JSON.parse(bbb);
    // console.log(typeof arr);
    // 在原始内容的基础上增加新数据，再存回去
    arr.push({
        num: Math.random()
    })
    f.writeFile("./databases/data.json", JSON.stringify(arr), (abc)=>{
        console.log(abc);
    })
})