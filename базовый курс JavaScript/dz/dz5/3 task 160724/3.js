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

const form = {
  formEl: null,
  rules: [
    {
      selector: 'name',
      methods: [
        {
          method: 'length',
          args: ['>', 1],
        },
        {
          method: 'length',
          args: ['<', 51],
        },
      ]
    },
    {
      selector: 'phone',
      methods: [
        {
          method: 'length',
          args: ['===', 11],
        },
        {
          method: 'typeNumber',
          args: [],
        },
      ]
    },
    {
      selector: 'password',
      methods: [
        {
          method: 'length',
          args: ['>', 5],
        },
        {
          method: 'length',
          args: ['<', 51],
        },
      ]
    },
    {
      selector: 'repeatPassword',
      methods: [
        {
          method: 'mustMatch',
          args: ['password'],
        },
      ]
    },
  ],
  valdationMethods: {
    length(field, param) {
      let sign = param[0];
      let size = param[1];
      let contentLength = field.value.length;
      let errorMessage = null;

      switch (sign) {
        case '>':
          if (contentLength < size) {
            errorMessage = `Минимальное количество символов ${size}.`;
          }
          break;
        case '<':
          if (contentLength > size) {
            errorMessage = `Максимальное количество символов ${size}.`;
          }
          break;
        case '===':
          if (contentLength !== size) {
            errorMessage = `Нужно ввести ${size} символов .`;
          }
          break;

      }

      return errorMessage;
    },

    typeNumber(field) {
      if (!Number.isInteger(Number(field.value))) {
        return 'Нужно ввести только цифры.'
      } else {
        return null
      }
    },

    mustMatch(field, param) {
      if (field.value !== document.getElementById(param).value) {
        return 'Пароли не совпадают'
      } else {
        return null
      }

    },

  },

  init() {
    this.formEl = document.getElementById('contactsForm');
    this.formEl.addEventListener('submit', (e) => this.validationForm(e));
  },

  validationForm(e) {
    if (!this.isValid()) {
      e.preventDefault();
    } else {
      alert('Форма отправлена.');
    }
  },

  isValid() {
    for (const rule of this.rules) {
      let inputCheck = document.getElementById(rule.selector);
      for (const element of rule.methods) {
        let resultCheck = this.valdationMethods[element.method](inputCheck, element.args);
        if (resultCheck) {
          inputCheck.classList.add('is-invalid');
          inputCheck.nextElementSibling.classList.add('invalid-feedback');
          return false
        } else {
          inputCheck.classList.remove('is-invalid');
        }
      }
    }
    return true;
  }

};

form.init();