// Shout-out to Ken Burns

(function($){

$.fn.slideshow = function(options){

  var slides = $(this);

  var settings = $.extend({
    randomize: true,
    slideDuration: 6000,
    fadeDuration: 1000,
    animate: true,
    pauseOnTabBlur: true,
    enableLog: false,
    slideElementClass: 'slide', // This is also defined in the CSS!
    slideshowId: 'slideshow' // This is also defined in the CSS!
  }, options);

  // Turn off console log messages
  if(settings.enableLog == false){
    console.log = function() {};
  }

  // Randomize slides
  if(settings.randomize == true){
    var slidesDOM = slides[0];
    for (var i = slidesDOM.children.length; i >= 0; i--) {
      slidesDOM.appendChild(slidesDOM.children[Math.random() * i | 0]);
    }
  }

  // Insert slideshow element
  $('<div id="' + settings.slideshowId + '"></div>').insertBefore(slides);

  // Define variables
  var paused = false;
  var slideshow = $('#' + settings.slideshowId);
  var slideTimeDelta = 0;
  var resumeStartTime = 0;
  var resumeTimer;
  if(settings.animate == true){
    var cssAnimationDuration = settings.slideDuration + settings.fadeDuration;
  }else{
    slides.find('.' + settings.slideElementClass + ' span.animate').removeClass('animate');
    var cssAnimationDuration = 0;
  }

  console.log('Slideshow initialized.');

  // Add the first slide to the slideshow
  slides.find('.' + settings.slideElementClass + ':first span.animate').addClass('active').css('animation-duration', cssAnimationDuration + 'ms')
  slides.find('.' + settings.slideElementClass + ':first').prependTo(slideshow);
  var currentSlideStartTime = Date.now();

  // Start interval loop
  slidesInterval = setInterval(slideRefresh, settings.slideDuration);

  console.log('Slideshow started.');

  // setInterval and setTimeout behave weirdly when the tab is out of focus.
  // To prevent glitches and save resources we can pause the slideshow when the
  // tab is out of focus.
  if(settings.pauseOnTabBlur == true){
    $(window).focus(function() {
      console.log('Window gained focus.');
      if (paused == true) {
        console.log('Resuming slideshow.');
        resumeStartTime = Date.now();
        paused = false;
        $('#' + settings.slideshowId + ' span.active:last').removeClass('paused');
        resumeTimer = setTimeout(function(){
          slideTimeDelta = 0;
          slideRefresh();
          slidesInterval = setInterval(slideRefresh, settings.slideDuration);
        }, settings.slideDuration - slideTimeDelta);
      }
    }).blur(function() {
      paused = true;
      console.log('Window lost focus, slideshow paused.');
      if(slideTimeDelta != 0){
        var timeSinceLastPause = Date.now() - resumeStartTime;
        slideTimeDelta = slideTimeDelta + timeSinceLastPause;
        console.log('Time since last pause within this slide: ' + timeSinceLastPause + ' ms');
      }else{
        slideTimeDelta = Date.now() - currentSlideStartTime;
      }
      console.log('Current slide at ' + slideTimeDelta + ' ms.');
      $('#' + settings.slideshowId + ' span.active:first').addClass('paused');
      clearInterval(slidesInterval);
      clearTimeout(resumeTimer);
    });
  }

  // Prepends a new slide to the slideshow element and fades out the previous one
  function slideRefresh() {
    console.log('Slide refresh triggered.');
    currentSlideStartTime = Date.now();
    var slideshowDOM = slideshow[0];
    // If setInterval glitches out the slideshow will sometimes have no slides in
    // it anymore. This function checks and adds the next slide into the slideshow
    // if it is empty. Pausing the slideshow on tab blur will prevent glitches most of the time,
    // so this is a fallback for if that fails.
    if(slideshowDOM.children.length == 0) {
      console.log('There are no slides in the slideshow.');
      slides.find('.' + settings.slideElementClass + ':first').prependTo(slideshow);
    }else{
      slides.find('.' + settings.slideElementClass + ':first').prependTo(slideshow);
      var slideElement = '#' + settings.slideshowId + ' .' + settings.slideElementClass;
      $(slideElement + ':first span.animate').addClass('active').css('animation-duration', cssAnimationDuration + 'ms');;
      $(slideElement + ':last').fadeOut(settings.fadeDuration, function(){
        $(slideElement + ':last span.animate').removeClass('active').css('animation-duration', '0ms');;
        $(slideElement + ':last').appendTo(slides);
        slides.find('.' + settings.slideElementClass).show(0);
      });
    }
  }
};

}( jQuery ));
