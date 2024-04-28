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

    switch (sign) {
      case '>':
        if (lengthContent < number) {
          return `Поле должно быть больше ${number}`;
        }
        break;
      case '<':
        if (lengthContent > number) {
          return `Поле должно быть меньше ${number}`;
        }
        break;
      case '<':
        if (!lengthContent === number) {
          return `Поле должно быть равно ${number}`;
        }
        break;
    }

  }

};

const validationForm = {
  formEl: null,
  rules: null,

  init() {
    this.formEl = document.getElementById('formContats');
    this.formEl.addEventListener('submit', (e) => this.handlerSubmitForm(e));
    this.rules = [
      {
        selector: 'input[name = "name"]',
        methods: [
          { name: 'length', args: [1, '>'] },
          { name: 'length', args: [50, '<'] }
        ]
      },
      // {
      //   selector: 'input[name = "phone"]',
      //   methods: [
      //     { name: 'length', args: [11, '==='] },
      //     { name: 'mustContainedNumber', args: [] }
      //   ]
      // },
      // {
      //   selector: 'input[name = "password"]',
      //   methods: [
      //     { name: 'length', args: [5, '>'] },
      //     { name: 'length', args: [50, '<'] },
      //   ]
      // },
      // {
      //   selector: 'input[name = "repeatPassword"]',
      //   methods: [
      //     { name: 'fieldsCompare', args: ['repeatPassword'] },
      //   ]
      // }
    ];

  },

  handlerSubmitForm(e) {
    if (!this.formIsvalid(e)) {
      e.preventDefault();
    }
  },

  formIsvalid(e) {
    let errors = [];
    this.rules.forEach(rule => {
      let inputEl = document.querySelector(rule.selector);
      rule.methods.forEach(method => {
        let resultCheking = verificationMethods[method.name](inputEl.value, method.args);
        console.log(resultCheking);
        if (resultCheking) {
          errors.push(resultCheking);
        }

      })
    });

    if (errors.length > 0) {
      console.error(errors);
      return false
    } else {
      console.log('Форма отправлена.');
      return true
    }

  }

};

validationForm.init();





