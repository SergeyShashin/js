'use strict';

/*
Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation),
где arg1, arg2 – значения аргументов, operation – строка с названием операции. В зависимости
от
переданного значения операции (использовать switch) выполнить одну из арифметических
операций
(использовать функции из задания 4) и вернуть полученное значение.
*/
console.log(mathOperation(1.1, -1, '+'));
console.log(mathOperation(1.1, -1, '*'));
console.log(mathOperation(1.1, -1, '-'));
console.log(mathOperation(1.1, -1, '/'));

/**
 * 
 * @param {number} arg1 Первое число. 
 * @param {number} arg2 Второе число.
 * @param {string} operation Знак математической операции '+', '*', '-', '/'.
 * @returns {number} Результат математической операции.
 */
function mathOperation(arg1, arg2, operation){
  switch(operation){
    case '+':
      return addition(arg1, arg2);
    case '-':
      return subtraction(arg1, arg2);
    case '/':
      return division(arg1, arg2);
    case '*':
      return multiplication(arg1, arg2);
  }
}

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