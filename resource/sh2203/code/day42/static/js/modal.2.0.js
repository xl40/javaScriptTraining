class Modal{
    constructor(ops={}){
        // 1. 处理默认参数
        if(ops.modalElement){
            this.me = ops.modalElement
        }else{
            console.log("你连个元素都不传，你想把模态框放在哪里？？？")
            return;
        }
        this.closeBtn = ops.closeBtn===undefined ? true : ops.closeBtn;
        this.closeCross = ops.closeCross===undefined ? true : ops.closeCross;
        this.closeMask = ops.closeMask===undefined ? true : ops.closeMask;
        this.autoClose = ops.autoClose===undefined ? true : ops.autoClose;
        this.autoCloseTime = ops.autoCloseTime || 2000;
        this.close = ops.close || function(){};
        this.pos = ops.position || "top";
        this.size = ops.size || "small";
        this.animateIn = ops.animateIn  || "",
        this.animateOut = ops.animateOut  || "",
        this.saveBtn = ops.saveBtn===undefined ? true : ops.saveBtn;
        this.save = ops.save || function(){};
        this.titleText = ops.titleText || "这是默认标题"

        this.cont = this.me.children[0];
        this.body = this.cont.children[0];

        // 将来this.hide会作为事件处理函数使用，会导致函数内部的this指向改变
        // 需要使用bind方法修改this指向
        // 又因为bind每次执行返回的是新函数，如果重复执行，导致绑定和删除时不是同一个函数
        // 所以需要提前使用bind修改hide内部的this指向，绑定和删除时使用同一个函数
        this.h = this.hide.bind(this);
        this.s = this.save.bind(this);

        // 2. 点击显示模态框
        this.show();
        // 3. 处理模态框的样式
        this.addStyle();
        // 4. 给模态框创建头部
        this.head = this.createBox("modal_head");
        this.cont.insertBefore(this.head, this.body);
        // 5. 给模态框创建底部
        this.foot = this.createBox("modal_foot");
        this.cont.appendChild(this.foot);
        // 6. 根据参数确定是否需要生成各种按钮或元素
        // 关闭按钮
        this.closeBtnElement = this.createElement(this.closeBtn, "close", "关闭", this.foot);
        // 保存按钮
        this.saveElement = this.createElement(this.saveBtn, "save", "保存", this.foot);
        // 右上角x号
        this.crossElement = this.createElement(this.closeCross, "cross", "x", this.head);
        // 标题部分
        this.titleElement = this.createElement(true, "title", this.titleText, this.head);
        // 7. 绑定事件
        this.addEvent();
        // 8. 自动关闭模态框
        this.autoClose && this.autoCloseFn();
    }
    addEvent(){
        const that = this;
        this.crossElement && this.crossElement.addEventListener("click",this.h);

        this.closeBtnElement && this.closeBtnElement.addEventListener("click", this.h);

        this.saveElement && this.saveElement.addEventListener("click", this.s);

        this.maskHide = function(){
            if(that.closeMask){
                that.hide();
            }else{
                console.log("此处应有动画");
            }
        }

        this.me.addEventListener("click", this.maskHide);

        this.stopBubble = function(eve){
            eve.stopPropagation();
        }
        this.cont.addEventListener("click", this.stopBubble);
    }
    removeEvent(){
        this.cont.removeEventListener("click", this.stopBubble);
        this.me.removeEventListener("click", this.maskHide);

        this.crossElement && this.crossElement.removeEventListener("click", this.h);
        this.closeBtnElement && this.closeBtnElement.removeEventListener("click", this.h);
        this.saveElement && this.saveElement.removeEventListener("click", this.s);
    }
    addStyle(){
        if(this.pos === "center"){
            this.cont.style.cssText = "top:0;bottom:0;margin-top:auto;margin-bottom:auto";
        }else{
            this.cont.style.top = "";
            this.cont.style.bottom = "";
            this.cont.style.marginTop = "";
            this.cont.style.marginBottom = "";
        }
        
        if(this.size === "large"){
            this.cont.style.width = "600px";
        }else{
            this.cont.style.width = "300px";
        }
    }
    show(){
        this.me.style.display = "block";
    }
    hide(){
        this.removeEvent();
        this.me.style.display = "none";
        this.head.remove();
        this.foot.remove();
        this.close();
    }
    createBox(className){
        const div = document.createElement("div");
        div.className = className;
        return div;
    }
    createElement(flag, className, value, box){
        if(flag){
            const span = document.createElement("span");
            span.className = className;
            span.innerHTML = value;
            box.appendChild(span);
            return span;
        }
    }
    autoCloseFn(){
        clearTimeout(this.t);
        this.t = setTimeout(() => {
            this.hide();
        }, this.autoCloseTime);
    }
}