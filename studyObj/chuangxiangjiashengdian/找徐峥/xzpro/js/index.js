var word = document.getElementById("word");
var word_wrap = document.getElementById("word_wrap");
var word_star1 = document.getElementById("word_star1");
var word_star2 = document.getElementById("word_star2");
var word_star3 = document.getElementById("word_star3");
var word_star4 = document.getElementById("word_star4");
var supers = document.getElementById("supers");
var phone = document.getElementById("phone");
var super_body = document.getElementById("super_body");
var up = document.getElementById('up');
var loading = document.getElementById('loading');
var game_info_open = document.getElementById('game_info_open');
var game_info_open_two = document.getElementById('game_info_open_two');
var game_info_wrap = document.getElementById('game_info_wrap');
var game_info_close = document.getElementById('game_info_close');
var mengban = document.getElementById('mengban');
var bgsound = document.getElementById('bgsound');
var typesound = document.getElementById('typesound');
var music_on = document.getElementById('music_on');
var music_off = document.getElementById('music_off');
var workarr = ["公元9025年", "外星人为了争夺", "封印在vivo手机中的神秘能量", "发起宇宙战乱","超人徐峥为了保卫神秘能量","带着手机来到浩瀚宇宙中","分身成为8个自己","分别保卫8块手机碎片","消失在太阳系的八大行星中","据说找齐徐峥的8个分身","就能启动神秘能量保护地球","...",""];
var num = 0;
function run() {
    typesound.play();
	var timers = setInterval(function() {
		if (num >= workarr.length-1) {
            typesound.src = "";
			setTimeout (function () {
			word.className = "word";
			setTimeout (function () {
				word.style.display = "none";
				word_star1.style.left = 230+"px";
				word_star1.style.top = 130+"px";
				word_star3.style.left = 210+"px";
				word_star3.style.bottom = 140+"px";
				word_star4.style.left = 70+"px";
			},1000)					
			supers.className = "supers";
			setTimeout (function () {
				phone.className = "phone";
				setTimeout(function () {
					chipFn ();
					setTimeout(function () {
						up.style.display = "block";
					},7000)
					},1000)
				},5000)
			clearInterval(timers);
			},1000);
			return;
		};
		var inner = word.innerHTML;
		word.innerHTML="";
		word.innerHTML=inner+workarr[num]+"<br>";	
		num++;
		
	}, 600);
	
}
// run(0);
// flyFn();

//超人：
function flyFn () {	
	setTimeout (function () {
		super_body.src = "img/super_body2.png"
		setTimeout (function () {
			super_body.src = "img/super_body3.png"
			setTimeout (function () {
				super_body.src = "img/super_body1.png"
				flyFn();
			},300)
		},300)
	},300)
}
var chips = document.querySelectorAll("#phone_wrap>div");
var stars = document.querySelectorAll("#star>img");
var headers = document.querySelectorAll("#phone_wrap>div>img:nth-child(2)");

//碎片：
function chipFn () {
	setTimeout(function () {
		for (var i = 0; i < chips.length; i++) {
		j=i+1;
		stars[i].style.opacity = "1";	
		if (j > 7) {
			return;
		};
		};		
	},4000)
	word_star1.style.opacity = "0";
	word_star2.style.opacity = "0";
	word_star3.style.opacity = "0";
	word_star4.style.opacity = "0";
	for (var i = 0; i < chips.length; i++) {
		j=i+1;
		chips[i].className = "chip"+j;
		headers[i].className = "header";
		if (j > 7) {
			return;
		};
	};	
}

//滑动点击开始游戏：
up.ontouchstart = function () {
	setTimeout(function () {
    	word_wrap.style.display = "none";
		up.style.display = "none";
		window.location.href = "next.html";
    },500)
}
up.ontouchmove = function () {
	setTimeout(function () {
    	word_wrap.style.display = "none";
		up.style.display = "none";
		window.location.href = "next.html";
    },500)
}
up.onclick = function () {
	setTimeout(function () {
		
    	word_wrap.style.display = "none";
		up.style.display = "none";
		window.location.href = "next.html";
    },500)
}

// loading文字：
var dots = document.querySelectorAll(".loading_txt .dot");
// alert(dots.length);
for (var i = 0; i<dots.length; i++){

	var n = i * 0.4;
	dots[i].style.webkitAnimationDelay = n+"s";
	dots[i].style.animationDelay = n+"s";
	dots[i].style.animationName = "loading";
	dots[i].style.webkitAnimationName = "loading";
}

music_on.ontouchstart = function () {
    bgsound.src = "";
    typesound.src = "";
    music_off.style.display = "block";
    music_on.style.display = "none";
}

music_off.ontouchstart = function () {
    bgsound.src = "sound/bg.mp3";
    typesound.src = "sound/type.mp3";
    music_on.style.display = "block";
    music_off.style.display = "none";
}

$('body').on('touchmove', function (event) {
    event.preventDefault();
});