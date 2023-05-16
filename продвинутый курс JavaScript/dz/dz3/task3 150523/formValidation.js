'use strict';

// 3. Создать форму обратной связи с полями: Имя, Телефон, e-mail, текст, кнопка «Отправить».
// ** - При нажатии на кнопку «Отправить» произвести валидацию полей следующим образом:
// - Имя содержит только буквы;
// ** - Телефон подчиняется шаблону +7(000)000-0000;**
// ** - E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru**
// ** - Текст произвольный;**
// ** - В случае не прохождения валидации одним из полей необходимо выделять это поле красной рамкой и сообщать пользователю об ошибке.**

var formContactDataElement = document.getElementById('formContactData');
var btnSend = document.getElementById('send');

var formValidationMethods = {
  mustContainLeters(content) {
    return /^[a-zа-яё]+$/i.test(content);
  },
  checkPhone(content) {
    return /^\+\d\(\d{3}\)\d{3}\-\d{4}$/i.test(content);
  },
  checkEmail(content) {
    return /^\d?\w+\d?\-?\d?\@\w+\d?\.\w{2,4}$/i.test(content);
  }
}

btnSend.addEventListener('click', function (event) {
  event.preventDefault();
  checkForm();
});

function checkForm() {
  var isValid = true;
  formContactDataElement.querySelectorAll('input').forEach(function (element) {

    var content = element.value;

    switch (element.id) {
      case 'name':
        if (formValidationMethods.mustContainLeters(content)) {
          element.className = 'ok';
        } else {
          element.className = 'error';
          alert('Поле "Имя" должно содержать только буквы');
          isValid = false;
        }
        break;
      case 'phone':
        if (formValidationMethods.checkPhone(content)) {
          element.className = 'ok';
        } else {
          element.className = 'error';
          alert('Поле "Телефон" нужно заполнить по шаблону +7(000)000-0000');
          isValid = false;
        }
        break;
      case 'email':
        if (formValidationMethods.checkEmail(content)) {
          element.className = 'ok';
        } else {
          element.className = 'error';
          alert('Поле "Емейл" нужно заполнить по шаблону mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru');
          isValid = false;
        }
        break;
    }

  });

  if (isValid) {
    formContactDataElement.submit();
    alert('Отправлено');
  }

}