'use strict';

/*
Реализовать основные 4 арифметические операции (+, -, /, *) в виде функций с двумя
параметрами.
Обязательно использовать оператор return.
*/

let sum = (firstNumber, secondNumber) => {
  return firstNumber + secondNumber
}

let multiplication = (firstNumber, secondNumber) => {
  return firstNumber * secondNumber
}

let difference = (firstNumber, secondNumber) => {
  return firstNumber - secondNumber
}

let divide = (firstNumber, secondNumber) => {
  return firstNumber / secondNumber
}

alert(sum(Number(prompt('Первое число', 3)), Number(prompt('Второе число', 3))));
alert(multiplication(Number(prompt('Первое число', 3)), Number(prompt('Второе число', 3))));
alert(difference(Number(prompt('Первое число', 3)), Number(prompt('Второе число', 3))));
alert(divide(Number(prompt('Первое число', 3)), Number(prompt('Второе число', 3))));