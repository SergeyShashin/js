'use strict';

/*
Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation),
где arg1, arg2 – значения аргументов, operation – строка с названием операции. В зависимости
от
переданного значения операции (использовать switch) выполнить одну из арифметических
операций
(использовать функции из задания 4) и вернуть полученное значение.
*/

/**
 * 
 * @param {Number} arg1 Первое число.
 * @param {Number} arg2 Второе число.
 * @param {String} operation Операция с числами.
 * @returns {Number} Резльтат операции.
 */
let mathOperation = (arg1, arg2, operation) => {
  switch (operation) {
    case '+':
      return sum(arg1, arg2);
    case '*':
      return multiplication(arg1, arg2);
    case '-':
      return difference(arg1, arg2);
    case '/':
      return divide(arg1, arg2);
    default:
      return 'Ошибка при вводе данных'
  }

}

console.log(mathOperation(Number(prompt('Первое число', 3)), Number(prompt('Второе число', 3)), prompt('Операция', '*')));

function sum(firstNumber, secondNumber) {
  return firstNumber + secondNumber
}

function multiplication(firstNumber, secondNumber) {
  return firstNumber * secondNumber
}

function difference(firstNumber, secondNumber) {
  return firstNumber - secondNumber
}

function divide(firstNumber, secondNumber) {
  return firstNumber / secondNumber
}