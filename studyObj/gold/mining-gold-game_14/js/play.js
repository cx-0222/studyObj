function go()
{
	div=$("div");
	line=$("line");
	
	div.width=parseInt(div.currentStyle.width);
	div.height=parseInt(div.currentStyle.height);
	div.oldleft=0;
	div.oldtop=0;
	div.downleft1=0;
	div.downtop1=0;
	div.downleft2=0;
	div.downtop2=0;
	
	line.strokecolor="#000000";
	line.strokeweight="1px";
	line.to="295,75";

	line.pleft=295;
	line.ptop=75;
	line.plength=0;
	
	line.from=line.pleft+","+line.ptop;
	
	div.setpos=div_setpos;
	div.setcirc=div_setcirc;
	div.setcirc(-19,1,"l");
	document.onkeydown = keyDown;   
	if(ns4) document.captureEvents(Event.KEYDOWN);
	flag = false;
	b_flag = false;
	g_flag = false;
}
function div_setcirc(xleft,xtop,act) 
{
	div.setpos(xleft,xtop);
	var left = act=="r"?(xleft-1):(xleft+1);
	var top = left<0?(act=="r"?(xtop-1):(xtop+1)):(act=="r"?(xtop+1):(xtop-1));
	if(left==-19) {left = -18; top = 2; act="l";}
	if(left==19) {left = 18; top = 2; act="r";}
	t_int = setTimeout("div.setcirc("+left+","+top+",'"+act+"')",100);
}
function div_setpos(xleft,xtop)
{
	div.xleft=xleft;
	div.xtop=xtop;

	var qa=0;
	if(xtop==0){
		qa=Math.PI/2;
	}else{
		qa=Math.atan(xleft/xtop);
	}
	var lx=Math.abs(parseInt((div.width/2)*Math.cos(qa)));
	var ly=Math.abs(parseInt((div.width/2)*Math.sin(qa)));
	var dx=Math.abs(parseInt(div.height*Math.cos(qa)));
	var dy=Math.abs(parseInt(div.height*Math.sin(qa)));

	if(xleft>=0){
		div.style.left=line.pleft+xleft-lx;
		div.style.top=line.ptop+xtop-ly;
		div.downleft1=line.pleft+xleft-lx+dx;
		div.downtop1=line.ptop+xtop-ly+dy;
		div.downleft2=line.pleft+xleft+lx;
		div.downtop2=line.ptop+xtop+ly;
		line.to=(line.pleft+xleft)+","+(line.ptop+xtop);
	}else{
		var x1=Math.abs(div.width*Math.tan(qa));
		var x2=div.height-x1;
		var w2=x2*Math.sin(qa);
		var w1=x1/Math.sin(qa);
		var w=Math.abs(w1+w2);

		div.style.left=line.pleft+xleft-(parseInt(w)-lx);
		div.style.top=line.ptop+xtop-ly;
		div.downleft1=line.pleft+xleft-(parseInt(w)-lx)+dx;
		div.downtop1=line.ptop+xtop-ly+dy;
		div.downleft2=line.pleft+xleft;
		div.downtop2=line.ptop+xtop+ly;

		line.to=(line.pleft+xleft)+","+(line.ptop+xtop);
	}
	with(div.filters.item(0)){
		M11=Math.cos(qa);
		M12=Math.sin(qa);
		M21=-Math.sin(qa);
		M22=Math.cos(qa);
	}
}
function div_setdrawgo() 
{	
	if(flag) {
		var qa=Math.PI/2;
		if(div.xtop!=0) qa=Math.atan(div.oldleft/div.oldtop);
		var xtop=div.xtop+1;
		var xleft=parseInt(xtop*Math.tan(qa));

		div.setpos(xleft,xtop);
		var dleft = parseInt(div.style.left);
		var dtop = parseInt(div.style.top);
		for(var k=0; k<xd.itemlist.length; k++) {
			if(isBetween(xd.itemlist[k]["pos1"][0],div.downleft1,xd.itemlist[k]["prop"][0]) && isBetween(xd.itemlist[k]["pos1"][1],div.downtop1,xd.itemlist[k]["prop"][1]) && isBetween(xd.itemlist[k]["pos1"][0],div.downleft2,xd.itemlist[k]["prop"][0]) && isBetween(xd.itemlist[k]["pos1"][1],div.downtop2,xd.itemlist[k]["prop"][1])) {
				//$("debug").innerText = xd.itemlist[k]["pos1"][0]+","+dleft+","+xd.itemlist[k]["prop"][0]+"<br>";
				//$("debug").innerText += xd.itemlist[k]["pos1"][1]+","+dtop+","+xd.itemlist[k]["prop"][1]+"<br>";
				if(xd.itemlist[k]["burst"] == "true") {
					window.clearInterval(xd.runval);
					$(xd.itemlist[k]["nid"]).childNodes[0].src = "images/burst.gif";
					g_flag = true;
					window.setTimeout("div_burst("+k+");",1000);
				}else {
					if(xd.runlist.indexOf(xd.itemlist[k]["nid"])!=-1) {
						window.clearInterval(xd.runval);
						xd.runlist = xd.runlist.RemoveAt(xd.runlist.indexOf(xd.itemlist[k]["nid"]));
						xd.runval = window.setInterval("xd.itemrun();",10);
					}
					div_getitem(k);
					g_flag = true;
				}
				break;
			}
		}
		window.status = div.style.left+","+div.style.top;
		if(xleft>-250 && xleft<300 && xtop<360 && !g_flag) setTimeout("div_setdrawgo()",5);
		else if(!g_flag) div_setdrawback();
	}
}
function div_setdrawback() 
{
	var xtop=div.xtop-1;
	var qa=Math.PI/2;
	if(div.xtop!=0) qa=Math.atan(div.oldleft/div.oldtop);
	var xleft=parseInt(xtop*Math.tan(qa));
	div.setpos(xleft,xtop);
	//$("debug").innerText = xleft+"!="+div.oldleft +"&&"+ xtop+"!="+div.oldtop +"&&"+ flag;
	if((div.oldleft==0 || xleft!=div.oldleft) && xtop!=div.oldtop && flag) setTimeout("div_setdrawback()",5);
	else if(flag){
		$("wimg").src = "images/worker2.gif";
		div.setcirc(div.oldleft,div.oldtop,"l");
		g_flag = false;flag = false;
	}
}
function div_getitem(i) 
{
	var xtop=div.xtop-1;
	var qa=Math.PI/2;
	if(div.xtop!=0) qa=Math.atan(div.oldleft/div.oldtop);
	var xleft=parseInt(xtop*Math.tan(qa));
	div.setpos(xleft,xtop);
	$(xd.itemlist[i]["nid"]).style.left = parseInt(div.style.left)-5;
	$(xd.itemlist[i]["nid"]).style.top = parseInt(div.style.top)+15;
	if (b_flag) {
		$("show").removeChild($(xd.itemlist[i]["nid"]));
		xd.itemlist = xd.itemlist.RemoveAt(i);
		g_flag = false; b_flag = false;
		div_setdrawback();
	}else if((div.oldleft==0 || xleft!=div.oldleft) && xtop!=div.oldtop && flag) {
		setTimeout("div_getitem("+i+")",5+parseInt(xd.itemlist[i]["add"]));
	}else {
		if(xd.itemlist[i]["item"]!="") {
			baglist += parseInt(xd.itemlist[i]["item"]);
			for(var b=0; b<xd.itemlist[i]["item"]; b++) $("shots").innerHTML += '<img src="images/shot.gif">';
		}
		if(xd.itemlist[i]["money"]!="") {
			getmoney += parseInt(xd.itemlist[i]["money"]);
			$("nowcount").innerText = "$" + getmoney;
		}
		$("wimg").src = "images/worker2.gif";
		$("show").removeChild($(xd.itemlist[i]["nid"]));
		xd.itemlist = xd.itemlist.RemoveAt(i);
		div.setcirc(div.oldleft,div.oldtop,"l");
		g_flag = false;flag = false;
	}
}
function div_burst(i) {
	var left = parseInt(xd.itemlist[i]["pos1"][0])+parseInt(xd.itemlist[i]["prop"][0])/2;
	var top = parseInt(xd.itemlist[i]["pos1"][1])+parseInt(xd.itemlist[i]["prop"][1])/2;
	var nid = xd.itemlist[i]["nid"];
	xd.itemlist = xd.itemlist.RemoveAt(i);
	xd.runval = window.setInterval("xd.itemrun();",10);
	for(var b=0; b<xd.itemlist.length; b++) {
		if(isBetween(left-100,xd.itemlist[b]["pos1"][0],100) && isBetween(top-100,xd.itemlist[b]["pos1"][1],100)) {
			if(xd.runlist.indexOf(xd.itemlist[b]["nid"])!=-1) {
				xd.runlist = xd.runlist.RemoveAt(xd.runlist.indexOf(xd.itemlist[b]["nid"]));
			}
			$("show").removeChild($(xd.itemlist[b]["nid"]));
			xd.itemlist = xd.itemlist.RemoveAt(b);
		}
	}
	$("show").removeChild($(nid));
	g_flag = false;
	div_setdrawback();
}
function isBetween(Min, Check, Add) {
	var numMin = parseInt(Min);
	var numCheck = parseInt(Check);
	var numMax = parseInt(Min) + parseInt(Add);
	return (numMin<numCheck && numCheck<numMax);
}
function keyDown(e) {   
	if (ie4 && event.keyCode==40 && !flag) {
		window.clearTimeout(t_int);
		div.oldleft=div.xleft;
		div.oldtop=div.xtop;
		flag = true;
		div_setdrawgo();
		$("wimg").src = "images/working.gif";
	} 
	if (ie4 && event.keyCode==38 && g_flag) {  //�Ϸ������ը��
		if (baglist>0) {
			//alert("197");
			baglist --;
			b_flag = true;
			var oChild=$("shots").children(0);
			$("shots").removeChild(oChild);
		}
	}
}


function TimeEvent()
{
	xd.mtime--;
	if(Math.floor(xd.mtime/60/10)==0)
	{
		$("times").innerText='0';
	}
	else
	{
		$("times").innerText='';
	}

	$("times").innerText+=Math.floor(xd.mtime/60%10);
	if(Math.floor(xd.mtime%60/10)==0)
	{
		$("times").innerText='0';
	}
	else
	{
		$("times").innerText='';
	}

	$("times").innerText+=Math.floor(xd.mtime%60);
	if(xd.mtime<=0)
	{
		flag = false;end();
	}
	else
	{
		setTimeout("TimeEvent()",1000);
	}
}