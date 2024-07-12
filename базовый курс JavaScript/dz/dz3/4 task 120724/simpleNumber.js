'use strict';

/*
 С помощью цикла while вывести все простые числа в промежутке от 0 до 100
(можно без оптимизаций).
*/
let i = 0;
let simpleNumbers = [];

while (i < 101) {
  let isSimpleNumber = true;
  if (i > 1) {
    let prevI = i - 1;
    while (prevI > 1) {
      if (i % prevI === 0) {
        isSimpleNumber = false;
        break;
      }

      prevI--;
    }

    isSimpleNumber ? simpleNumbers.push(i) : '';
  }
  i++;
}

console.log(simpleNumbers);