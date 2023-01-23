/*
3. Создать форму обратной связи с полями: Имя, Телефон, e-mail, текст, кнопка «Отправить».
** - При нажатии на кнопку «Отправить» произвести валидацию полей следующим образом:

- Имя содержит только буквы;

** - Телефон подчиняется шаблону +7(000)000-0000;**

** - E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru**

** - Текст произвольный;**
** - В случае не прохождения валидации одним из полей необходимо выделять это поле красной рамкой и сообщать пользователю об ошибке.**
*/

var validationRules = {
  name: /\w/,
  phone: /^\+\d\(\d{3}\)\d{3}\-\d{4}$/,
  email: /^[\w\-\.]+\@[\w\-\.]+\.[a-z]{2}$/i
}

window.onload = function () {
  document.getElementById('submit').addEventListener('click', function (event) {
    event.preventDefault();
    Object.keys(validationRules).forEach(function (rule) {
      document.querySelectorAll('[data-validation-rule ="' + rule + '"]').forEach(function (field) {
        if (validationRules[rule].test(field.value)) {
          field.classList.remove('invalid');
        } else {
          field.classList.add('invalid');
        }
      })
    })

  })
}