var $body;
$(document).ready(function() {
  $body = $('body');
  bodyHide();
  windowRwd();
});
function windowRwd(){
  window.onload = function() {
    if ($(window).width() < 1200){
      $body.addClass('mobile').removeClass('pc');
      //document.location.href = "/m/front/static/index.html";
    }else{
      $body.addClass('pc').removeClass('mobile');
    }
  }
  window.onresize = function() {
    if ($(window).width() < 1200){
      $body.addClass('mobile').removeClass('pc');
      //document.location.href = "/m/front/static/index.html";
    }else{
      $body.addClass('pc').removeClass('mobile');
    }
  }
}
function bodyHide(){
  $body.hide().fadeIn(3000);
}
