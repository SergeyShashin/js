'use strict';

/*
1) С помощью jQuery создать контрол, работающий с вкладками.
Пример – http://dimox.name/examples/universal-jquery-tabs-script/ .
Можно использовать любую анимацию, методы show, hide и подобные. Код примера желательно не смотреть.
*/

var tabsCaptionEl = document.querySelector('.tabs__caption');

tabsCaptionEl.addEventListener('click', function (e) {
  console.log(e.target.tagName);  

})
