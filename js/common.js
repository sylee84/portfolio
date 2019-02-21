var $body;
$(document).ready(function() {
  $body = $('body');
  bodyHide();
  windowRwd();
  cardTrans();
  cardSwiper();
});
function windowRwd(){
  window.onload = function() {
    if ($(window).width() < 800){
      $body.addClass('mobile').removeClass('pc');
      //document.location.href = "/m/front/static/index.html";
    }else{
      $body.addClass('pc').removeClass('mobile');
    }
  }
  window.onresize = function() {
    if ($(window).width() < 800){
      $body.addClass('mobile').removeClass('pc');
      //document.location.href = "/m/front/static/index.html";
    }else{
      $body.addClass('pc').removeClass('mobile');
    }
  }
}
function bodyHide(){
  $body.hide().fadeIn(1500);
}
function cardTrans(){
  $('.click').click(function(){
    var $portCard = $('.portfolio_card');
    if(!$portCard.hasClass('on')){
      $portCard.addClass('on');
    }else{
      $portCard.removeClass('on');
    }
  })
}
function cardSwiper(){
  var swiper = new Swiper('.swiper-container', {
    loop:true,
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 300,
      modifier: 1,
      slideShadows : true,
    },
    pagination: {
			el: '.swiper-pagination',
			type: 'fraction',
		},
  });
}
