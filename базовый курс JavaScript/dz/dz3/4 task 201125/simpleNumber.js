'use strict';

/*
 С помощью цикла while вывести все простые числа в промежутке от 0 до 100
(можно без оптимизаций).
*/
let i = 3;
console.log(2);

while (i < 100) {
  if (isSimple(i)) {
    console.log(i);
  }
  i = i + 2;
}

function isSimple(n) {
  for (let i = n - 1; i > 1; i--) {
    if (n % i === 0) {
      return false
    }
  }
  return true
}