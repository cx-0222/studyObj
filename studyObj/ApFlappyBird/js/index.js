//var bb = document.querySelector("body");
//document.onclick = function(){
//	alert(bb.offsetWidth);//打印手机的宽
//}

//function getEleByClass(classStr) {
//	return document.querySelector("." + classStr);//通过class获取元素
//}

//全局盒子 100% width 100% height
var flappyBird = document.querySelector(".flappyBird");
//开始页面
var start = document.querySelector(".start");
//提示页面
var prompt = document.querySelector(".prompt");
//结束页面
var gameOver = document.querySelector(".gameOver");
//全局小鸟
var bird = document.querySelector(".bird");
//全局管道
var pipe = document.querySelector(".pipe");
//全局分数
var score = document.querySelector(".score");
//地板
var floor = document.querySelector(".floor");
//奖牌
var endMedal  = document.getElementById("end_medal");
//结束分数
var endScore  = document.getElementById("end_score");
//最高分数
var bestScore  = document.getElementById("best_score");
//过关音乐
var scoreMusic = document.getElementById("score_music");
//死掉音乐
var dieMusic = document.getElementById("die_music");
//碰撞音乐
var hitMusic = document.getElementById("hit_music");
//飞行音乐
var flyMusic1 = document.getElementById("fly_music1");
var flyMusic2 = document.getElementById("fly_music2");



//随机函数
function randomNum(max, min) {
	return parseInt(Math.random() * (max - min + 1)) + min;
}

//入口
function initGame() {
	//1.点击start 按钮，进入提示页面(进入游戏)
	start.children[2].addEventListener('click', gameStart);
	//2.预备工作
	//promptJob ();
}

//1.进入游戏
function gameStart(e) {
	//console.log("2222")
	var ev = e || event;
	ev.cancelBubble = true; //阻止事件冒泡
	start.style.display = "none";
	prompt.style.display = "block";
	bird.style.display = "block";
	score.style.display = "block";
	isReady = true;
	//2.预备工作
	promptJob();
}

//2.预备工作
function promptJob() {
	//① 点击屏幕任何部位 小鸟跳跃
	document.onclick = function() {
			birdJump();
			document.onclick = null; //让该绑定的事件在一次生命周期中只存活一次
			document.addEventListener("click", birdJump);
			//② 产生管道
			//prompt.onclick = function(){
			creatPipe();
			//}
			//③ 检测碰撞
			checkCrash()
		}
		//document.addEventListener("click",birdJump);
		//② 产生管道
		//prompt.onclick = function(){
		//creatPipe();
		//}
	//③ 检测碰撞
}

// ==============================全局变量============================

var isReady = false;
var isOver = false;
var upTimer = null;
var downTimer = null;
var maxSpeed = 8;
var speed = maxSpeed;
var pipeTimer = null; //管道生成定时器
var checkTimer = null;
var scoreNum = 0;


//3.小鸟跳跃
function birdJump() {
	if(isReady && !isOver) {
		//开始跳跃
		prompt.style.display = "none";
		//取消小鸟css动画，走js动画
		bird.className = "bird";
		//每一次起跳，都获得一次最大速度  否则在下降过程中速度降为
		speed = maxSpeed;
		clearInterval(upTimer);
		clearInterval(downTimer);
		birdUp();
		//console.log("111")
	}
}
//上升
function birdUp() {
	flyMusic1.play();
	flyMusic2.play();
	bird.style.transform = "rotate(-20deg)";
	upTimer = setInterval(function() {
		if(!isOver) {
			speed -= 0.4;
			if(speed <= 0) {
				clearInterval(upTimer);
				speed = 0;
				birdDown();
			}
			//console.log("shangsheng");

			if(bird.offsetTop >= -30) {
				bird.style.top = bird.offsetTop - speed + "px";
			}

			//console.log(bird.offsetTop - speed);
		}
	}, 30);
}
//下降
function birdDown() {
	//console.log("xiajiang")
	downTimer = setInterval(function() {
		if(!isOver) {
			speed += 0.4;
			var degree = speed * 6 - 20;
			if(degree <= 90) {
				bird.style.transform = "rotate(" + degree + "deg)";
			} else {
				bird.style.transform = "rotate(90deg)";
			}
			bird.style.top = bird.offsetTop + speed + "px";
		}
	}, 30);
}

//生成管道
function creatPipe() {
	pipe.style.display = "block";
	pipeTimer = setInterval(function() {
		//创建单个管道
		var li = document.createElement("li");
		var upDiv = document.createElement("div");
		var downDiv = document.createElement("div");
		upDiv.className = "pp_up";
		downDiv.className = "pp_down";

		//一个管道最多只能增加一分，顾添加分数锁
		var numLock = false;
		//随机设置管道缝隙的高度
		var num = randomNum(200, 40);
		upDiv.style.top = -num + "px";
		downDiv.style.bottom = num - 240 + "px";

		li.appendChild(upDiv);
		li.appendChild(downDiv);
		pipe.appendChild(li);

		//var liExist = true;//li是否存在
		//管道运动	
		var deviceWidth = flappyBird.offsetWidth;
		li.style.left = deviceWidth + "px";

		var liTimer = setInterval(function() {
			if(!isOver) {
				deviceWidth -= 2;
				li.style.left = deviceWidth + "px";
				//if(deviceWidth <= li.offsetWidth && liExist){
				if(deviceWidth <= -li.offsetWidth) {
					pipe.removeChild(li);
					//liExist = false;
					clearInterval(liTimer);
				}
				if(deviceWidth < bird.offsetLeft - li.offsetWidth && !numLock) {
					scoreNum++;
					score.children[0].innerHTML = scoreNum;
					scoreMusic.play();
					numLock = true;
				}
			}
		}, 16);
	}, 2000);
}

//检测碰撞
function checkCrash() {
	checkTimer = setInterval(function() {
		// 检测和管道是否碰撞
		for(var i = 0; i < pipe.children.length; i++) {
			isCrash(pipe.children[i].children[0]);
			isCrash(pipe.children[i].children[1]);
			//isCrash(pipe);
			//isCrash(pipe);
		}
		//检测和地面是否碰撞
		if(bird.offsetTop > 519 - bird.offsetWidth) {
			hitMusic.play();
			//console.log("撞地了");
			//游戏结束
			GameOver();
		}
	}, 10);
}

//是否碰撞
function isCrash(obj) {
	var objT = obj.offsetTop;

	var objB = obj.offsetTop + obj.offsetHeight;
	var objL = obj.parentElement.offsetLeft;
	//console.log(objL);
	var objR = obj.parentElement.offsetLeft + obj.offsetWidth;

	var birdT = bird.offsetTop;
	var birdB = bird.offsetTop + bird.offsetHeight;
	var birdL = bird.offsetLeft;
	var birdR = bird.offsetLeft + bird.offsetWidth;

	if(!(birdT > objB || birdB < objT || birdL > objR || birdR < objL)) {
		//console.log("撞管子了");
		hitMusic.play();
		//游戏结束
		GameOver();
	}
}

//游戏结束
function GameOver() {
	//console.log("撞了");
	//清除所有定时器
	//定时器均为数字！！
	//console.log(upTimer, downTimer, pipeTimer, checkTimer);
	//	var timer = setTimeout(function(){},30);
	//	for(var i = 0; i < timer;i++){
	//		clearInterval(i);
	//	}

	clearInterval(upTimer);
	clearInterval(downTimer);
	clearInterval(pipeTimer);
	clearInterval(checkTimer);
	isOver = true;
	dieMusic.play();
	//地板停下
	floor.children[0].style.animationPlayState = "paused";
	//翅膀停下
	bird.children[0].style.animationPlayState = "paused";
	//鸟落到地面
	bird.style.transform = "rotate(90deg)";
	bird.style.top = 519 - bird.offsetHeight + "px";
	gameOver.style.display = "block";
	gameOver.children[2].onclick = function() {
		location.reload();
		gameOver.style.display = "none";
	}
	//设置奖牌
	if(scoreNum < 3){
		endMedal.style.backgroundImage = "url(img/medal/platinum.png)";
	}else if(scoreNum < 5){
		endMedal.style.backgroundImage = "url(img/medal/bronze.png)";
	}else if(scoreNum < 7){
		endMedal.style.backgroundImage = "url(img/medal/silver.png)";
	}else{
		endMedal.style.backgroundImage = "url(img/medal/glod.png)";
	}
	//设置分数
	endScore.innerHTML = scoreNum;
	//设置最高分
	//console.log(localStorage.bestScore);
	if(localStorage.bestScore) {//赋值
				var a = localStorage.bestScore > scoreNum ? localStorage.bestScore : scoreNum;
				bestScore.innerHTML = a;
				localStorage.bestScore = a;
			} else {//第一次玩的时候，localStorage.bestScore 为0，所以走这，之后便不需要
				bestScore.innerHTML = scoreNum;
				localStorage.bestScore = scoreNum;
			}
}
initGame();