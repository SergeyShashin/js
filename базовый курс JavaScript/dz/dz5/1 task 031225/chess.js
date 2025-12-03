'use strict';

// Создать функцию, генерирующую шахматную доску. При этом можно использовать любые
// html-теги по своему желанию.
// Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые
// ячейки.
// Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F,
// G, H.


const chess = {

  chessHTMLEl: null,
  chessBoard: null,
  chessBoardHTMLEl: null,
  nameCols: null,
  charsForRow: null,

  run() {
    this.init();
  },

  init() {
    this.chessHTMLEl = document.getElementById('chess');
    this.chessBoard = {};
    this.addCharsForRow();
    this.chessHTMLEl.appendChild(this.getChessBoardHTMLEl());
  },

  addCharsForRow() {
    this.charsForRow = [''];
    for (let i = 65; i < 73; i++) {
      this.charsForRow.push(String.fromCharCode(i));
    }
    this.charsForRow.push('');
  },

  getChessBoardHTMLEl() {
    if (!this.chessBoardHTMLEl) {
      this.createChessBoardHTMLEl();
    }

    return this.chessBoardHTMLEl
  },

  createChessBoardHTMLEl() {
    this.chessBoardHTMLEl = document.createElement('table');
    for (let row = 0; row < 10; row++) {
      let trHTMLEl = document.createElement('tr');
      for (let col = 0; col < 10; col++) {
        let tdHTMLEl = document.createElement('td');
        if (row === 0 || row === 9) {
          tdHTMLEl.textContent = this.charsForRow[col];
        }

        if ((col === 0 || col === 9) && row !== 0 && row !== 9) {
          tdHTMLEl.textContent = 9 - row;
        }

        if (col < 9 && row % 2 === 0 && col % 2 === 1 && row !== 0) {
          tdHTMLEl.classList.add('black');
        }

        if (col > 0 && row % 2 === 1 && col % 2 === 0 && row !== 9) {
          tdHTMLEl.classList.add('black');
        }
        this.chessBoard[`${this.charsForRow[9 - row]}${col}`] = tdHTMLEl;
        trHTMLEl.appendChild(tdHTMLEl);
      }
      this.chessBoardHTMLEl.appendChild(trHTMLEl);
    }
    console.log(this.chessBoard);
  }
};

window.onload = () => chess.run();

