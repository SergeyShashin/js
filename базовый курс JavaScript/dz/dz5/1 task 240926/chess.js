'use strict';

// Создать функцию, генерирующую шахматную доску. При этом можно использовать любые
// html-теги по своему желанию.
// Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые
// ячейки.
// Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F,
// G, H.

const chess = {
  settings: {
    rows: 10,
    cols: 10,
    colorBlackBG: 'black',
    charsForBoard: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  },
  chessHTMLEl: null,
  board: null,

  run() {
    this.init();
  },

  init() {
    this.chessHTMLEl = document.getElementById('chess');
    this.board = {};
    this.createChessBoard();
  },

  createChessBoard() {
    for (let row = 0; row < this.settings.rows; row++) {
      let tr = document.createElement('tr');
      for (let col = 0; col < this.settings.cols; col++) {
        let td = document.createElement('td');
        tr.appendChild(td);
        this.setColorTd(row, col, td);
        this.board[`row${row}_col${col}`] = td;
      }
      this.chessHTMLEl.appendChild(tr);
    }
    this.insertCharsForBoard();

  },

  setColorTd(row, col, td) {
    row % 2 === 0 && row > 0 && col > 0 && row < 9 && col < 9 && col % 2 === 1 ? td.classList.add(this.settings.colorBlackBG) : '';
    row % 2 === 1 && row > 0 && col > 0 && col < 9 && row < 9 && col % 2 === 0 ? td.classList.add(this.settings.colorBlackBG) : '';
  },

  insertCharsForBoard() {
    this.settings.charsForBoard.forEach((char, idx) => {
      this.board[`row${0}_col${idx + 1}`].textContent = char;
      this.board[`row${9}_col${idx + 1}`].textContent = char;
      this.board[`row${idx + 1}_col${0}`].textContent = Math.abs(idx + 1 - 9);
      this.board[`row${idx + 1}_col${9}`].textContent = Math.abs(idx + 1 - 9);
    });
  }
};

window.onload = () => chess.run();