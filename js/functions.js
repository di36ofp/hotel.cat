// JavaScript Document

$(document).ready(function () {
  $( "#datepicker" ).datepicker();
  $('#booking').on('click', function () {
    $("#calendar").toggleClass('active');
  })
  $( window ).scroll(function() {
    $( "span" ).css( "display", "inline" ).fadeOut( "slow" );
    console.log(window.scrollY)
  });
})
