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
    'htmlCode': '&#9812;',
    'startPosition': 'e1',
    'startPositionNumbers': '8_5'
  },
  'queen': {
    'color': 'white',
    'code': 'U+2655',
    'htmlCode': '&#9813;',
    'startPositionL': 'd1',
    'startPositionNumbers': '8_4'
  },
  'rookA1': {
    'color': 'white',
    'code': 'U+2656',
    'htmlCode': '&#9814;',
    'startPositionL': 'a1',
    'startPositionNumbers': '8_1'
  },
  'rookH1': {
    'color': 'white',
    'code': 'U+2656',
    'htmlCode': '&#9814;',
    'startPositionL': 'h1',
    'startPositionNumbers': '8_8'
  },
  'bishopС1': {
    'color': 'white',
    'code': 'U+2657',
    'htmlCode': '&#9815;',
    'startPositionL': 'с1',
    'startPositionNumbers': '8_3'
  },
  'bishopF1': {
    'color': 'white',
    'code': 'U+2657',
    'htmlCode': '&#9815;',
    'startPositionL': 'f1',
    'startPositionNumbers': '8_6'
  },
  'knightB1': {
    'color': 'white',
    'code': 'U+2658',
    'htmlCode': '&#9816;',
    'startPositionL': 'b1',
    'startPositionNumbers': '8_2'
  },
  'knightG1': {
    'color': 'white',
    'code': 'U+2658',
    'htmlCode': '&#9816;',
    'startPositionL': 'g1',
    'startPositionNumbers': '8_7'
  },
  'pawnA2': {
    'color': 'white',
    'code': 'U+2659',
    'htmlCode': '&#9817;',
    'startPositionL': 'a2',
    'startPositionNumbers': '7_1'
  },
  'pawnB2': {
    'color': 'white',
    'code': 'U+2659',
    'htmlCode': '&#9817;',
    'startPositionL': 'b2',
    'startPositionNumbers': '7_2'
  },
  'pawnC2': {
    'color': 'white',
    'code': 'U+2659',
    'htmlCode': '&#9817;',
    'startPositionL': 'c2',
    'startPositionNumbers': '7_3'
  },
  'pawnD2': {
    'color': 'white',
    'code': 'U+2659',
    'htmlCode': '&#9817;',
    'startPositionL': 'd2',
    'startPositionNumbers': '7_4'
  },
  'pawnE2': {
    'color': 'white',
    'code': 'U+2659',
    'htmlCode': '&#9817;',
    'startPositionL': 'e2',
    'startPositionNumbers': '7_5'
  },
  'pawnF2': {
    'color': 'white',
    'code': 'U+2659',
    'htmlCode': '&#9817;',
    'startPositionL': 'f2',
    'startPositionNumbers': '7_6'
  },
  'pawnG2': {
    'color': 'white',
    'code': 'U+2659',
    'htmlCode': '&#9817;',
    'startPositionL': 'g2',
    'startPositionNumbers': '7_7'
  },
  'pawnH2': {
    'color': 'white',
    'code': 'U+2659',
    'htmlCode': '&#9817;',
    'startPositionL': 'h2',
    'startPositionNumbers': '7_8'
  },
  'kingBlack': {
    'color': 'black',
    'code': 'U+265A',
    'htmlCode': '&#9818;',
    'startPosition': 'e1',
    'startPositionNumbers': '1_5'
  },
  'queenBlack': {
    'color': 'black',
    'code': 'U+265B',
    'htmlCode': '&#9819;',
    'startPositionL': 'd1',
    'startPositionNumbers': '1_4'
  },
  'rookBlackA1': {
    'color': 'black',
    'code': 'U+265C',
    'htmlCode': '&#9820;',
    'startPositionL': 'a1',
    'startPositionNumbers': '1_1'
  },
  'rookBlackH1': {
    'color': 'black',
    'code': 'U+265C',
    'htmlCode': '&#9820;',
    'startPositionL': 'h1',
    'startPositionNumbers': '1_8'
  },
  'bishopBlackС1': {
    'color': 'black',
    'code': 'U+265D',
    'htmlCode': '&#9821;',
    'startPositionL': 'с1',
    'startPositionNumbers': '1_3'
  },
  'bishopBlackF1': {
    'color': 'black',
    'code': 'U+265D',
    'htmlCode': '&#9821;',
    'startPositionL': 'f1',
    'startPositionNumbers': '1_6'
  },
  'knightBlackB1': {
    'color': 'black',
    'code': 'U+265E',
    'htmlCode': '&#9822;',
    'startPositionL': 'b1',
    'startPositionNumbers': '1_2'
  },
  'knightBlackG1': {
    'color': 'black',
    'code': 'U+265E',
    'htmlCode': '&#9822;',
    'startPositionL': 'g1',
    'startPositionNumbers': '1_7'
  },
  'pawnBlackA2': {
    'color': 'black',
    'code': 'U+265F',
    'htmlCode': '&#9823;',
    'startPositionL': 'a2',
    'startPositionNumbers': '2_1'
  },
  'pawnBlackB2': {
    'color': 'black',
    'code': 'U+265F',
    'htmlCode': '&#9823;',
    'startPositionL': 'b2',
    'startPositionNumbers': '2_2'
  },
  'pawnBlackC2': {
    'color': 'black',
    'code': 'U+265F',
    'htmlCode': '&#9823;',
    'startPositionL': 'c2',
    'startPositionNumbers': '2_3'
  },
  'pawnBlackD2': {
    'color': 'black',
    'code': 'U+265F',
    'htmlCode': '&#9823;',
    'startPositionL': 'd2',
    'startPositionNumbers': '2_4'
  },
  'pawnBlackE2': {
    'color': 'black',
    'code': 'U+265F',
    'htmlCode': '&#9823;',
    'startPositionL': 'e2',
    'startPositionNumbers': '2_5'
  },
  'pawnBlackF2': {
    'color': 'black',
    'code': 'U+265F',
    'htmlCode': '&#9823;',
    'startPositionL': 'f2',
    'startPositionNumbers': '2_6'
  },
  'pawnBlackG2': {
    'color': 'black',
    'code': 'U+265F',
    'htmlCode': '&#9823;',
    'startPositionL': 'g2',
    'startPositionNumbers': '2_7'
  },
  'pawnBlackH2': {
    'color': 'black',
    'code': 'U+265F',
    'htmlCode': '&#9823;',
    'startPositionL': 'h2',
    'startPositionNumbers': '2_8'
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
      td.id = `${row}_${col}`;

      if (col === 0 && row != 0 && row !== 9) {
        td.textContent = 9 - row;
      }

      if (row === 0 && col !== 0 && col !== 9 || row === 9 && col !== 0 && col !== 9) {
        td.textContent = abc[col - 1];
      }

      if (row === 0) {
        td.className = 'rotate';
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

function setFigures() {
  for (let figure in figures) {
    let id = figures[figure].startPositionNumbers;
    console.log(id);
    let celEl = document.getElementById(id);
    console.log(celEl);
    if (celEl) {
      celEl.innerHTML = figures[figure].htmlCode;
    }
  }
}