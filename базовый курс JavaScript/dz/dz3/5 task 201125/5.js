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

let idxArrMaxSum = getIdxArrMaxSum(arr);

console.log(`Индекс этого массива у которого сумма всех чисел максимальна ${idxArrMaxSum}.\n\
Минимальное значение в массиве [${arr[idxArrMaxSum]}] = ${getMinValInArrMaxSum(arr[idxArrMaxSum])}.`);

function getIdxArrMaxSum(arr) {
  let idxArrMaxSum;
  let sum = 0;
  let maxSum = 0;

  arr.map((el, idx) => {
    sum = el.reduce((acc, num) => acc + num);
    if (sum > maxSum) {
      maxSum = sum;
      idxArrMaxSum = idx;
    }
  });

  return idxArrMaxSum
}

function getMinValInArrMaxSum(arr) {
  return Math.min(...arr)
}