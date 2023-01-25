'use strict';
/*
1) С помощью jQuery создать контрол, работающий с вкладками.
Пример – http://dimox.name/examples/universal-jquery-tabs-script/ .
Можно использовать любую анимацию, методы show, hide и подобные. Код примера желательно не смотреть.
*/

(function ($) {
  var header1El = $('#header1');
  var header2El = $('#header2');
  var header3El = $('#header3');
  var header4El = $('#header4');

  var content1El = $('#content1');
  var content2El = $('#content2');
  var content3El = $('#content3');
  var content4El = $('#content4');

  content1

  header1El.on('click', function () {
    header1El.addClass('active');
    header2El.removeClass('active');
    header3El.removeClass('active');
    header4El.removeClass('active');
    content1El.addClass('active');
    content2El.removeClass('active');
    content3El.removeClass('active');
    content4El.removeClass('active');
  });

  header2El.on('click', function () {
    header1El.removeClass('active');
    header2El.addClass('active');
    header3El.removeClass('active');
    header4El.removeClass('active');
    content1El.removeClass('active');
    content2El.addClass('active');
    content3El.removeClass('active');
    content4El.removeClass('active');
  });

  header3El.on('click', function () {
    header1El.removeClass('active');
    header2El.removeClass('active');
    header3El.addClass('active');
    header4El.removeClass('active');
    content1El.removeClass('active');
    content2El.removeClass('active');
    content3El.addClass('active');
    content4El.removeClass('active');
  });

  header4El.on('click', function () {
    header1El.removeClass('active');
    header2El.removeClass('active');
    header3El.removeClass('active');
    header4El.addClass('active');
    content1El.removeClass('active');
    content2El.removeClass('active');
    content3El.removeClass('active');
    content4El.addClass('active');
  });

})(jQuery)