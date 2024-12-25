'use strict';

(function ($) {
  var $monitor = $('#monitor');
  $('#plusMinus').on('click', '#plus, #minus', function (e) {
    $monitor.text(`${Number($monitor.text()) + Number(e.target.dataset.value)}`);
  })

})(jQuery);