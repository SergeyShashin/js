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
  run() {
    this.init();
  },
  init() {
    this.formHTMLEl = document.getElementById('contactData');
    this.inputsHTMLEls = this.formHTMLEl.querySelectorAll('input');
    this.setHandlers();
  },
  setHandlers() {
    this.formHTMLEl.addEventListener('submit', e => this.submitHandler(e));
  },
  submitHandler(e) {
    e.preventDefault();
    let flagValid = true;
    for (let inputEl of this.inputsHTMLEls) {
      console.log(inputEl.name);
      if (!this.isValid(inputEl.name)) {
        flagValid = false;
        this.insertMsgError(inputEl, msg);
        return
      } else {
        flagValid = true;
      }
    }

  },
  isValid(inputName) {
    console.log('Проверить инпут ' + inputName);
    return false
  },
  insertMsgError(inputEl, msg) {
    console.log('Добавить родителю сообщение об ошибке');
  }

};

window.onload = () => validationForm.run();
