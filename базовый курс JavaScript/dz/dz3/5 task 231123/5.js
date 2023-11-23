'use strict';

/*
Дан массив (создать такой же, с такими же значениями):

const arr = [
  [2, 4, 6],
  [1, 5, 10],
  [7, 4, 1],
];

Задания:
1. Найти массив, у которого сумма всех чисел максимальна, вывести в console.log индекс этого массива.
2. Получить и вывести в console.log минимальное значение найденное в массиве, который мы получили в
первом пункте.
*/

const arr = [
  [2, 4, 6],
  [1, 5, 10],
  [7, 4, 1],
];

let indexMaxSumNumber = getIdxMaxSumNumber();
console.log(`Индекс массива ${indexMaxSumNumber}. Массив, у которого сумма всех чисел максимальна [${arr[indexMaxSumNumber]}]`);
console.log(`Минимальное значение ${Math.min(...arr[indexMaxSumNumber])}`);

function getIdxMaxSumNumber() {

  let arrSum = [];

  arr.map(el => arrSum.push(el.reduce((acc, el) => acc += el)));

  return arrSum.indexOf(Math.max(...arrSum))
}