'use strict';

/*
3. Создать форму обратной связи с полями: Имя, Телефон, e-mail, текст, кнопка «Отправить».
** - При нажатии на кнопку «Отправить» произвести валидацию полей следующим образом:

- Имя содержит только буквы;

** - Телефон подчиняется шаблону +7(000)000-0000;**

** - E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru**

** - Текст произвольный;**
** - В случае не прохождения валидации одним из полей необходимо выделять это поле красной рамкой и сообщать пользователю об ошибке.**
*/

var validationForm = {
  formEl: null,
  isValid: null,
  inputEls: null,
  btnSendEl: null,

  init() {
    this.formEl = document.getElementById('contacts');
    this.isValid = true;
    this.inputEls = this.formEl.querySelectorAll('input');
    this.btnSendEl = document.getElementById('button-send');

    this.setEventsHandler();
  },

  setEventsHandler() {
    this.btnSendEl.addEventListener('click', function (e) {
      handleClickBtnSendEl();
    });
  }

}

window.onload = validationForm.init();