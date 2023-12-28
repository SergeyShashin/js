'use strict';

/*
2) В форму обратной связи добавить возможность выбора города обращения.
Сам список должен загружаться после загрузки страницы через AJAX.
*/

(function ($) {
  $(function () {
    $.ajax({
      url: 'http://localhost:3000/towns',
      success: function (data) {
        var $towns = $('#towns');
        data.forEach(function (town) {
          var option = $('<option/>', {
            value: town,
            text: town
          })
          $towns.append(option);
        });
      }
    });
  });
})(jQuery);