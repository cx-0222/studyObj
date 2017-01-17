$person_wrap_width = $('.person_wrap').width();
var timer = null;
var pic_num=2;
var lv=1;		//存放关数
var tietou = []; //存放铁头人数的数组
var rnd_arr=[];   //存放徐峥随机数字的数组 取最后那个就是。
var tietou_num = 4;   //存放铁头个数
var suipianbol = false;
var timer_set = null;
var padd = 7;
var timer_txt=null;
var background_sound = document.getElementById('background_sound');
var music = document.getElementById('music');
var music_a = document.getElementById("music_a");

//生成人物div

// var pic_arr = ["img/suipian_one.png","img/suipian_two.png","img/suipian_three.png","img/suipian_four.png","img/suipian_five.png","img/suipian_six.png","img/suipian_seven.png","img/suipian_eight.png"];

// for (var i = 0; i < pic_arr.length; i++) {
// 	var Xzsuipian_pic = new Image();
// 		Xzsuipian_pic.src= pic_arr[i];
// 	Xzsuipian_pic.onload = function(){
// 		alert(this.src);
// 	}
// };
//没铁头时的页面
function fdd(){
	suipianFn();
	pic_num++;
}
// 有铁头时的页面
function createTietou(){
	$('.person_kuang').remove();
	// pic_num = 5;
	creaDiv();
	tietou_append();
}

//生成包贝尔 然后徐峥替换一个的函数、
function creaDiv(){
	// alert(pic_num);
	// pic_num++;
	var rnd = Math.floor(Math.random()*(pic_num*pic_num));
	rnd_arr.push(rnd);
	// console.log(rnd_arr);
	var cont = '<div class="person_kuang"><img src="img/baobei.png" alt=""></div>';
	for (var i = 0; i < pic_num*pic_num; i++) {
		$('.person_wrap').append(cont)
	};
	$('.person_wrap img')[rnd].src="img/xuzheng.png";
	$('.person_wrap img')[rnd].className = "xuzheng";
	// $('.person_wrap img')[rnd].style.background = 'red';

	$('.person_kuang img').bind("touchstart",function(){
				
		if (this.className == "xuzheng"){
			// suipianFn();
			lv++;
			bgsound.pause();
				// alert(lv);

			clearInterval(timer_txt);
			if (lv==9) {

				// sucss();
			}
			
			fdd();
		}
	})
	$kuang_width = $person_wrap_width-pic_num;

	$('.person_kuang').width($kuang_width*1/pic_num);
}

creaDiv();

// alert(pic_num);

//每关对应的碎片
var index = 0;

function suipianFn(){
	index++;

	$('.suipian_wrap').css("display","block");
		clearInterval(timer);
		// alert($(".suipian_wrap").css("display"));


	timer_set = setTimeout(function(){
			$('.suipian_wrap').css("display","none");
			timerFn();
			// index++;
			titieFn();
			clearInterval(timer_txt);
			// sucss();
			if(lv==5){
				
				tietou_num = 4;
				pic_num=5;
				createTietou();
				$('.person_kuang img').css('padding',"4px");
			}
			else if (lv==7) {
				tietou_num = 5;
				pic_num=6;
				createTietou();
				$('.person_kuang img').css('padding',"2px");
			}else if(lv==9&& $('.suipian_wrap').css("display") == "none"){
				clearInterval(timer);
				sucss();
				bgsound.pause();
				background_sound.play();
				music.className="music_js";
        		music.style.WebkitAnimationPlayState="running";
        		music_a.src="img/music_o.png";
			}
			else{

				$('.person_kuang').remove();
				creaDiv();
					padd--;
				$('.person_kuang img').css('padding',padd+"px");
			
			}
			
if ($(window).height()<=500) {

	if (lv==2) {
		$('.person_kuang img').css('max-height','70px');
	}
	if (lv==3) {
		$('.person_kuang img').css('max-height','50px');
	}
	if (lv==4 || lv==5) {
		$('.person_kuang img').css('max-height','38px');
	}
	if (lv==6 || lv==7) {
		$('.person_kuang img').css('max-height','32px');
	}
	if (lv==8) {
		$('.person_kuang img').css('max-height','28px');
	}
}
	},3000);

	switch(index){
		case 1:$(".suipian_bg h3").html('你获得1/8碎片');
			$(".suipian_bg p").html('像初恋一样手感的');
			$(".suipian_bg span").html('双2.5D弧面玻璃');

		break;
		case 2:$(".suipian_bg h3").html('你获得2/8碎片');

			$(".suipian_pic").css("background-position","-272px 4px")
			$(".suipian_bg p").html('帮助你防火防盗');
			$(".suipian_bg span").html('防女友的眼球识别加密系统');
			
		break;
		case 3:$(".suipian_bg h3").html('你获得3/8碎片');

			$(".suipian_pic").css("background-position","-546px 4px")
			$(".suipian_bg p").html('帮你省下单反钱的');
			$(".suipian_bg span").html('1300万像素镜头');

		break;
		case 4:$(".suipian_bg h3").html('你获得4/8碎片');

			$(".suipian_pic").css("background-position","2px 4px")
			$(".suipian_bg p").html('促进多巴胺分泌的');
			$(".suipian_bg span").html('Hi-Fi音质耳放');

		break;
		case 5:$(".suipian_bg h3").html('你获得5/8碎片');

			$(".suipian_pic").css("background-position","-135px 4px")
			$(".suipian_bg p").html('可以自动区分女汉子和男妹子的');
			$(".suipian_bg span").html('知性美颜系统');

		break;
		case 6:$(".suipian_bg h3").html('你获得6/8碎片');

			$(".suipian_pic").css("background-position","3px -129px")
			$(".suipian_bg p").html('快得能让时间变慢的');
			$(".suipian_bg span").html('八核1.7GHz处理器');

		break;
		case 7:$(".suipian_bg h3").html('你获得7/8碎片');

			$(".suipian_pic").css("background-position","-140px -129px")
			$(".suipian_bg p").html('轻松抓拍多动症患者的');
			$(".suipian_bg span").html('PDAF快速相应对焦系统');

		break;
		case 8:$(".suipian_bg h3").html('你获得8/8碎片');

			$(".suipian_pic").css("background-position","-286px -129px")
			$(".suipian_bg p").html('duang duang duang效果的');
			$(".suipian_bg span").html('Function OS系统')

		break;
	}
		
}
//头部切换标题
var tit_num = 0;
function titieFn(){
	tit_num++;
	switch(tit_num){
		case 1:$(".game_title").html("第二关 金星");
		break;
		case 2:$(".game_title").html("第三关 地球");
		break;
		case 3:$(".game_title").html("第四关 火星");
		break;
		case 4:$(".game_title").html("第五关 木星");
		break;
		case 5:$(".game_title").html("第六关 土星");
		break;
		case 6:$(".game_title").html("第七关 天王星");
		break;
		case 7:$(".game_title").html("第八关 海王星");
		break;
	}
}




//倒计时
var timestart =30.00;
var timeEnd = 0.00;
// alert(a<b);
var bgsound = document.getElementById('bgsound');
var sound = document.getElementById('sound');

function timerFn(){
	clearInterval(timer);
	succ_sound.pause();
	false_sound.pause();
	sound.pause();
	bgsound.play();
	timer = setInterval(function(){
		timestart-=0.01;
		timestart = timestart>timeEnd?timestart:timeEnd;
		if (timestart==timeEnd) {
			clearInterval(timer);
			sound.play();
			$('.game_false_mengban').css("display","block");
			bgsound.pause();
			
		}
		timestart =timestart.toFixed(2);

		$("#time").html(timestart.split(".").join(":"));
	},10)
	// clearInterval(timer);
}
// timerFn();


// 生成铁头
function creaTietou(){
		var arr=[];
		for (var i = 0; i < (tietou_num+1)*(tietou_num+1); i++) {
			arr.push(i);
		}
	
		while(tietou.length<tietou_num){
		var rand = Math.floor(Math.random()*(tietou_num+1)*(tietou_num+1));
		// alert(rand);
			if (arr[rand] != -1 && arr[rand]!=rnd_arr[rnd_arr.length-1]) {
				tietou.push(rand);
				arr[rand] = -1;
			}
		}
	// console.log(tietou);
}
//第五，第7关的时候插入铁头
function tietou_append(){
	// suipianFn();
	// $('.person_kuang').remove();
	// creaDiv();
		if (tietou.length==0) {
			creaTietou();
		}
		else{
			tietou.splice(0,tietou.length);
			creaTietou();
		}
		for (var i = 0; i< tietou.length; i++) {
			// alert(rnd_arr[rnd_arr.length-1]);

		if (tietou[i]==rnd_arr[rnd_arr.length-1]) {
				var rnd_num = rnd_arr[rnd_arr.length-1];

				creaTietou();
			$('.person_wrap img')[tietou[i]].src="img/tietou.png";
		}
		else{
			$('.person_wrap img')[tietou[i]].src="img/tietou.png";
			}
	}
}

//点击碎片时 碎片消失的fn

$('.suipian_wrap').bind("touchstart",function(){
	clearInterval(timer_set);
	$('.suipian_wrap').css("display","none");
	// alert(lv);

	timerFn();
	titieFn();
	clearInterval(timer_txt);
	if(lv==5){
		
		tietou_num = 4;
		pic_num=5;
		createTietou();
		$('.person_kuang img').css('padding',"4px");
	}
	else if (lv==7) {
		tietou_num = 5;
		pic_num=6;
		createTietou();
		$('.person_kuang img').css('padding',"2px");
	}
	else if(lv==9 && $('.suipian_wrap').css("display") == "none"){
		sucss();
		bgsound.pause();
		background_sound.play();
         music.className="music_js";
        music.style.WebkitAnimationPlayState="running";
        music_a.src="img/music_o.png";
       
        songs_bol = true;
	}
	else{
		$('.person_kuang').remove();
		creaDiv();
		padd--;
		$('.person_kuang img').css('padding',padd+'px');
		
	}
if ($(window).height()<=500) {

	if (lv==2) {
		$('.person_kuang img').css('max-height','70px');
	}
	if (lv==3) {
		$('.person_kuang img').css('max-height','50px');
	}
	if (lv==4 || lv==5) {
		$('.person_kuang img').css('max-height','38px');
	}
	if (lv==6 || lv==7) {
		$('.person_kuang img').css('max-height','32px');
	}
	if (lv==8) {
		$('.person_kuang img').css('max-height','28px');
	}
}
})

//文字逐个逐个显示
var worksarr = ["旺德福", "你已集齐徐峥分身", "Vivo X5pro碎片开始合体", "合体中","..."];
var vivo_txt_wrap = document.getElementById('vivo_txt_wrap');
var timer_txt = null;

function running(num) {
	var i = 0;

	// alert(num);
	timer_txt = setInterval(function() {
		vivo_txt_wrap.innerHTML += worksarr[num].charAt(i);
		i++;
		if (i == worksarr[num].length) {
			clearInterval(timer_txt);
			vivo_txt_wrap.innerHTML += "<br>";
			running(num+1);
		}
		
	}, 80)
	if (num ==5) {
		clearInterval(timer_txt);
	}
		
}

//点击弹出中奖框
	// $(".draw_b").bind("touchstart",function(){
		// $(".draw_mengban").css("display","block");
		// $('.false_mengban').css("display","block");
	
	// })
	
//再试一次的点击框
	$('.try_b span').bind("touchstart",function(){
		bgsound.play();
		$('.draw_mengban').css('display','none');
		$(".game_false_mengban").css("display","none");
		// $('.false_mengban').css('display',"none");
		 game_try();
	})

// 返回游戏点击框

$('.back_b span').bind("touchstart",function(){
	vivo_txt_wrap.innerHTML ="";
	boli_none();
	$('.false_mengban').css("display","none");
	$('.draw_mengban').css('display','none');
	$(".game_false_mengban").css("display","none");
	$('.game_title').css("display","block");
	$('.kuang_wrap').css("display","block");
	$('#color_ribbon').css("display","none");
	$('#vivo_txt_wrap').css('display',"none");
	$('.deb_wrap').css('display',"none");
	game_try();
	background_sound.pause();
	$('.deb_one').css('display','none');
	$('.deb_two').css('display','none');
	$('.deb_three').css('display','none');
	$('.deb_four').css('display','none');
	$('.deb_five').css('display','none');
	$('.deb_six').css('display','none');
	$('.deb_seven').css('display','none');
	$('.deb_eight').css('display','none');
	$('.vivo_phone').css("display","none");
	// sucss();
	    // bg.pause();
         // music.className="";

        music.style.WebkitAnimationPlayState="paused";
        music_a.src="img/songs_p.png";
        songs_bol = false;

	})


function fdd(){
	suipianFn();
	pic_num++;
}
// 有铁头时的页面
function createTietou(){
	$('.person_kuang').remove();
	// pic_num = 5;
	creaDiv();
	tietou_append();
}

function sucss(){
		clearInterval(timer);

		$('game_false_mengban').css('display',"none");
		$('.deb_wrap').css('display',"block");
		$("#vivo_txt_wrap").css("display","block");
		$('.game_title').css("display","none");
		$('.kuang_wrap').css("display","none");
		setTimeout(function(){
		$('.deb_one').css("display","block");
		$('.deb_one').addClass('.deb_one ani_one');
		$('.deb_two').css("display","block");
		$('.deb_two').addClass('.deb_two ani_two');
		$('.deb_three').css("display","block");
		$('.deb_three').addClass('.deb_three ani_three');
		$('.deb_four').css("display","block");
		$('.deb_four').addClass('.deb_four ani_four');
		$('.deb_five').css("display","block");
		$('.deb_five').addClass('.deb_five ani_five');
		$('.deb_six').css("display","block");
		$('.deb_six').addClass('.deb_six ani_six');
		$('.deb_seven').css("display","block");
		$('.deb_seven').addClass('.deb_seven ani_seven');
		$('.deb_eight').css("display","block");
		$('.deb_eight').addClass('.deb_eight ani_eight');
		$("#vivo_txt_wrap").css("display","none");
		},3500)
		running(0);


		setTimeout(function(){
			$('.deb_one').addClass('.deb_one animated fadeOut');
			$('.deb_two').addClass('.deb_one animated fadeOut');
			$('.deb_three').addClass('.deb_one animated fadeOut');
			$('.deb_four').addClass('.deb_one animated fadeOut');
			$('.deb_five').addClass('.deb_one animated fadeOut');
			$('.deb_six').addClass('.deb_one animated fadeOut');
			$('.deb_seven').addClass('.deb_one animated fadeOut');
			$('.deb_eight').addClass('.deb_one animated fadeOut');
			
			$('.vivo_phone').css("display","block");
			$('.vivo_phone').addClass('.vivo_phone animated fadeIn');
		},6000)
}
// 再一次游戏的fn()
function game_try(){
	bgsound.play();
	lv=1;
	timestart = 30.00;
	timerFn();
	tit_num = 0;
	pic_num=2;
	index= 0;
	$('.person_kuang').remove();
	creaDiv();
	$(".game_title").html("第一关 水星");
}

function boli_none(){
	// $(".deb_one").css('display','none');
	// $(".deb_two").css('display','none');
	// $(".deb_three").css('display','none');
	// $(".deb_five").css('display','none');
	// $(".deb_six").css('display','none');
	// $(".deb_seven").css('display','none');
	// $(".deb_eight").css('display','none');
	$('.vivo_phone').css("display","none");
	$('.deb_one').removeClass('.deb_one animated fadeOut');
	$('.deb_two').removeClass('.deb_one animated fadeOut');
	$('.deb_three').removeClass('.deb_one animated fadeOut');
	$('.deb_four').removeClass('.deb_one animated fadeOut');
	$('.deb_five').removeClass('.deb_one animated fadeOut');
	$('.deb_six').removeClass('.deb_one animated fadeOut');
	$('.deb_seven').removeClass('.deb_one animated fadeOut');
	$('.deb_eight').removeClass('.deb_one animated fadeOut');
}

//改变中奖框的 margin
if ($(window).height()<=500) {
	if(lv==1){
		// alert("");
		$('.person_kuang img').css('max-height','114px');
	}
}

//关闭背景音乐 

var songs_bol = false;
music.style.WebkitAnimationPlayState="paused";
music.addEventListener("touchstart",function(){
    if (songs_bol == false) {
       background_sound.play();
         music.className="music_js";
        music.style.WebkitAnimationPlayState="running";
        music_a.src="img/music_o.png";
       
        songs_bol = true;
        // alert("停止")
    }
    else if (songs_bol == true){
            music_a.src="img/songs_p.png";
            
            music.style.WebkitAnimationPlayState="paused";
            // $('#music').removeClass('music_js');
            background_sound.pause();
            songs_bol = false;
            // alert("播放")
     
    }
})