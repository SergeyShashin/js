'use strict';
/*
1) С помощью jQuery создать контрол, работающий с вкладками.
Пример – http://dimox.name/examples/universal-jquery-tabs-script/ .
Можно использовать любую анимацию, методы show, hide и подобные. Код примера желательно не смотреть.
*/

(function ($) {
  $(function () {
    $('.tabs__caption').on('click', 'li', function () {
      let thisEl = this;
      let thisId = this.id;
      let contentId = '#content' + thisId[thisId.length - 1];
      $('.active').removeClass('active');
      thisEl.className = 'active';
      $(contentId).addClass('active');
    });
  });

})(jQuery);