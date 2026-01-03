'use strict';

/*
3. Создать форму обратной связи с полями: Имя, Телефон, e-mail, текст, кнопка «Отправить».
** - При нажатии на кнопку «Отправить» произвести валидацию полей следующим образом:

- Имя содержит только буквы;

** - Телефон подчиняется шаблону +7(000)000-0000;**

** - E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru**

** - Текст произвольный;**
** - В случае не прохождения валидации одним из полей необходимо выделять это поле красной рамкой
 и сообщать пользователю об ошибке.**
*/

document.getElementById('submit').addEventListener('click', function (e) {
  if (!validation()) {
    e.preventDefault();
  } else {
    alert('Данные отправлены)');
  };

})

function validation() {
  var rules = {
    name: [/^[a-zа-яё]+$/gi, 'Имя может содержать только буквы.'],
    phone: [/^\+\d\(\d{3}\)\d{3}\-\d{4}$/, 'Телефон подчиняется шаблону +7(000)000-0000.'],
    email: [/^[\w\_\-\.]+\@[\w\_\-]+\.\w{2,}$/gi, 'E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru']
  }

  var inputsHTMLEl = document.querySelectorAll('input');

  for (var input of inputsHTMLEl) {
    if (input.id === 'submit') {
      continue;
    }

    if (rules[input.name][0].test(input.value)) {
      input.className = 'isValid';
    } else {
      input.className = 'isInvalid';
      alert(rules[input.name][1]);
      return false
    }
  }
  return true

}