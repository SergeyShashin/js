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

genChesDesk();

function genChesDesk() {
  for (let row = 0; row < rowsCount; row++) {
    let rowEl = document.createElement('tr');
    for (let col = 0; col < colsCount; col++) {
      let colEl = document.createElement('td');
      rowEl.appendChild(colEl);
      setLiteralColums(row, col, colEl);

    }
    htmlElement.appendChild(rowEl)
  }
}

function setLiteralColums(row, col, colEl) {
  if (row === 0 && col >= 1 && col < 9) {
    colEl.textContent = col;
  }

}