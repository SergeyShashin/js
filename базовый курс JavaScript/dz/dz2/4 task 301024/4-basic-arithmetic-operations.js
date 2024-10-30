'use strict';

/*
Реализовать основные 4 арифметические операции (+, -, /, *) в виде функций с двумя
параметрами.
Обязательно использовать оператор return.
*/

console.log(sum(8, 8));
console.log(difference(8, 8));
console.log(multiply(8, 8));
console.log(divide(8, 8));

/**
 * Складывает два числа
 * @param {number} a число 1 
 * @param {number} b число 2
 * @returns Сумму a+b
 */
function sum(a, b) {
  return a + b;
}

/**
 * Вычитает из a b
 * @param {*} a число 1
 * @param {*} b число 2
 * @returns Разность a-b
 */
function difference(a, b) {
  return a - b;
}

/**
 * Умножает a на b
 * @param {*} a число 1
 * @param {*} b число 2
 * @returns Произведение a*b 
 */
function multiply(a, b) {
  return a * b;
}

/**
 * Делит a на b
 * @param {*} a число 1
 * @param {*} b число 2
 * @returns Чистное a/b 
 */
function divide(a, b) {
  return a / b;
}