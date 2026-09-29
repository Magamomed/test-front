/* Слайдер отзывов: в окне 4 карточки, шаг — одна карточка */
(function (window, $) {
  'use strict';

  var App = (window.App = window.App || {});

  var CARD_WIDTH = 305;
  var GAP = 20;
  var VISIBLE = 4;

  App.slider = {
    init: function () {
      $('.js-slider').each(function () {
        var $slider = $(this);
        var $track = $slider.find('.js-slider-track');
        var $prev = $slider.find('.js-slider-prev');
        var $next = $slider.find('.js-slider-next');
        var total = $track.children().length;
        var maxIndex = Math.max(total - VISIBLE, 0);
        var index = 0;

        function render() {
          $track.css('transform', 'translateX(' + -index * (CARD_WIDTH + GAP) + 'px)');
          $prev.prop('disabled', index === 0);
          $next.prop('disabled', index === maxIndex);
        }

        $prev.on('click', function () {
          index = Math.max(index - 1, 0);
          render();
        });

        $next.on('click', function () {
          index = Math.min(index + 1, maxIndex);
          render();
        });

        render();
      });
    }
  };
})(window, jQuery);
