# 一、复习
1. BOM，window，提供了窗口的操作
    - js的顶层对象
        - 所有的全局都属于window，window在使用过程中可以被省略
    - 方法
        - alert
        - confirm
        - prompt
        - open
        - close
        - setInterval
        - clearInterval
        - setTimeout
        - clearTimeout
    - 事件
        - load
        - scroll
        - resize
    - 子对象
        - location：地址栏
            - 属性
            - 方法
        - history：历史记录
            - 属性
            - 方法
        - navitagor：浏览器信息
            - 属性
        - frames：页面框架
        - screen：视口
        - document：文档，页面
        - localStorage和sessionStorage：本地存储的方式

# 二、DOM
1. DOM，文档对象模型，document，提供了网页文档的所有操作
    - DOM的结构参考html标签的结构：树状结构，家族结构
    - 组成DOM结构的每个成份，都叫节点，所有节点，数据类型都是对象
        - 元素节点
        - 文本节点
        - 注释节点
        - 属性节点
        - 根节点
    - DOM提供了网页操作，网页中的节点非常多，操作之前，需要先选中节点，进行样式操作，属性操作，内容操作，元素操作

2. 选择器
    - 根据选中的节点类型划分：
        - 元素节点选择器：id，class，tagName，name，query，queryAll，children，firstElementChild，lastElementChild，parentNode，previousElementSibling，nextElementSibling

        - 其他节点选择器：...

    - 根据选中的节点的数量划分：
        - 单个节点选择器：id，query，firstElementChild，lastElementChild，parentNode，previousElementSibling，nextElementSibling

        - 多个节点选择器：class，tagName，name，queryAll，children

3. 节点的操作（节点的过滤，如何区分不同的节点）
    - 节点都是对象，那么如果需要区分不同的节点类型，需要通过节点的专属属性
    - 节点.nodeType
    - 节点.nodeName
    - 节点.nodeValue
    - 对照表：每种不同的节点所对应的节点属性的值分别是什么

4. 属性操作
    - html属性：可以写在html标签内的属性
        - `<div class="box" title="hello" abc="123"></div>`
        - a标签的href
        - img标签的alt
        - div标签的id
        - input标签的value
        - ...
    - js属性：没有写在html标签内的属性
        - `<div></div>`
        - div.children
        - div.nodeType
        - div.firstElementChild
    - 属性操作要学习的并不是有哪些属性，要学习的是如何操作对应的属性
    - html属性操作语法
        - 内置：对象语法
        - 自定义：专属方法
            - 增改：obox.setAttribute("名", "值");
            - 删：obox.removeAttribute("名");
            - 查：obox.getAttribute("名");
    - js属性操作语法
        - 内置：对象语法
        - 自定义：对象语法
    - 在测试过程中顺带着补充一些新属性
        - className
        - classList
        - tagName
        - 表单控件.checked

5. 样式操作
    - 测试
        - 内联样式：`<div style="width:100px;"></div>`
            - 其本质就是html的内置属性style
            - 获取：div.style.css属性名
            - 设置：div.style.css属性名 = "新值"
        - 非内联样式：
            - css文件内：`div{width:100px;}`
            - html文件内：`<div></div>`
            - 正常浏览器获取：getComputedStyle(div).css属性名
            - IE低版本浏览器获取：div.currentStyle.css属性名
    - 获取样式
        - 采取非行内样式的操作方式
            - 正常浏览器获取：getComputedStyle(div).css属性名
            - IE低版本浏览器获取：div.currentStyle.css属性名
    - 设置样式
        - 采取行内样式的操作方式
            - div.style.css属性名 = "新值"
        - 只有需要被脚本控制样式，才会在js中设置
        - 页面初始的样式，不需要在js中设置，在css文件中处理即可

    - 尺寸类属性的快速获取
        - 元素.clientWidth/Height
        - 元素.offsetWidth/Height
        - 元素.scrollWidth/Height
        - 元素.offsetLeft/Top
        - 元素.scrollLeft/Top
            - 可获取，可设置

6. 内容操作

7. 元素操作

8. DOM应用 - 选项卡切换
    - 
