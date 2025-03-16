'use strict';

/*
Реализовать основные 4 арифметические операции (+, -, /, *) в виде функций с двумя
параметрами.
Обязательно использовать оператор return.
*/

console.log(sum(4, 4));
console.log(difference(16, 8));
console.log(division(888, 111));
console.log(multiplication(111, 8));

/**
 *Суммирует num1 и num2. 
 * @param {number} num1 
 * @param {number} num2
 * @returns {number} Cумму num1 и num2.
 */
function sum(num1, num2) {
  return num1 + num2
}

/**
 *Вычитает из num1 num2. 
 * @param {number} num1 
 * @param {number} num2
 * @returns {number} Разность num1 и num2.
 */
function difference(num1, num2) {
  return num1 - num2
}

/**
 *Делит num1 и num2 
 * @param {number} num1 
 * @param {number} num2
 * @returns {number} Результат деления num1 на num2.
 */
function division(num1, num2) {
  return num1 / num2
}

/**
 *Умножает num1 и num2. 
 * @param {number} num1 
 * @param {number} num2
 * @returns {number} Результат умножения num1 и num2.
 */
function multiplication(num1, num2) {
  return num1 * num2
}