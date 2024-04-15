'use strict';

/*
Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation),
где arg1, arg2 – значения аргументов, operation – строка с названием операции. В зависимости
от
переданного значения операции (использовать switch) выполнить одну из арифметических
операций
(использовать функции из задания 4) и вернуть полученное значение.
*/

[mathOperation(880, 8, '+'), mathOperation(22, 1, '-'), mathOperation(111, 8, '*'), mathOperation(1024, 8, '/')].forEach(el => console.log(el));

function mathOperation(arg1, arg2, operation) {
  switch (operation) {
    case '+':
      return add(arg1, arg2);
    case '-':
      return difference(arg1, arg2);
    case '*':
      return multiplication(arg1, arg2);
    case '/':
      return division(arg1, arg2);
  }
}