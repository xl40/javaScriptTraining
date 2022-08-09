define(()=>{
    return (localData, c, checkEles)=>{
        [...checkEles].forEach(val=>{
            val.checked = c;
        })
        // 同步到本地存储中
        localData.forEach(val=>{
            val.flag = c;
        })
        $.cookie("goods", JSON.stringify(localData));
    }
})