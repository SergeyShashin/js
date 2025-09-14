'use strict';

/*
2) В форму обратной связи добавить возможность выбора города обращения.
Сам список должен загружаться после загрузки страницы через AJAX.
3) * Список из п.2 превратить в текстовое поле-автокомплит.
Если пользователь ввел три и более символов, нужно подгрузить список городов и показать подходящие по вводу.
При клике на подходящий город ввести его полное название в текстовое поле.
*/

(function ($) {
  $(function () {
    $.ajax({
      url: 'http://localhost:3000/towns',
      success: function (towns) {
        var dataTownsEl = document.getElementById('dataTowns');
        for (var town of towns) {
          var optionEl = document.createElement('option');
          optionEl.textContent = town;
          optionEl.value = town;
          dataTownsEl.appendChild(optionEl);
        }

      }
    })
  })

})(jQuery);