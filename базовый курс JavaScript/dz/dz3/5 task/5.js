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

let maxIdx = findArrayWhereSumAllNumbersIsMaximum(arr);
let minVal = findMinValinArray(arr[maxIdx]);

console.log(`Индекс массива с максимальной суммой ${maxIdx}`);
console.log(`Минимальное значение в массиве [${arr[maxIdx]}] = ${minVal}`);


/**
 * 
 * @param {array} arr Заданный массив
 * @returns {number} maxIdx Индекс массива с максимальной суммой 
 */
function findArrayWhereSumAllNumbersIsMaximum(arr) {
  let maxIdx = 0;
  let maxSum = 0;

  for (let key in arr) {
    let max = 0;
    for (let val of arr[key]) {
      max += val;
    };
    if (maxSum < max) {
      maxSum = max;
      maxIdx = key;
    }

  }

  return maxIdx;
}

/**
 * 
 * @param {array} arr Одномерный массив
 * @returns {number} minVal Минимальное значение в массиве 
 */
function findMinValinArray(arr) {
  let firstElementinArray = 0;
  let minVal = arr[firstElementinArray];

  for (let val of arr) {
    val < minVal ? minVal = val : '';
  }

  return minVal;

}