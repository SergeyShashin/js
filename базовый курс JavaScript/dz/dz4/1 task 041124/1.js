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

console.log(numberToObject(prompt('Число?'), 888));

function numberToObject(str) {
  let numberFromStr = Number(str);
  if (numberFromStr < 999 && numberFromStr > -1 && Number.isInteger(numberFromStr)) {
    return {
      firstDigit: str[2],
      secondDigit: str[1],
      thirdDigit: str[0],
    }
  } else {
    console.log(`Ожидается ввод целого числа в диапазоне [0, 999]`);
    return {}
  }
}