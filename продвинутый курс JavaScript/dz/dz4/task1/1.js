'use strict';
/*
1) С помощью jQuery создать контрол, работающий с вкладками.
Пример – http://dimox.name/examples/universal-jquery-tabs-script/ .
Можно использовать любую анимацию, методы show, hide и подобные. Код примера желательно не смотреть.
*/


var tabsEl = document.querySelector('.tabs');

/**
 * Обрабатывает клики по элементам
 */
tabsEl.addEventListener('click', function (event) {
  if (event.target.tagName === 'LI') {
    clearClassActive(tabsEl);
    setClassActive(event.target);
    setClassActive(giveTheElementCorrespondingToThisHeading(event.target));
  }
})

/**
 * Убирает класс active у всех дочерних элементов
 * @param {HTML} element 
 */
function clearClassActive(element) {
  element.querySelectorAll('.active').forEach(function (child) {
    child.classList.remove('active');
  });
}

/**
 * Устанавливает класс active
 * @param {HTML} element 
 */
function setClassActive(element) {
  element.classList.add('active');
}

/**
 * Находит контент, соответствующий заголовку
 * @param {Html} element 
 * @return Возвращает HTML элемент
 */
function giveTheElementCorrespondingToThisHeading(element) {
  var numberHeader = element.id[element.id.length - 1];
  return document.getElementById(`content${numberHeader}`);
}
