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

console.log(transformNumberToObject(8));
console.log(transformNumberToObject(45));
console.log(transformNumberToObject(888));

function transformNumberToObject(number) {
  let prevResult = String(number);
  let result = {
    firstDigit: 0,
    secondDigit: 0,
    thirdDigit: 0,
  }

  if (prevResult.length === 1) {
    result.firstDigit = number
  }

  if (prevResult.length === 2) {
    result.firstDigit = Number(prevResult[1]);
    result.secondDigit = Number(prevResult[0]);
  }

  if (prevResult.length === 3) {
    result.firstDigit = Number(prevResult[2]);
    result.secondDigit = Number(prevResult[1]);
    result.thirdDigit = Number(prevResult[0]);
  }

  return result

}
