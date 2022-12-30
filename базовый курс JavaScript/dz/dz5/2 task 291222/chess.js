'use strict';

/*
Заполнить созданную таблицу фигурами, фигуры должны выглядеть как картинки, либо
можно использовать символы (существуют символы шахматных фигур) причем все фигуры
должны стоять на своих местах и быть соответственно черными и белыми.
*/

chessGen();

function chessGen() {
  let numberingRow = [8, 7, 6, 5, 4, 3, 2, 1];
  let numberingCol = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const white = {
    king: '&#9812',
    queen: '&#9813',
    rook: '&#9814',
    elephant: '&#9815',
    knight: '&#9816',
    pawn: '&#9817'
  };
  const black = {
    king: '&#9818',
    queen: '&#9819',
    rook: '&#9820',
    elephant: '&#9821',
    knight: '&#9822',
    pawn: '&#9823'
  };


  for (let row = 0; row < 9; row++) {
    let tr = document.createElement('tr');
    let chess = document.getElementById('chess');
    chess.appendChild(tr);

    for (let col = 0; col < 9; col++) {

      let td = document.createElement('td');

      if (col > 0 && col % 2 !== 0 && row % 2 !== 0) {
        td.className = 'black';
      }

      if (row < 8 && col > 0 && col % 2 == 0 && row % 2 == 0) {
        td.className = 'black';
      }

      if (col === 0 && row !== 8) {
        td.textContent = numberingRow[row];
      }

      if (row === 8 && col != 0) {
        td.textContent = numberingCol[col - 1];
      }

      if (row == 1 && col == 1) {
        td.innerHTML = '&#9812';
      }

      //ставим белые пешки
      if (row == 6 && col !== 0) {
        td.innerHTML = white.pawn;
      }

      //ставим белого короля
      if (row == 7 && col == 5) {
        td.innerHTML = white.king;
      }

      //ставим белого ферзя
      if (row == 7 && col == 4) {
        td.innerHTML = white.queen;
      }

      //ставим белых слонов
      if (row == 7 && col == 3 || row == 7 && col == 6) {
        td.innerHTML = white.elephant;
      }

      //ставим белых коней
      if (row == 7 && col == 2 || row == 7 && col == 7) {
        td.innerHTML = white.knight;
      }

      //ставим белые ладьи
      if (row == 7 && col == 1 || row == 7 && col == 8) {
        td.innerHTML = white.rook;
      }
      
      //ставим чёрные пешки
      if (row == 1 && col !== 0) {
        td.innerHTML = black.pawn;
      }
      
      //ставим чёрного короля
      if (row == 0 && col == 5) {
        td.innerHTML = black.king;
      }
      
      //ставим чёрного ферзя
      if (row == 0 && col == 4) {
        td.innerHTML = black.queen;
      }
      
      //ставим чёрных слонов
      if (row == 0 && col == 3 || row == 0 && col == 6) {
        td.innerHTML = black.elephant;
      }

      //ставим чёрных коней
      if (row == 0 && col == 2 || row == 0 && col == 7) {
        td.innerHTML = black.knight;
      }

      //ставим чёрные ладьи
      if (row == 0 && col == 1 || row == 0 && col == 8) {
        td.innerHTML = black.rook;
      }
      
      
      tr.appendChild(td);

    }

  }
}