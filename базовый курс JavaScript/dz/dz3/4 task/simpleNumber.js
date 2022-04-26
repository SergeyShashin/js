'use strict';

/*
 С помощью цикла while вывести все простые числа в промежутке от 0 до 100
(можно без оптимизаций).
*/

let i = 2;

while (i < 100) {
  let j = 2;
  let array = [];

  while (j < i) {
    array.push(i % j);
    j++;
  }

  if (!array.includes(0)) {
    console.log(i);
  }

  i++;
}