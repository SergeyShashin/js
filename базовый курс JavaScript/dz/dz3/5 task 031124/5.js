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

console.log(`1. Индекс массива с максимальной суммой элементов ${getIdxArrWithMaxSumEl(arr)}.`);
console.log(`2. Минимальное значение в массиве [${arr[getIdxArrWithMaxSumEl(arr)]}]  ${Math.min(...arr[getIdxArrWithMaxSumEl(arr)])}.`);

function getIdxArrWithMaxSumEl(arr) {
  let idxArrWithMaxSumEl = 0;
  let maxSum = 0;
  arr.forEach((str, idx) => {
    let sum = str.reduce((acc, el) => acc + el);
    if (sum > maxSum) {
      maxSum = sum;
      idxArrWithMaxSumEl = idx;
    }
  });
  return idxArrWithMaxSumEl;
}
