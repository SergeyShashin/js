'use strict';
/*
1) С помощью jQuery создать контрол, работающий с вкладками.
Пример – http://dimox.name/examples/universal-jquery-tabs-script/ .
Можно использовать любую анимацию, методы show, hide и подобные. Код примера желательно не смотреть.
*/

(function ($) {
  $('.tabs').on('click', 'li', function (e) {
    Object.values($('.active')).map(function (el, idx, arr) {
      if (idx < arr.length - 2) {
        el.classList.remove('active');
      }
    });

    var targetId = e.target.id;
    e.target.classList.add('active');

    var elementForSetActive = '#content' + targetId.replace(/\D/g, '');
    $(elementForSetActive).addClass('active');
  })

})(jQuery);