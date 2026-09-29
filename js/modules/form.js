/* Формы: базовая валидация на клиенте (заявка и обратный звонок в подвале) */
(function (window, $) {
  'use strict';

  var App = (window.App = window.App || {});

  var PHONE_RE = /^\+?[\d\s()-]{10,}$/;

  function isPhone(value) {
    return PHONE_RE.test($.trim(value));
  }

  /*
    Общая обработка: fields — функция, возвращающая список невалидных полей.
    После успешной проверки отправка пока заглушка (TODO: эндпоинт).
  */
  function bindForm(selector, findInvalid, errorText, successText) {
    $(selector).on('submit', function (event) {
      event.preventDefault();

      var $form = $(this);
      // статус лежит внутри формы (заявка) или сразу после неё (подвал)
      var $status = $form.find('[role="status"]').add($form.siblings('[role="status"]')).first();

      $form.find('.is-invalid').removeClass('is-invalid');

      var $invalid = findInvalid($form);
      if ($invalid.length) {
        $invalid.addClass('is-invalid');
        $status.text(errorText);
        $invalid.first().trigger('focus');
        return;
      }

      // TODO: отправка на сервер, когда будет готов эндпоинт
      $status.text(successText);
      $form[0].reset();
    });
  }

  App.form = {
    init: function () {
      // Большая форма «Оставить заявку»
      bindForm(
        '.js-request-form',
        function ($form) {
          var $name = $form.find('[name="name"]');
          var $phone = $form.find('[name="phone"]');
          var $bad = $();

          if (!$.trim($name.val())) $bad = $bad.add($name);
          if (!isPhone($phone.val())) $bad = $bad.add($phone);
          return $bad;
        },
        'Проверьте имя и телефон.',
        'Спасибо! Мы свяжемся с вами в ближайшее время.'
      );

      // Форма в подвале: только телефон
      bindForm(
        '.js-callback-form',
        function ($form) {
          var $phone = $form.find('[name="phone"]');
          return isPhone($phone.val()) ? $() : $phone;
        },
        'Проверьте номер телефона.',
        'Спасибо! Перезвоним вам.'
      );
    }
  };
})(window, jQuery);
