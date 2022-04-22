'use strict';

/*
Реализовать основные 4 арифметические операции (+, -, /, *) в виде функций с двумя
параметрами.
Обязательно использовать оператор return.
*/


let num1 = 1.1, num2 = -1;

console.log(`${num1} + ${num2} = ${addition(num1, num2)}`);
console.log(`${num1} - ${num2} = ${subtraction(num1, num2)}`);
console.log(`${num1} / ${num2} = ${division(num1, num2)}`);
console.log(`${num1} * ${num2} = ${multiplication(num1, num2)}`);

/**
 * Складывает 2 числа
 * @param {number} num1 
 * @param {number} num2  
 * @returns {number} Возвращает сумму 2 чисел.
 */
function addition(num1, num2) {
  return num1 + num2
}

/**
 * Разность 2 чисел
 * @param {number} num1 
 * @param {number} num2  
 * @returns {number} Возвращает разность 2 чисел.
 */
function subtraction(num1, num2) {
  return num1 - num2
}

/**
 * Деление 2 чисел
 * @param {number} num1 
 * @param {number} num2  
 * @returns {number} Возвращает результат деления чисел.
 */
function division(num1, num2) {
  return num1 / num2
}
/**
 * Умножение 2 чисел
 * @param {number} num1 
 * @param {number} num2  
 * @returns {number} Возвращает результат умножения чисел.
 */
function multiplication(num1, num2) {
  return num1 * num2
}
