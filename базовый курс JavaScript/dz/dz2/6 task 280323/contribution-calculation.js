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

let variantsDeclination = ['рубль', 'рубля', 'рублей'];
console.log(declination(Number(prompt('Какое количество денег хотите положить?', 0)), variantsDeclination));

function declination(number, variants) {
  switch (number) {
    case 1:
      return `${number} ${variants[0]}`;
    case 2:
    case 3:
    case 4:
      return `${number} ${variants[1]}`;
    default:
      if (number > 20 && number % 10 === 1 && String(number).slice(-2) !== '11') {
        return `${number} ${variants[0]}`;
      }
      if (number > 20 && number % 10 === 2 && String(number).slice(-2) !== '12') {
        return `${number} ${variants[1]}`;
      }
      if (number > 20 && number % 10 === 3 && String(number).slice(-2) !== '13') {
        return `${number} ${variants[1]}`;
      }
      if (number > 20 && number % 10 === 4 && String(number).slice(-2) !== '14') {
        return `${number} ${variants[1]}`;
      }

      return `${number} ${variants[2]}`;
  }


}
