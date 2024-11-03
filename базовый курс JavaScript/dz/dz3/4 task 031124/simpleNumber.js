'use strict';

/*
 С помощью цикла while вывести все простые числа в промежутке от 0 до 100
(можно без оптимизаций).
*/
let isSimpleNumber = [2,];
let i = 0;
let j;

while (i < 101) {

  if (i > 2) {
    let isSimple = true;
    j = i - 1;

    while (j > 1) {
      i % j === 0 ? isSimple = false : '';
      j--;
    }

    isSimple ? isSimpleNumber.push(i) : '';
  }

  i++;
}

console.log(isSimpleNumber);