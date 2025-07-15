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

let arrWithMaxSum = arr[getArrWithMaxSum(arr)];

console.log(`Минимальное значение найденное в массиве [${arrWithMaxSum}] = ${getMinValue(arrWithMaxSum)}.`);

function getArrWithMaxSum(arr) {
  let maxSum = 0;
  let idxArrMaxSum = 0;

  arr.map((row, idx) => {
    let sum = row.reduce((acc, num) => acc + num);
    if (sum > maxSum) {
      maxSum = sum;
      idxArrMaxSum = idx;
    }
  });

  return idxArrMaxSum
}

function getMinValue(arr) {
  return Math.min(...arr);
}

