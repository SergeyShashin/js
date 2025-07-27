'use strict';

/*
Заполнить созданную таблицу фигурами, фигуры должны выглядеть как картинки, либо
можно использовать символы (существуют символы шахматных фигур) причем все фигуры
должны стоять на своих местах и быть соответственно черными и белыми.
*/

const chessBoard = {
  chessEl: null,
  letters: null,
  gameField: null,
  figures: null,
  codeFigures: null,

  run() {
    this.init();
    this.addBoard();
    this.setFigures();
  },

  init() {
    this.letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    this.chessEl = document.getElementById('chess');
    this.codeFigures = {
      'kw': ['U+2654', '&#9812;'],
      'qw': ['U+2655', '&#9813;'],
      'bw': ['U+2657', '&#9815;'],
      'hw': ['U+2658', '&#9816;'],
      'rw': ['U+2656', '&#9814;'],
      'pw': ['U+2659', '&#9817;'],

      'kb': ['U+265A', '&#9818;'],
      'qb': ['U+265B', '&#9819;'],
      'bb': ['U+265D', '&#9821;'],
      'hb': ['U+265E', '&#9822;'],
      'rb': ['U+265C', '&#9820;'],
      'pb': ['U+265F', '&#9823;'],

    },
      this.gameField = {};
    this.figures = [
      {
        name: 'king',
        color: 'white',
        startPosition: 'E1',
        position: '',
      },
      {
        name: 'queen',
        color: 'white',
        startPosition: 'D1',
        position: '',
      },
      {
        name: 'bishopC1',
        color: 'white',
        startPosition: 'C1',
        position: '',
      },
      {
        name: 'bishopF1',
        color: 'white',
        startPosition: 'F1',
        position: '',
      },
      {
        name: 'horseB1',
        color: 'white',
        startPosition: 'B1',
        position: '',
      },
      {
        name: 'horseG1',
        color: 'white',
        startPosition: 'G1',
        position: '',
      },
      {
        name: 'rookA1',
        color: 'white',
        startPosition: 'A1',
        position: '',
      },
      {
        name: 'rookH1',
        color: 'white',
        startPosition: 'H1',
        position: '',
      },
      {
        name: 'pawnA2',
        color: 'white',
        startPosition: 'A2',
        position: '',
      },
      {
        name: 'pawnB2',
        color: 'white',
        startPosition: 'B2',
        position: '',
      },
      {
        name: 'pawnC2',
        color: 'white',
        startPosition: 'C2',
        position: '',
      },
      {
        name: 'pawnD2',
        color: 'white',
        startPosition: 'D2',
        position: '',
      },
      {
        name: 'pawnE2',
        color: 'white',
        startPosition: 'E2',
        position: '',
      },
      {
        name: 'pawnF2',
        color: 'white',
        startPosition: 'F2',
        position: '',
      },
      {
        name: 'pawnG2',
        color: 'white',
        startPosition: 'G2',
        position: '',
      },
      {
        name: 'pawnH2',
        color: 'white',
        startPosition: 'H2',
        position: '',
      },
      {
        name: 'king',
        color: 'black',
        startPosition: 'E8',
        position: '',
      },
      {
        name: 'queen',
        color: 'black',
        startPosition: 'D8',
        position: '',
      },
      {
        name: 'bishopC8',
        color: 'black',
        startPosition: 'C8',
        position: '',
      },
      {
        name: 'bishopF8',
        color: 'black',
        startPosition: 'F8',
        position: '',
      },
      {
        name: 'horseB8',
        color: 'black',
        startPosition: 'B8',
        position: '',
      },
      {
        name: 'horseG8',
        color: 'black',
        startPosition: 'G8',
        position: '',
      },
      {
        name: 'rookA8',
        color: 'black',
        startPosition: 'A8',
        position: '',
      },
      {
        name: 'rookH8',
        color: 'black',
        startPosition: 'H8',
        position: '',
      },
      {
        name: 'pawnA7',
        color: 'black',
        startPosition: 'A7',
        position: '',
      },
      {
        name: 'pawnB7',
        color: 'black',
        startPosition: 'B7',
        position: '',
      },
      {
        name: 'pawnC7',
        color: 'black',
        startPosition: 'C7',
        position: '',
      },
      {
        name: 'pawnD7',
        color: 'black',
        startPosition: 'D7',
        position: '',
      },
      {
        name: 'pawnE7',
        color: 'black',
        startPosition: 'E7',
        position: '',
      },
      {
        name: 'pawnF7',
        color: 'black',
        startPosition: 'F7',
        position: '',
      },
      {
        name: 'pawnG7',
        color: 'black',
        startPosition: 'G7',
        position: '',
      },
      {
        name: 'pawnH7',
        color: 'black',
        startPosition: 'H7',
        position: '',
      },
    ]
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
      this.gameField[`${this.letters[col - 1]}${Math.abs(row - 9)}`] = tdEl;
      trEl.appendChild(tdEl);
    }
  },

  setFigures() {
    for (let { name, startPosition, color } of this.figures) {
      this.gameField[startPosition].innerHTML = this.codeFigures[`${name[0]}${color[0]}`][1];
    }
  }

}

chessBoard.run();

