'use strict';

/*
 С помощью цикла while вывести все простые числа в промежутке от 0 до 100
(можно без оптимизаций).
*/

let i = 4;
let j = 0;
let primeNumbers = [2, 3];
let flagPrimeNumber;

while (i < 100) {
  flagPrimeNumber = true
  j = i - 1;

  while (j !== 1) {
    if (Number.isInteger(i / j)) {   
      flagPrimeNumber = false;
      break;
    }
    j--;
  }

  if (flagPrimeNumber) {
    primeNumbers.push(i);
  }

  i++;
}

console.log(primeNumbers);