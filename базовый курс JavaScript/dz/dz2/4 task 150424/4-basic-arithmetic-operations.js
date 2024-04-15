'use strict';

/*
Реализовать основные 4 арифметические операции (+, -, /, *) в виде функций с двумя
параметрами.
Обязательно использовать оператор return.
*/

[add(880, 8), difference(22, 1), multiplication(111, 8), division(1024, 8)].forEach(el => console.log(el));

/**
 * Возвращает сумму двух чисел.
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */
function add(a, b) {
  return a + b;
}

/**
 * Возвращает разность двух чисел.
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */
function difference(a, b) {
  return a - b;
}

/**
 * Возвращает произведение двух чисел.
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */
function multiplication(a, b) {
  return a * b;
}

/**
 * Возвращает резельтат деления двух чисел.
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */
function division(a, b) {
  return a / b;
}

