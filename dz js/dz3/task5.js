// 5*. Дан массив (создать такой же, с такими же значениями):
// ```
// const arr = [
// [2, 4, 6], //12
// [1, 5, 10], //16  минимальное значение 1
// [7, 4, 1], // 12
// ];
// ```
// Задания:
// 1 Найти массив, у которого сумма всех чисел максимальна, вывести в console.log
// индекс этого массива.
// 2 Получить и вывести в console.log минимальное значение найденное в массиве,
// который мы получили в первом пункте.

const arr = [
    [2, 4, 6],
    [1, 5, 10],
    [7, 4, 1],
];

let IndexArraySumNumbersMax = getIndexArraySumNumbersMax(arr);

console.log(`Индекс массива с максимальной суммой всех чисел ${IndexArraySumNumbersMax}`);
console.log(`Минимальное значение найденное в массиве ${getMinValue(arr, IndexArraySumNumbersMax)}`);



function getMinValue(arr, IndexArraySumNumbersMax){
    let minValue=arr[IndexArraySumNumbersMax][0];

    for (let i=1 ; i<arr[IndexArraySumNumbersMax].length; i++){
        if (arr[IndexArraySumNumbersMax][i] < minValue){
            minValue=arr[IndexArraySumNumbersMax][i];
        }
    }

    return minValue;
}

function getIndexArraySumNumbersMax(arr) {    
    let maxSum = 0;
    let maxIndex = 0;

    for (let i = 0; i < arr.length; i++) {
        let sum = 0;
        let minNumber = 0;
        for (let j = 0; j < arr[i].length; j++) {
            sum = sum + arr[i][j];
        }
        if (sum > maxSum) {
            maxSum = sum;
            maxIndex = i;            
        }
    }
   
    return maxIndex;
}
