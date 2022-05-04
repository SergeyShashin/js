'use strict';

// Создать функцию, генерирующую шахматную доску. При этом можно использовать любые
// html-теги по своему желанию.
// Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые
// ячейки.
// Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F,
// G, H.

chessDesk();

/**
 * Генерирует шахматную доску
 */
function chessDesk() {
  let chess = document.getElementById('chess');
  let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  for (let row = 0; row < 10; row++) {
    let tr = document.createElement('tr');
    chess.appendChild(tr);

    for (let col = 0; col < 10; col++) {
      let td = document.createElement('td');

      //заполняем буквы
      if (row === 0 || row === 9 && col >= 1) {
        td.textContent = letters[col - 1];
      }

      //заполняем цифры
      if (col === 0 && row != 0 && row != 9 || col === 9 && row != 0 && row != 9) {
        td.textContent = 9-row;
      }


      tr.appendChild(td);
    }
  }

}