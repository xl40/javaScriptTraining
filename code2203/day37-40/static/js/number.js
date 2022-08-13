class InputNumber{
    constructor(ops){
        // 1. 接收并处理参数
        this.min = ops.min || 0;
        this.max = ops.max || 100;
        this.step = ops.step || 1;
        this.value = ops.value || 0;
        this.cont = ops.cont || document.createElement("div");
        // 2. 生成页面结构
        this.createDOM();
    }
    createDOM(){
        this.reduce = document.createElement("span");
        this.reduce.className = "reduce";
        this.add = document.createElement("span");
        this.add.className = "add";
        this.ipt = document.createElement("input");
        this.ipt.setAttribute("class", "ipt");
        this.reduce.innerText = "-";
        this.add.innerText = "+";
        this.ipt.value = this.value;
        this.cont.appendChild(this.reduce);
        this.cont.appendChild(this.ipt);
        this.cont.appendChild(this.add);
        // 3. 绑定事件，准备操作数字框
        this.addEvent();
    }
    addEvent(){
        const that = this;
        this.reduce.addEventListener("click", function(){
            let n = that.ipt.value-0;
            // 判断是否是最小值，如果是，永远等于最小值
            if(n === that.min){
                n = that.min;
            }else{
                // 如果不是最小值，根据步长减少
                n-=that.step;
            }
            // 设置回输入框
            that.ipt.value = n;
        })
        this.add.addEventListener("click", function(){
            let n = that.ipt.value-0;
            // 判断是否是最大值，如果是，永远等于最大值
            if(n === that.max){
                n = that.max;
            }else{
                // 如果不是最大值，根据步长增加
                n+=that.step;
            }
            // 设置回输入框
            that.ipt.value = n;
        })
        this.ipt.addEventListener("input",function(){
            const val = this.value;
            // 判断当前内容是否是数字，不是数字，不要，是数字，留着
            let s = "";
            for(let i=0;i<val.length;i++){
                if(/\d/.test(val[i])){
                    s += val[i];
                }
            }
            // 将全部是数字的内容，填充到输入框
            this.value = s;
            // 最小值设置
            if(val === "" || val <= that.min){
                this.value = that.min;
            }
            // 最大值设置
            if(val >= that.max){
                this.value = that.max;
            }
        })
    }
}