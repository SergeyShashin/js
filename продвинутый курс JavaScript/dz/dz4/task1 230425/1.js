'use strict';

/*
1) С помощью jQuery создать контрол, работающий с вкладками.
Пример – http://dimox.name/examples/universal-jquery-tabs-script/ .
Можно использовать любую анимацию, методы show, hide и подобные. Код примера желательно не смотреть.
*/

(function ($) {
  console.dir($);
  $('.tabs__caption').on('click', 'li', function (e) {
    $('.active').removeClass('active');
    $(this).addClass('active');
    var id = $(this).attr('id').replace(/header/, 'content');
    $(`#${id}`).addClass('active');
  })
})(jQuery)