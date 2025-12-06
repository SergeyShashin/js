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
        startPosition: this.getStartPositionPaw(2),
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
        startPosition: this.getStartPositionPaw(7),
        position: '',
        code: 'U+265F',
        HTMLCode: '&#9823;'
      },
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
      let { startPosition, HTMLCode } = this.figures[key];
      
      if (Array.isArray(startPosition)) {
        for (let position of startPosition) {
          this.setFigure(position, HTMLCode);
        }

      } else {
        this.setFigure(startPosition, HTMLCode);
      }
    }
  },
  setFigure(startPosition, HTMLCode) {
    this.chessBoard[startPosition].innerHTML = HTMLCode;
  },
  getStartPositionPaw(num) {
    let res = [];
    for (let i = 1; i < this.charsForRow.length - 1; i++) {
      res.push(this.charsForRow[i] + num);
    }
    return res
  }
};

window.onload = () => chess.run();

