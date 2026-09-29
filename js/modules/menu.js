/* Выпадающее меню в шапке */
(function (window, $) {
  'use strict';

  var App = (window.App = window.App || {});

  App.menu = {
    init: function () {
      var $toggle = $('.js-menu-toggle');
      var $nav = $('#site-nav');

      if (!$toggle.length || !$nav.length) return;

      var $label = $toggle.find('.js-menu-label');
      var $icon = $toggle.find('.js-menu-icon');

      // в открытом состоянии кнопка превращается в «Закрыть»
      function setOpen(open) {
        var state = open ? 'close' : 'open';

        $nav.prop('hidden', !open);
        $toggle.attr('aria-expanded', String(open));
        $label.text($label.data('label-' + state));
        $icon.attr('src', $icon.data('icon-' + state));
      }

      $toggle.on('click', function (event) {
        event.stopPropagation();
        setOpen($nav.prop('hidden'));
      });

      // закрытие: клик по пункту, клик вне меню, Esc
      $nav.on('click', 'a', function () {
        setOpen(false);
      });

      $(document).on('click', function (event) {
        if (!$(event.target).closest('#site-nav, .js-menu-toggle').length) setOpen(false);
      });

      $(document).on('keydown', function (event) {
        if (event.key === 'Escape' && !$nav.prop('hidden')) {
          setOpen(false);
          $toggle.trigger('focus');
        }
      });
    }
  };
})(window, jQuery);
