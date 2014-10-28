// JavaScript Document

$(document).ready(function () {
  $( "#datepicker" ).datepicker();
  $('#booking').on('click', function () {
    $("#calendar").toggleClass('active');
  })
  $( window ).scroll(function() {
    if(window.scrollY > 130){
      $('.nav_container').addClass('nav_fixed');
      $('.slider').addClass('margined-top');
    }
    if(window.scrollY < 130){
      $('.nav_container').removeClass('nav_fixed');
      $('.slider').removeClass('margined-top');
    }
  });

  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      console.log(target);
      if($('[name=' + this.hash.slice(1) +']') == "top"){
        $('html,body').animate({
          scrollTop: 0
        }, 1000);
        return false;
      }
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 70
        }, 1000);
        return false;
      }
    }
  });
})
