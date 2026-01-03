'use strict';

/*
1) С помощью jQuery создать контрол, работающий с вкладками.
Пример – http://dimox.name/examples/universal-jquery-tabs-script/ .
Можно использовать любую анимацию, методы show, hide и подобные. Код примера желательно не смотреть.
*/

(
  function ($) {
    $(function () {
      $('.tabs__caption').on('click', function (e) {
        $('.active').removeClass('active');
        e.target.classList.add('active');
        $(`#content${e.target.id.slice(-1)}`).addClass('active');
      });
    });
  }
)(jQuery);