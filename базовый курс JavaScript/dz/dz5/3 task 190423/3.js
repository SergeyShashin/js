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

let buttonSendForm = document.getElementById('sendForm');

/**
 * @type {Object} Содержит методы для проверки
 */
const methods = {

  /**
   * Проверяет поле по длине
   * @param {htmlElement} field
   * @param {Array} args  Массив со знаком и цифрами
   */
  length(field, args) {
    let length = field.value.length;
    let sign = args[0];
    let number = args[1];

    switch (sign) {
      case '>':
        return length > number ? true : `Длина поля должна быть больше ${number}.`;
      case '>=':
        return length >= number ? true : `Длина поля должна быть больше или равна ${number}.`;
      case '===':
        return length === number ? true : `Длина поля должна быть ${number}.`;
      case '<':
        return length < number ? true : `Длина поля должна быть меньше ${number}.`;
      case '<=':
        return length <= number ? true : `Длина поля должна быть меньше или равна ${number}.`;
      default:
        return `Проверьте аргументы, передаваемые в функцию.`;
    }
  },

  /**
   * Проверка на цифры
   * @param {htmlElement} field
   */
  mustContainOnlyNumbers(field) {
    return Number.isInteger(Number(field.value)) && field.value.length === 11 ? true : 'Должно быть 11 цифр';
  },

  /**
   * Проверка на идентичность значений у полей repeatPassword и password
   * @param {htmlElement} field 
   */
  repeatPassword(field) {
    return field.value === document.getElementById('password').value ? true : 'Поля не совпадают.'
  }

}

let validationRules = [
  {
    fieldName: 'name',
    methods: [
      { name: 'length', arguments: ['>', 0] }
    ],
  },

  {
    fieldName: 'phone',
    methods: [
      { name: 'length', arguments: ['===', 11] },
      { name: 'mustContainOnlyNumbers', arguments: [] }
    ],
  },

  {
    fieldName: 'password',
    methods: [
      { name: 'length', arguments: ['>', 4] },
      { name: 'length', arguments: ['<', 50] }
    ],
  },

  {
    fieldName: 'repeatPassword',
    methods: [
      { name: 'repeatPassword', arguments: [] },
    ],
  },
]

buttonSendForm.addEventListener('click', (e) => {
  if (!isValidate()) {
    e.preventDefault();
    return
  }

  console.log('Форма может быть отправлена');
  document.querySelectorAll('input').forEach(el=>{
    el.value='';
    el.className='';
  });
  

})

function isValidate() {
  let validate = true;

  validationRules.forEach(rule => {
    let htmlElements = document.querySelectorAll('#' + rule.fieldName);

    if (htmlElements.length < 1) {
      console.log('Полей для проверки нет.');
      validate = false;
      return
    }

    htmlElements.forEach(element => {      
      rule.methods.forEach(method => {
        if (!validate) {
          return
        }
        let resultCheck = methods[method.name](element, method.arguments);
        if (resultCheck === true) {
          element.className = 'ok';
          validate = true;
          clearElementsError();
        } else {
          element.className = 'error';
          let message = document.createElement('div');
          message.textContent = resultCheck;
          message.className = 'errorMessage';
          element.insertAdjacentElement('afterend', message);
          validate = false;
          return
        }
      });
    });

  });
  return validate;
}

function clearElementsError() {
  document.querySelectorAll('.errorMessage').forEach(el => el.remove());
}

function clearElementsOk() {
  document.querySelectorAll('.ok').forEach(el => el.remove());
}
