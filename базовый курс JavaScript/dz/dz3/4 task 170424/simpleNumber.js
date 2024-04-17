'use strict';

/*
 С помощью цикла while вывести все простые числа в промежутке от 0 до 100
(можно без оптимизаций).
*/
let i = 2;

while (i < 101) {
  let div = i - 1;
  let flag = true;

  while (div > 1) {
    if (i % div === 0) {
      flag = false;
      break;
    }
    div--;
  }

  flag ? console.log(i) : '';

  i++;
}