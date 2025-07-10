'use strict';

/*
Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation),
где arg1, arg2 – значения аргументов, operation – строка с названием операции. В зависимости
от
переданного значения операции (использовать switch) выполнить одну из арифметических
операций
(использовать функции из задания 4) и вернуть полученное значение.
*/

let operations = ['+', '-', '*', '/',];

for (let operation of operations) {
  console.log(mathOperation(8, 8, operation));
}

function mathOperation(arg1, arg2, operation) {
  switch (operation) {
    case '+':
      return sum(arg1, arg2)
    case '-':
      return difference(arg1, arg2)
    case '*':
      return multiplication(arg1, arg2)
    case '/':
      return divide(arg1, arg2)
    default:
      return 'Что-то случилось.'
  }
}