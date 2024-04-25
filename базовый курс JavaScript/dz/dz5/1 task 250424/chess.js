'use strict';

// Создать функцию, генерирующую шахматную доску. При этом можно использовать любые
// html-теги по своему желанию.
// Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые
// ячейки.
// Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F,
// G, H.

chessBoarGen()

function chessBoarGen() {
  let chessElement = document.getElementById('chess');
  let chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].join('').toUpperCase().split('');
  let numbers = ['1', '2', '3', '4', '5', '6', '7', '8'].reverse();

  for (let row = 0; row < 10; row++) {
    let tr = document.createElement('tr');
    chessElement.appendChild(tr);
    for (let col = 0; col < 10; col++) {
      let td = document.createElement('td');
      chessElement.appendChild(td);

      if (row === 0 || row === 9) {
        td.textContent = chars[col - 1];
      }

      if (col === 0 || col === 9) {
        td.textContent = numbers[row - 1];
      }

      if (col > 0 && col < 9 && row > 0 && row < 9 && col % 2 && row % 2 == 0 ||
        col > 0 && col < 9 && row > 0 && row < 9 && col % 2 === 0 && row % 2 == 1) {
        td.classList = 'black'
      }

    }
  }


}
