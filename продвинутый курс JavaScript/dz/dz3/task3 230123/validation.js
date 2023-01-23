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

window.onload = function () {
  document.forms[0].onsubmit = function () {
    try {

      if (/[a-z]/i.test(this.name.value)) {
        this.name.classList.add('is-valid');
        this.name.classList.remove('is-invalid');
      } else {
        this.name.classList.add('is-invalid');
        this.name.classList.remove('is-valid');
      }

      if (/\+\d\(\d{3}\)\d{3}\-\d{4}/.test(this.phone.value)) {
        this.phone.classList.add('is-valid');
        this.phone.classList.remove('is-invalid');
      } else {
        this.phone.classList.add('is-invalid');
        this.phone.classList.remove('is-valid');
      }
      if (/[\w\.\-]\@\w*\.\w{0,2}$/i.test(this.email.value)) {
        this.email.classList.add('is-valid');
        this.email.classList.remove('is-invalid');
      } else {
        this.email.classList.add('is-invalid');
        this.email.classList.remove('is-valid');
      }
    }
    catch (e) {
      console.log(e)
    }
    return false

  }
}