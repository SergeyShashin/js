'use strict';

/*
Реализовать основные 4 арифметические операции (+, -, /, *) в виде функций с двумя
параметрами.
Обязательно использовать оператор return.
*/

function sum(a, b) {
  return a + b
}

function multiplication(a, b) {
  return a * b
}

function dividing(a, b) {
  return a / b
}

function difference(a, b) {
  return a - b
}

console.log(sum(4, 4), multiplication(2, 4), dividing(16, 2), difference(16, 8));