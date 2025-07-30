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

let formEl = document.getElementById('formContacts');

formEl.addEventListener('submit', e => validationForm(e));

function validationForm(e) {

  let result = check();
  console.log(result);

  e.preventDefault();

};

function check() {
  let isValid = true;
  let errors = [];
  let password;

  let inputEls = formEl.querySelectorAll('input');

  for (let input of inputEls) {
    switch (input.name) {
      case 'name':
        if (!(input.value.length > 1 && input.value.length < 51)) {
          isValid = false;
          errors.push('Имя должно содержать, как минимум, 1 символ, не более 50 символов.');
          input.classList.add('is-invalid');
        } else {
          input.classList.add('is-valid');
        }
        break;
      case 'phone':
        if (!(input.value.length === 11 && typeof Number(input.value) === 'number')) {
          isValid = false;
          errors.push('Телефон 11 цифр, не больше, не меньше');
          input.classList.add('is-invalid');
        } else {
          input.classList.add('is-valid');
        }
        break;
      case 'password':
        password = input.value;
        if (!(input.value.length > 4 && input.value.length < 51)) {
          isValid = false;
          errors.push('Пароль - минимум 5 символов, максимум 50');
          input.classList.add('is-invalid');
        } else {
          input.classList.add('is-valid');

        }
        break;
      case 'passwordRepeat':
        if (!(input.value === password)) {
          isValid = false;
          errors.push('Значение должно совпадать с полем пароль');
          input.classList.add('is-invalid');
        } else {
          input.classList.add('is-valid');
        }
        break;
    }

  }
  return { isValid, errors }


}

