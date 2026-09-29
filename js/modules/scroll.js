/* Плавная прокрутка к якорям + подсветка активного пункта меню */
(function (window, $) {
  'use strict';

  var App = (window.App = window.App || {});

  App.scroll = {
    init: function () {
      var $links = $('.site-nav__link');

      $('a[href^="#"]').on('click', function (event) {
        var hash = this.hash;
        if (!hash || hash === '#') return;

        var $target = $(hash);
        if (!$target.length) return;

        event.preventDefault();
        $('html, body').animate({ scrollTop: $target.offset().top }, 500);
        if (window.history && history.pushState) history.pushState(null, '', hash);
      });

      $(window).on('scroll', function () {
        var position = $(window).scrollTop() + $(window).height() / 3;
        var activeHash = null;

        $links.each(function () {
          var $section = $(this.hash);
          if ($section.length && $section.offset().top <= position) activeHash = this.hash;
        });

        $links.each(function () {
          $(this).toggleClass('is-active', this.hash === activeHash);
        });
      });
    }
  };
})(window, jQuery);
