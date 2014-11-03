// JavaScript Document

$(document).ready(function () {

  $('#booking,.close,.cancel-booking').on('click', toggleModal);
  $('#arrive,#departure').on('focus', showDatePicker);

  function toggleModal() {
    $("body").toggleClass('modal-enabled');
    $("dialog").toggleClass('active');
    $("header,main,footer").toggleClass('fade');
  }

  function showDatePicker() {
    if ( $('#datepicker').length <= 0 ){
      var datePicker = document.createElement('div');
      datePicker.setAttribute('id', "datepicker");
      var parentDatePicker = document.getElementById('booking-form');
      parentDatePicker.appendChild(datePicker);

      $('#datepicker').datepicker({
          dateFormat: 'yy-m-d',
          inline: true,
          minDate: 0,
          onSelect: function(dateText, inst) {
              var date = $(this).datepicker('getDate'),
                  day  = date.getDate(),
                  month = date.getMonth() + 1,
                  year =  date.getFullYear();
              alert(day + '-' + month + '-' + year);
          }
      });
    }
  }

  $( window ).scroll(function() {
    if(window.scrollY > 130){
      $('.nav_container').addClass('nav_fixed');
      $('.slider').addClass('margined-top');
    }
    if(window.scrollY < 130){
      $('.here').removeClass();
      $('.nav_container').removeClass('nav_fixed');
      $('.slider').removeClass('margined-top');
    }
  });
  $('a[href=#top]').click(function(e) {
    e.preventDefault;
    $('html, body').animate({scrollTop:0}, 'slow');
    return false;
  });
  $('a[href*=#]:not([href=#])').click(function() {
    $('.here').removeClass();
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 70
        }, 1000);
        $(this).toggleClass('here');
        return false;
      }
    }
  });

  /////////////////////////////////////////
  var rooms;
  var table = document.getElementById('table_rates');
  var http_request = new XMLHttpRequest();
  http_request.open("GET", "http://localhost:8888/hotel.cat/tmp/rooms.txt", true);
  http_request.onreadystatechange = function () {
    var done = 4, ok = 200;
    if (http_request.readyState === done && http_request.status === ok) {
        rooms = JSON.parse(http_request.responseText);
        initialize();
    }
  };
  http_request.send(null);

  function initialize(){
    rooms.forEach(function ( index ) {
      draw(index);
    })
  }
  function draw( obj ) {
    var tbody = document.createElement('tbody');
    var tr = document.createElement('tr');
    var th = document.createElement('th');
    var thId = document.createElement('th');
    var tdBaja = document.createElement('td');
    var tdMedia = document.createElement('td');
    var tdAlta = document.createElement('td');
    thId.innerHTML = obj.id;
    tdBaja.innerHTML = obj.temp_baja;
    tdMedia.innerHTML = obj.temp_media;
    tdAlta.innerHTML = obj.temp_alta;

    tr.appendChild(thId);
    tr.appendChild(tdBaja);
    tr.appendChild(tdMedia);
    tr.appendChild(tdAlta);
    tbody.appendChild(tr);
    table.appendChild(tbody);
  }

  /////////////////////////////////////////
  var init = function() {
    var carousel = document.getElementById('carousel'),
        navButtons = document.querySelectorAll('#navigation img'),
        panelCount = carousel.children.length,
        //transformProp = Modernizr.prefixed('transform'),
        theta = 0,

        onNavButtonClick = function( event ){
          var increment = parseInt( event.target.getAttribute('data-increment') );
          theta += ( 360 / panelCount ) * increment * -1;
          carousel.style.transform = 'rotateY(' + theta + 'deg)';
        };

    for (var i=0; i < 2; i++) {
      navButtons[i].addEventListener( 'click', onNavButtonClick, false);
    }

  };

  window.addEventListener( 'DOMContentLoaded', init, false);
})
