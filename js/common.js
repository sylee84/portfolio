var $body;
$(document).ready(function() {
  $body = $('body');
  bodyHide();
  windowRwd();
  cardTrans();
  cardSwiper();
  // $('.menu a').click(function(){
  //   $('#mclick').attr('checked',false);
  // })
});
function windowRwd(){
  window.onload = function() {
    if ($(window).width() < 800){
      $body.addClass('mobile').removeClass('pc');
      //document.location.href = "";
    }else{
      $body.addClass('pc').removeClass('mobile');
    }
  }
  window.onresize = function() {
    if ($(window).width() < 800){
      $body.addClass('mobile').removeClass('pc');
      //document.location.href = "";
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
   var $this = $(this);
    if(!$this.parent().hasClass('on')){
      $this.parent().addClass('on');
    }else{
      $this.parent().removeClass('on');
    }
  })
}
function cardSwiper(){
    var sPd, roTa, moDi;
    if ($(window).width() < 800){
      sPd = 500;
      roTa = 80;
      moDi = 1;
    }else{
      sPd = 800;
      roTa = 90;
      moDi = 3;
    }
    var swiper = new Swiper('.portslide.swiper-container', {
      loop:false,
      speed: sPd,
      effect: 'coverflow',
      grabCursor: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: roTa,
        stretch: 150,
        depth: 100,
        modifier: moDi,
        slideShadows : false,
      },
      pagination: {
        el: '.portslide .swiper-pagination',
        type: 'fraction',
      },
      navigation: {
        nextEl: '.portslide-prev',
        prevEl: '.portslide-next',
      },
    });
    swiper.on('slideChange', function () {
      $('.portslide li > div').removeClass('on');
    });
}
