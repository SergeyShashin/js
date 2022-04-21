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

let ticketNumber = +prompt('Введите номер билета из 6 цифр', 797797);
let sumLeftNumbers = parseInt(ticketNumber / 100000) + parseInt(ticketNumber / 10000 % 10) + parseInt(ticketNumber / 1000 % 10);
let sumRightNumbers = parseInt(ticketNumber / 100 % 10) + parseInt(ticketNumber / 10 % 10) + parseInt(ticketNumber % 10);

if (sumLeftNumbers === sumRightNumbers) {
  console.log(`Билет ${ticketNumber} счастливый!`);
}else{
  console.log(`Билет ${ticketNumber} несчастливый!`);
}



