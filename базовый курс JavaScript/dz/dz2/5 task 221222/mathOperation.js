'use strict';

/*
Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation),
где arg1, arg2 – значения аргументов, operation – строка с названием операции. В зависимости
от
переданного значения операции (использовать switch) выполнить одну из арифметических
операций
(использовать функции из задания 4) и вернуть полученное значение.
*/

console.log(mathOperation(2, 2, '+') + ' = 4');
console.log(mathOperation(2, 2, '-') + ' = 0');
console.log(mathOperation(2, 2, '/') + ' = 1');
console.log(mathOperation(2, 2, '*') + ' = 4');

/**
 * 
 * @param {number} arg1 Операнд1
 * @param {number} arg2 Операнд2
 * @param {string} operation Оператор
 * @returns {number} Возвращает результат математической операции. 
 */
function mathOperation(arg1, arg2, operation) {
  switch (operation) {
    case '+':
      return add(arg1, arg2);
    case '-':
      return difference(arg1, arg2);
    case '/':
      return division(arg1, arg2);
    case '*':
      return multiplication(arg1, arg2);
    default: 'Проверьте ввод данных. Нужно ввести число1, число2 и знак математической операции (+, -, /, *)'
  }

}


/*
Реализовать основные 4 арифметические операции (+, -, /, *) в виде функций с двумя
параметрами.
Обязательно использовать оператор return.
*/

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