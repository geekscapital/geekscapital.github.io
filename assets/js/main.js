/*=================================================
do not edit this file
place custom function at assets/js/custom.js
=================================================*/
var $ = jQuery.noConflict();

(function($) {
  'use strict';

/*=================================================
variable
=================================================*/
var $html = $('html');
var $body = $('body');
var $bg = $('#bg');
var $video = $('#video');
var $overlay = $('#overlay');

/*=================================================
ie10 viewport fix
=================================================*/
  (function() {
    'use strict';
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
      var msViewportStyle = document.createElement('style')
      msViewportStyle.appendChild(
        document.createTextNode(
          '@-ms-viewport{width:auto!important}'
        )
      )
      document.querySelector('head').appendChild(msViewportStyle)
    }
  })();

/*=================================================
platform detect
=================================================*/
  if ($html.hasClass('desktop')) {
    $html.addClass('non-mobile');
    var isMobile = false;
  } else {
    $html.addClass('is-mobile');
    var isMobile = true;
  }
  if ($html.hasClass('ie9')) {
    var isIE9 = true;
  }

/*=================================================
preloader
=================================================*/
  function fn_preloader() {
    var $preloader = $('#preloader');
    $preloader.velocity('fadeOut', {
      delay: _preloaderDelay,
      duration: _preloaderDuration,
      complete: function() {
        $('section.active')
        .velocity('stop', true)
        .velocity('transition.slideDownIn', {duration: 1200});
      }
    });
  }

/*=================================================
core
=================================================*/
  function fn_core() {

    $body.addClass(_color);
    var $sectionWrap = $('.section-wrap');
    if (isMobile) {
      $sectionWrap.addClass('scroll-wrap');
    } else {
      $sectionWrap.perfectScrollbar({
        suppressScrollX: true
      });
    }

    $('a[href="#"]').on('click', function(e) {
      e.preventDefault();
    });

    var $socialList = $('.social-list').clone();
    /* clone social list for mobile */
    $socialList.insertAfter('#menu');
  }

/*=================================================
background
=================================================*/
  function fn_bg() {
    if (_bgStyle == 1) {
      fn_single();
    } else if (_bgStyle == 2) {
      fn_static();
    } else if (_bgStyle == 3) {
      fn_ss();
    } else if (_bgStyle == 4){
      fn_ytVideo();
    } else if (_bgStyle == 5){
      fn_html5Video();
    }
  }

  function fn_single() {
    /* set image for single version */
    $bg.backstretch('assets/img/bg/single.jpg');
  }

  function fn_static() {
    /* set image for static image version */
    $bg.backstretch('assets/img/bg/intro.jpg');
  }

  function fn_ss() {
    var ssImgSet = [];
    for (var i = 1; i <= _ssAmount; i++) {
      ssImgSet.push('assets/img/bg/ss-' + (i < 10 ? '0' + i : i) + '.jpg');
    }
    $bg.backstretch(ssImgSet, {
      duration: _ssDuration,
      fade: _ssFade
    });
  }

  function fn_ytVideo() {
    var $video = $('#video');

    if (isMobile) {
      $bg.backstretch('assets/img/bg/yt-video-mobile.jpg'); /* background image fallback for mobile */
    } else {
      $bg.backstretch('assets/img/bg/yt-video-desktop.jpg'); /* background image for before video start */
      $video.attr('data-property', '{videoURL: _ytUrl, autoPlay: true, loop: _ytLoop, startAt: _ytStart, stopAt: _ytEnd, mute: _ytMute, quality: "hd720", realfullscreen: true, optimizeDisplay: true, addRaster: false, showYTLogo: false, showControls: false, stopMovieOnBlur: false, containment: "self"}');
      $video.YTPlayer();
    }
  }

  function fn_html5Video() {
    var $video = $('#video');

    if (isMobile) {
      $bg.backstretch('assets/img/bg/html5-video-mobile.jpg'); /* background image fallback for mobile */
    } else {
      $bg.backstretch('assets/img/bg/html5-video-desktop.jpg'); /* background image for before video start */
      $body.addClass('html5-video');
    }
  }

/*=================================================
countdown
=================================================*/
  function fn_countdown() {
    var $intro = $('#intro');
    var $countdown = $('#countdown');
    var $sectionSingle = $intro.find('.section-single');

    if (_countdown) {
      $countdown.downCount({
        date: _countdownDate,
        offset: _countdownTimezone
      });
    } else {
      $countdown.remove(); /* remove countdown if disable */
      if (!$.trim($sectionSingle.html())) {
        $sectionSingle.remove();
      }
    }
  }

/*=================================================
owl carousel
=================================================*/
  function fn_carousel() {
    var $carouselServices = $('#carousel-services');
    var $carouselWorks = $('#carousel-works');
    var $carouselcontact = $('#carousel-contact');

    if ($carouselServices.length) {
      $carouselServices.owlCarousel({
        items : 3,
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [991,3],
        itemsTablet: [767,2],
        itemsMobile : [479,1],
        slideSpeed : 200,
        paginationSpeed : 800,
        rewindSpeed : 1000,
        stopOnHover : true
      });
    }
  }

/*=================================================
email validation
=================================================*/
  function fn_formValidation(email_address) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(email_address);
  }

/*=================================================
subscribe form
=================================================*/
  function fn_subscribe() {
    if (_subscribe == 1) {
      fn_subscribeForm();
    } else if (_subscribe == 2) {
      fn_mailchimp();
    }
  }

  /* mailchimp */
  function fn_mailchimp() {

    var $form = $('#subscribe-form');
    var $subscribeEmail = $('#subscribe-email');

    $form.ajaxChimp({
      callback: fn_mailchimpStatus,
      language: 'eng',
      type: 'POST',
      url: _mailchimpUrl
    });

    function fn_mailchimpStatus (resp) {

      if (resp.result === 'error') {
        $subscribeEmail.focus();
        $('.subscribe-notice').addClass('visible');
      }
      else if (resp.result === 'success') {
        $form[0].reset();
        $subscribeEmail.blur();
        $('.subscribe-notice').addClass('visible');
      }
    }
  }

  /* php */
  function fn_subscribeForm() {

    var $form = $('#subscribe-form');
    var $subscribeEmail = $('#subscribe-email');

    $subscribeEmail.prop('type', 'text');

    $form.on('submit', function(e) {

      var subscribeEmailVal = $subscribeEmail.val();
      var $subscribeNotice = $('.subscribe-notice');
      var $submitButton = $form.find('button[type="submit"]');

      e.preventDefault();

      $submitButton.prop('disabled', true);

      if (!fn_formValidation(subscribeEmailVal)) {
        $subscribeNotice.stop(true).hide().addClass('visible').html(_subscribeError).fadeIn();
        $submitButton.prop('disabled', false);
        $('#subscribe-email').focus();
      }
      else {
        $.ajax({
          type: 'POST',
          url: 'assets/php/subscribe.php',
          data: {
            email: subscribeEmailVal,
            emailAddress: _subscribeEmail
          },
          success: function() {
            $subscribeNotice.stop(true).hide().addClass('visible').html(_subscribeSuccess).fadeIn();

            $submitButton.prop('disabled', false);
            $form[0].reset();
            $subscribeEmail.blur();

          }
        });
      }
      return false;

    });

  }

/*=================================================
contact form
=================================================*/
  function fn_contactForm() {

    var $form = $('#contact-form');

    $form.on('submit', function(e) {

      var $input = $form.find('input, textarea');
      var contactNameVal = $('#contact-name').val();
      var contactEmailVal = $('#contact-email').val();
      var contactMessageVal = $('#contact-message').val();
      var $contactNotice = $('.contact-notice');
      var $submitButton = $form.find('button[type="submit"]');

      e.preventDefault();

      if (contactNameVal == '' || contactEmailVal == '' || contactMessageVal == '') {
        $contactNotice.stop(true).hide().html(_contactInputError).fadeIn(500);
        $input.each(function() {
          if (this.value === '') {
            this.focus();
            return false;
          }
        });

      }

      else if (!fn_formValidation(contactEmailVal)) {
        $contactNotice.stop(true).hide().html(_contactEmailError).fadeIn(500);
        $('#contact-email').focus();
      }
      else {
        $.ajax({
          type: 'POST',
          url: 'assets/php/contact.php',
          data: {
            name: contactNameVal,
            email: contactEmailVal,
            message: contactMessageVal,
            emailAddress: _contactEmail
          },
          success: function() {
            $contactNotice.stop(true).hide().html(_contactSuccess).fadeIn(500);
            $form[0].reset();
            $input.blur();
          }
        });
      }
      return false;

    });
  }

/*=================================================
lightbox
=================================================*/
  function fn_lightbox() {
    var $popBtn = $('a[href="#subscribe-form-popup"]');
    $popBtn.magnificPopup({
      type: 'inline',
      removalDelay: 500,
      preloader: false,
      focus: 'input',
      callbacks: {
        beforeOpen: function() {
          if($(window).width() < 768) {
            this.st.focus = false;
          } else {
            this.st.focus = '#subscribe-email';
          }
          this.st.mainClass = this.st.el.attr('data-effect');
        },
        afterClose: function() {
          $popBtn.blur();
        }
      },
      midClick: true
    });
  }

/*=================================================
menu
=================================================*/
function fn_menu() {
  var $menuToggle = $('#menu-toggle');
  var $menuWrap = $('#menu-wrap');
  var $menuListItem = $('#menu').find('li');

  $menuToggle.on('click', function(e) {
    e.preventDefault();

    $body.toggleClass('menu-in');
    if ($body.hasClass('menu-in')) {
      $menuWrap.velocity('stop', true)
      .velocity('fadeIn', {
        duration: 500
      });
      $menuListItem
      .velocity('stop', true)
      .velocity('transition.slideUpIn',{stagger: 100});
    } else {
      $menuListItem
      .velocity('transition.slideUpOut', {stagger: 100});
      $menuWrap.velocity('stop', true)
      .velocity('fadeOut', {
        duration: 500
      });
    }
  });
}

/*=================================================
section switch animation
=================================================*/
function fn_switchAnimation() {

  $('a[data-link-to]').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $activeSection = $('section.active');
    var $linkToSection = $($this.data('link-to'));
    var id = $linkToSection.attr('id');
    var $linkTomenuListItem = $('#menu').find('a[data-link-to="#' + id + '"]');
    var $preloader = $('#preloader');
    var $sectionWrap = $('.section-wrap');
    var $menuToggle = $('#menu-toggle');
    var $menuWrap = $('#menu-wrap');
    var $menuListItem = $('#menu').find('li');
    var $activeMenuListItem = $('#menu').find('.active');

    if (!$linkToSection.hasClass('active')) {
      $body.removeClass('menu-in');
      $menuListItem.velocity('transition.slideUpOut', {stagger: 80});
      $menuWrap.velocity('stop', true)
      .velocity('fadeOut', {
        duration: 500
      });

      $activeSection
      .velocity('stop', true)
      .velocity('transition.slideUpOut', {
        duration: 1200,
        complete: function() {
          $preloader.velocity('fadeIn', {
            duration: 800,
            complete: function() {
              if (_bgStyle == 2) {
                $bg.backstretch('assets/img/bg/' + id + '.jpg');
              }
              $preloader.velocity('fadeOut', {
                duration: 800,
                delay: 100,
                complete: function() {
                  $linkToSection.velocity('transition.slideDownIn', {duration: 1200});
                  $activeSection.add($activeMenuListItem).removeClass('active');
                  $linkToSection.add($linkTomenuListItem).addClass('active');
                }
              });
            }
          });
        }
      });
    }
  });
}

/*=================================================
preload image
=================================================*/
  function fn_imageLoaded() {
    if (_bgStyle == 2) {
      /* preload default image set */
      var imgSet = ['assets/img/bg/intro.jpg',
                    'assets/img/bg/about.jpg',
                    'assets/img/bg/services.jpg',
                    'assets/img/bg/contact.jpg'];
      var imgArray = [];

      var i;
      for (i = 0; i < imgSet.length; i++) {
        var img = new Image();
        img.src = imgSet[i];
        imgArray[i] = img;
      }

      var imgLoad = imagesLoaded(imgArray);

      imgLoad.on('always', function (instance) {
        /* image loaded, call preloader function */
        fn_preloader();
      });

    } else {
      /* not static version, call preloader function */
      fn_preloader();
    }
  }

/*=================================================
disable section
=================================================*/
  function fn_disableSection() {

    for (var a in _disableSection) {
      if (_disableSection[a]) {
        var id = '#' + a;
        $(id).remove();
        $('#menu').find('a[data-link-to="' + id + '"]').parent().remove();
      }
    }

  }

/*=================================================
ie9 placeholder
=================================================*/
  function fn_placeholder() {
    if (isIE9) {
      $('input, textarea').placeholder({customClass: 'ie-placeholder'});
    }
  }

/*=================================================
cloud
=================================================*/

  function fn_effect() {
    if (_bg_effect == 1) {
      fn_cloudd();
    } else {
      $('#effect').remove();
    }
  }

  function fn_cloudd() {
    var $effect = $('#effect');

    $body.addClass('is-cloud');
    $effect.css('opacity', _cloud_opacity);

    if ($effect.length) {
      $effect.append(
        '<div class="cloud cloud-01"></div>' +
        '<div class="cloud cloud-02"></div>' +
        '<div class="cloud cloud-03"></div>'
      )

      $body.addClass('is-site-bg-cloud');

      fn_cloud01();
      fn_cloud02();
      fn_cloud03();
    }
  }

  function fn_cloud01() {
    var $cloud = $('.cloud-01');

    $cloud.velocity({
      translateZ: '0',
      translateX: ['-100%', '100%']
    }, {
      duration: 25000,
      ease: 'liner',
      queue: false,
      complete: function() {
        $(this).velocity({
          translateX: '100%'
        }, {
          duration: 0,
          queue: false,
          complete: fn_cloud01
        });
      }
    });
  }

  function fn_cloud02() {
    var $cloud = $('.cloud-02');

    $cloud.velocity({
      translateZ: '0',
      translateX: ['-100%', '100%']
    }, {
      duration: 35000,
      ease: 'liner',
      queue: false,
      complete: function() {
        $(this).velocity({
          translateX: '100%'
        }, {
          duration: 0,
          queue: false,
          complete: fn_cloud02
        });
      }
    });
  }

  function fn_cloud03() {
    var $cloud = $('.cloud-03');

    $cloud.velocity({
      translateZ: '0',
      translateX: ['-100%', '100%']
    }, {
      duration: 45000,
      ease: 'liner',
      queue: false,
      complete: function() {
        $(this).velocity({
          translateX: '100%'
        }, {
          duration: 0,
          queue: false,
          complete: fn_cloud03
        });
      }
    });
  }

/*=================================================
window on load
=================================================*/
  $(window).on('load', function() {

    $('section').hide(); // hide all section
    fn_imageLoaded();

  });

/*=================================================
document on ready
=================================================*/
  $(document).on('ready', function() {

    fn_core();
    fn_bg();
    fn_countdown();
    fn_carousel();
    fn_subscribe();
    fn_contactForm();
    fn_lightbox();
    fn_menu();
    fn_switchAnimation();
    fn_disableSection();
    fn_placeholder();
    fn_effect();

  });

/*=================================================
window on resize
=================================================*/
  $(window).on('resize', function() {

  });

})(jQuery);