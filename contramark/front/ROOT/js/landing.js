//윈도우 크기 계산
function img_load(){
	var $Wheight = $(window).height();
	var $Wwidth = $(window).width();
	$('#section00').css({
		'width':$Wwidth,
		'height':$Wheight
	});
	$('.sec05_tlt').css({
		'width':$Wwidth,
		'height':$Wheight - 130 + 'px'
	});
		
}

//시간설정
//CountDownTimer('01/01/2017', 'countdown'); // 2017년 1월 1일까지
CountDownTimer('12/14/2017 07:15 AM', 'countdown'); // 2018년 1월 1일까지, 시간을 표시하려면 01:00 AM과 같은 형식을 사용합니다.

function CountDownTimer(dt, id){
	var end = new Date(dt);

	var _second = 1000;
	var _minute = _second * 60;
	var _hour = _minute * 60;
	var _day = _hour * 24;
	var timer;

	function showRemaining() {
		var now = new Date();
		var distance = end - now;
		if (distance < 0) {

			clearInterval(timer);

			return;
		}
		var days = Math.floor(distance / _day);
		var hours = Math.floor((distance % _day) / _hour);
		var minutes = Math.floor((distance % _hour) / _minute);
		var seconds = Math.floor((distance % _minute) / _second);

		document.getElementById(id).innerHTML = '<span>'+days+'</span>';
		document.getElementById(id).innerHTML += '<span>'+hours+'</span>';
		document.getElementById(id).innerHTML += '<span>'+minutes+'</span>';
		document.getElementById(id).innerHTML += '<span>'+seconds+'</span>';
	}

	timer = setInterval(showRemaining, 1000);
}

$(document).ready(function() {
	//gnb 스크롤 위치
	$(".gnb li a").click(function(e) {
		e.preventDefault();
		var $head = $('header').height();
		var idx = $(this).parent("li").index();
		var posTop = $("#section0" + idx).offset().top - $head;

		$("html, body").stop().animate({
			scrollTop: posTop
		}, 1000, 'easeInOutExpo');
	});
	setTimeout(function() {
		$("section").bind('inview', function (event, visible) {
			if (visible) {
				if(!$(this).hasClass("inview")) {
					if ($(this).offset().top + 200){
						$(this).addClass("inview");
					}
				}
			}
		});
		$(".action").bind('inview', function (event, visible) {
			if (visible) {
				if(!$(this).hasClass("act")) {
					$(this).addClass("act").prev().addClass("active");
				}
			}
		});
	}, 500);
	/*$(window).on("scroll",function(){
		var ht=$(window).height();
		var scroll=$(window).scrollTop();
		for(var i=0; i<6; i++){
			
			if(scroll >= ht*i && scroll < ht*(i+1)){
				//$('.section').prev().addClass("fix");
				//$('.section').eq(i).addClass("on");
			} 
		}
	});*/
	//스크롤 section 이동
	/*$("section").on("mousewheel",function(event,delta){
		if(delta>0){ //올렸을때
		   //변수 prev에 현재 휠을 움직인 section에서 이전 section의 offset().top위치저장;
			var prev=$(this).prev().offset().top - $head;
		   //문서 전체를 prev에 저장된 위치로 이동
			 $("html,body").stop().animate({"scrollTop":prev},1000);
		}else if(delta<0){//내렸을때
			//변수 prev에 현재 휠을 움직인 section에서 이전 section의 offset().top위치저장;
			var next=$(this).next().offset().top - $head;
		   //문서 전체를 prev에 저장된 위치로 이동
			 $("html,body").stop().animate({"scrollTop":next},1000);
		}
	});*/

	//header 이벤트 배너
	$('.top_event').click(function(){
		$('.top_event_con').toggleClass('ov').toggle();
	})
	$('.top_event_con .close').click(function(){
		$('.top_event_con').removeClass('ov').hide();
	})

	//brand 슬라이드
	$('.sec05_view_slider').bxSlider({
		auto: false,
		mode: 'fade',
		pagerCustom: '#sec05_view_s_slider'
	});

	//product 슬라이드
	var sec02Slider = $( '#section02 .sub_visual ul' ).bxSlider({
		auto: true,
		slideWidth: 410,
		controls: false,
		autoHover: true,
		speed:500,
		pause:2500
	} );
	jQuery(window).on('scroll', function() {
		if ($('#section02').hasClass("inview")){
			jQuery('button.sec02_btn').trigger('click')
		}
	}) 
	$('button.sec02_btn').one('click', function() {
		sec02Slider.reloadSlider();  
		console.log('aaa')
	}) 
	/*jQuery(window).on('scroll', function(e) {
		if (window.scrollY > 3000){
			jQuery('button.sec02_btn').trigger('click');
		}
	}) */

	//product 슬라이드
	$( '.ingredient_slide ul' ).bxSlider({
		auto: false,
		slideWidth: 1178,
		infiniteLoop: false,
		pager: false, 
		speed:500
	} );
});