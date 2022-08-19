# 一、复习 + 作业
1. ES6新增的class语法
    ```js
    class Test{
        constructor(xxx){
            // 构造函数部分，用来加工属性或执行方法
            this.xxx = xxx;
            this.yyy()
        }
        // 原型部分，用来加工方法
        yyy(){
            // 方法功能
            console.log(this.xxx);
        }
    }
    new Test();
    ```
2. 作业
    - 轮播图的左按钮无缝轮播
    - 一个类实现烟花效果
    
# 二、烟花
1. 下落版
2. 圆周版

# 三、面向对象案例 - 思考
1. 放大镜 - https://item.jd.com/100033910926.html

2. 瀑布流 - https://huaban.com/search?q=%E9%A3%8E%E6%99%AF
    - 不使用css的多列布局
    - 核心还是css，js只是辅助计算

# 四、作业
1. 放大镜 - 底部图片列表，点击图片切换相关图片
2. 瀑布流 - 思考
    - 关于onload
    - 就算把js代码写在body结束标签后，也需要加onload事件，否则会出现问题
        - 为什么？