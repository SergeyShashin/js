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

const rules = {
  firstName: [{ nameMethod: 'length', args: ['>', 1] }, { nameMethod: 'length', args: ['<', 50] }],
  // phone: [{ nameMethod: 'length', args: ['===', 11] }, { nameMethod: 'typeContent', args: ['number'] }],
  // password: [{ nameMethod: 'length', args: ['>', 5] }, { nameMethod: 'length', args: ['<', 50] }],
  // rptPassword: [{ nameMethod: 'mustBeEqual', args: ['password'] }],
};

const messages = {
  firstName: 'Имя - должно содержать как минимум 1 символ, не более 50 символов.',
  phone: 'Телефон - должен содержать 11 цифр, не больше, не меньше.',
  password: 'Пароль - минимум 5 символов, максимум 50',
  rptPassword: 'Повтор пароля должен совпадать с паролем.',
};

const methods = {

  length(content, conditions) {

    let contentLength = content.length;
    let sign = conditions[0];
    let number = conditions[1];

    switch (sign) {
      case '>':
        return contentLength > number;
      case '<':
        return contentLength < number;
      case '>=':
        return contentLength >= number;
      case '<=':
        return contentLength <= number;
      case '===':
        return contentLength === number;
    }
  }

};

document.getElementById('sendForm').onclick = () => {
  let formEl = document.getElementById('form');
  let inputs = formEl.querySelectorAll('input');

  for (let input of inputs) {
    console.log(input);
  }
}
