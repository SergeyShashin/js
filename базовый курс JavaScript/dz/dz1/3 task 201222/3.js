'use stict';

/**
Вывести в консоль значения выражений и объяснить почему получились такие значения
используя комментарии к каждому выражению:
```
10 + 10 + "10"
10 + "10" + 10
10 + 10 + +"10"
10 / -""
10 / +"2,5"
```
 */

console.log(10 + 10 + '10'); // 2010 конкатенация числа 20 и строки 10
console.log(10 + '10' + 10); // 101010 конкатенация числа 10 строки 10 и числа 10
console.log(10 + 10 + + '10'); // 30 сложение чисел
console.log(10 / -''); // -infinity деление числа на -
console.log(10 / +'2,5'); // NaN деление числа на строку ?
