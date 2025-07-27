'use strict';

// Создать функцию, генерирующую шахматную доску. При этом можно использовать любые
// html-теги по своему желанию.
// Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые
// ячейки.
// Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F,
// G, H.

const chessBoard = {
  chessEl: null,
  letters: null,

  run() {
    this.init();
    this.addBoard();
  },

  init() {
    this.letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    this.chessEl = document.getElementById('chess');
  },

  insertLetters(tdEl, row, col) {
    if (row === 0 && col !== 0 && col !== 9 || row === 9 && col !== 0 && col !== 9) {
      tdEl.textContent = this.letters[col - 1];
    }
  },

  insertNumbers(tdEl, row, col) {
    if (col === 0 && row !== 0 && row !== 9 || col === 9 && row !== 0 && row !== 9) {
      tdEl.textContent = Math.abs(row - 9);
    }
  },

  setBlack(tdEl, row, col) {
    if (col % 2 !== 0 && row % 2 == 0 && row !== 0 && col !== 9 || col % 2 == 0 && row % 2 !== 0 && row !== 9 && col !== 0) {
      tdEl.classList.add('black');
    }
  },

  addBoard() {
    for (let row = 0; row < 10; row++) {
      let trEl = document.createElement('tr');
      this.addCols(trEl, row);
      this.chessEl.appendChild(trEl)
    }
  },
  
  addCols(trEl, row) {
    for (let col = 0; col < 10; col++) {
      let tdEl = document.createElement('td');

      this.insertLetters(tdEl, row, col);
      this.insertNumbers(tdEl, row, col);
      this.setBlack(tdEl, row, col);

      trEl.appendChild(tdEl);
    }
  },

}

chessBoard.run();

