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

var rules = {
  name: /[a-za-яё]/,
  phone: /\+\d\(\d{3}\)\d{3}\-\d{4}/,
  email:/[\w/./-]{1,}\@[\w/./-]{1,}\.[\w/./-]{1,3}/
};

var errors = {
  name: 'Имя может содержать только буквы',
  phone: 'Телефон подчиняется шаблону +7(000)000-0000',
  email:'E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru'
}


var formContacts = document.getElementById('formContacts');

formContacts.addEventListener('submit', function (e) {
  e.preventDefault();
var data = document.getElementsByTagName('input');
var isValid=true;

 
 for (var item of data) {
  var rule = rules[item.id];
  var error = errors[item.id];

  var content = item.value;
  var rgxp = new RegExp(rule);

  var resultValidation = rgxp.test(content);
  if(!resultValidation){
    item.style.background='red';
    alert(error);
    isValid=false;
    break;
  }else{
    item.style.background='none';
    isValid=true;
  }
}

if(isValid){
  alert('Отправлено');
  document.body.append(formContacts);
  formContacts.submit();
}
});



