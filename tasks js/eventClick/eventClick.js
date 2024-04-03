'use strict';

/*

Задание:

Сверстать лэйаут так, чтобы класс wrapper был квадратом, содержащим:
/------/------/
/red   /      /
/------/ blue /
/green /      /
/------/------/

Дан, код программиста, который уже начал выполнять работу, вам нужно её закончить.
Ограничений нет, нужно просто выполнить задачу:
Реализовать класс Panel, в который передаётся элемент. Элементами
будут служить цветные квадраты и прямоугольники в классе wraper.
При клике на элемент, необходимо вывести количество кликов по данному элементу в класс counters.
При достижении максимального числа кликов по элементу, которое прописано в data-clicks каждого элемента,
необходимо отменить событие, событие отслеживающее клики по элементу.


// function main() {

//   var elements = document.querySelectorAll(".wrapper")[0];

//   [].slice.apply(elements.children).forEach(function (panelElement) {
//     var panel = new Panel(panelElement, 10);
//     panel.init();
//   });

// }
*/

main();
let panel;

function main() {

  const elements = document.querySelector('.wrapper');

  for (const el of elements.children) {
    el.addEventListener('click', () => clickHandler(el));
  }

}

function clickHandler(el) {
  console.log(el.dataset.clicks);
  console.log(el);

  if (!panel) {
    panel = new Panel();
  }

  switch (el.className) {
    case 'red':
      console.log('red!');
      break;
    case 'green':
      console.log('green!');
      break;
    case 'blue':
      console.log('blue!');
      break;
  }


  console.log(panel);

}

function Panel() {

}

Panel.prototype.init = function () {

}

function Counters() {
  this.redCounter = 0;
  this.greenCounter = 0;
  this.blueCounter = 0;
}

Counters.prototype.increaseRedCounter = function () {
  this.redCounter++;
}

Counters.prototype.increaseGreenCounter = function () {
  this.greenCounter++;
}
Counters.prototype.increaseBlueCounter = function () {
  this.blueCounter++;
}
