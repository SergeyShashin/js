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
let counters;

function main() {

  const elements = document.querySelector('.wrapper');

  for (const el of elements.children) {
    el.addEventListener('click', (event) => clickHandler(event));
  }

}

function clickHandler(event) {

  if (!panel) {
    panel = new Panel();
    counters = new Counters();
  }

  switch (event.target.className) {
    case 'red':
      if (counters.getRedCounter() <= event.target.dataset.clicks) {
        counters.increaseRedCounter();
      } else {
        event.target.removeEventListener('click', clickHandler);
        return
      }
      break;
    case 'green':
      if (counters.getGreenCounter() <= event.target.dataset.clicks) {
        counters.increaseGreenCounter();
      } else {
        event.target.removeEventListener('click', clickHandler);
        return
      }
      break;
    case 'blue':
      if (counters.getBlueCounter() <= event.target.dataset.clicks) {
        counters.increaseBlueCounter();
      } else {
        event.target.removeEventListener('click', clickHandler);
        return
      }
      break;
  }

}

function Panel() {

}


function Counters() {
  this.redCounter = 1;
  this.greenCounter = 1;
  this.blueCounter = 1;
  this.elementRedCounter = document.getElementsByClassName('red-counter');
  this.elementGreenCounter = document.getElementsByClassName('green-counter');
  this.elementBlueCounter = document.getElementsByClassName('blue-counter');

}

Counters.prototype.increaseRedCounter = function () {
  this.elementRedCounter[0].innerText = this.redCounter;
  this.redCounter++;
};

Counters.prototype.getRedCounter = function () {
  return this.redCounter;
};

Counters.prototype.increaseGreenCounter = function () {
  this.elementGreenCounter[0].innerText = this.greenCounter;
  this.greenCounter++;

};

Counters.prototype.getGreenCounter = function () {
  return this.greenCounter;
};

Counters.prototype.increaseBlueCounter = function () {
  this.elementBlueCounter[0].innerText = this.blueCounter;
  this.blueCounter++;
};

Counters.prototype.getBlueCounter = function () {
  return this.blueCounter;
};
