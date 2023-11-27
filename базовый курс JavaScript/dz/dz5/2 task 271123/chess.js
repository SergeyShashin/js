'use strict';

/*
Заполнить созданную таблицу фигурами, фигуры должны выглядеть как картинки, либо
можно использовать символы (существуют символы шахматных фигур) причем все фигуры
должны стоять на своих местах и быть соответственно черными и белыми.
*/

const figures = {
  'king': {
    'color': 'white',
    'code': 'U+2654',
    'html': '&#9812;',
    'startPosition': 'e1'
  },
  'queen': {
    'color': 'white',
    'code': 'U+2655',
    'html': '&#9813;',
    'startPositionL': 'd1',
    'startPositionNumbers': '8_4'
  },
}



createСhessboard();
setFigures();

function createСhessboard() {

  let chessElement = document.getElementById('chess');
  let abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  for (let row = 0; row < 10; row++) {

    let tr = document.createElement('tr');

    for (let col = 0; col < 9; col++) {

      let td = document.createElement('td');
      td.dataset.yx = `${row}_${col}`;

      if (col === 0 && row != 0 && row !== 9) {
        td.textContent = 9 - row;
      }

      if (row === 0 && col !== 0 && col !== 9 || row === 9 && col !== 0 && col !== 9) {
        td.textContent = abc[col - 1];
      }

      if (
        col !== 0 && row !== 9 && row !== 0 && col % 2 !== 0 && row % 2 == 0 ||
        row % 2 !== 0 && col % 2 == 0 && col !== 0 && row !== 9
      ) {
        td.className = 'black';
      }

      tr.appendChild(td);
    }
    chessElement.appendChild(tr);
  }

}

function setFigures(){
  for(let figure in figures){
    let id = figures[figure].startPositionNumbers;
    console.log(id);
  }
}