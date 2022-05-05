'use strict';

/*
Заполнить созданную таблицу фигурами, фигуры должны выглядеть как картинки, либо
можно использовать символы (существуют символы шахматных фигур) причем все фигуры
должны стоять на своих местах и быть соответственно черными и белыми.
*/

chessDesk();

/**
 * Генерирует шахматную доску
 */
function chessDesk() {
  let chess = document.getElementById('chess');
  let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const figures = {
    kingW: '<span>&#9812;<span>',
    queenW: '<span>&#9813;<span>',
    castleW: '<span>&#9814;<span>',
    elephantW: '<span>&#9815;<span>',
    horseW: '<span>&#9816;<span>',
    pawnW: '<span>&#9817;<span>',
    kingB: '<span>&#9818;<span>',
    queenB: '<span>&#9819;<span>',
    castleB: '<span>&#9820;<span>',
    elephantB: '<span>&#9821;<span>',
    horseB: '<span>&#9822;<span>',
    pawnB: '<span>&#9823;<span>',
  }

  for (let row = 0; row < 10; row++) {
    let tr = document.createElement('tr');
    chess.appendChild(tr);

    for (let col = 0; col < 10; col++) {
      let td = document.createElement('td');

      //заполняем буквы
      if (row === 0 || row === 9 && col >= 1) {
        td.textContent = letters[col - 1];
      }

      //заполняем цифры
      if (col === 0 && row != 0 && row != 9 || col === 9 && row != 0 && row != 9) {
        td.textContent = 9 - row;
      }

      //красим ячейки в чёрный
      if (
        col % 2 != 0 && row < 9 && row > 0 && col < 9 && row % 2 === 0 ||
        col % 2 === 0 && row < 9 && row > 0 && col > 0 && row % 2 != 0
      ) {
        td.classList.add('black');
      }

      //расстановка белых пешек
      if (row === 7 && col > 0 && col < 9) {
        td.innerHTML = figures.pawnW;
      }

      //установка белого короля
      if (row === 8 && col === 5) {
        td.innerHTML = figures.kingW;
      }

      //установка белой королевы
      if (row === 8 && col === 4) {
        td.innerHTML = figures.queenW;
      }

      //установка белых ладей
      if (row === 8 && col === 1 || row === 8 && col === 8) {
        td.innerHTML = figures.castleW;
      }

      //установка белых слонов
      if (row === 8 && col === 3 || row === 8 && col === 6) {
        td.innerHTML = figures.elephantW;
      }

      //установка белых коней
      if (row === 8 && col === 2 || row === 8 && col === 7) {
        td.innerHTML = figures.horseW;
      }

      //расстановка чёрных пешек
      if (row === 2 && col > 0 && col < 9) {
        td.innerHTML = figures.pawnB;
      }

      //установка чёрного короля
      if (row === 1 && col === 5) {
        td.innerHTML = figures.kingB;
      }

      //установка чёрной королевы
      if (row === 1 && col === 4) {
        td.innerHTML = figures.queenB;
      }

      //установка чёрных ладей
      if (row === 1 && col === 1 || row === 1 && col === 8) {
        td.innerHTML = figures.castleB;
      }

      //установка чёрных слонов
      if (row === 1 && col === 3 || row === 1 && col === 6) {
        td.innerHTML = figures.elephantB;
      }

      //установка белых коней
      if (row === 1 && col === 2 || row === 1 && col === 7) {
        td.innerHTML = figures.horseB;
      }

      tr.appendChild(td);
    }
  }

}