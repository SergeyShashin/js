'use strict';

/*
Реализовать основные 4 арифметические операции (+, -, /, *) в виде функций с двумя
параметрами.
Обязательно использовать оператор return.
*/

console.log(add(2, 2));
console.log(difference(2, 2));
console.log(division(2, 2));
console.log(multiplication(2, 2));

/**
 * Складывает два числа
 * @param {number} num1 
 * @param {number} num2 
 * @returns number
 */
function add(num1, num2) {
  return num1 + num2
}

/**
 * Вычитает из одного числа другое
 * @param {number} num1 
 * @param {number} num2 
 * @returns number
 */
function difference(num1, num2) {
  return num1 - num2
}

/**
 * Делит числа
 * @param {number} num1 
 * @param {number} num2 
 * @returns number
 */
function division(num1, num2) {
  return num1 / num2
}

/**
 * Умножает числа
 * @param {number} num1 
 * @param {number} num2 
 * @returns number
 */
function multiplication(num1, num2) {
  return num1 * num2
}