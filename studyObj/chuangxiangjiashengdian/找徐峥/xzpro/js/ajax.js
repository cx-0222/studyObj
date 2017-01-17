function ajaxFn(url,succFn,failFn){

	if (window.XMLHttpRequest){
		var ajax = new XMLHttpRequest();
	}else{
		var ajax = new ActiveXObject("Msxml2.XMLHTTP");
	}

	ajax.open("get",url,true);

	ajax.send();

	ajax.onreadystatechange = function (){

		if (ajax.readyState == 4){
			if (ajax.status >= 200 && ajax.status < 300 || ajax.status == 304){

				if (succFn){
					succFn(ajax.responseText);
				}
			}else{

				if (failFn){
					failFn(ajax.status);
				}
			}
		}
	}
}






