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

var formEl = document.getElementById('formContacts');

formEl.addEventListener('submit', function (e) {
  handlerSubmitForm(e);
});

function handlerSubmitForm(e) {
  e.preventDefault();
  var inputsEls = e.target.querySelectorAll('input');
  var errors = [];

  for (var input of inputsEls) {
    input.className = '';
    var idInput = input.id;
    if (idInput !== 'sumbit') {
      var content = input.value;
      switch (idInput) {
        case 'name':
          if (!/^[\wа-яё]+$/i.test(content)) {
            var msgError = 'Имя может содержать только буквы';
            errors.push({ idInput: idInput, error: msgError });
            setErrorBorder(input, msgError);
            return
          } else {
            clearErrorText(input);
          }
          break;
        case 'phone':
          if (!/^\+\d\(\d{3}\)\d{3}\-\d{4}$/i.test(content)) {
            var msgError = 'Телефон может быть только таким +7(000)000-0000';
            errors.push({ idInput: idInput, error: msgError });
            setErrorBorder(input, msgError);
            return
          } else {
            clearErrorText(input);
          }
          break;
        case 'email':
          if (!/^[\w\.\-]+\@[\w\.\-]+\.\w{2,}$/i.test(content)) {
            var msgError = 'E-mail может быть каким-то таким mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru';
            errors.push({ idInput: idInput, error: msgError });
            setErrorBorder(input, msgError);
            return
          } else {
            clearErrorText(input);
          }
          break;
      }
    }
  }



  function setErrorBorder(el, msg) {
    el.classList.add('errorBorder');
    var preEl = document.createElement('pre');
    preEl.textContent = msg;
    preEl.classList.add('errorText');
    el.parentElement.appendChild(preEl);
  }

  function clearErrorText(el) {
    var errorTextEl = el.parentElement.querySelector('.errorText');
    errorTextEl ? errorTextEl.remove() : '';
  }
}