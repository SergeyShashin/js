'use strict';

/*
 С помощью цикла while вывести все простые числа в промежутке от 0 до 100
(можно без оптимизаций).
*/
console.time();
let i = 3;
console.log(2);

while (i < 10000) {
  if (isSimple(i)) {
    console.log(i);
  }
  i = i + 2;
}
/*вариант 1
function isSimple(n) {
  for (let i = n - 1; i > 1; i--) {
    if (n % i === 0) {
      return false
    }
  }
  return true
}
*/

//вариант2
function isSimple(n) {
  let limitNumber = n / 2;
  for (let i = 3; i < limitNumber; i = i + 2) {
    if (n % i === 0) {
      return false
    }
  }
  return true
}
console.timeEnd();