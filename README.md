# subtle-slideshow.js

A jQuery slideshow plugin (haha yes another one) with a subtle Ken Burns effect using CSS3 animations. It has no controls or anything fancy like that, just some tasteful animation and transition effects, which you can customize. The slides can contain anything you want (images, videos, etc.), but images are best supported. On [this demo page](https://stijnvc.github.io/subtle-slideshow.js/) you can see an example of what it can look like.

## Installation

First download `jquery.subtle-slideshow.js` and `subtle-slideshow.css` and include them in the `<head>` of your page. Don't forget to include jQuery first.

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="jquery.subtle-slideshow.js"></script>
<link rel="stylesheet" href="subtle-slideshow.css">
```

Then put your slides anywhere within the `body` element. There is a minimum of two slides needed for the slideshow to work (duh!). The slides are made up of **(example below)**:

1. The `#slides` div element, which contains all your slides. Put this where you want your slideshow. The element itself will be hidden, the plugin will use it to draw the slides from. (The id `#slides` is necessary unless you want to update `subtle-slideshow.css` manually to match the custom id.)
2. Inside the `#slides` element there are the individual `.slide` elements. These can be `<a>` or `<div>`, doesn't really matter, as long as it can contain other elements and is compatible with `position: absolute;`. The slides will be cycled through during the slideshow. (Again, the `.slides` classname is necessary unless you want to change `subtle-slideshow.css` manually.)
2. Each slide has a `<span>` element which can be animated to move left, right, up, down or zoom in or out. The easiest way to make an image slideshow is to give these `span` elements an `image-background`. This background image will be sized and positioned proportionally to fill the entire slidehow. To animate the `<span>` element you have to give it the `.animate` class. Along with this you have to define the animation type by giving it one of the following classnames:
   * `.left`: move left.
   * `.right`: move right.
   * `.up`: move up.
   * `.down`: move down.
   * `.in`: zoom in.
   * `.out`: zoom out.
4. You can use a div with a `.static-content` class for putting content in the slide that isn't animated, like titles or what have you.

```html
<div id="slides">
  <a class="slide" href="#link01">
    <span class="animate right" style="background-image: url(your-image-01.jpg)"></span>
    <div class="static-content"><h1>Revolve Waterbottle</h1></div>
  </a>
  <a class="slide" href="#link02">
    <span class="animate in" style="background-image: url(your-image-02.jpg)"></span>
    <div class="static-content"><h1>Lunchbox</h1></div>
  </a>
  <a class="slide" href="#link03">
    <span class="animate down" style="background-image: url(your-image-03.jpg)"></span>
    <div class="static-content"><h1>Salad Shaker</h1></div>
  </a>
</div>
```

To initialize subtle-slideshow.js you need to call `.slideshow()` on the the `#slides` div. Put this right below `#slides`, or call on `$(document).ready()`.

```html
<script>
  // These are te default settings.
  $('#slides').slideshow({
    randomize: true,            // Randomize the play order of the slides.
    slideDuration: 6000,        // Duration of each induvidual slide.
    fadeDuration: 1000,         // Duration of the fading transition. Should be shorter than slideDuration.
    animate: true,              // Turn css animations on or off.
    pauseOnTabBlur: true,       // Pause the slideshow when the tab is out of focus. This prevents glitches with setTimeout().
    enableLog: false,           // Enable log messages to the console. Useful for debugging.
    slideElementClass: 'slide', // This is also defined in the CSS!
    slideshowId: 'slideshow'    // This is also defined in the CSS!
  });
</script>
```

Subtle-slideshow.js will generate a `div#slideshow` right above `#slides`. This will be the slideshow that the user sees on the page. You can style this element to your needs with CSS. The default styling looks like this:

```css
#slideshow {
  position: fixed; /* 'relative' or 'absolute' will also work. */
  overflow: hidden;  /* Necessary. Otherwise you would see the slides sticking out the sides while being animated. */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
```
---
[MIT License](https://opensource.org/licenses/MIT)
