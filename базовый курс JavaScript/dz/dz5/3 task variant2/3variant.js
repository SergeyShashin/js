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
 * @type {Object} Объект, содержащий методы проверки.
 * @method length Метод, проверяющий поле на соответствие количеству введенных символов.
 * @method mustContainNumbers Метод, проверяющий поле на ввод только чисел.
 * @method fieldCompare Метод, проверяющий поле на идентичность с другим полем (повтор пароля).
 */
const validationMethods = {
  length(field, args) {
    let fieldLength = field.value.length;
    let condition = args[0];
    let number = args[1];

    switch (condition) {
      case '>':
        if (fieldLength < number) {
          return `Количество символов должно быть больше ${number}.`;
        }
        break;
      case '<':
        if (fieldLength > number) {
          return `Количество символов должно быть меньше ${number}.`;
        }
        break;
      case '>=':
        if (fieldLength <= number - 1) {
          return `Количество символов должно быть больше или равно ${number}.`;
        }
        break;
      case '<=':
        if (fieldLength >= number + 1) {
          return `Количество символов должно быть меньше или равно ${number}.`;
        }
        break;
      case '===':
        if (fieldLength !== number) {
          return `Количество символов должно быть ${number}.`;
        }
        break;
    }

    return null;

  },

  mustContainNumbers(field) {
    let fieldValue = field.value;
    for (let el of fieldValue) {

      if (!Number.isInteger(parseInt(el))) {
        return `Нужно ввести обязательно цифры.`;
      }
    }

    return null;
  },

  fieldCompare(field, args) {
    let fieldValueRepeatPasword = field.value;
    let fieldValuePassword = document.getElementById(args[0]).value;

    return fieldValueRepeatPasword === fieldValuePassword ? null : `Поля не совпадают.`;
  }


}

/**
 * @type {Object} Объект. Проверяет форму на корректность заполнения.
 * @method init Инициализация объекта.
 * @method validationForm Проверка формы.
 */
const form = {
  form: null,

  rules: [
    {
      id: 'name',
      methods: [
        {
          name: 'length', args: ['>=', 1],
        },
        {
          name: 'length', args: ['<=', 50],
        }
      ]
    },
    {
      id: 'phone',
      methods: [
        {
          name: 'mustContainNumbers'
        },
        {
          name: 'length', args: ['===', 11]
        },
      ]
    },
    {
      id: 'password',
      methods: [
        {
          name: 'length', args: ['>=', 5],
        },
        {
          name: 'length', args: ['<=', 50],
        }
      ]
    },
    {
      id: 'repeatPassword',
      methods: [
        {
          name: 'fieldCompare', args: ['password'],
        },

      ]
    }
  ],

  init() {
    this.form = document.getElementById('formContacts');
    this.form.addEventListener('submit', event => this.formSubmit(event));   

  },

  formSubmit(event) {
    this.mistakes = document.querySelectorAll('.invalid-feedback');
    //удаляем все элементы содержащие ошибки
    this.mistakes.forEach(mistake => mistake.remove());
    
    if (!this.validationForm()) {
      event.preventDefault();
    } else {
      alert('Спасибо. Данные отрпавлены.');
    }
  },

  validationForm() {
    let isValid = true;

    for (let rule of this.rules) {
      for (let method of rule.methods) {
        let inputEl = document.getElementById(rule.id);
        let errorMessage = validationMethods[method.name](inputEl, method.args);

        if (errorMessage) {
          isValid = false;
          this.setIsInvalid(inputEl, errorMessage);
          break;
        } else {
          this.setValid(inputEl);
        }
      }
    }
    return isValid;
  },

  setIsInvalid(inputEl, errorMessage) {
    inputEl.classList.add('is-invalid');
    inputEl.classList.remove('is-valid');

    let errorDiv = document.createElement('div');
    errorDiv.textContent = errorMessage;
    errorDiv.classList.add('invalid-feedback');
    inputEl.parentElement.appendChild(errorDiv);
  },

  setValid(inputEl) {
    inputEl.classList.remove('is-invalid');
    inputEl.classList.add('is-valid');
  }
}

form.init();