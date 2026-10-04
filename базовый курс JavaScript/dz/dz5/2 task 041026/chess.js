'use strict';

/*
Заполнить созданную таблицу фигурами, фигуры должны выглядеть как картинки, либо
можно использовать символы (существуют символы шахматных фигур) причем все фигуры
должны стоять на своих местах и быть соответственно черными и белыми.
*/

const chess = {
  settings: {
    rows: 10,
    cols: 10,
    colorBlackBG: 'black',
    charsForBoard: ['forCharsLeft', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'forCharsRight'],
  },

  chessHTMLEl: null,
  board: null,
  figures: null,

  run() {
    this.init();
  },

  init() {
    this.chessHTMLEl = document.getElementById('chess');
    this.board = {};
    this.figures = {
      'kw': {
        startPosition: 'E1',
        position: '',
        code: 'U+2654',
        HTMLCode: '&#9812;',
      },
      'fw': {
        startPosition: 'D1',
        position: '',
        code: 'U+2655',
        HTMLCode: '&#9813;'
      },
      'rw': {
        startPosition: ['A1', 'H1'],
        position: '',
        code: 'U+2656',
        HTMLCode: '&#9814;'
      },
      'ew': {
        startPosition: ['C1', 'F1'],
        position: '',
        code: 'U+2657',
        HTMLCode: '&#9815;'
      },
      'hw': {
        startPosition: ['B1', 'G1'],
        position: '',
        code: 'U+2658',
        HTMLCode: '&#9816;'
      },
      'pw': {
        // startPosition: this.getStartPositionPaw(2),
        position: '',
        code: 'U+2659',
        HTMLCode: '&#9817;'
      },
      'kb': {
        startPosition: 'E8',
        position: '',
        code: 'U+265A',
        HTMLCode: '&#9818;',
      },
      'fb': {
        startPosition: 'D8',
        position: '',
        code: 'U+265B',
        HTMLCode: '&#9819;'
      },
      'rb': {
        startPosition: ['A8', 'H8'],
        position: '',
        code: 'U+265C',
        HTMLCode: '&#9820;'
      },
      'eb': {
        startPosition: ['C8', 'F8'],
        position: '',
        code: 'U+265D',
        HTMLCode: '&#9821;'
      },
      'hb': {
        startPosition: ['B8', 'G8'],
        position: '',
        code: 'U+265E',
        HTMLCode: '&#9822;'
      },
      'pb': {
        // startPosition: this.getStartPositionPaw(7),
        position: '',
        code: 'U+265F',
        HTMLCode: '&#9823;'
      },
    };
    this.createChessBoard();
  },

  createChessBoard() {
    for (let row = 0; row < this.settings.rows; row++) {
      let tr = document.createElement('tr');
      for (let col = 0; col < this.settings.cols; col++) {
        let td = document.createElement('td');
        tr.appendChild(td);
        this.setColorTd(row, col, td);
        // this.board[`row${row}_col${col}`] = td;
        this.board[`${this.settings.charsForBoard[col]}${row}`] = td;
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
    for (let i = 1; i < 9; i++) {
      this.board[`${this.settings.charsForBoard[0]}${i}`].textContent = Math.abs(i - 9);
      this.board[`${this.settings.charsForBoard[9]}${i}`].textContent = Math.abs(i - 9);

      this.board[`${this.settings.charsForBoard[i]}${0}`].textContent = `${this.settings.charsForBoard[i]}`;
      this.board[`${this.settings.charsForBoard[i]}${9}`].textContent = `${this.settings.charsForBoard[i]}`;
    } 
  }
};

window.onload = () => chess.run();