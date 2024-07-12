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

console.log(getIdxArrMaxSum(arr));
console.log(getMinElInArr(arr[getIdxArrMaxSum(arr)]));

/**
 * Возвращает индекс массива, у которого сумма всех чисел максимальна.
 * @param {array} Принимает 2-х мерный массив. 
 * @returns {number} Возвращает индекс массива, у которого сумма всех чисел максимальна.
 */
function getIdxArrMaxSum(arr) {
  let maxSum = 0;
  let idxArrMaxSum = 0;

  arr.map((str, idx) => {
    let sum = str.reduce((acc, num) => acc + num);
    if (sum > maxSum) {
      maxSum = sum;
      idxArrMaxSum = idx;
    }
  })
  return idxArrMaxSum
}

/**
 * Возвращает минимальное значение в массиве.
 * @param {array} Принимает 1-мерный массив. 
 * @returns {number} Возвращает минимальное значение в массиве.
 */
function getMinElInArr(arr) {
  return Math.min(...arr);
}