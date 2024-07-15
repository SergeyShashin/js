'use strict';

// Создать функцию, генерирующую шахматную доску. При этом можно использовать любые
// html-теги по своему желанию.
// Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые
// ячейки.
// Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F,
// G, H.

generateChessboard();

function generateChessboard() {
  let HTMLeLForChess = document.getElementById('chess');
  let letеers = ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', ''];

  for (let row = 0; row < 10; row++) {

    let tr = document.createElement('tr');
    HTMLeLForChess.appendChild(tr);

    for (let col = 0; col < 10; col++) {
      let td = document.createElement('td');
      tr.appendChild(td);

      //вставляет цифры в 0 колонку
      if (col === 0 && row > 0 && row < 9 || col === 9 && row > 0 && row < 9) {
        td.textContent = Math.abs(row - 9);
      }

      //вставляет цифры в 9 колонку
      if (col === 9 && row > 0 && row < 9) {
        td.textContent = row;
      }

      //вставляет символу в 9 строку
      if (row === 9 && col > 0 && col < 9 || row === 0 && col > 0 && col < 9) {
        td.textContent = letеers[col];
      }

      if (row !== 0 && row !== 9 && col !== 0 && col !== 9 && col % 2 == 1 && row % 2 == 0
        ||
        row !== 0 && row !== 9 && col !== 0 && col !== 9 && col % 2 == 0 && row % 2 == 1
        ) {
        td.className = 'black';
      }

    }
  }



}