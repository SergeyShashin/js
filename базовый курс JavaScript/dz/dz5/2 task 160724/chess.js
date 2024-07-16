'use strict';

/*
Заполнить созданную таблицу фигурами, фигуры должны выглядеть как картинки, либо
можно использовать символы (существуют символы шахматных фигур) причем все фигуры
должны стоять на своих местах и быть соответственно черными и белыми.
*/

const chess = {
  HTMLeLForChess: document.getElementById('chess'),
  chessBoardHTMLElements: {},
  figures: [
    {
      color: 'white',
      name: 'KingWhite',
      startPosition: 'e1',
      codeHTML: '&#9812;',
    },
    {
      color: 'white',
      name: 'QueenWhite',
      startPosition: 'd1',
      codeHTML: '&#9813;',
    },
    {
      color: 'white',
      name: 'BishopWhite',
      startPosition: 'c1',
      codeHTML: '&#9815;',
    },
    {
      color: 'white',
      name: 'BishopWhite',
      startPosition: 'f1',
      codeHTML: '&#9815;',
    },
    {
      color: 'white',
      name: 'KnightWhite',
      startPosition: 'b1',
      codeHTML: '&#9816;',
    },
    {
      color: 'white',
      name: 'KnightWhite',
      startPosition: 'g1',
      codeHTML: '&#9816;',
    },
    {
      color: 'white',
      name: 'RookWhite',
      startPosition: 'a1',
      codeHTML: '&#9814;',
    },
    {
      color: 'white',
      name: 'RookWhite',
      startPosition: 'h1',
      codeHTML: '&#9814;',
    },
    {
      color: 'white',
      name: 'PawnWhite',
      startPosition: 'a2',
      codeHTML: '&#9817;',
    },
    {
      color: 'white',
      name: 'PawnWhite',
      startPosition: 'b2',
      codeHTML: '&#9817;',
    },
    {
      color: 'white',
      name: 'PawnWhite',
      startPosition: 'c2',
      codeHTML: '&#9817;',
    },    
    {
      color: 'white',
      name: 'PawnWhite',
      startPosition: 'd2',
      codeHTML: '&#9817;',
    },
    {
      color: 'white',
      name: 'PawnWhite',
      startPosition: 'e2',
      codeHTML: '&#9817;',
    },
    {
      color: 'white',
      name: 'PawnWhite',
      startPosition: 'f2',
      codeHTML: '&#9817;',
    },
    {
      color: 'white',
      name: 'PawnWhite',
      startPosition: 'g2',
      codeHTML: '&#9817;',
    },
    {
      color: 'white',
      name: 'PawnWhite',
      startPosition: 'h2',
      codeHTML: '&#9817;',
    },
    {
      color: 'black',
      name: 'KingBlack',
      startPosition: 'e8',
      codeHTML: '&#9818;',
    },
    {
      color: 'black',
      name: 'QueenBlack',
      startPosition: 'd8',
      codeHTML: '&#9819;',
    },
    {
      color: 'black',
      name: 'BishopBlack',
      startPosition: 'c8',
      codeHTML: '&#9821;',
    },
    {
      color: 'black',
      name: 'BishopBlack',
      startPosition: 'f8',
      codeHTML: '&#9821;',
    },
    {
      color: 'black',
      name: 'KnightBlack',
      startPosition: 'b8',
      codeHTML: '&#9822;',
    },
    {
      color: 'black',
      name: 'KnightBlack',
      startPosition: 'g8',
      codeHTML: '&#9822;',
    },
    {
      color: 'black',
      name: 'RookBlack',
      startPosition: 'a8',
      codeHTML: '&#9820;',
    },
    {
      color: 'black',
      name: 'RookBlack',
      startPosition: 'h8',
      codeHTML: '&#9820;',
    },
    {
      color: 'black',
      name: 'PawnBlack',
      startPosition: 'a7',
      codeHTML: '&#9823;',
    },
    {
      color: 'black',
      name: 'PawnBlack',
      startPosition: 'b7',
      codeHTML: '&#9823;',
    },
    {
      color: 'black',
      name: 'PawnBlack',
      startPosition: 'c7',
      codeHTML: '&#9823;',
    },    
    {
      color: 'black',
      name: 'PawnBlack',
      startPosition: 'd7',
      codeHTML: '&#9823;',
    },
    {
      color: 'black',
      name: 'PawnBlack',
      startPosition: 'e7',
      codeHTML: '&#9823;',
    },
    {
      color: 'black',
      name: 'PawnBlack',
      startPosition: 'f7',
      codeHTML: '&#9823;',
    },
    {
      color: 'black',
      name: 'PawnBlack',
      startPosition: 'g7',
      codeHTML: '&#9823;',
    },
    {
      color: 'black',
      name: 'PawnBlack',
      startPosition: 'h7',
      codeHTML: '&#9823;',
    },
  ],

  run() {
    this.generateChessboard();
    this.setUpTheChessFigures();
  },

  /**
   * Генерирует шахматную доску в DOM
   */
  generateChessboard() {
    let letters = ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', ''];

    for (let row = 0; row < 10; row++) {

      let tr = document.createElement('tr');
      this.HTMLeLForChess.appendChild(tr);

      for (let col = 0; col < 10; col++) {
        let td = document.createElement('td');
        td.dataset.coordinate = `${letters[col]}${row}`;
        tr.appendChild(td);
        this.chessBoardHTMLElements[`${letters[col]}${Math.abs(row - 9)}`] = td;

        //вставляет цифры в 0 колонку
        if (col === 0 && row > 0 && row < 9 || col === 9 && row > 0 && row < 9) {
          td.textContent = Math.abs(row - 9);
        }


        //вставляет символу в 9 строку
        if (row === 9 && col > 0 && col < 9 || row === 0 && col > 0 && col < 9) {
          td.textContent = letters[col];
        }

        if (row !== 0 && row !== 9 && col !== 0 && col !== 9 && col % 2 == 1 && row % 2 == 0
          ||
          row !== 0 && row !== 9 && col !== 0 && col !== 9 && col % 2 == 0 && row % 2 == 1
        ) {
          td.className = 'black';
        }

      }
    }

  },

  setUpTheChessFigures() {
    this.figures.map(figure => {
      this.chessBoardHTMLElements[figure.startPosition].innerHTML = figure.codeHTML;
    })


  },

};

chess.run();
