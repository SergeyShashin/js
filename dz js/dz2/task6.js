/**
 * 6**. Программа должна спросить у пользователя количество денег, которое он хочет положить
в банк. Пользователь должен ввести целое число, а программа должна выдать
соответствующее сообщение:
"Ваша сумма в 101 рубль успешно зачислена." - в случае если пользователь ввел 101
"Ваша сумма в 10020 рублей успешно зачислена." - в случае если пользователь ввел 10020
"Ваша сумма в 120104 рубля успешно зачислена." - в случае если пользователь ввел 120104
Если пользователь введет любое другое целое число, программа также должна выдать
соответствующее сообщение, в котором будет отображено это число, а также поставить
верное окончание в слове "рубль". Для получения верного склонения слова (любого слова с
числом) вам необходимо создать функцию.

1, 21, 31, 41, 51, 61, 71, 81, 91, 101, 121  рубль  НЕЧЕТНЫЕ 'один'
0, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 111, 112, 113, 114, 115, 116, 117, 118, 119, рублей
2, 3, 4,  22, 23, 24,  рубля два, три, четыре


 */


while (true) {
    let quantityMoney = +prompt('Какое количество хотите положить в банк?', '100');
    alert(rubles(quantityMoney));
    if (!confirm('Продолжим?')) {
        break;
    };
}

function rubles(quantityMoney) {
    if (!Number.isInteger(quantityMoney)) {
        return 'Нужно ввести целое число';
    }   

    if (/(0)$|(5)|(6)$|(7)$|(8)$|(9)$|(11)$|(12)$|(13)$|(14)/.test(quantityMoney)) {
        return `${quantityMoney} рублей`;
    } else if (/1$/.test(quantityMoney)) {
        return `${quantityMoney} рубль`;
    }else{
        return `${quantityMoney} рубля`;
    }







}

