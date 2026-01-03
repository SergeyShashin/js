'use strict';
(
  function ($) {
    $(function () {
      $('#plusMinus').on('click', '#plus, #minus', function (e) {
        var $monitor = $('#monitor');
        var content = $monitor.text();
        $monitor.text(Number(content) + Number(e.target.dataset.value));
        content < '1' ? $monitor.css('color', 'lightseagreen') : $monitor.css('color', 'crimson');
        $('#box').animate({
          width: content * 10,
          height: content * 10
        }, 500);
      });

      $('#btnSlideToggle').on('click', function () {
        $('#slideBox').slideToggle();
      });
    })
  }
)(jQuery)