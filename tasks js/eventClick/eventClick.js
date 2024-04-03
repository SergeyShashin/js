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

function main() {

  const elements = document.querySelector('.wrapper');

  console.dir(elements.children);

  for (const el of elements.children) {
    console.log(el);
    el.addEventListener('click', ()=>console.log(el.dataset.clicks));
  }

}
