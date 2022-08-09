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

        // 2. 点击显示模态框
        this.show();
        this.createHead();
        this.createBody();
        this.createFoot();
        // 3. 根据参数确定是否需要生成各种按钮或元素
        this.createCloseElement();
        this.createSaveElement();
        this.createCrossElement();
        this.createTitleElement();
        // 4. 绑定事件
        this.addEvent();
        // 5. 自动关闭模态框
        this.autoClose && this.autoCloseFn();
    }
    autoCloseFn(){
        setTimeout(() => {
            this.hide();
        }, this.autoCloseTime);
    }
    addEvent(){
        const that = this;
        this.crossElement && (this.crossElement.onclick = function(){
            that.hide();
        })
        this.closeBtnElement && (this.closeBtnElement.onclick = function(){
            that.hide();
        })
        this.saveElement && (this.saveElement.onclick = function(){
            that.save(that.me);
        })
        this.me.onclick = function(){
            if(that.closeMask){
                that.hide();
            }else{
                console.log("此处应有动画");
            }
        }
        this.me.children[0].onclick = function(eve){
            eve.stopPropagation();
        }

    }
    createHead(){
        this.head = document.createElement("div");
        this.head.className = "modal_head";
        this.me.children[0].appendChild(this.head);
    }
    createBody(){
        this.body = document.createElement("div");
        this.body.className = "modal_body";
        this.me.children[0].appendChild(this.body);
    }
    createFoot(){
        this.foot = document.createElement("div");
        this.foot.className = "modal_foot";
        this.me.children[0].appendChild(this.foot);
    }
    show(){
        // 此处应该让模态框显示
        this.me.style.display = "block";
    }
    createCloseElement(){
        if(this.closeBtn){
            this.closeBtnElement = document.createElement("span");
            this.closeBtnElement.className = "close";
            this.closeBtnElement.innerHTML = "关闭";
            this.foot.appendChild(this.closeBtnElement);
        }
    }
    createSaveElement(){
        if(this.saveBtn){
            this.saveElement = document.createElement("span");
            this.saveElement.className = "save";
            this.saveElement.innerHTML = "保存";
            this.foot.appendChild(this.saveElement);
        }
    }
    createCrossElement(){
        if(this.closeCross){
            this.crossElement = document.createElement("span");
            this.crossElement.className = "cross";
            this.crossElement.innerHTML = "x";
            this.head.appendChild(this.crossElement);
        }
    }
    createTitleElement(){
        this.titleElement = document.createElement("h2");
        this.titleElement.className = "sross";
        this.titleElement.innerHTML = this.titleText || "这是默认标题";
        this.head.appendChild(this.titleElement);
    }
    hide(){
        this.me.style.display = "none";
        this.close();
    }
}