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


console.log(numberToObject(prompt('Введите, пожалуйста, число в диапазоне [0, 999]', 797)));

/**
 * Преобразует число в объект
 * @param {string} number число в диапазоне [0, 999]
 * @returns {object} Объект, в котором в соответствующих свойствах описаны разряды числа
 */
function numberToObject(number) {

  if (Number(number) < 0 || Number(number) > 999 || !Number.isInteger(Number(number))) {
    return {}
  }

  switch (number.length) {
    case 1:
      return {
        firstDigit: Number(number[0]),
        secondDigit: 0,
        thirdDigit: 0,
      }
    case 2:
      return {
        firstDigit: Number(number[1]),
        secondDigit: Number(number[0]),
        thirdDigit: 0,
      }
    case 3:
      return {
        firstDigit: Number(number[2]),
        secondDigit: Number(number[1]),
        thirdDigit: Number(number[0]),
      }
  }
}