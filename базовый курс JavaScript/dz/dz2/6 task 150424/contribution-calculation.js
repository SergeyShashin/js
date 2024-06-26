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
alert(message(Number(prompt('Какая сумма?')), ['рубль', 'рубля', 'рублей']));

for (let i = 1; i < 123; i++) {
  console.log(message(i, ['рубль', 'рубля', 'рублей']));
}

function message(number, wordArr) {
  let strNumber = String(number);
  let lastChar = strNumber[strNumber.length - 1];
  let prevLastChar = strNumber[strNumber.length - 2];

  if (number === 1 || number > 10 && lastChar === '1' && prevLastChar !== '1') {
    return `${number} ${wordArr[0]}`;
  } else if (number === 2 || number === 3 || number === 4 ||
    number > 10 && lastChar === '2' && prevLastChar !== '1'
    || number > 10 && lastChar === '3' && prevLastChar !== '1'
    || number > 10 && lastChar === '4' && prevLastChar !== '1') {
    return `${number} ${wordArr[1]}`;
  } else {
    return `${number} ${wordArr[2]}`;
  }

}
