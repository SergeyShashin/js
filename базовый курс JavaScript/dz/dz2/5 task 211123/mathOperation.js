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
    case '-':
      return subtraction(arg1, arg2);
    case '/':
      return devide(arg1, arg2);
    case '*':
      return multiplication(arg1, arg2);
  }

}

console.log(mathOperation(Number(prompt('Первое число', 3)), Number(prompt('Второе число', 3)), prompt('Операция', '*')));

function sum(a, b) {
  return a + b
}

function subtraction(a, b) {
  return a - b
}

function devide(a, b) {
  return a / b
}

function multiplication(a, b) {
  return a * b
}