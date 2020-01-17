// Создать форму в html с полями:
// Имя - текстовое поле
// Телефон - текстовое поле
// Пароль - поле типа password
// Повтор пароля - поле типа password
// Кнопка отправить форму

//Необходимо реализовать валидацию формы по следующим правилам:
//Имя - должно содержать как минимум 1 символ, не более 50 символов.
//Телефон - должно содержать 11 цифр, не больше, не меньше.
//Пароль - миниум 5 символов, максимум 50.
//Повтор пароля - значение должно совпадать с полем пароль
//Кнопка отправить форму - при нажатии на кнопку форма должна провериться, при прохождении проверки, форма отправляется,
//если проверка не была пройдена, то:
//Каждое поле, которое не прошло проверку должно выделяться красным цветом
//Под каждым полем, которое не прошло проверку должна писаться подсказка по какой причине проверка провалилась.
//Пользоваться атрибутами HTML5 запрещено. Проверки реализовать с помощью JS.

"use strict";

const validateForm = {
  errorMessage: null,

  length(field, args) {
    const lengthContent = field.value.length,
      sign = args[0],
      then = args[1];

    switch (sign) {
      case '>':
        if (!(lengthContent > then)) {
          return `Минимальная длина символов должна быть больше чем ${then + 1}`;
        }
        break;
      case '>=':
        if (!(lengthContent >= then)) {
          return `Минимальная длина символов должна быть больше или равна ${then}`;
        }
        break;
      case '<':
        if (!(lengthContent < then)) {
          return `Минимальная длина символов должна быть меньше ${then - 1}`;
        }
        break;
      case '<=':
        if (!(lengthContent <= then)) {
          return `Минимальная длина символов должна быть меньше или равна ${then}`;
        }
        break;
      case '==':
        if (lengthContent !== then) {
          return `Минимальная длина символов должна быть равна ${then}`;
        }
        break;
    }

    return this.errorMessage;
  },

  mustContainNumbers(field) {
    if (!Number.isInteger(Number.parseInt(field.value))) {
      return 'Нужно ввести только цифры';
    }
    return this.errorMessage;
  },

  fieldCompare(field, args) {
    return field.value == document.querySelector(args[0]).value ? this.errorMessage : 'Поля не совпадают';
  },

}

const form = {
  formEl: null,
  rules: null,

  init() {
    this.formEl = document.getElementById('form');
    this.formEl.addEventListener('submit', e => this.formSubmit(e));
    this.rules = [
      {
        selector: 'input[name="name"]',
        methods: [
          { name: 'length', args: ['>=', 1] },
          { name: 'length', args: ['<=', 50] }
        ],
      },
      {
        selector: 'input[name="phone"]',
        methods: [
          { name: 'mustContainNumbers', },
          { name: 'length', args: ['==', 11] }
        ],
      },
      {
        selector: 'input[name="password"]',
        methods: [
          { name: 'length', args: ['>=', 5] },
          { name: 'length', args: ['<=', 50] }
        ],
      },
      {
        selector: 'input[name="repeat_password"]',
        methods: [
          { name: 'fieldCompare', args: ['input[name="password"]'] },
        ],
      },

    ]
  },

  formSubmit(e) {
    if (!this.validate()) {
      e.preventDefault();
    }
  },

  validate() {
    let isValid = true;

    for (let rule of this.rules) {
      let inputEl = document.querySelector(rule.selector);

      for (let method of rule.methods) {
        let errorMessage = validateForm[method.name](inputEl, method.args);
        if (errorMessage) {
          this.setInvalid(inputEl, errorMessage);
          isValid = false;
          break;
        } else {
          this.setValid(inputEl);
        }

      }
    }
    return isValid;

  },

  setInvalid(inputEl, errorMessage) {
    let cl = inputEl.classList;

    cl.remove('ok');
    cl.add('error');

    let hint = inputEl.parentNode.querySelector('.hint');

    if (!hint) {
      hint = document.createElement('div');
      hint.classList.add('hint');
      inputEl.parentNode.appendChild(hint);
      console.log(hint);
    }

    hint.textContent = errorMessage;

  },

  setValid(inputEl) {
    if (inputEl.parentNode.querySelector('.hint')) {
      console.log(inputEl.parentNode.querySelector('.hint'));
      
      inputEl.parentNode.querySelector('.hint').remove();
    }

    let cl = inputEl.classList;

    cl.remove('error');
    cl.add('ok');

  },


}

form.init();