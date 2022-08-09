//ajax GET
function getAjax(url){
	var p = new Promise(function(success,error){
		if(XMLHttpRequest){
			var ajax = new XMLHttpRequest();
		}else{
			var ajax = new ActiveXObject("Microsoft.XMLHTTP");
		}
		ajax.open("GET",url,true);
		ajax.onreadystatechange = function(){
			if(ajax.status == 200 && ajax.readyState == 4){
				success(ajax.responseText);
			}
			if(ajax.status != 200){
				error(ajax.status);
			}
		}
		ajax.send();
	})
	return p;
}

//ajax POST
function postAjax(url,data){
	if(!data) data = null;
	var p = new Promise(function(success,error){
		if(XMLHttpRequest){
			var ajax = new XMLHttpRequest();
		}else{
			var ajax = new ActiveXObject("Microsoft.XMLHTTP");
		}
		ajax.open("POST",url,true);
		ajax.onreadystatechange = function(){
			if(ajax.status == 200 && ajax.readyState == 4){
				success(ajax.responseText);
			}
			if(ajax.status != 200){
				error(ajax.status);
			}
		}
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajax.send(data);
	})
	return p;
}

//JSONP跨域
function getJsonp(url,cb){
	var p = new Promise(function(success,error){
		window[cb] = function(res){
			success(res)
		}
		var script = document.createElement("script");
		script.src = url;
		document.body.appendChild(script);
	})
	return p;
}