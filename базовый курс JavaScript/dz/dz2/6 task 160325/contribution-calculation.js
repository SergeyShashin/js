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
const variants = ['рубль', 'рублей', 'рубля'];

let str1 = prompt('Какая сумма?', 101);
let str2 = prompt('Какая сумма?', 10020);
let str3 = prompt('Какая сумма?', 120104);

console.log(` Ваша сумма в ${str1} ${declension(str1, variants)} зачислена.`);
console.log(` Ваша сумма в ${str2} ${declension(str2, variants)} зачислена.`);
console.log(` Ваша сумма в ${str3} ${declension(str3, variants)} зачислена.`);

for (let i = 0; i < 202; i++) {
  console.log(` Ваша сумма в ${String(i)} ${declension(String(i), variants)} зачислена.`);
}

function declension(str, variants) {
  let strLength = str.length;
  let lastChar = str[strLength - 1];
  let prevLastChar = str[strLength - 2];

  if (strLength === 0) {
    return variants[1]
  }

  if (strLength === 1 && lastChar === '1') {
    return variants[0]
  }

  if (strLength === 1 && lastChar === '2' || strLength === 1 && lastChar === '3' || strLength === 1 && lastChar === '4') {
    return variants[2]
  }


  if (lastChar === '1' && prevLastChar !== '1') {
    return variants[0]
  }

  if (lastChar === '2' && prevLastChar !== '1' || lastChar === '3' && prevLastChar !== '1' || lastChar === '4' && prevLastChar !== '1') {
    return variants[2]
  }

  return variants[1]


}