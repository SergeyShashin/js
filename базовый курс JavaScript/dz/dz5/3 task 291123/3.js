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

const validationMethods = {
  length(field, args) {
    let valLength = field.value.length;
    let sign = args[0];
    let then = args[1];

    let message = null;

    switch (sign) {
      case '>':
        if (!(valLength > then)) {
          message = `Длина должна быть больше чем ${then + 1}`;
        }
        break;
      case '<':
        if (!(valLength < then)) {
          message = `Длина должна быть меньше чем ${then + 1}`;
        }
        break;
      case '>=':
        if (!(valLength >= then)) {
          message = `Длина должна быть больше чем ${then}`;
        }
        break;
      case '<=':
        if (!(valLength <= then)) {
          console.log(valLength);
          console.log(!valLength <= then);
          message = `Длина должна быть меньше чем ${then}`;
        }
        break;
      case '===':
        if (valLength !== then) {
          message = `Длина должна быть ${then}`;
        }
        break;
    }
    return message;

  },

  mustContainedNumber(field) {
    if (!Number.isInteger(Number(field.value))) {
      return 'Поле должно содержать только число'
    };

    return null;
  },

  fieldsCompare(field, args) {
    return field.value !== document.querySelector(args[0]).value ? `Пароли не совпадают` : null
  }
}

const form = {
  formEl: null,
  rules: null,

  init() {

    this.formEl = document.getElementById('formContaсts');

    this.formEl.addEventListener('submit', (e) => this.formSubmit(e));

    this.rules = [
      {
        selector: 'input[name="userName"]',
        methods: [
          { name: 'length', args: ['>=', 1] },
          { name: 'length', args: ['<=', 50] }
        ],
      },
      {
        selector: 'input[name="phone"]',
        methods: [
          { name: 'length', args: ['===', 11] },
          { name: 'mustContainedNumber', args: [] }
        ],
      },
      {
        selector: 'input[name="password"]',
        methods: [
          { name: 'length', args: ['>=', 5] },
          { name: 'length', args: ['<=', 50] },
        ],
      },
      {
        selector: 'input[name="passwordRepeat"]',
        methods: [
          { name: 'fieldsCompare', args: ['input[name="password"]', ''] }
        ],
      },
    ]

  },

  formSubmit(e) {
    e.preventDefault();

    if (!this.isValid()) {
      e.preventDefault();
      return
    }

    alert('Форма отправлена');
  },

  isValid() {
    let valid = true;

    for (let rule of this.rules) {
      let inputEl = document.querySelector(rule.selector);

      for (let method of rule.methods) {
        let currentMethod = validationMethods[method.name];

        let message = currentMethod(inputEl, method.args);

        if (message) {
          inputEl.classList.add('is-invalid');
          inputEl.classList.remove('is-valid');
          valid = false;
          return valid
        } else {
          inputEl.classList.remove('is-invalid');
          inputEl.classList.add('is-valid');
        }
      }
    }
    return valid

  }
};

form.init();