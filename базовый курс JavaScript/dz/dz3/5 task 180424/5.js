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

let arrSumNumbersMax = getArrSumNumberMax(arr);
let minValInArrSumNumbersMax = Math.min(...arr[arrSumNumbersMax.idxArr]);

console.log(arr);
console.log(`Индекс массива у которого сумма всех чисел максимальна ${arrSumNumbersMax.idxArr}.`);
console.log(`Минимальное значение ${minValInArrSumNumbersMax}.`);

/**
 * Возвращает массив в котором сумма всех чисел максимальна и его индекс
 * @param {Array} arr 
 */
function getArrSumNumberMax(arr) {
  const result = {
    sumMax: 0,
    idxArr: null
  };

  arr.forEach((el, idx) => {
    let sum = 0;

    for (const number of el) {
      sum += number;
    }

    if (sum > result.sumMax) {
      result.sumMax = sum;
      result.idxArr = idx
    };

  });

  return result
}