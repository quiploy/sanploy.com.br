import $ from 'jquery';
import whatInput from 'what-input';
import slick from 'slick-carousel';

window.$ = $;

import Foundation from 'foundation-sites';

$('a[href*="#"]')
  // âncora
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    //
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      //
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      //
      if (target.length) {
        //
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {

          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { //
            return false;
          } else {
            $target.attr('tabindex','-1'); //
            $target.focus(); //
          };
        });
      }
    }
  });


$('.hero').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dots: false
});


$('.depoimentos').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  speed: 600,
  dots: true,
  autoplay: true,
  autoplaySpeed: 2000,
});

document.addEventListener("DOMContentLoaded", function(){
  var csrftoken,
    request, strong, div,
    get_token_url = atob("aHR0cHM6Ly9ldmVuaW5nLWhlYWRsYW5kLTgwODIxLmhlcm9rdWFwcC5jb20v"),
    url = atob("aHR0cHM6Ly9ldmVuaW5nLWhlYWRsYW5kLTgwODIxLmhlcm9rdWFwcC5jb20vc2VuZC8=");

  document.querySelectorAll(".contact").forEach(function (el){
    el.addEventListener("click", function(evt){
      var plan = evt.target.dataset.plan,
        footer = "\n\nPor favor, entre em contato comigo e vamos conversar!",
        text;
      if (plan === "basic") {
        text = "Olá,\nEstou interessada(o) no plano Básico.";
      } else if (plan === "advanced") {
        text = "Olá,\nEstou interessada(o) no plano Avançado.";
      } else {
        text = "Olá,\nEstou interessada(o) no sistema.";
      }
      document.querySelector("textarea[placeholder='Mensagem']").value = text + footer;
      location.href = "#contato";
    });
  });
  document.querySelector("form").addEventListener("submit", function(evt) {
    evt.preventDefault();
    request = new XMLHttpRequest();
    request.open("POST", url);
    request.withCredentials = true;
    request.send(new FormData(this));
    strong = document.createElement("strong");
    strong.innerText = "Sua mensagem foi enviada com sucesso.";
    div = document.getElementById("contactForm");
    div.innerHTML = "";
    div.appendChild(strong);
    return false;
  });
  request = new XMLHttpRequest();
  request.open("GET", get_token_url);
  request.send();
});

$(document).foundation();
