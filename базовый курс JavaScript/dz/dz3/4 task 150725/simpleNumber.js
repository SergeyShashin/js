'use strict';

/*
 С помощью цикла while вывести все простые числа в промежутке от 0 до 100
(можно без оптимизаций).
*/

let i = 3;
let simpleNumbers = [1, 2];

while (i < 100) {
  isNumberPrime(i) ? simpleNumbers.push(i) : '';
  i++;
}

console.log(simpleNumbers); 

function isNumberPrime(number) {
  for (let i = number - 1; i > 1; i--) {
    if (number % i === 0) {
      return false
    }
  }

  return true
}