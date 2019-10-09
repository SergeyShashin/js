/**
 * 1 Написать функцию, преобразующую число в объект. Передавая на вход число в диапазоне [0,
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

let number = +prompt('Введите число от 0 до 999');

console.log(numberToObject(number));

function numberToObject(number) {        
    
    if(number<0||number>999||isNaN(number)||!Number.isInteger(number)) {
        return 'Введите число от 0 до 999';
    }

    let obj = {
        firstDigit: 0,
        secondDigit: 0,
        thirdDigit: 0,
    }    

    obj.firstDigit = parseInt(number%10) ;
    obj.secondDigit = parseInt(number/10%10);
    obj.thirdDigit = parseInt(number/100);

    return obj;
}