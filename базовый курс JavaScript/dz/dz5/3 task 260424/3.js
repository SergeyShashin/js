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

const verificationMethods = {
  length(content, args) {
    let lengthContent = content.length;
    let number = args[0];
    let sign = args[1];
    let errors = [];

    switch (sign) {
      case '>':
        if (!lengthContent > number) {
          errors.push(`Поле должно быть больше ${null}`);
        }
        break;
      case '<':
        if (!lengthContent < number) {
          errors.push(`Поле должно быть меньше ${null}`);
        }
        break;
    }

    return errors.length > 0 ? errors : null
  }

};

const validationForm = {
  formEl: null,
  rules: [
    'length',
    'mustContainedNumbe',
    'mustIdentical'
  ],

  init() {
    this.formEl = document.getElementById('formContats');
    this.formEl.addEventListener('submit', (e) => this.handlerSubmitForm(e))
  },

  handlerSubmitForm(e) {
    if (!this.formIsvalid(e)) {
      e.preventDefault();
    }
  },

  formIsvalid(e) {
    console.log(e.target);
  }

};

validationForm.init();





