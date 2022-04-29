'use strict';

/*
Написать функцию, преобразующую число в объект. Передавая на вход число в диапазоне [0,
999],
мы должны получить на выходе объект, в котором в соответствующих свойствах описаны
разряды числа:
- единицы (в свойстве firstDigit)
- десятки (в свойстве secondDigit)
- сотни (в свойстве thirdDigit)
Например, для числа 45 мы должны получить следующий объект:
```
{
firstDigit: 5,
secondDigit: 4,
thirdDigit: 0,
}
```
Если число было передано вне [0, 999] диапазона, не целое число или вообще не число,
необходимо выдать соответствующее сообщение с помощью console.log и вернуть пустой объект.
*/

let number = +prompt(`Введите целое число в диапазоне [0, 999]`);

console.log(transferNumberInToObject(number));

function transferNumberInToObject(number) {
  const obj = {};

  if (!validateNumber(number)) {
    console.error(`Для преобразования нужно передать целое число в диапазоне [0, 999].`);
  } else {
    number = number.toString();
    // console.log(number);
    obj.firstDigit = number[0];
    obj.secondDigit = number[1];
    obj.thirdDigit = number[2];
  }

  return obj;
}

function validateNumber(number) {
  return number >= 0 && number <= 999 && Number.isInteger(number);
}