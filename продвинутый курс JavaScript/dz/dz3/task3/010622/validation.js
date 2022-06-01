'use stict';

/*
3. Создать форму обратной связи с полями: Имя, Телефон, e-mail, текст, кнопка «Отправить».
** - При нажатии на кнопку «Отправить» произвести валидацию полей следующим образом:
- Имя содержит только буквы;
** - Телефон подчиняется шаблону +7(000)000-0000;**
** - E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru**
** - Текст произвольный;**
** - В случае не прохождения валидации одним из полей необходимо выделять это поле красной рамкой и сообщать пользователю об ошибке.**
*/

var validation = {
  name: /^[a-яёa-z]+$/i,
  phone: /^\+\d\(\d{3}\)\d{3}\-\d{4}$/,
  email: /\w+@\w+\.\w{2,3}/
}

document.getElementById('btnSend').addEventListener('click', function (event) {
  event.preventDefault();
  Object.keys(validation).forEach(function (rule) {
    var elements = document.querySelectorAll('[data-' + rule + ']')
    elements.forEach(function (element) {
      if (validation[rule].test(element.value)) {
        element.classList.remove('invalid');
        element.classList.add('is-valid');
      } else {
        element.classList.remove('is-valid');
        element.classList.add('invalid');
      }
    })
  })
});
