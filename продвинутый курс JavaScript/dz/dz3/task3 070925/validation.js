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
var rules = {
  name: '[a-zа-яё]+',
  phone: '\\+\d\(\d{3}\)\d{3}\-\d{4}',
  email: '\w+\@\w+\.\w{2}'
};

formEl.addEventListener('submit', function (e) {
  var resultValidation = true;
  for (let key of Object.keys(rules)) {
    var rgxp = new RegExp(rules[key], 'ig');
    if (!rgxp.test(this[key].value)) {
      resultValidation = false;
      console.log(rgxp);
      e.preventDefault();
    } else {
      resultValidation = true;
    }
  }
  
  if (resultValidation) {
    console.log('Форма отправлена.');
  }
})
