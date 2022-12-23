'use strict';

/*
Программа должна спросить у пользователя количество денег, которое он хочет положить
в банк. Пользователь должен ввести целое число, а программа должна выдать
соответствующее сообщение:
"Ваша сумма в 101 рубль успешно зачислена." - в случае если пользователь ввел 101
"Ваша сумма в 10020 рублей успешно зачислена." - в случае если пользователь ввел 10020
"Ваша сумма в 120104 рубля успешно зачислена." - в случае если пользователь ввел 120104
Если пользователь введет любое другое целое число, программа также должна выдать
соответствующее сообщение, в котором будет отображено это число, а также поставить
верное окончание в слове "рубль". Для получения верного склонения слова (любого слова с
числом) вам необходимо создать функцию.
*/

/*
 1 один рубль

 2 два рубля
 3 три рубля
 4 четыре рубля

 5 пять рублей
 6 шесть рублей
 7 семь рублей
 8 восемь рублей
 9 девять рублей
 10 десять рублей
 11 одиннадцать рублей

 12 двенадцать рублей
 13 рублей
 14 рублей

 21 один рубль 
 */

let contribution = prompt('Какое количество денег хотите положить?');
let units = ['рубль', 'рублей', 'рубля'];
// let units = ['яблоко', 'яблок', 'яблока'];

console.log(getMessage(contribution, units));

/**
 * Выводит сообщение в консоль о количестве вложенных едениц
 * @param {number} contribution Количество
 * @param {Array} units Единицы измерения
 */
function getMessage(contribution, units) {
  let lengthString = contribution.length;

  if (lengthString === 1 && contribution[0] === '1'
    || lengthString > 1 && contribution[lengthString - 1] === '1'
    && contribution[lengthString - 2] !== '1'
  ) {
    return `Ваша сумма в ${contribution} ${units[0]} успешно зачислена.`
  }
  if (
    lengthString === 1 && contribution[0] === '2'
    || lengthString > 1 && contribution[lengthString - 1] === '2'
    && contribution[lengthString - 2] !== '1'
    || lengthString === 1 && contribution[0] === '3'
    || lengthString > 1 && contribution[lengthString - 1] === '3'
    && contribution[lengthString - 2] !== '1'
    || lengthString === 1 && contribution[0] === '4'
    || lengthString > 1 && contribution[lengthString - 1] === '4'
    && contribution[lengthString - 2] !== '1'
  ) {
    return `Ваша сумма в ${contribution} ${units[2]} успешно зачислена.`
  }

  return `Ваша сумма в ${contribution} ${units[1]} успешно зачислена.`
}