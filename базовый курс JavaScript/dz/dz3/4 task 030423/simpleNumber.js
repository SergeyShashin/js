'use strict';

/*
 С помощью цикла while вывести все простые числа в промежутке от 0 до 100
(можно без оптимизаций).
*/

let i = 0;
let simpleNumbers = [2, 3];

while (i < 101) {

  if (i > 3) { 
    for (let j = i - 1; j >= 2; j--) {
      if (i % j === 0) {
        break;
      }
      if (j == 2) {
        simpleNumbers.push(i);
      }
    }
  }

  i++;
}

console.log(simpleNumbers);