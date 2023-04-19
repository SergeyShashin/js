'use strict';

/*
Заполнить созданную таблицу фигурами, фигуры должны выглядеть как картинки, либо
можно использовать символы (существуют символы шахматных фигур) причем все фигуры
должны стоять на своих местах и быть соответственно черными и белыми.
*/

let htmlElement = document.getElementById('chess');
let rowsCount = 10;
let colsCount = 10;
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const figures = [
  { name: 'pawn', color: 'white', startPosition: 'a2', postion: null, uniСode: 'U+2659', htmlCode: '&#9817;' },
  { name: 'pawn', color: 'white', startPosition: 'b2', postion: null, uniСode: 'U+2659', htmlCode: '&#9817;' },
  { name: 'pawn', color: 'white', startPosition: 'c2', postion: null, uniСode: 'U+2659', htmlCode: '&#9817;' },
  { name: 'pawn', color: 'white', startPosition: 'd2', postion: null, uniСode: 'U+2659', htmlCode: '&#9817;' },
  { name: 'pawn', color: 'white', startPosition: 'e2', postion: null, uniСode: 'U+2659', htmlCode: '&#9817;' },
  { name: 'pawn', color: 'white', startPosition: 'f2', postion: null, uniСode: 'U+2659', htmlCode: '&#9817;' },
  { name: 'pawn', color: 'white', startPosition: 'g2', postion: null, uniСode: 'U+2659', htmlCode: '&#9817;' },
  { name: 'pawn', color: 'white', startPosition: 'h2', postion: null, uniСode: 'U+2659', htmlCode: '&#9817;' },
  { name: 'rook', color: 'white', startPosition: 'a1', postion: null, uniСode: 'U+2656', htmlCode: '&#9814;' },
  { name: 'rook', color: 'white', startPosition: 'h1', postion: null, uniСode: 'U+2656', htmlCode: '&#9814;' },
  { name: 'knight', color: 'white', startPosition: 'b1', postion: null, uniСode: 'U+2658', htmlCode: '&#9816;' },
  { name: 'knight', color: 'white', startPosition: 'g1', postion: null, uniСode: 'U+2658', htmlCode: '&#9816;' },
  { name: 'elephant', color: 'white', startPosition: 'c1', postion: null, uniСode: 'U+2657', htmlCode: '&#9815;' },
  { name: 'elephant', color: 'white', startPosition: 'f1', postion: null, uniСode: 'U+2657', htmlCode: '&#9815;' },
  { name: 'queen', color: 'white', startPosition: 'd1', postion: null, uniСode: 'U+2655', htmlCode: '&#9813;' },
  { name: 'king', color: 'white', startPosition: 'e1', postion: null, uniСode: 'U+2654', htmlCode: '&#9812;' },

  { name: 'pawn', color: 'black', startPosition: 'a7', postion: null, uniСode: 'U+265F', htmlCode: '&#9823;' },
  { name: 'pawn', color: 'black', startPosition: 'b7', postion: null, uniСode: 'U+265F', htmlCode: '&#9823;' },
  { name: 'pawn', color: 'black', startPosition: 'c7', postion: null, uniСode: 'U+265F', htmlCode: '&#9823;' },
  { name: 'pawn', color: 'black', startPosition: 'd7', postion: null, uniСode: 'U+265F', htmlCode: '&#9823;' },
  { name: 'pawn', color: 'black', startPosition: 'e7', postion: null, uniСode: 'U+265F', htmlCode: '&#9823;' },
  { name: 'pawn', color: 'black', startPosition: 'f7', postion: null, uniСode: 'U+265F', htmlCode: '&#9823;' },
  { name: 'pawn', color: 'black', startPosition: 'g7', postion: null, uniСode: 'U+265F', htmlCode: '&#9823;' },
  { name: 'pawn', color: 'black', startPosition: 'h7', postion: null, uniСode: 'U+265F', htmlCode: '&#9823;' },
  { name: 'rook', color: 'black', startPosition: 'a8', postion: null, uniСode: 'U+265C', htmlCode: '&#9820;' },
  { name: 'rook', color: 'black', startPosition: 'h8', postion: null, uniСode: 'U+265C', htmlCode: '&#9820;' },
  { name: 'knight', color: 'black', startPosition: 'b8', postion: null, uniСode: 'U+265E', htmlCode: '&#9822;' },
  { name: 'knight', color: 'black', startPosition: 'g8', postion: null, uniСode: 'U+265E', htmlCode: '&#9822;' },
  { name: 'elephant', color: 'black', startPosition: 'c8', postion: null, uniСode: 'U+265D', htmlCode: '&#9821;' },
  { name: 'elephant', color: 'black', startPosition: 'f8', postion: null, uniСode: 'U+265D', htmlCode: '&#9821;' },
  { name: 'queen', color: 'black', startPosition: 'd8', postion: null, uniСode: 'U+265B', htmlCode: '&#9819;' },
  { name: 'king', color: 'black', startPosition: 'e8', postion: null, uniСode: 'U+265A', htmlCode: '&#9818;' },
]

genChesDesk();

/**
 * Рисует шахматную доску в теге <table id="chess">
 */
function genChesDesk() {
  for (let row = 0; row < rowsCount; row++) {
    let rowEl = document.createElement('tr');
    for (let col = 0; col < colsCount; col++) {
      let colEl = document.createElement('td');
      rowEl.appendChild(colEl);
      setLettersColums(row, col, colEl);
      setNumbersRows(row, col, colEl);
      setBlackField(row, col, colEl);

    }
    htmlElement.appendChild(rowEl);
  }
}

/**
 * Устанавливает буквы в элементы колонок
 * @param {int} row Номер строки
 * @param {int} col Номер колонки
 * @param {htmlElement} colEl Html элемент 'td'
 */
function setLettersColums(row, col, colEl) {
  if (row === 0 && col >= 1 && col < 9) {
    colEl.textContent = letters[col - 1];
    colEl.classList.add('rotate');
  }

  if (row === 9 && col >= 1 && col < 9) {
    colEl.textContent = letters[col - 1];
  }
}

/**
 * Устанавливает цифры в элементы строк
 * @param {int} row Номер строки
 * @param {int} col Номер колонки
 * @param {htmlElement} colEl Html элемент 'td'
 */
function setNumbersRows(row, col, colEl) {
  if (col === 0 && row >= 1 && row < 9) {
    colEl.textContent = Math.abs(row - 9);
  }

  if (col === 9 && row >= 1 && row < 9) {
    colEl.textContent = Math.abs(row - 9);
    colEl.classList.add('rotate');
  }
}

/**
 * Устанавливает чёрный цвет ячейке
 * @param {int} row Номер строки
 * @param {int} col Номер колонки
 * @param {htmlElement} colEl Html элемент 'td'
 */
function setBlackField(row, col, colEl) {
  if (row > 0 && row < 9 && col > 0 && col < 10 && col % 2 === 0 && row % 2 !== 0 ||
    row > 0 && row < 9 && col > 0 && col < 9 && col % 2 !== 0 && row % 2 === 0
  ) {
    colEl.classList.add('black');
  }

}