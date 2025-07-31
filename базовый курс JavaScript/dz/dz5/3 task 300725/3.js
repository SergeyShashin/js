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

const validationForm = {
  formEl: null,
  inputEls: null,
  rules: {
    name: [
      { methodName: 'length', args: ['>', 1] },
      { methodName: 'length', args: ['<', 50] },
    ],
  },
  methods: {
    length(input, args) {
      let content = input.value;
      let sign = args[0];
      let length = args[1];

      switch (sign) {
        case '>':
          return content > length - 1 ? true : `минимальное количество символов = ${length}`
        case '<':
          return content < length + 1 ? true : `максимальное количество символов = ${length}`
        case '=':
          return content === length ? true : `количество символов = ${length}`
      }
    }

  },
  run() {
    this.init();
    this.setEventHandlers();
  },
  init() {
    this.formEl = document.getElementById('formContacts');
    this.inputEls = this.formEl.querySelectorAll('input');
  },
  setEventHandlers() {
    this.formEl.addEventListener('submit', e => {
      e.preventDefault();
      console.log('проверяем форму');
      let errors = [];
      for (let input of this.inputEls) {
        for (let rule of this.rules[input.name]) {
          let { methodName, args } = rule;
          let checkResult = this.methods[methodName](input, args);
          if (checkResult === true) {
            this.setValid(input);

          } else {
            errors.push(checkResult);
            this.setInvalid(input);
            alert(checkResult);
            return
          }

        }
      }
    });
  },
  setInvalid(input) {
    input.classList.contains('is-valid') ? input.classList.remove('is-valid') : '';
    input.classList.add('is-invalid');
  },
  setValid(input) {
    input.classList.contains('is-invalid') ? input.classList.remove('is-invalid') : '';
    input.classList.add('is-valid');
  }
};

validationForm.run();