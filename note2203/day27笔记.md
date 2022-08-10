# 一、本地存储
1. 本地，当前设备，客户端。
2. 本地存储，将数据存储在本地设备上，而不是存储在服务器或服务器内的数据库上
    - 意义：用来存储不需要跨设备的数据。
        - 跨设备：需要借助服务器存储
        - 表单的记住上次输入的信息
        - 记住浏览历史
        - 记住本地操作
3. 本地存储的技术：cookie，localStorage，sessionStorage
4. 本地存储的特点
    - 存储在浏览器的缓存中
    - 只能存储文本（字符）
    - 有大小限制
    - 时效性
    - 安全性

# 二、本地存储技术 - cookie
1. 通信协议：双方进行数据传输时需要共同遵守的约定和规则。
2. TCP：面向连接的可靠协议，三次握手
3. UDP：面向数据包的不可靠协议，有可能会造成数据丢失
4. http：超文本传输协议，网页传输协议，建立在TCP的基础之上的一种高层协议。记不住每次连接产生的信息。
    - 会话跟踪技术，也叫cookie，帮助http记录连接过程中产生的信息
    - http每次建立连接时，都会自动携带cookie发往服务器或客户端
5. cookie的特点
    - 大小：4K~
        - 1G===1024M
        - 1M===1024K
    - 数量：50条~
    - 时效性：
        - 默认有效期：会话级（关闭浏览器自动删除）
        - 可以修改成指定日期
    - 不允许跨域：谁存谁读
        - 不允许跨域：
            - 同源策略：同协议，同域名，同端口
        - 不允许跨路径：子可以获取父，父不能获取子，兄弟之间不能获取
            - /abc/hahaha/qwe
            - /abc/hei/qwe
            - 存：/abc/hahaha
            - 读：/abc  读不到
            - 读：/abc/hahaha  可以读，读当前
            - 读：/abc/hahaha/qwe  可以读，在子路径中读
            - 读：/abc/hei  读不到
            - 读：/abc/hei/qwe  读不到
        - 不允许跨浏览器
            - 谷歌或火狐
    - 自动跟随http协议发往服务器
6. cookie的使用语法
    - 环境：因为cookie会跟随http协议发往服务器，所以cookie一般在服务器下被使用。
    - cookie是document对象下的一个属性
        - document.cookie = 要设置的cookie的内容
    - 要设置的cookie的内容：（增，改，删）
        - 必须是字符
        - 一次只能操作一条cookie
        - 格式，如："key=value"
            - 设置了一条当前路径，会话级的cookie
        - cookie设置之后，可以紧跟一些修饰，之间用分号隔开
            - 设置有效期：expires
                - 如："key=value;expires="+日期对象
            - 设置路径：path
                - 如："key=value;path=/abc"
            - 设置有效期和路径
                - 如："key=value;path=/abc;expires="+日期对象
    - 查（默认查所有当前路径能获取到的cookie）：document.cookie
7. cookie的封装
    - 增
    - 删
    - 查：根据名字，查指定值
8. cookie的应用 - 案例
    - 记住账号密码3天

# 三、本地存储技术 - localStorage和sessionStorage
1. HTML5的标准中新增的技术，都是属于window的子对象
2. 不会随着http协议发往服务器
3. 大小：5M
4. 时效性：
    - localStorage：只能永久级
    - sessionStorage：只能会话级
5. 不允许跨域，不允许跨浏览器，没有路径
6. 操作
    - 作为对象操作：
        - localStorage.xxx
        - localStorage.xxx = yyy;
    - 使用自身提供的方法操作：√
        - localStorage.setItem("key","val")
        - localStorage.getItem("key")
        - localStorage.removeItem("key")
        - localStorage.clear()
    - localStorage的操作和sessionStorage的操作一致

# 四、购物车功能 - 利用本地存储，跨页面通信
1. 购物车功能：
    - 商品列表
        - 点击添加购物车
    - 购物车
        - 可以看到在商品列表中点击添加的商品
    

# 作业
1. 熟悉cookie的语法
2. 熟悉localStorage和sessionStorage的语法
3. 记住账号密码7天
4. 记住网页元素拖拽的位置（刷新之后，元素停留在最后拖拽的位置）
5. 购物车
    - 商品列表
    - 添加商品数据到本地存储
