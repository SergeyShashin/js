'use strict';

/*
Реализовать основные 4 арифметические операции (+, -, /, *) в виде функций с двумя
параметрами.
Обязательно использовать оператор return.
*/
let a = 8;

let functions = [sum(a, a), multiplication(a, a), difference(a, a), divide(a, a)];

for (let operation of functions) {
  console.log(operation);
}

function sum(a, b) {
  return a + b
}

function multiplication(a, b) {
  return a * b
}

function difference(a, b) {
  return a - b
}

function divide(a, b) {
  return a / b
}