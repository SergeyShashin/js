'use strict';

/*
 С помощью цикла while вывести все простые числа в промежутке от 0 до 100
(можно без оптимизаций).
*/
let i = 2;

while (i < 101) {
  isSimple(i) ? console.log(i) : '';
  i++;
}

function isSimple(num) {
  let j = num - 1;
  while (j > 1) {
    if (num % j === 0) {
      return false
    }
    j--;
  }
  return true

}