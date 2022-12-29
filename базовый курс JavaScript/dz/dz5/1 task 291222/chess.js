'use strict';

// Создать функцию, генерирующую шахматную доску. При этом можно использовать любые
// html-теги по своему желанию.
// Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые
// ячейки.
// Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F,
// G, H.

chessGen();

function chessGen() {
  let numberingRow = [8, 7, 6, 5, 4, 3, 2, 1];
  let numberingCol = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];


  for (let row = 0; row < 9; row++) {
    let tr = document.createElement('tr');
    let chess = document.getElementById('chess');
    chess.appendChild(tr);

    for (let col = 0; col < 9; col++) {

      let td = document.createElement('td');

      if (col > 0 && col % 2 !== 0 && row % 2 !== 0) {
        td.className = 'black';
      }

      if (row < 8 && col > 0 && col % 2 == 0 && row % 2 == 0) {
        td.className = 'black';
      }

      if (col === 0 && row !== 8) {
        td.textContent = numberingRow[row];
      }

      if (row === 8 && col != 0) {
        td.textContent = numberingCol[col - 1];
      }

      tr.appendChild(td);
    }

  }
}