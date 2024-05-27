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

var formContatsHTMLEl = document.getElementById('formContacts');
formContatsHTMLEl.addEventListener('submit', function (e) {
  e.preventDefault();
  var inputs = e.target.querySelectorAll('input');
  var isValid = true;
  Object.values(inputs).map(function (input) {
    switch (input.id) {
      case 'name':
        if (!/^[а-яё\w]+$/i.test(input.value)) {
          input.className = 'errorBorder';
          isValid = false;
          alert('Имя может содержать только буквы.');
        } else {
          isValid = true;
          input.className = '';
        }
        break;
      case 'phone':
        if (!/^\+\d\(\d{3}\)\d{3}\-\d{4}$/i.test(input.value)) {
          input.className = 'errorBorder';
          isValid = false;
          alert('Телефон подчиняется шаблону +7(000)000-0000');
        } else {
          isValid = true;
          input.className = '';
        }
        break;
      case 'email':
        if (!/^[\w\-\.\d]+\@[\w\-\d]+\.\w{2,3}$/i.test(input.value)) {
          input.className = 'errorBorder';
          isValid = false;
          alert('E-mail подчиняется шаблонам: mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru');
        } else {
          isValid = true;
          input.className = '';
        }
        break;
    }
  });
  if (isValid) {
    alert('Форма отправлена.');
  }
});