require.config({
    baseUrl:"./modules"
})

require(["menuAMD"],(menu)=>{
    const cont = document.querySelector(".menu")
    menu(cont);
})