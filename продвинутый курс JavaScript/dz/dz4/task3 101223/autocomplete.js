'use strict';

/*
3) * Список из п.2 превратить в текстовое поле-автокомплит.
Если пользователь ввел три и более символов, нужно подгрузить список городов и показать подходящие по вводу.
При клике на подходящий город ввести его полное название в текстовое поле.
*/

(function ($) {
  $(function () {
    var towns = [];
    var townsFilter = [];
    var $towns = $('#towns');
    console.dir(document.querySelector('select'));
    var $town = $('#town');

      $.ajax({
        url: 'http://localhost:3000/towns',
        success: function (data) {
          data.forEach(function (town) {
            var option = $('<option/>', {
              value: town,
              text: town
            })
            $towns.append(option);
            towns.push(town);

          });
        }
      });



    $town.on('keydown', function (event) {
      var curInput = this.value;
      if (curInput) {
        var rgp = new RegExp('^' + curInput, 'i');
        townsFilter = towns.filter(function (town) {
          return rgp.test(town);
        });

        $towns.html('');

        townsFilter.forEach(function (town) {
          var option = $('<option/>', {
            value: town,
            text: town
          })
          $towns.append(option);
        });

        $('option').click(function () {
          document.getElementById('town').value = this.value;
        })
      };
    });
  });
})(jQuery);