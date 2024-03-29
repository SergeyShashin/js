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

console.log(numberToObject(Number(prompt('число в диапазоне [0, 999]'))));

function numberToObject(number) {
  if (!Number.isInteger(number) && number < 0 && number > 999) {
    return {}
  }

  return {
    firstDigit: parseInt(number / 100),
    secondDigit: parseInt(number / 10 % 10),
    thirdDigit: number % 10,
  }

}