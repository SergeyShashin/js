'use strict';

/*
Заполнить созданную таблицу фигурами, фигуры должны выглядеть как картинки, либо
можно использовать символы (существуют символы шахматных фигур) причем все фигуры
должны стоять на своих местах и быть соответственно черными и белыми.
*/

genChessDesk();

function genChessDesk() {

  let chessEl = document.getElementById('chess');
  let chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  let elements = {};
  const figures = [
    { postiton: 'a7', HTMLCode: '&#9817;', color: 'w' },
    { postiton: 'b7', HTMLCode: '&#9817;', color: 'w' },
    { postiton: 'c7', HTMLCode: '&#9817;', color: 'w' },
    { postiton: 'd7', HTMLCode: '&#9817;', color: 'w' },
    { postiton: 'e7', HTMLCode: '&#9817;', color: 'w' },
    { postiton: 'f7', HTMLCode: '&#9817;', color: 'w' },
    { postiton: 'g7', HTMLCode: '&#9817;', color: 'w' },
    { postiton: 'h7', HTMLCode: '&#9817;', color: 'w' },

    { postiton: 'a8', HTMLCode: '&#9814;', color: 'w' },
    { postiton: 'b8', HTMLCode: '&#9816;', color: 'w' },
    { postiton: 'c8', HTMLCode: '&#9815;', color: 'w' },
    { postiton: 'd8', HTMLCode: '&#9813;', color: 'w' },
    { postiton: 'e8', HTMLCode: '&#9812;', color: 'w' },
    { postiton: 'f8', HTMLCode: '&#9815;', color: 'w' },
    { postiton: 'g8', HTMLCode: '&#9816;', color: 'w' },
    { postiton: 'h8', HTMLCode: '&#9814;', color: 'w' },

    { postiton: 'a2', HTMLCode: '&#9823;', color: 'b' },
    { postiton: 'b2', HTMLCode: '&#9823;', color: 'b' },
    { postiton: 'c2', HTMLCode: '&#9823;', color: 'b' },
    { postiton: 'd2', HTMLCode: '&#9823;', color: 'b' },
    { postiton: 'e2', HTMLCode: '&#9823;', color: 'b' },
    { postiton: 'f2', HTMLCode: '&#9823;', color: 'b' },
    { postiton: 'g2', HTMLCode: '&#9823;', color: 'b' },
    { postiton: 'h2', HTMLCode: '&#9823;', color: 'b' },

    { postiton: 'a1', HTMLCode: '&#9820;', color: 'b' },
    { postiton: 'b1', HTMLCode: '&#9822;', color: 'b' },
    { postiton: 'c1', HTMLCode: '&#9821;', color: 'b' },
    { postiton: 'd1', HTMLCode: '&#9819;', color: 'b' },
    { postiton: 'e1', HTMLCode: '&#9818;', color: 'b' },
    { postiton: 'f1', HTMLCode: '&#9821;', color: 'b' },
    { postiton: 'g1', HTMLCode: '&#9822;', color: 'b' },
    { postiton: 'h1', HTMLCode: '&#9820;', color: 'b' },
  ];

  createDesk();
  setFigures();

  function createDesk() {
    for (let row = 0; row < 10; row++) {
      let tr = document.createElement('tr');

      for (let col = 0; col < 10; col++) {
        let td = document.createElement('td');
        tr.appendChild(td);

        if (col === 0 && row !== 0 && row !== 9) {
          td.textContent = 9 - row;
        }

        if (col === 9 && row !== 0 && row !== 9) {
          td.textContent = 9 - row;
        }

        if (row === 0 && col !== 0 && col !== 9) {
          td.textContent = chars[col - 1];
        }

        if (row === 9 && col !== 0 && col !== 9) {
          td.textContent = chars[col - 1];
        }

        if (row % 2 == 0 && col % 2 !== 0 && row !== 0 && row !== 9 && col !== 0 && col !== 9) {
          td.className = 'black';
        }

        if (row % 2 != 0 && col % 2 === 0 && row !== 0 && row !== 9 && col !== 0 && col !== 9) {
          td.className = 'black';
        }


        if (col !== 0 && col !== 9) {
          elements[`${chars[col - 1]}${row}`] = td;
        }

      }

      chessEl.appendChild(tr);

    }
  }

  function setFigures() {
    for (let figure of figures) {
      elements[figure.postiton].innerHTML = figure.HTMLCode;
    }
  }

}
