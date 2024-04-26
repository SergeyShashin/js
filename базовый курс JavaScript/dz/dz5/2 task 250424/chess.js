'use strict';

/*
Заполнить созданную таблицу фигурами, фигуры должны выглядеть как картинки, либо
можно использовать символы (существуют символы шахматных фигур) причем все фигуры
должны стоять на своих местах и быть соответственно черными и белыми.
*/
const figures = [
  {
    nameFigure: 'king',
    color: 'white',
    startPosition: 'E8',
    code: '&#9812;',
  },

  {
    nameFigure: 'queen',
    color: 'white',
    startPosition: 'D8',
    code: '&#9813;',
  },
  {
    nameFigure: 'elephant',
    color: 'white',
    startPosition: 'C8',
    code: '&#9815;',
  },
  {
    nameFigure: 'elephant',
    color: 'white',
    startPosition: 'F8',
    code: '&#9815;',
  },
  {
    nameFigure: 'horse',
    color: 'white',
    startPosition: 'B8',
    code: '&#9816;',
  },
  {
    nameFigure: 'horse',
    color: 'white',
    startPosition: 'G8',
    code: '&#9816;',
  },
  {
    nameFigure: 'rook',
    color: 'white',
    startPosition: 'A8',
    code: '&#9814;',
  },
  {
    nameFigure: 'rook',
    color: 'white',
    startPosition: 'H8',
    code: '&#9814;',
  },
  {
    nameFigure: 'pawn',
    color: 'white',
    startPosition: 'A7',
    code: '&#9817;',
  },
  {
    nameFigure: 'pawn',
    color: 'white',
    startPosition: 'B7',
    code: '&#9817;',
  },
  {
    nameFigure: 'pawn',
    color: 'white',
    startPosition: 'C7',
    code: '&#9817;',
  },
  {
    nameFigure: 'pawn',
    color: 'white',
    startPosition: 'D7',
    code: '&#9817;',
  },
  {
    nameFigure: 'pawn',
    color: 'white',
    startPosition: 'E7',
    code: '&#9817;',
  },
  {
    nameFigure: 'pawn',
    color: 'white',
    startPosition: 'F7',
    code: '&#9817;',
  },
  {
    nameFigure: 'pawn',
    color: 'white',
    startPosition: 'G7',
    code: '&#9817;',
  },
  {
    nameFigure: 'pawn',
    color: 'white',
    startPosition: 'H7',
    code: '&#9817;',
  },
  {
    nameFigure: 'king',
    color: 'black',
    startPosition: 'E1',
    code: '&#9818;',
  },
  {
    nameFigure: 'queen',
    color: 'black',
    startPosition: 'D1',
    code: '&#9819;',
  },
  {
    nameFigure: 'elephant',
    color: 'black',
    startPosition: 'C1',
    code: '	&#9821;',
  },
  {
    nameFigure: 'elephant',
    color: 'black',
    startPosition: 'F1',
    code: '	&#9821;',
  },
  {
    nameFigure: 'horse',
    color: 'black',
    startPosition: 'B1',
    code: '&#9822;',
  },
  {
    nameFigure: 'horse',
    color: 'black',
    startPosition: 'G1',
    code: '&#9822;',
  },
  {
    nameFigure: 'rook',
    color: 'black',
    startPosition: 'A1',
    code: '&#9820;',
  },
  {
    nameFigure: 'rook',
    color: 'black',
    startPosition: 'H1',
    code: '&#9820;',
  },
  {
    nameFigure: 'pawn',
    color: 'black',
    startPosition: 'A2',
    code: '&#9823;',
  },
  {
    nameFigure: 'pawn',
    color: 'black',
    startPosition: 'B2',
    code: '&#9823;',
  },
  {
    nameFigure: 'pawn',
    color: 'black',
    startPosition: 'C2',
    code: '&#9823;',
  },
  {
    nameFigure: 'pawn',
    color: 'black',
    startPosition: 'D2',
    code: '&#9823;',
  },
  {
    nameFigure: 'pawn',
    color: 'black',
    startPosition: 'E2',
    code: '&#9823;',
  },
  {
    nameFigure: 'pawn',
    color: 'black',
    startPosition: 'F2',
    code: '&#9823;',
  },
  {
    nameFigure: 'pawn',
    color: 'black',
    startPosition: 'G2',
    code: '&#9823;',
  },
  {
    nameFigure: 'pawn',
    color: 'black',
    startPosition: 'H2',
    code: '&#9823;',
  },
]

chessBoardGen();


function chessBoardGen() {
  let chessElement = document.getElementById('chess');
  let chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].join('').toUpperCase().split('');
  let numbers = ['1', '2', '3', '4', '5', '6', '7', '8'].reverse();

  for (let row = 0; row < 10; row++) {
    let tr = document.createElement('tr');
    chessElement.appendChild(tr);
    for (let col = 0; col < 10; col++) {
      let td = document.createElement('td');
      chessElement.appendChild(td);

      if (row === 0 || row === 9) {
        td.textContent = chars[col - 1];
      }

      if (col === 0 || col === 9) {
        td.textContent = numbers[row - 1];
      }

      if (col > 0 && col < 9 && row > 0 && row < 9 && col % 2 && row % 2 == 0 ||
        col > 0 && col < 9 && row > 0 && row < 9 && col % 2 === 0 && row % 2 == 1) {
        td.classList = 'black';
      }

      if (row > 0 && row < 9 && col > 0 && col < 9) {

        td.id = `${chars[col - 1]}${row}`;
      }


    }
  }

  for (const figure of figures) {
    let cell = document.getElementById(figure.startPosition);
    cell.innerHTML = figure.code;
  }

}


