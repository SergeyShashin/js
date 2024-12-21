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
  btnSendEl: null,

  init() {
    this.formEl = document.getElementById('contacts');
    this.btnSendEl = document.getElementById('button-send');

    this.setEventsHandler();
  },

  setEventsHandler() {
    this.btnSendEl.addEventListener('click', function (e) {
      e.preventDefault();

      for (let inputEl of document.querySelectorAll('input')) {
        let content = inputEl.value;
        let errorEl = inputEl.parentElement.querySelector('.error');
        errorEl ? errorEl.remove() : '';

        switch (inputEl.id) {
          case 'name':
            /^[\wа-яё]{1,}$/ig.test(content) ? setClassIsValid(inputEl) : setClassIsInvalid(inputEl, 'Имя. Только буквы.');
            break;
          case 'phone':
            /^\+\d{1}\(\d{3}\)\d{3}\-\d{4}$/.test(content) ? setClassIsValid(inputEl) : setClassIsInvalid(inputEl, 'Телефон. +7(000)000-0000');
            break;
          case 'email':
            /^[\wа-яё]{1,}[\wа-яё\-\.\_]{0,}@[\wа-яё]{1,}\.[\wа-яё]{2,}$/ig.test(content) ? setClassIsValid(inputEl) : setClassIsInvalid(inputEl, 'my-mail@mail.ru или my.mail@mail.ru');
            break;
        };
      };

      function setClassIsValid(inputEl) {
        if (inputEl.classList.contains('is-invalid')) {
          inputEl.classList.remove('is-invalid');
        }
        inputEl.classList.add('is-valid');
      }

      function setClassIsInvalid(inputEl, errorMsg) {
        if (inputEl.classList.contains('is-valid')) {
          inputEl.classList.remove('is-valid');
        }
        let errorEl = document.createElement('p');
        errorEl.textContent = errorMsg;
        errorEl.classList.add('error');
        inputEl.parentElement.appendChild(errorEl);
        inputEl.classList.add('is-invalid');
      }
    });
  },

}

window.onload = validationForm.init();