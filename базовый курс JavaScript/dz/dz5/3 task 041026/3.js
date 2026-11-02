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
  formHTMLEl: null,
  inputsHTMLEls: null,
  rules: null,
  methods: null,
  run() {
    this.init();
  },
  init() {
    this.formHTMLEl = document.getElementById('contactData');
    this.inputsHTMLEls = this.formHTMLEl.querySelectorAll('input');
    this.rules = {
      name: [
        { method: 'length', arguments: ['>', 0] },
        { method: 'length', arguments: ['<', 51] }
      ],
      phone: [
        { method: 'onlyNumber', arguments: [] },
        { method: 'length', arguments: ['===', 11] }
      ],
      password: [
        { method: 'length', arguments: ['>', 4] },
        { method: 'length', arguments: ['<', 51] }
      ],
      passwordRepeat: [
        { method: 'mustMatch', arguments: ['passwordInput'] },
      ],
    };
    this.methods = {
      length(content, arrSignAndNumber) {
        let [sign, num] = arrSignAndNumber;
        let contentLength = content.length;
        switch (sign) {
          case '>':
            return contentLength > num ? '' : `Ожидается ввод более ${num + 1} символа(ов).`;
          case '<':
            return contentLength < num ? '' : `Ожидается ввод менее ${num} символа(ов).`;
          case '===':
            return contentLength === num ? '' : `Ожидается ввод ${num} символа(ов).`;
        }
      },
      onlyNumber(content) {
        return Number.isInteger(Number(content)) && content !== '' ? '' : 'Ожидаются только цифры';
      },
      mustMatch(content, inputId) {
        let contentForCompare = document.getElementById(inputId).value;
        return content === contentForCompare ? '' : 'Ожидается совпадение содержимого.';
      }
    },
      this.setHandlers();
  },
  setHandlers() {
    this.formHTMLEl.addEventListener('submit', e => this.submitHandler(e));
  },
  submitHandler(e) {
    let errors = [];
    this.clearErrosEls();
    for (let inputEl of this.inputsHTMLEls) {
      let rules = this.rules[inputEl.name];
      for (let rule of rules) {
        let result = this.methods[rule.method](inputEl.value, rule.arguments);
        if (result.length > 0) {
          errors.push(result);
          this.addMsgError(inputEl, result);
        }
      }
    }
    if (errors.length > 0) {
      e.preventDefault();
      console.error(errors);
    } else {
      alert('Спасибо) Данные отправлены.)');
    }
  },
  addMsgError(inputEl, msg) {
    let msgEl = document.createElement('pre');
    msgEl.textContent = msg;
    msgEl.style.color = 'brown';
    inputEl.parentElement.appendChild(msgEl);
  },
  clearErrosEls() {
    let errorsEls = this.formHTMLEl.querySelectorAll('pre');
    for (let errorEl of errorsEls) {
      errorEl.remove();
    }
  }

};

window.onload = () => validationForm.run();
