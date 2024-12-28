'use strict';

(function ($) {
  var $monitor = $('#monitor');
  $('#plusMinus').on('click', '#plus, #minus', function (e) {
    var content = Number($monitor.text());
    $monitor.text(`${content + Number(e.target.dataset.value)}`);

    if (content > 10) {
      $monitor.css({ color: 'lightseagreen' });
    } else if (content > 0) {
      $monitor.css({ color: 'crimson' });
    } else if (content < 0) {
      $monitor.css({ color: 'lightskyBlue' });
    }

    $('#box').animate({
      width: 10 * content,
      height: 10 * content
    }, 500);
  });

  $('#btnSlideToggle').on('click', function () {
    $('#slideBox').slideToggle();
  }
  );

})(jQuery);