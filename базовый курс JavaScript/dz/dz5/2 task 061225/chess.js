'use strict';

/*
Заполнить созданную таблицу фигурами, фигуры должны выглядеть как картинки, либо
можно использовать символы (существуют символы шахматных фигур) причем все фигуры
должны стоять на своих местах и быть соответственно черными и белыми.
*/


const chess = {
  chessHTMLEl: null,
  chessBoard: null,
  chessBoardHTMLEl: null,
  nameCols: null,
  charsForRow: null,
  figures: null,

  run() {
    this.init();
  },

  init() {
    this.chessHTMLEl = document.getElementById('chess');
    this.chessBoard = {};
    this.addCharsForRow();
    this.chessHTMLEl.appendChild(this.getChessBoardHTMLEl());
    this.figures = {
      'kw': {
        startPosition: 'E1',
        code: 'U+2654',
        HTMLCode: '&#9812;'
      }
    };
    this.setStartPositionFiguresOnChessHTMLEl();
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
        this.chessBoard[`${this.charsForRow[col]}${9 - row}`] = tdHTMLEl;
        trHTMLEl.appendChild(tdHTMLEl);
      }
      this.chessBoardHTMLEl.appendChild(trHTMLEl);
    }
  },

  setStartPositionFiguresOnChessHTMLEl() {
    for (let key in this.figures) {
      console.log(this.figures[key].startPosition);
      let { startPosition, HTMLCode } = this.figures[key];
      this.chessBoard[startPosition].innerHTML = HTMLCode;
    }
  }
};

window.onload = () => chess.run();

