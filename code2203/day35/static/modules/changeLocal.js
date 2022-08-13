define(()=>{
    return (localData, id, cb)=>{
        // 找到这条数据
        let i=0;
        const flag = localData.some((val,idx)=>{
            i = idx;
            return val.id === id;
        })
        if(flag){
            // 执行外部要进行的操作：改选中，改数量，删除
            cb(i);
        }
        // 再将数据存回本地存储
        $.cookie("goods", JSON.stringify(localData));
    }
})