'use strict';

/**
Пользователь, с помощью команды prompt, вводит номер билета - 6 цифр. Программа
определяет является ли счастливым данный билетик и выводит соответстующее сообщение в
консоль. Счастливый билет - билет, у которого сумма первых трех цифр равна сумме последних
трех цифр номера билета.
Для выполнения задания необходимо использовать оператор % и ветвление.
Чтобы сравнить два значения, можно использовать if и else (курс основ программирования),
например:
```
const a = 1;
const b = 1;
if (a === b) {
console.log('Две переменные a и b равны.');
}
```
*/

let numberTicket = Number(prompt('Номер билета', 248842));

let firstNumber = parseInt(numberTicket / 100000);
let secondNumber = parseInt(numberTicket / 10000 % 10);
let thirdNumber = parseInt(numberTicket / 1000 % 10);
let fourthNumber = parseInt(numberTicket / 100 % 10);
let fifthNumber = parseInt(numberTicket / 10 % 10);
let lastNumber = parseInt(numberTicket % 10);

let result;

firstNumber + secondNumber + thirdNumber === fourthNumber + fifthNumber + lastNumber ? result = 'Счастливый' : result = 'Простой';

console.log(result);



