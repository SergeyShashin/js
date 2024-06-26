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

let ticket = prompt('Номер билета из 6 цифр?', 999999);

console.log(
  Number(ticket[0]) + Number(ticket[1]) + Number(ticket[2]) === Number(ticket[3]) + Number(ticket[4]) + Number(ticket[5])
    ? 'счастливый'
    : 'иной'
);


