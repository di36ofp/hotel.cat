// JavaScript Document
$(document).ready(function () {
  /*
   * Modal booking
   */
  (function () {
    function toggleModal () {
      $("body").toggleClass('modal-enabled');
      $("dialog").toggleClass('active');
      $("header,main,footer").toggleClass('fade');
    }

    $('#booking,.close,.cancel-booking').on('click', toggleModal);
  }());
  /*
   * Show Datepicker and save date in input
   */
  (function () {
    function showDatePicker ( booking_action ) {
      var input = booking_action;
      var booking_action = 'datepicker_' + booking_action;
      if ( $('#' + booking_action).length <= 0 ){
        var datePicker = document.createElement('div');
        datePicker.setAttribute('id', booking_action);
        var parentDatePicker = document.getElementById('booking-form');
        parentDatePicker.appendChild(datePicker);
        $('#' + booking_action).datepicker({
            dateFormat: 'yy-m-d',
            inline: true,
            minDate: 0,
            onSelect: function (dateText, inst) {
                var date = $(this).datepicker('getDate'),
                    day  = date.getDate(),
                    month = date.getMonth() + 1,
                    year =  date.getFullYear();
                    $( "#" + input).val(day + '-' + month + '-' + year);
                    $( '#' + booking_action ).remove();
            }
        });
      }
    }
    document.getElementById('arrive').addEventListener('focus', function () {
        showDatePicker ('arrive');
    }, false);

    document.getElementById('daparture').addEventListener('focus', function () {
        showDatePicker ('daparture');
    }, false);
  }());
  /*
   * Booking
   */
  (function () {
    function doNext () {
      var max_inputs = $('#booking-form').find(':input').length,
          counter = 0;
      $('#booking-form').find(':input').
                        each(function() {
                          if ( this.value.length < 0 || this.value == "" ){
                            var error = true;
                          }
                          counter++;
                          if ( !error  && max_inputs == counter ){
                            $( '#booking-form' ).submit();
                          }
                        });
    }
    document.getElementById('booking_next').addEventListener('click', function () {
        doNext ();
    }, false);
  }());
  /*
   * Retrieve data from URL
   */
  (function () {
    var qs = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p=a[i].split('=', 2);
            if (p.length == 1)
                b[p[0]] = "";
            else
                b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'));

    if( $( "#booking_table" ).length){
      for (var prop in qs) {
        console.log(prop + " " +qs[prop]);
      }
    }

  }());
  /*
   * Navigation effects
   */
  (function () {
    $( window ).scroll(function() {
      if(window.scrollY > 130){
        $('.nav_container').addClass('nav_fixed');
        $('.slider').addClass('margined-top');
      }else{
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
  }());
  /*
   * Rooms pricing
   */
  (function () {
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
      });
    }
    function draw( obj ) {
      var tbody = document.createElement('tbody'),
          tr = document.createElement('tr'),
          th = document.createElement('th'),
          thId = document.createElement('th'),
          tdBaja = document.createElement('td'),
          tdMedia = document.createElement('td'),
          tdAlta = document.createElement('td');

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
  }());
  /*
   * Carousel
   */
  (function () {

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
  }());
})
