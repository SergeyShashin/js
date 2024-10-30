'use strict';

/*
Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation),
где arg1, arg2 – значения аргументов, operation – строка с названием операции. В зависимости
от
переданного значения операции (использовать switch) выполнить одну из арифметических
операций
(использовать функции из задания 4) и вернуть полученное значение.
*/

console.log(mathOperation(8, 8, '+'));
console.log(mathOperation(8, 8, '-'));
console.log(mathOperation(8, 8, '*'));
console.log(mathOperation(8, 8, '/'));


/**
 * Выполняет математическую операцию с arg1 и arg2 в зависимости от operation.
 * @param {*} arg1 
 * @param {*} arg2 
 * @param {*} operation 
 * @returns Результат математической операции.
 */
function mathOperation(arg1, arg2, operation) {
  switch (operation) {
    case '+':
      return sum(arg1, arg2);
    case '-':
      return difference(arg1, arg2);
    case '*':
      return multiply(arg1, arg2);
    case '/':
      return divide(arg1, arg2);
  }
}

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