'use strict';
/*
1) С помощью jQuery создать контрол, работающий с вкладками.
Пример – http://dimox.name/examples/universal-jquery-tabs-script/ .
Можно использовать любую анимацию, методы show, hide и подобные. Код примера желательно не смотреть.
*/

(function ($) {
  $('.tabs__caption').on('click', 'li', function (e) {
    for (let el of $('.active')) {
      el.classList.remove('active');
    };
    e.target.classList.add('active');
    var idContent = `#content${e.target.id.replace(/(header)/, '')}`;
    $(idContent).addClass('active');

  });

})(jQuery)