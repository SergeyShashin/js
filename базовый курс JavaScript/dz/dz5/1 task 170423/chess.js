'use strict';

// Создать функцию, генерирующую шахматную доску. При этом можно использовать любые
// html-теги по своему желанию.
// Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые
// ячейки.
// Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F,
// G, H.

let htmlElement = document.getElementById('chess');
let rowsCount = 10;
let colsCount = 10;
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

genChesDesk();

/**
 * Рисует шахматную доску в теге <table id="chess">
 */
function genChesDesk() {
  for (let row = 0; row < rowsCount; row++) {
    let rowEl = document.createElement('tr');
    for (let col = 0; col < colsCount; col++) {
      let colEl = document.createElement('td');
      rowEl.appendChild(colEl);
      setLettersColums(row, col, colEl);
      setNumbersRows(row, col, colEl);
      setBlackField(row, col, colEl);

    }
    htmlElement.appendChild(rowEl);
  }
}

/**
 * Устанавливает буквы в элементы колонок
 * @param {int} row Номер строки
 * @param {int} col Номер колонки
 * @param {htmlElement} colEl Html элемент 'td'
 */
function setLettersColums(row, col, colEl) {
  if (row === 0 && col >= 1 && col < 9) {
    colEl.textContent = letters[col - 1];
    colEl.classList.add('rotate');
  }

  if (row === 9 && col >= 1 && col < 9) {
    colEl.textContent = letters[col - 1];
  }
}

/**
 * Устанавливает цифры в элементы строк
 * @param {int} row Номер строки
 * @param {int} col Номер колонки
 * @param {htmlElement} colEl Html элемент 'td'
 */
function setNumbersRows(row, col, colEl) {
  if (col === 0 && row >= 1 && row < 9) {
    colEl.textContent = Math.abs(row - 9);
  }

  if (col === 9 && row >= 1 && row < 9) {
    colEl.textContent = Math.abs(row - 9);
    colEl.classList.add('rotate');
  }
}

/**
 * Устанавливает чёрный цвет ячейке
 * @param {int} row Номер строки
 * @param {int} col Номер колонки
 * @param {htmlElement} colEl Html элемент 'td'
 */
function setBlackField(row, col, colEl) {
  if (row > 0 && row < 9 && col > 0 && col < 10 && col % 2 === 0 && row % 2 !== 0 ||
    row > 0 && row < 9 && col > 0 && col < 9 && col % 2 !== 0 && row % 2 === 0
  ) {
    colEl.classList.add('black');
  }

}