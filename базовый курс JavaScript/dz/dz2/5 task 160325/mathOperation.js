'use strict';

/*
Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation),
где arg1, arg2 – значения аргументов, operation – строка с названием операции. В зависимости
от
переданного значения операции (использовать switch) выполнить одну из арифметических
операций
(использовать функции из задания 4) и вернуть полученное значение.
*/
console.log(mathOperation(4, 4, '+'));
console.log(mathOperation(16, 8, '-'));
console.log(mathOperation(888, 111, '/'));
console.log(mathOperation(111, 8, '*'));

/**
 * Выполняет арифметические операции (*, -, /, *)
 * @param {number} arg1 
 * @param {number} arg2 
 * @param {string} operation
 * @returns {number}  
 */
function mathOperation(arg1, arg2, operation) {
  switch (operation) {
    case '+':
      return sum(arg1, arg2)
    case '-':
      return difference(arg1, arg2)
    case '/':
      return division(arg1, arg2)
    case '*':
      return multiplication(arg1, arg2)
    default:
      throw new Error('Что-то случилось.')
  }
}