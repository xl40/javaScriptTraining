define(()=>{
    return function(cont, serverData, localData){
        let str = "";
        serverData.forEach(val1=>{
            localData.forEach(val2=>{
                if(val1.proId === val2.id){
str += `<tr data-id="${val2.id}">
    <td><input type="checkbox" ${val2.flag ? "checked" : ""} class="check"></td>
    <td><img src="${val1.img}" alt=""></td>
    <td>${val1.proName}</td>
    <td><input type="number" value="${val2.num}" class="setNum" min=1></td>
    <td>${val1.price}</td>
    <td>${val1.price * val2.num}</td>
    <td class="del">删除</td>
</tr>`;
                }
            })
        })
        cont.html(str);
    }
})