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



/**
 * @type {Object} Объект, содержащий методы валидации
 * @method length Проверяет минимальную и максимальное количество символов при вводе
 * @method  mustContainDigits Проверяет ввод только цифр
 * @method  fieldCompare Проверяет идентичность двух полей
 */
const validationMethods = {

  /**
   * Проверяет минимальную и максимальное количество символов при вводе
   * @param {Element} field Input для проверки
   * @param {Array} args Условия проверки
   * @returns {null|string} Возвращает null или сообщение об ошибке
   */
  length(field, args) {

    let valueLength = field.value.length;
    let sign = args[0];
    let then = args[1];

    switch (sign) {
      case '>':
        if (!(valueLength > then)) {
          return `Нужно ввести более ${then + 1} символов.`;
        }
        break;
      case '>=':
        if (!(valueLength >= then)) {
          return `Нужно ввести более ${then} символов.`;
        }
        break;
      case '<':
        if (!(valueLength < then)) {
          return `Нужно ввести менее ${then - 1} символов.`;
        }
        break;
      case '<=':
        if (!(valueLength <= then)) {
          return `Нужно ввести менее ${then} символов.`;
        }
        break;
      case '===':
        if (valueLength !== then) {
          return `Нужно ввести ${then} символов.`;
        }
        break;
    }
    return null;
  },

  /**
  * Проверяет ввод только цифр
  * @param {Element} field Input для проверки
  * @returns {null|string} Возвращает null или сообщение об ошибке
  */
  mustContainDigits(field) {
    let fieldValue = field.value;
    if (!Number.isInteger(Number(fieldValue))) {
      return `Нужно ввести только цифры`;
    }

    return null;
  },


  /**
  * Проверяет идентичность двух полей
  * @param {Element} field Input для проверки
  * @param {Array} args Условия проверки
  * @returns {null|string} Возвращает null или сообщение об ошибке
  */
  fieldCompare(field, args) {
    let fieldValue = field.value;
    let fieldForCompare = args[0].value;
    if (fieldValue !== fieldForCompare) {
      return `Поля не совпадают`
    }

    return null;
  }
}

/**
 * @type {Object} Содержит свойства и методы для проверки формы перед отправкой
 */
const form = {
  formElement: null,
  rules: null,

  init() {

    this.formElement = document.getElementById('formDz5Task3');
    this.formElement.addEventListener('click', (event) => this.formSubmit(event));
    this.rules = [
      {
        selector: document.getElementById('name'),
        methods: [
          { name: 'length', args: ['>=', 1] },
          { name: 'length', args: ['<=', 50] }
        ],
      },
      {
        selector: document.getElementById('phone'),
        methods: [
          { name: 'length', args: ['===', 11] },
          { name: 'mustContainDigits' }
        ]
      },
      {
        selector: document.getElementById('password'),
        methods: [
          { name: 'length', args: ['>=', 5] },
          { name: 'length', args: ['<=', 50] }
        ]
      },
      {
        selector: document.getElementById('passwordRepeat'),
        methods: [
          { name: 'fieldCompare', args: [document.getElementById('password')] },
        ]
      }
    ]
  },

  formSubmit(event) {
    if (!this.validate()) {
      console.log('Не отправлено!');
      event.preventDefault();
    }
  },

  validate() {
    let flag = true;

    for (let rule of this.rules) {
      for (let method of rule.methods) {
        let error = validationMethods[method.name](rule.selector, method.args);
        if (error) {
          this.setError(rule.selector, error);
          flag = false;
          break;
        } else {
          this.deleteError(rule.selector);
        }
      }
    }


    return flag;

  },

  setError(selector, error) {
    selector.classList.add('is-invalid');
    selector.nextElementSibling.classList.remove('valid-feedback');
    selector.nextElementSibling.classList.add('invalid-feedback');
    selector.nextElementSibling.textContent = error;
    ;
  },

  deleteError(selector) {
    selector.classList.remove('is-invalid');
    selector.classList.add('is-valid');
    selector.nextElementSibling.classList.remove('invalid-feedback');
    selector.nextElementSibling.classList.add('valid-feedback');
    selector.nextElementSibling.textContent = 'Отлично';

  },


}

form.init();