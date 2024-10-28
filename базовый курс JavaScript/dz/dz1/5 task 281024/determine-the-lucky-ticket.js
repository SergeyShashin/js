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

let numberTicket = Number(prompt('Какой номер билета из 6 цифр?', 789987));

let firststD = parseInt(numberTicket / 100000);
let seconddD = parseInt(numberTicket / 10000) % 10;
let thirdD = parseInt(numberTicket / 1000) % 10;
let fourthD = parseInt(numberTicket / 100) % 10;
let fifthD = parseInt(numberTicket / 10) % 10;
let six = numberTicket % 10;

firststD + seconddD + thirdD - fourthD - fifthD - six === 0
  ? console.log(`${numberTicket} - билет счастливый.`)
  : console.log(`${numberTicket} - билет простой.`);

