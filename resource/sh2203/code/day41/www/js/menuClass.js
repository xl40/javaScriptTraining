class Menu{
    constructor(cont){
        this.cont = cont;
        this.load();
    }
    load(){
        this.ajax((res)=>{
            const arr = JSON.parse(res);
            this.oneMenu(arr);
        });
    }
    oneMenu(arr){
        let s1 = ``;
        arr.forEach(val=>{
            console.log(val);
            s1 += `<li>
                <span>${val.name ? val.name : ''}</span>
                <ul>
                    ${this.twoMenu(val.children ? val.children : [])}
                </ul>
                </li>`
        });
        this.cont.innerHTML = s1;
    }
    threeMenu(data){
        let s = "";
        data.forEach(val=>{
            s += `<li style="color:${val.hot ? 'red' : ''}">${val.name}</li>`
        })
        return s;
    }
    twoMenu(data){
        let s = "";
        data.forEach(val=>{
            s += `<li>
                <span>${val.name}</span>
                <ul>
                    ${this.threeMenu(val.children)}
                </ul>
                </li>`;
        })
        return s;
    }
    ajax(cb){
        const xhr = new XMLHttpRequest();
        xhr.open("get", "http://localhost:5000/api?type=menu", true);
        xhr.onload = function(){
            cb(xhr.responseText);
        }
        xhr.send();
    }
}

