'use strict';

/*
1) С помощью jQuery создать контрол, работающий с вкладками.
Пример – http://dimox.name/examples/universal-jquery-tabs-script/ .
Можно использовать любую анимацию, методы show, hide и подобные. Код примера желательно не смотреть.
*/

var tabsCaptionEl = document.querySelector('.tabs__caption');

tabsCaptionEl.addEventListener('click', function (e) {
  if (e.target.tagName === 'LI') {
    var activeElements = document.querySelectorAll('.active');

    activeElements.forEach(function (element) {
      element.classList.remove('active');
    });

    e.target.classList.add('active');
    var idTargetElement = e.target.id;
    var numberIdTargetElement = idTargetElement.slice(6);
    document.getElementById(`content${numberIdTargetElement}`).classList.add('active');
  }

})
