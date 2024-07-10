'use strict';

/*
Реализовать основные 4 арифметические операции (+, -, /, *) в виде функций с двумя
параметрами.
Обязательно использовать оператор return.
*/

console.log(sum(Number(prompt('a')), Number(prompt('b'))));
console.log(difference(Number(prompt('a')), Number(prompt('b'))));
console.log(divide(Number(prompt('a')), Number(prompt('b'))));
console.log(multiplication(Number(prompt('a')), Number(prompt('b'))));

/**
 * Складывает a и b
 * @param {number} a 
 * @param {number} b 
 * @returns {number} a+b
 */
function sum(a, b) {
  return a + b
}

/**
 * Вычитает b из a
 * @param {number} a 
 * @param {number} b 
 * @returns {number} a-b
 */
function difference(a, b) {
  return a - b
}

/**
 * Делит b на a
 * @param {number} a 
 * @param {number} b 
 * @returns {number} a/b
 */
function divide(a, b) {
  return a / b
}

/**
 * Умножает a на b
 * @param {*} a 
 * @param {*} b 
 * @returns {number} a*b
 */
function multiplication(a, b) {
  return a * b
}