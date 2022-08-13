// - select：
//     1. 立即开启ajax发起请求
//     2. 后端接收到请求后，根据请求信息，读取数据库（模拟）
//     3. 简单处理之后，响应给前端
//     4. 前端接收到数据后，解析数据
//     5. 将数据渲染到页面：根据数据内容，生成页面结构
// - insert：
//     1. 点击添加按钮，记录当前添加状态，自动打开表单，清空表单内容
//     2. 填写信息，点击提交，获取数据
//     3. 开启ajax发送请求，同时携带表单数据
//     4. 后端接收请求，解析数据，存入数据库
//     5. 将最新数据，响应给前端
//     6. 前端接收到数据后，解析数据
//     7. 将数据渲染到页面：根据数据内容，生成页面结构
// - update：
//     1. 点击修改按钮，记录当前修改状态，自动打开表单，从DOM中读取当前数据，填充到表单
//     2. 修改信息，点击提交，获取数据
//     3. 开启ajax发送请求，同时携带表单数据
//     4. 后端接收请求，解析数据，修改数据库
//     5. 将最新数据，响应给前端
//     6. 前端接收到数据后，解析数据
//     7. 将数据渲染到页面：根据数据内容，生成页面结构
class Student{
    constructor(){
        this.tbody = document.querySelector("tbody");
        this.add = document.getElementById("add");
        this.stuId = document.getElementById("stuId");
        this.stuName = document.getElementById("stuName");
        this.result = document.getElementById("result");
        this.submit = document.getElementById("submit");

        


        this.url = "http://localhost:3000/api";

        this.type = 0;      //0添加，1修改

        this.selectLoad();
        this.addEvent();
    }
    addEvent(){
        const that = this;
        this.add.addEventListener("click",function(){
            that.type = 0;
            that.stuId.value = that.stuName.value = that.result.value = "";
            that.stuId.removeAttribute("readonly");
        })
        this.submit.addEventListener("click",function(){
            that.id = (that.stuId.value);
            that.name = (that.stuName.value);
            that.r = (that.result.value);
            if(that.type === 0){
                that.insertLoad();
            }else{
                that.updateLoad();
            }
        })
        // 利用事件委托，给页面上暂时不存在的元素绑定事件
        this.tbody.addEventListener("click", function(eve){
            const e = eve || window.event;
            const target = e.target || srcElement;
            if(target.className.includes("set")){
                const tds = target.parentNode.parentNode.children;
                that.stuId.value = (tds[1].innerText);
                that.stuName.value = (tds[2].innerText);
                that.result.value = (tds[3].innerText);
                that.type = 1;
                that.stuId.setAttribute("readonly","");
            }
        })
    }
    updateLoad(){
        request({
            url:this.url,
            data:{
                type:"update",
                id:this.id,
                name:this.name,
                result:this.r
            },
            success:res=>{
                res = JSON.parse(res);
                if(res.code === 666){
                    this.data = res.data;
                    this.render();
                }else{
                    alert(res.title);
                };
            }
        })
    }
    insertLoad(){
        request({
            url:this.url,
            data:{
                type:"insert",
                id:this.id,
                name:this.name,
                result:this.r
            },
            success:res=>{
                res = JSON.parse(res);
                if(res.code === 666){
                    this.data = res.data;
                    this.render();
                }else{
                    alert(res.title);
                };
            }
        })
    }
    selectLoad(){
        request({
            url:this.url,
            data:{
                type:"select"
            },
            success:res=>{
                res = JSON.parse(res);
                if(res.code === 666){
                    this.data = res.data;
                    this.render();
                }else{
                    alert(res.title);
                };
            }
        })
    }
    render(){
        let str = "";
        this.data.forEach((val,idx)=>{
            str += `<tr>
                        <td>${idx + 1}</td>
                        <td>${val.stuId}</td>
                        <td>${val.stuName}</td>
                        <td>${val.result}</td>
                        <td>
                            <span class="btn btn-danger">删除</span>
                            <button type="button" class="btn btn-warning set" data-toggle="modal" data-target="#exampleModal">
                                修改
                            </button>
                        </td>
                    </tr>`;
        })
        this.tbody.innerHTML = str;
    }
}
new Student();