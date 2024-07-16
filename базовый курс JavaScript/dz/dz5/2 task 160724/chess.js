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
