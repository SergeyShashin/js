'use strict';

/*
 С помощью цикла while вывести все простые числа в промежутке от 0 до 100
(можно без оптимизаций).
*/

let i = 4;
let simpleNumbers = [2, 3];

while (i < 101) {
  let simpleNumber = true;
  for (let j = 2; j < i - 1; j++) {
    if (i % j === 0) {
      simpleNumber = false;
    }
  }
  if (simpleNumber) {
    simpleNumbers.push(i);
  }
  i++;
}

console.log(simpleNumbers);