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

var buttonSendElement = document.getElementById('button-send');

buttonSendElement.addEventListener('click', function (event) {
  event.preventDefault();
  var inputsEl = document.querySelectorAll('input');
  inputsEl.forEach(function (inputEl) {
    console.log(inputEl.id);

    switch (inputEl.id) {
      case 'name':
        if (/^[a-zA-Zа-яА-яЁё]+$/.test(inputEl.value)) {
          inputEl.classList.remove('is-invalid');
          inputEl.classList.add('is-valid');
        } else {
          inputEl.classList.remove('is-valid');
          inputEl.classList.add('is-invalid');
        }
        break;
      case 'phone':
        if (/^\+\d\(\d{3}\)\d{3}\-\d{4}$/.test(inputEl.value)) {
          inputEl.classList.remove('is-invalid');
          inputEl.classList.add('is-valid');
        } else {
          inputEl.classList.remove('is-valid');
          inputEl.classList.add('is-invalid');
        }
        break;
      case 'email':
        if (/^\w+\-?\w*\.?\w*\@\w*\.\w{2,3}$/.test(inputEl.value)) {
          inputEl.classList.remove('is-invalid');
          inputEl.classList.add('is-valid');
        } else {
          inputEl.classList.remove('is-valid');
          inputEl.classList.add('is-invalid');
        }
        break;
    }
    
  })

})



