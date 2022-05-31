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

//invalid-feedback
// is-invalid
// is-valid

var buttonSendElement = document.getElementById('button-send');


buttonSendElement.addEventListener('click', function (event) {
  event.preventDefault();
  var inputsEl = document.querySelectorAll('input');
  inputsEl.forEach(function (inputEl) {

    console.log(inputEl.id);

    switch (inputEl.id) {
      case 'name':
        var rule = new RegExp(rules.onlySymbols);
        if (rule.test(inputEl.value)) {
          inputEl.classList.remove('is-invalid');
          inputEl.classList.add('is-valid');
        } else {
          inputEl.classList.remove('is-valid');
          inputEl.classList.add('is-invalid');
        }
        break;
      case 'phone':
        var rulePhone = new RegExp(rules.patternForPhone);
        console.log(rulePhone);
        // if (rule.test(inputEl.value)) {
        //   inputEl.classList.add('is-valid');
        // } else {
        //   inputEl.classList.add('is-invalid');
        // }
        break;
      case 'email':
        var ruleEmail = new RegExp(rules.email);
        // if (rule.test(inputEl.value)) {
        //   inputEl.classList.remove('is-invalid');
        //   inputEl.classList.add('is-valid');
        // } else {
        //   inputEl.classList.remove('is-valid');
        //   inputEl.classList.add('is-invalid');
        // }
        break;

    }
  })



})

const rules = {
  onlySymbols: '^[a-zA-Zа-яА-яЁё]+$',
  patternForPhone: '^\+\d\(\d{3}\)\d{3}\-\d{4}$',
  email: '^\w+\-?\w*\.?\w*\@\w*\.\w{2,3}$'
}

// var rule = new RegExp(rules.onlySymbols);

// console.log(rule.test('sdfds'));

