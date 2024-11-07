'use strict';

/*
Заполнить созданную таблицу фигурами, фигуры должны выглядеть как картинки, либо
можно использовать символы (существуют символы шахматных фигур) причем все фигуры
должны стоять на своих местах и быть соответственно черными и белыми.
*/

genChessDesk();

function genChessDesk() {
  let chessEl = document.getElementById('chess');
  let chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  for (let row = 0; row < 10; row++) {
    let tr = document.createElement('tr');

    for (let col = 0; col < 10; col++) {
      let td = document.createElement('td');
      tr.appendChild(td);

      if (col === 0 && row !== 0 && row !== 9) {
        td.textContent = 9 - row;
      }

      if (col === 9 && row !== 0 && row !== 9) {
        td.textContent = 9 - row;
      }

      if (row === 0 && col !== 0 && col !== 9) {
        td.textContent = chars[col - 1];
      }

      if (row === 9 && col !== 0 && col !== 9) {
        td.textContent = chars[col - 1];
      }

      if (row % 2 == 0 && col % 2 !== 0 && row !== 0 && row !== 9 && col !== 0 && col !== 9) {
        td.className = 'black';
      }

      if (row % 2 != 0 && col % 2 === 0 && row !== 0 && row !== 9 && col !== 0 && col !== 9) {
        td.className = 'black';
      }

    }

    chessEl.appendChild(tr);

  }
}
