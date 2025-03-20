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
let arrMaxSum = arr[idxArrMaxSum];
let minValInArrMaxSum = Math.min(...arrMaxSum);
console.log('Индекс массива, у которого сумма всех чисел максимальна ' + idxArrMaxSum);
console.log('Минимальное значение найденное в массиве с максимальной суммой всех чисел ' + minValInArrMaxSum);


function getIdxArrMaxSum(arr) {
  let maxSum = 0;
  let sum = 0;
  let idxArrMaxSum = 0;
  arr.map((row, idx) => {
    sum = row.reduce((acc, el) => acc + el);
    if (sum > maxSum) {
      maxSum = sum;
      idxArrMaxSum = idx;
    }
  });

  return idxArrMaxSum
}