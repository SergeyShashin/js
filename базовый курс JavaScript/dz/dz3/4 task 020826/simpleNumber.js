'use strict';

/*
 С помощью цикла while вывести все простые числа в промежутке от 0 до 100
(можно без оптимизаций).
*/

console.log(getSimpleNumbers(200));

function getSimpleNumbers(number) {
  let simpleNumbers = [];

  for (let i = 2; i < number+1; i++) {
    isSimpleNumber(i) ? simpleNumbers.push(i) : '';
  }

  return simpleNumbers;
}

function isSimpleNumber(number) {
  let limit = Math.floor(Math.sqrt(number));
  for (let i = 2; i < limit + 1; i++) {
    if (number % i === 0) {
      return false
    }
  }

  return true
}
