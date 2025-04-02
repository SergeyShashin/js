'use strict';

/*
Создать форму в html со следующими полями:
* Имя - текстовое поле
* Телефон - текстовое поле
* Пароль - поле типа password
* Повтор пароля - поле типа password
* Кнопка отправить форму
Необходимо реализовать валидацию этой формы по следующим правилам:
* Имя - должно содержать как минимум 1 символ, не более 50 символов.
* Телефон - должно содержать 11 цифр, не больше, не меньше.
* Пароль - минимум 5 символов, максимум 50
* Повтор пароля - значение должно совпадать с полем пароль.
* Кнопка отправить форму - при нажатии на кнопку форма должна провериться, при
прохождении проверки, форма
отправляется, если проверка не была пройдена, то:
- Каждое поле, которое не прошло проверку должно выделяться красным цветом.
- Под каждым полем, что не прошло проверку, должна писаться подсказка по какой причине
проверка провалилась.
Можете пользоваться стилями бутстрапа, если лень самим писать.
Пользоваться аттрибутами HTML5 запрещено, необходимо проверки реализовать с помощью
javascript.
*/

document.getElementById('button-send').addEventListener('click', e => validationForm(e));

function validationForm(e) {
  let formEl = document.querySelector('form');

  const validationdRules = {


  };

  const validationMEthods = {
    length(quantityChar, sign, data) {
      let dataLength = data.length;
      let result = '';
      switch (sign) {
        case '>':
          dataLength > quantityChar ? '' : result = `Длина меньше ${quantityChar}`;
          break;
        case '>=':
          dataLength >= quantityChar ? '' : result = `Длина меньше ${quantityChar}`;
          break;
        case '<':
          dataLength < quantityChar ? '' : result = `Длина больше ${quantityChar}`;
          break;
        case '<=':
          dataLength <= quantityChar ? '' : result = `Длина больше ${quantityChar}`;
          break;
        case '===':
          quantityChar === dataLength ? '' : result = `Длина поля должна быть равна ${quantityChar}.`;
          break;
      }

      return result
    }
  }

  console.log(validationMEthods.length(2, '===', '+'));

}
