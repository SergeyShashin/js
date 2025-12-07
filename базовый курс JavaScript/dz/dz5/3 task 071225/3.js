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

const validation = {
  inputHTMLElements: null,
  rules: null,
  methods: null,
  run() {
    this.init();
  },

  init() {
    this.rules = {
      name: [
        { length: ['>', 0] },
        { length: ['<', 51] },
      ],
      phone: [
        { length: ['===', 11] },
        { type: ['number'] }
      ],
      password: [
        { length: ['>', 4] },
        { length: ['<', 51] },
      ],
      passwordRepeat: [
        { equal: ['password'] }
      ],
    };

    this.methods = {
      length(content, sign, number) {
        switch (sign) {
          case '>':
            return content.length > number ? '' : `Ожидается значение больше ${number}.`;
          case '<':
            return content.length < number ? '' : `Ожидается значение меньше ${number}.`;
          case '===':
            return content.length === number ? '' : `Ожидается значение равное ${number}.`;
        }
      },
      type(content, type) {
        return typeof Number(content) === type ? '' : `Ожидается значение c типом ${type}.`;
      },
      equal(content, inputName) {
        return content === document.querySelector(`[name=${inputName}]`).value ? '' : `Ожидается значение равное тому, что напечатали в поле ${inputName}.`
      }

    };
    this.initHandlers();
  },

  initHandlers() {
    window.addEventListener('click', e => this.handlerClick(e));
  },

  handlerClick(e) {
    if (e.target.type === 'submit') {
      let result = [];
      this.inputHTMLElements = document.querySelectorAll('input');

      for (let input of this.inputHTMLElements) {
        let rules = this.rules[input.name];
        let content = input.value;
        for (let rule of rules) {
          for (let key in rule) {
            let msg = this.methods[key](content, rule[key][0], rule[key][1]);
            msg === '' ? '' : result.push(msg);
          }
        }
      }

      if (result.length > 0) {
        e.preventDefault();
        result.forEach(error => console.error(error))
      } else {
        alert('Данные отправлены)');
      }
    }
  }

};

window.onload = () => validation.run()
