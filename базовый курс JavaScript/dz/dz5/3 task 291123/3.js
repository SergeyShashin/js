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

let sendBtn = document.getElementById('sendBtn');
sendBtn.addEventListener('click', (e) => validateForm(e));

let formContacts = document.getElementById('formContaсts');

const validationFields = {
  'userName': [
    { 'minLength': 1 },
    { 'maxLength': 50 }
  ],
  'phone': [
    { 'length': 11 },
    { 'type': 'number' }
  ],
  'password': [
    { 'minLength': 5 },
    { 'maxLength': 50 }
  ],
  'passwordRepeat': [
    { 'mustСorrespondFiled': 'password' }
  ]
};

const methods = {
  minLength(value, minNumber) {
    return value > minNumber
      ? { isValid: true, textError: '' }
      : { isValid: false, textError: 'Имя - должно содержать как минимум 1 символ, не более 50 символов.' }
  },
  minLength(value, maxNumber) {
    return value < maxNumber
      ? { isValid: true, textError: '' }
      : { isValid: false, textError: 'Имя - должно содержать как минимум 1 символ, не более 50 символов.' }
  }
};

function validateForm(e) {
  e.preventDefault();

  for (let field of formContacts) {
    let fieldValue = field.value;
    let rules = validationFields[field.id];
    check(fieldValue, rules);
  }
}

function check(value, rules) {
  let isValid = true;
  let errors = [];
}