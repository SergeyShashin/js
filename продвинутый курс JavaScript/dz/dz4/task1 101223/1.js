'use strict';
/*
1) С помощью jQuery создать контрол, работающий с вкладками.
Пример – http://dimox.name/examples/universal-jquery-tabs-script/ .
Можно использовать любую анимацию, методы show, hide и подобные. Код примера желательно не смотреть.
*/

(function ($) {
  $(function () {
    $('.tabs__caption').on('click', '#header1, #header2, #header3, #header4', function () {
      $('.tabs .active').removeClass('active');
      $(this).addClass('active');
      $(this).show();
      var idHeader = $(this).attr('id');
      var idHeaderLength = idHeader.length - 1;
      $('#content' + idHeader[idHeaderLength]).addClass('active');
    });
  });
}
)(jQuery);