// 3. Создать форму обратной связи с полями: Имя, Телефон, e-mail, текст, кнопка «Отправить».
// ** - При нажатии на кнопку «Отправить» произвести валидацию полей следующим образом:
// - Имя содержит только буквы;
// ** - Телефон подчиняется шаблону +7(000)000-0000;**
// ** - E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru**
// ** - Текст произвольный;**
// ** - В случае не прохождения валидации одним из полей необходимо выделять это поле красной рамкой и сообщать пользователю об ошибке.**

var validation = {
  name: /[\wеЁа-я]/i,
  phone: /^\+7\(\d{3}\)\d{3}\-\d{4}$/,
  email:/^[\w\d\-\.]+\@[\w\d]+\.[\w\d]{2,6}$/i
}

document.getElementById('sendBtn').addEventListener('click', function (event) {
  event.preventDefault();

  Object.keys(validation).forEach(function (rule) {
    var fields = document.querySelectorAll('#' + rule);
    fields.forEach(function (field) {
      if (validation[rule].test(field.value)) {
        field.classList.remove('error');
      } else {
        field.classList.add('error');
      }
    });

  });

});