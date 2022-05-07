'use strict';

/*
Создать форму в html со следующими полями:
* Имя - текстовое поле
* Телефон - текстовое поле
* Пароль - поле типа password
* Повтор пароля - поле типа password
* Кнопка отправить форму
Необходимо реализовать валидацию этой формы по следующим правилам:
* Имя - должно содержать как минимум 1 символ, не более 50 символов.
* Телефон - должно содержать 11 цифр, не больше, не меньше.
* Пароль - минимум 5 символов, максимум 50
* Повтор пароля - значение должно совпадать с полем пароль.
* Кнопка отправить форму - при нажатии на кнопку форма должна провериться, при
прохождении проверки, форма
отправляется, если проверка не была пройдена, то:
- Каждое поле, которое не прошло проверку должно выделяться красным цветом.
- Под каждым полем, что не прошло проверку, должна писаться подсказка по какой причине
проверка провалилась.
Можете пользоваться стилями бутстрапа, если лень самим писать.
Пользоваться аттрибутами HTML5 запрещено, необходимо проверки реализовать с помощью
javascript.
*/

let buttonSend = document.getElementById('button-send');

buttonSend.addEventListener('click', () => {
  event.preventDefault();
  validationForm.run();
})

/**
 * Валидация формы
 */
const validationForm = {
  rules: {
    name: ['string', '>1', '<50'],
    phone: ['number', '>1', '<50'],
    password: ['string', '>5', '<50'],
    repeatPassword: ['string', 'string'],
    form: null,
    fieldsOfForm: null
  },
  run() {
    this.fieldsOfForm = document.querySelectorAll('input');

    this.fieldsOfForm.forEach(fieldOfForm => {
      //Сохраняем значение input
      let fieldOfFormValue = fieldOfForm.value;

      // Сохраняем id input
      let fieldOfFormId = fieldOfForm.id;

      //Сохраняем правило для проверки
      let rule = this.rules[fieldOfFormId];

      // console.log(fieldOfFormId);
      // console.log(this.rules[fieldOfFormId]);
      // console.log(fieldOfFormValue);

      switch (fieldOfFormId) {
        case 'name':
          console.log('Проверяем name');
          console.log(typeof(fieldOfFormValue));
          console.log(`Количество символов ${fieldOfFormValue.length}`);
          return;
          case 'phone':
            console.log('Проверяем phone');
            console.log(typeof(fieldOfFormValue));
          return;
        case 'password':
          console.log('Проверяем password');
          return;
        case 'repeatPassword':
          console.log('Проверяем repeatPassword');
          return;


      }
    });

  }
}


