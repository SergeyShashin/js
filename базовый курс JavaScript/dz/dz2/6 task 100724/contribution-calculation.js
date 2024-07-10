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

for (let i = 0; i < 200; i++) {
  console.log(`Ваша сумма в ${i} ${declination(i, ['рубль', 'рубля', 'рублей'])} успешно зачислена.`);
}


function declination(number, variants) {
  let lastTwoNumbers = number % 100;
  if (lastTwoNumbers === 0 ||
    lastTwoNumbers > 4 && lastTwoNumbers < 21 ||
    lastTwoNumbers > 24 && lastTwoNumbers < 31 ||
    lastTwoNumbers > 34 && lastTwoNumbers < 41 ||
    lastTwoNumbers > 44 && lastTwoNumbers < 51 ||
    lastTwoNumbers > 54 && lastTwoNumbers < 61 ||
    lastTwoNumbers > 64 && lastTwoNumbers < 71 ||
    lastTwoNumbers > 74 && lastTwoNumbers < 81 ||
    lastTwoNumbers > 84 && lastTwoNumbers < 91 ||
    lastTwoNumbers > 94 && lastTwoNumbers < 101
  ) {
    return variants[2]
  } else if (lastTwoNumbers === 1 ||
    lastTwoNumbers === 21 ||
    lastTwoNumbers === 31 ||
    lastTwoNumbers === 41 ||
    lastTwoNumbers === 51 ||
    lastTwoNumbers === 61 ||
    lastTwoNumbers === 71 ||
    lastTwoNumbers === 81 ||
    lastTwoNumbers === 91
  ) {
    return variants[0]
  } else {
    return variants[1]
  }

}