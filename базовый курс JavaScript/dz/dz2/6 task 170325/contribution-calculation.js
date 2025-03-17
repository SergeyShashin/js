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

let number1 = Number(prompt('Какая сумма?', 101));
let number2 = Number(prompt('Какая сумма?', 10020));
let number3 = Number(prompt('Какая сумма?', 120104));

console.log(` Ваша сумма в ${number1} ${declinationOfNumber(number1, variants)} зачислена.`);
console.log(` Ваша сумма в ${number2} ${declinationOfNumber(number2, variants)} зачислена.`);
console.log(` Ваша сумма в ${number3} ${declinationOfNumber(number3, variants)} зачислена.`);

for (let i = 0; i < 202; i++) {
  console.log(` Ваша сумма в ${String(i)} ${declinationOfNumber(i, variants)} зачислена.`);
}

function declinationOfNumber(number, variants) {
  let n3 = number % 100;
  let n1 = n3 % 10;

  if (n3 > 5 && n3 < 21) {
    return variants[1]
  } else if (n1 === 1) {
    return variants[0]
  } else if (n1 > 1 && n1 < 5) {
    return variants[2]
  } else {
    return variants[1]
  }
}