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

let idxArrMaxSum = getIdxArrayMaxSum(arr);
let minValue = Math.min(...arr[idxArrMaxSum]);

console.log(`Индекс массива у которого сумма всех чисел максимальна = ${idxArrMaxSum}.`);
console.log(`Минимальное значение найденное в массиве из первого пункта = ${minValue}.`);


/**
 * Определяет индекс массива у которого сумма всех чисел максимальна.
 * @param {array} Двумерный массив.
 * @return {number}  Возвращает индекс массива у которого сумма всех чисел максимальна.
 */
function getIdxArrayMaxSum(arr) {
  let arrAfterReduceElements = [];
  arr.forEach(el => {
    arrAfterReduceElements.push(el.reduce((acc, el) => acc += el));
  });

  return arrAfterReduceElements.indexOf(Math.max(...arrAfterReduceElements));

}