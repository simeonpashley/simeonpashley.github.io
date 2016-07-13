//= require vendor/jquery.min
//= require plugins/jquery.typed.min

$(document).ready(function(){

  $("body").addClass("js");

  // toggle overlay navigation
  $(document).on('click', '.overlay__menu-trigger', function() {
    // in Firefox transitions break when parent overflow is changed, so we need to wait for the end of the transition to give the body an overflow hidden
    if( $('.overlay__menu').hasClass('is--visible') ) {
      $('.overlay__menu').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
      $('#screen').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    }
    else {
      $('.overlay__menu').addClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
      $('#screen').addClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    }
  });

  // close overlay navigation on button click
  $('.overlay__menu-close, #screen').on('click', function(){
    $('.overlay__menu').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    $('#screen').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
  });

  // open/close overlay navigation on focus
  $('.overlay__menu-item a').on('focus', function(){
    $('.overlay__menu').addClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    $('#screen').addClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
  });
  $('.overlay__menu-close').on('focus', function(){
    $('.overlay__menu').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    $('#screen').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
  });

  // close menu on [esc]
  $(document).on('keydown', function(e){
    if ( e.keyCode === 27 ) { // ESC key
      $('.overlay__menu').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
      $('#screen').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    }
  });

  // 404 page auto typing
  $("#js-404-typed").typed({
    strings: ["<span class='glitch__title'>Your Pixels are on Another&nbsp;Canvas ^500</span> <span class='br'></span> Sorry, but the page you were trying to view has moved or does not exist -- perhaps you can <a href='https://pashley.org/sitemap/' title='Made Mistakes sitemap'>find it here</a> or by searching below."],
    contentType: "html",
    startDelay: 0,
    backDelay: 3000,
    callback: function(){
      glitch_secondary();
    }
  });

  // reveal secondary container at auto typing completion
  function glitch_secondary(){
    $(".typed__secondary").css("opacity", "1");
  }

});
