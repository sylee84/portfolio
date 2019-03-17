
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

	//gnb on/off
	$('header .gnb_btn').click(function(){
		$('.gnb').show();
	});
	$('.gnb .gnb_close').click(function(){
		$('.gnb').hide();
	});
	$('.gnb li').click(function(){
		$('.gnb').hide();
	});

	//header 이벤트 배너
	$('.top_event').click(function(){
		$('.top_event_con').toggleClass('ov').toggle();
	})
	$('.top_event_con .close').click(function(){
		$('.top_event_con').removeClass('ov').hide();
	})

	//시간차 클래스
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
		$(".action2").bind('inview', function (event, visible) {
			if (visible) {
				if(!$(this).hasClass("act2")) {
					$(this).addClass("act2").next().addClass("active2");
				}
			}
		});
	}, 500);

	//sec02_visual 슬라이드
	var sec02swiper = new Swiper('.sec02_visual', {
		mode: 'horizontal',
		pagination: {
			el: '.swiper-pagination',
			type: 'fraction',
		},
		navigation: {
			nextEl: '.sec02_btn_next',
			prevEl: '.sec02_btn_prev',
		},
		slidesPerView: 1,
		loop: false
	}); 

	//sec04_visual 슬라이드
	var sec04swiper = new Swiper('.sec04_visual', {
		mode: 'horizontal',
		pagination:false,
		navigation: {
			nextEl: '.sec04_btn_next',
			prevEl: '.sec04_btn_prev',
		},
		slidesPerView: 1,
		loop: false
	}); 
});