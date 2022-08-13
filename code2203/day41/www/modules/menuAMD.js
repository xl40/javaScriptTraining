define(function() {
    return function(cont){
        // ajax向后端发送一个请求，并接收后端返回的响应
        // ajax的固定流程
        const xhr = new XMLHttpRequest();
        xhr.open("get", "http://localhost:5000/api?type=menu", true);
        xhr.onload = function(){
            if(xhr.status === 200){
                
                const arr = JSON.parse(xhr.responseText);
                console.log(arr);

                let s1 = ``;
                arr.forEach(val=>{
                    console.log(val);
                    s1 += `<li>
                        <span>${val.name ? val.name : ''}</span>
                        <ul>
                            ${twoMenu(val.children ? val.children : [])}
                        </ul>
                        </li>`
                });
                cont.innerHTML = s1;

                function twoMenu(data){
                    let s = "";
                    data.forEach(val=>{
                        s += `<li>
                            <span>${val.name}</span>
                            <ul>
                                ${threeMenu(val.children)}
                            </ul>
                            </li>`;
                    })
                    return s;
                }

                function threeMenu(data){
                    let s = "";
                    data.forEach(val=>{
                        s += `<li style="color:${val.hot ? 'red' : ''}">${val.name}</li>`
                    })
                    return s;
                }
            }
        }
        xhr.send();
    }
});