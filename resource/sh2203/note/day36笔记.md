# 一、复习
1. 模块化规范
    - AMD：依赖前置，第三方，require.js
    - CMD：按需加载，第三方，sea.js
    - CommonJs：依赖前置，nodeJs官方
    - ES6：语法上按需加载，执行上依赖前置，ECMAScript的官方
2. require.js的使用
    - 定义和引入
        - 定义：define([], ()=>{ return 功能 })
        - 使用：require([...], (...)=>{ 使用模块的功能 })
    - 模块之间的执行顺序
        - 引入的小模块之间是异步执行
            - 如果需要将某些小模块的顺序改成同步：
            - require.config({shim:[{}]})
        - 引入模块后的回调函数，是同步执行

# 二、ES6的模块化
- ECMAScript官方推出，不需要历来任何第三方文件，直接通过特定的关键字就可以实现的模块化规范
1. 语法：
    - 定义模块（暴露模块）：export
    - 使用模块（引入模块）：import
2. 特性
    - 环境要求：moduleA.js
        - 将引入了ES6模块的script标签的type属性设置为module
        - 目前ES6的模块化并没有广泛得到浏览器的支持，至少需要服务器环境
        - 服务器环境中对于js文件的Content-type必须为：application/javascript
    - 一个文件暴露多个功能：使用对象或数组对要暴露的多个功能或数据打包：moduleB.js
        - export default 打包之后的功能或数据
        - 使用default暴露的模块，可以被直接引入并接收
            - import 变量名 from "默认路径"
    - 一个文件多次暴露：moduleC.js
        - export {功能或数据}
        - 没有使用default暴露的模块，不能被直接引入并接收，需要将接收的功能能明用花括号包裹
            - import {模块内部的功能或数据名} from "默认路径"
    - 多个模块，多次暴露时，名字重复：moduleD.js moduleE.js moduleF.js
        - 可以使用as关键字改名
        - 暴露之前
            - export {message as msg}
        - 引入之后
            - import {show as s} from "模块路径"
    - 其他特性：moduleG.js
        1. export和import关键字，只能存在于顶层作用域内，不能存在局部或块级作用域
        2. 在ES6的模块化中，所有语法自动处在严格模式下
        3. export声明的接口必须和模块内部的变量建立一一对应的关系
        4. export声明的接口与对应的值是动态绑定，即可以拿到模块内部实时修改的值
        5. import加载的接口是只读的，不允许被修改，如果接口是对象，可以修改属性（类似于const声明的变量）
        6. import具有提升效果（语法上按需加载，执行上依赖前置）
        7. 由于import是静态执行，所以不能使用表达式和变量
        8. 当import后没有接收接口，会执行整个模块文件
        9. 可以使用通配符*加载整个模块的接口（需要配合as使用），返回一个模块对象
        10. ES6的模块化不是对象，而是通过export输出对应的代码，再通过import输入
        11. import加载模块的输入接口是静态加载，指定接口的情况下，只加载接口部分

# 三、SASS
1. sass介绍
2. sass编译环境搭建
    - 编辑器
        - HBuilder，
            1. 插件市场
            2. scss/sass
            3. 安装
            4. 在scss文件右键，选择外部命令，sass编译，开始编译
        - VSCode
            1. 应用商店
            2. live sass或者easy sass（二选一）
            3. 安装
            4. 1. live sass需要在底部状态栏开启watch
            4. 2. easy sass会自动开启，不需要手动开启
            5. 创建scss后缀的文件
            6. 一般情况下，需要保存之后才会触发编译
        - 其他编辑器
            - 插件安装，搜：sass，安装，根据插件指定的操作，编译scss即可
    - ruby环境
    - node环境
    - 前端自动化构建工具：gulp，grunt，webpack
3. scss语法 - xxx.scss文件
    - 见index.scss文件










# 补充
1. ES6提供的对象新语法：当对象的属性名和作为属性值的变量名一致时，可缩写