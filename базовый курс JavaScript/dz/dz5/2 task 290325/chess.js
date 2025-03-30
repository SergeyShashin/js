'use strict';

/*
Заполнить созданную таблицу фигурами, фигуры должны выглядеть как картинки, либо
можно использовать символы (существуют символы шахматных фигур) причем все фигуры
должны стоять на своих местах и быть соответственно черными и белыми.
*/

const chessboard = {
  chessEl: document.getElementById('chess'),
  leters: ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', ''],
  figures: [
    {
      name: 'king',
      color: 'white',
      startPosition: 'E1',
      position: '',
      code: 'U+2654',
      html: '&#9812;'
    },
    {
      name: 'queen',
      color: 'white',
      startPosition: 'D1',
      position: '',
      code: 'U+2655',
      html: '&#9813;'
    },
    {
      name: 'bishopC1',
      color: 'white',
      startPosition: 'C1',
      position: '',
      code: 'U+2657',
      html: '&#9815;'
    },
    {
      name: 'bishopF1',
      color: 'white',
      startPosition: 'F1',
      position: '',
      code: 'U+2657',
      html: '&#9815;',
    },
    {
      name: 'knightB1',
      color: 'white',
      startPosition: 'B1',
      position: '',
      code: 'U+2658',
      html: '&#9816;',
    },
    {
      name: 'knightG1',
      color: 'white',
      startPosition: 'G1',
      position: '',
      code: 'U+2658',
      html: '&#9816;',
    },
    {
      name: 'rookA1',
      color: 'white',
      startPosition: 'A1',
      position: '',
      code: 'U+2656',
      html: '&#9814;',
    },
    {
      name: 'rookH1',
      color: 'white',
      startPosition: 'H1',
      position: '',
      code: 'U+2656',
      html: '&#9814;',
    },
    {
      name: 'pawnA2',
      color: 'white',
      startPosition: 'A2',
      position: '',
      code: 'U+2659',
      html: '&#9817;',
    },
    {
      name: 'pawnB2',
      color: 'white',
      startPosition: 'B2',
      position: '',
      code: 'U+2659',
      html: '&#9817;',
    },
    {
      name: 'pawnC2',
      color: 'white',
      startPosition: 'C2',
      position: '',
      code: 'U+2659',
      html: '&#9817;',
    },
    {
      name: 'pawnD2',
      color: 'white',
      startPosition: 'D2',
      position: '',
      code: 'U+2659',
      html: '&#9817;',
    },
    {
      name: 'pawnE2',
      color: 'white',
      startPosition: 'E2',
      position: '',
      code: 'U+2659',
      html: '&#9817;',
    },
    {
      name: 'pawnF2',
      color: 'white',
      startPosition: 'F2',
      position: '',
      code: 'U+2659',
      html: '&#9817;',
    },
    {
      name: 'pawnG2',
      color: 'white',
      startPosition: 'G2',
      position: '',
      code: 'U+2659',
      html: '&#9817;',
    },
    {
      name: 'pawnH2',
      color: 'white',
      startPosition: 'H2',
      position: '',
      code: 'U+2659',
      html: '&#9817;',
    },
    {
      name: 'king',
      color: 'black',
      startPosition: 'E8',
      position: '',
      code: 'U+265A',
      html: '&#9818;'
    },
    {
      name: 'queen',
      color: 'black',
      startPosition: 'D8',
      position: '',
      code: 'U+265B',
      html: '&#9819;'
    },
    {
      name: 'bishopC8',
      color: 'black',
      startPosition: 'C8',
      position: '',
      code: 'U+265D',
      html: '&#9821;'
    },
    {
      name: 'bishopF8',
      color: 'black',
      startPosition: 'F8',
      position: '',
      code: 'U+265D',
      html: '&#9821;'
    },
    {
      name: 'knightB8',
      color: 'black',
      startPosition: 'B8',
      position: '',
      code: 'U+265E',
      html: '&#9822;',
    },
    {
      name: 'knightG8',
      color: 'black',
      startPosition: 'G8',
      position: '',
      code: 'U+265E',
      html: '&#9822;',
    },
    {
      name: 'rookA8',
      color: 'black',
      startPosition: 'A8',
      position: '',
      code: 'U+265C',
      html: '&#9820;',
    },
    {
      name: 'rookH8',
      color: 'black',
      startPosition: 'H8',
      position: '',
      code: 'U+265C',
      html: '&#9820;',
    },
    {
      name: 'pawnA7',
      color: 'black',
      startPosition: 'A7',
      position: '',
      code: 'U+265F',
      html: '&#9823;',
    },
    {
      name: 'pawnB7',
      color: 'black',
      startPosition: 'B7',
      position: '',
      code: 'U+265F',
      html: '&#9823;',
    },
    {
      name: 'pawnC7',
      color: 'black',
      startPosition: 'C7',
      position: '',
      code: 'U+265F',
      html: '&#9823;',
    },
    {
      name: 'pawnD7',
      color: 'black',
      startPosition: 'D7',
      position: '',
      code: 'U+265F',
      html: '&#9823;',
    },
    {
      name: 'pawnE7',
      color: 'black',
      startPosition: 'E7',
      position: '',
      code: 'U+265F',
      html: '&#9823;',
    },
    {
      name: 'pawnF7',
      color: 'black',
      startPosition: 'F7',
      position: '',
      code: 'U+265F',
      html: '&#9823;',
    },
    {
      name: 'pawnG7',
      color: 'black',
      startPosition: 'G7',
      position: '',
      code: 'U+265F',
      html: '&#9823;',
    },
    {
      name: 'pawnH7',
      color: 'black',
      startPosition: 'H7',
      position: '',
      code: 'U+265F',
      html: '&#9823;',
    },
  ],
  cells: {},
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

        this.cells[`${this.leters[col]}${Math.abs(row - 9)}`] = tdEl;

        trEl.appendChild(tdEl);
      }
      this.chessEl.appendChild(trEl);
    }
    this.setFigures();
  },
  setFigures() {
    for (let figure of this.figures) {
      this.cells[figure.startPosition].innerHTML = figure.html;
    }

  }
}

chessboard.run();