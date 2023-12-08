// 3. Создать форму обратной связи с полями: Имя, Телефон, e-mail, текст, кнопка «Отправить».
// ** - При нажатии на кнопку «Отправить» произвести валидацию полей следующим образом:

// - Имя содержит только буквы;

// ** - Телефон подчиняется шаблону +7(000)000-0000;**

// ** - E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru**

// ** - Текст произвольный;**
// ** - В случае не прохождения валидации одним из полей необходимо выделять это поле красной рамкой и сообщать пользователю об ошибке.**

var formContactsElement = document.getElementById('formContacts');
formContactsElement.addEventListener('submit', function (event) {
  validationForm(event);
});

var rules = {
  name: '/^[\w, ЁеА-я]$/ig',
  phone: '/^7\(/d{3}\)/d{3}\-/d{4}$/'
}

function validationForm(event) {
  if (!isValid()) {
    event.preventDefault();
    console.log('Есть какие-то ошибочки.');
    return
  }

  console.log('Данные отправлены');
  event.preventDefault();
}

function isValid() {
  // Object.keys(rules).map(function(field){
  //   return field.test(formContactsElement[field].value)
  // })
  return true
}

console.dir(formContactsElement.name);
