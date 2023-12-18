'use strict';

// Создать функцию, генерирующую шахматную доску. При этом можно использовать любые
// html-теги по своему желанию.
// Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые
// ячейки.
// Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F,
// G, H.

createСhessboard();

function createСhessboard() {

  let chessElement = document.getElementById('chess');
  let abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  for (let row = 0; row < 10; row++) {

    let tr = document.createElement('tr');

    for (let col = 0; col < 9; col++) {

      let td = document.createElement('td');

      if (col === 0 && row != 0 && row !== 9) {
        td.textContent = 9 - row;
      }

      if (row === 0 && col !== 0 && col !== 9 || row === 9 && col !== 0 && col !== 9) {
        td.textContent = abc[col - 1];
      }

      if (
        col !== 0 && row !== 9 && row !== 0 && col % 2 !== 0 && row % 2 == 0 ||
        row % 2 !== 0 && col % 2 == 0 && col !== 0 && row !== 9
      ) {
        td.className = 'black';
      }
      
      tr.appendChild(td);
    }
    chessElement.appendChild(tr);
  }

}