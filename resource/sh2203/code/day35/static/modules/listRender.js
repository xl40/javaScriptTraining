define(()=>{
    return function(cont, res){
        let str = "";
        res.forEach(val=>{
            str += `<div class="item">
                <img src="${val.img}" alt="">
                <p>${val.price}</p>
                <p>${val.proName}</p>
                <p><button data-id="${val.proId}" class="add">加入购物车</button></p>
            </div>`
        })
        cont.html(str);
    }
})