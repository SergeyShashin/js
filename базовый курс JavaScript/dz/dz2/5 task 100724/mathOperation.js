'use strict';

/*
Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation),
где arg1, arg2 – значения аргументов, operation – строка с названием операции. В зависимости
от
переданного значения операции (использовать switch) выполнить одну из арифметических
операций
(использовать функции из задания 4) и вернуть полученное значение.
*/

console.log(mathOperation(0, 8, '+'));
console.log(mathOperation(16, 8, '-'));
console.log(mathOperation(1024, 128, '/'));
console.log(mathOperation(8, 128, '*'));

/**
 * Выполняет одну из четырёх операций [+, -, /, *]
 * @param {number} arg1 
 * @param {number} arg2 
 * @param {string} operation 
 * @returns {number}
 */
function mathOperation(arg1, arg2, operation) {
  switch (operation) {
    case '+':
      return sum(arg1, arg2);
    case '-':
      return difference(arg1, arg2);
    case '/':
      return divide(arg1, arg2);
    case '*':
      return multiplication(arg1, arg2);
    default: console.error('Возможные операции [+, -, /, *]');
  }
}

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