function xmlData() {
	this.xmlFile = '';
	this.html = '';
	this.itemlist = new Array();
	this.runlist = new Array();
	this.runval = null;
	this.mtime = 0;
	this.goal = 0;

	this.createXMLDOM = function() { //生成XMLDOM对象
		var xmldom;
		if (window.ActiveXObject){
			var xmldom = new ActiveXObject("Microsoft.XMLDOM");
		} else {
			if (document.implementation && document.implementation.createDocument) {
				var xmldom = document.implementation.createDocument("","doc",null);
			}
		}
		xmldom.async = false;
		return xmldom;
	}

	this.readXMLDOM = function() {
		this.html = '';
		this.itemlist = new Array();
		this.runlist = new Array();
		$('show').innerHTML = '';
		if(this.runval!=null) window.clearTimeout(this.runval);
		var xmldom = this.createXMLDOM();
		if (xmldom.load(this.xmlFile)) {
			this.readNodes(xmldom);
			$('show').innerHTML = this.html;
			$('goal').innerText = "$" + this.goal;
			itemlist = this.itemlist;
			if(this.runlist.length>0) this.runval = window.setInterval("xd.itemrun();",10);
		} else {
			alert("游戏结束！");
			pass = 1;
			baglist = 0;
			getmoney = 0; 
			begin();
		}
		return;
	}

	this.readNodes = function(obj) { //生成指定编号节点的树
		var nodes = obj.getElementsByTagName('node');
		if (nodes != null && nodes.length > 0) {
			var nid, ndir, nprop, npos, nadd, nitem, nmoney, nburst;
			for (var i = 0; i < nodes.length; i++) {
				//取得节点编号并检测
				nid = nodes[i].getAttribute('id');				
				ndir = this.getFirstChildData(nodes[i], 'dir');
				nprop = this.getFirstChildData(nodes[i], 'prop');
				npos = this.getFirstChildData(nodes[i], 'pos');
				if (ndir != '' && nprop != '' && npos != '') {
					var pos = npos.split(";");
					var pos1 = pos[0].split(",");
					var prop = nprop.split(",");;
					var temp = new Array();
					temp["nid"] = nid;
					temp["pos1"] = pos[0].split(",");
					temp["pos"] = pos1;
					temp["prop"] = prop;
					temp["add"] = this.getFirstChildData(nodes[i], 'add');
					temp["item"] = this.getFirstChildData(nodes[i], 'item');
					temp["money"] = this.getFirstChildData(nodes[i], 'money');
					temp["burst"] = this.getFirstChildData(nodes[i], 'burst');
					if(pos.length>1) {
						var pos2 = pos[1].split(",");
						temp["pos"].push(pos2[0]);
						temp["pos"].push(pos2[1]);
						this.runlist.push(temp["nid"]);
					}
					this.itemlist.push(temp);
					this.html += '<div id="'+nid+'" style="position:absolute;left:'+pos1[0]+'px;top:'+pos1[1]+'px;"><img src="images/'+ndir+'"></div>';
				}
			}
		}
		var rules = obj.getElementsByTagName('rule');
		if (rules != null && rules.length > 0) {
			this.mtime = this.getFirstChildData(rules[0], 'mtime');
			this.goal = this.getFirstChildData(rules[0], 'goal');
		}
		return;
	}

	this.getFirstChildData = function(obj, name) { //取得指定名称节点的第一个子节点的数据
		var result = '';
		if (typeof(obj) == 'object' && name != null && name != '') {
			var node = obj.getElementsByTagName(name);
			if (node != null && node.length > 0) {
				result = node[0].firstChild.data;
			}
		}
		return result;
	}

	this.itemrun = function () {
		//$("debug").innerText = '';
		for(var i=0; i<this.itemlist.length; i++) {
			if(this.runlist.indexOf(this.itemlist[i]["nid"])!=-1) {
				var info = this.itemlist[i];
				//$("debug").innerHTML += info["nid"]+",";
				if(parseInt(info["pos1"][0])>parseInt(info["pos"][2])) {
					var temp = parseInt(info["pos1"][0]);
					info["pos1"][0] = temp-1;
					$(info["nid"]).style.left = temp;
				}else {
					var temp = info["pos"][0];
					info["pos1"][0] = temp.concat();
					$(info["nid"]).style.left = temp.concat();
				}
			}
		}
		//$("debug").innerHTML += "<br>";
	}
}