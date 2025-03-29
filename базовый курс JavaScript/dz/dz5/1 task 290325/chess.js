'use strict';

// Создать функцию, генерирующую шахматную доску. При этом можно использовать любые
// html-теги по своему желанию.
// Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые
// ячейки.
// Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F,
// G, H.

const chessboard = {
  chessEl: document.getElementById('chess'),
  leters: ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', ''],
  run() {
    for (let row = 0; row < 10; row++) {
      let trEl = document.createElement('tr');
      for (let col = 0; col < 10; col++) {
        let tdEl = document.createElement('td');
        if (row === 0 || row === 9) {
          tdEl.textContent = this.leters[col];
        }
        if (row != 0 && row != 9 && col === 0 || row != 0 && row != 9 && col === 9) {
          tdEl.textContent = Math.abs(row - 9);
        }

        if (row !== 9 && col !== 9 && row !== 0 && col !== 0 && row % 2 === 0 && col % 2 !== 0 || row !== 9 && col !== 9 && row !== 0 && col !== 0 && row % 2 !== 0 && col % 2 === 0) {
          tdEl.classList.add('black');
        }
        trEl.appendChild(tdEl);
      }
      this.chessEl.appendChild(trEl);
    }
  }
}

chessboard.run();