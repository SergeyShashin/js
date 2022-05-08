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
    name: [1, 50],
    phone: [11],
    password: [5, 50],
    fieldsOfForm: null,
    mistakes: null,
  },
  run() {
    this.fieldsOfForm = document.querySelectorAll('input');
    this.mistakes = document.querySelectorAll('.invalid-feedback');

    //удаляем все элементы содержащие ошибки
    this.mistakes.forEach(mistake => mistake.remove());

    //проверяем каждый элемент формы
    this.fieldsOfForm.forEach(fieldOfForm => {
      fieldOfForm.classList.remove('is-invalid');
      fieldOfForm.style = '';

      //Сохраняем значение input
      let fieldOfFormValue = fieldOfForm.value;

      // Сохраняем id input
      let fieldOfFormId = fieldOfForm.id;

      //Сохраняем правило для проверки
      let rule = this.rules[fieldOfFormId];

      switch (fieldOfFormId) {
        case 'name':
          if (fieldOfFormValue.length >= rule[0] && fieldOfFormValue.length < rule[1]) {
            fieldOfForm.style.border = '1px solid green';
          }
          else {
            let mistakeElement = document.createElement('div');
            mistakeElement.textContent = 'Имя - должно содержать как минимум 1 символ, не более 50 символов.';
            mistakeElement.classList.add('invalid-feedback');
            fieldOfForm.parentElement.appendChild(mistakeElement);
            fieldOfForm.classList.add('is-invalid');
          }
          return;
        case 'phone':
          //Сохраняем костыль т.к. не знаю, что делать с типом данных string, приходящем из input во всех случаях
          let crutch = fieldOfFormValue / 10;

          if (fieldOfFormValue.length === rule[0] && crutch >= 0) {
            fieldOfForm.style.border = '1px solid green';
          }
          else {
            let mistakeElement = document.createElement('div');
            mistakeElement.textContent = 'Телефон - должeн содержать 11 цифр, не больше, не меньше.';
            mistakeElement.classList.add('invalid-feedback');
            fieldOfForm.parentElement.appendChild(mistakeElement);
            fieldOfForm.classList.add('is-invalid');
          }
          return;
        case 'password':
          if (fieldOfFormValue.length >= rule[0] && fieldOfFormValue.length < rule[1]) {
            fieldOfForm.style.border = '1px solid green';
          }
          else {
            let mistakeElement = document.createElement('div');
            mistakeElement.textContent = 'Пароль - минимум 5 символов, максимум 50.';
            mistakeElement.classList.add('invalid-feedback');
            fieldOfForm.parentElement.appendChild(mistakeElement);
            fieldOfForm.classList.add('is-invalid');
          }
          return;
        case 'repeatPassword':
          if (document.getElementById('password').value === fieldOfFormValue) {
            fieldOfForm.style.border = '1px solid green';
          }
          else {
            let mistakeElement = document.createElement('div');
            mistakeElement.textContent = 'Значение должно совпадать с полем пароль.';
            mistakeElement.classList.add('invalid-feedback');
            fieldOfForm.parentElement.appendChild(mistakeElement);
            fieldOfForm.classList.add('is-invalid');
          }
          return;


      }
    });

  }
}


