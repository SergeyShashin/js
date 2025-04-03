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

document.getElementById('contactsForm').addEventListener('submit', e => validationForm(e));

function validationForm(e) {

  for (let el of document.querySelectorAll('.error')) {
    el.remove();
  }

  if (!isValid()) {
    e.preventDefault();
    return
  }

  console.log('Данные отправлены.');

  function isValid() {
    let validationMethods = {
      length(field, args) {
        let sign = args[0];
        let quantityChars = args[1];
        let fieldLength = field.value.length;
        let msg = null;
        switch (sign) {
          case '>':
            if (!(fieldLength > quantityChars)) {
              msg = `Ожидмаемая длина минимум ${quantityChars}.`
            }
            break;
          case '>=':
            if (!(fieldLength >= quantityChars)) {
              msg = `Ожидмаемая длина минимум ${quantityChars}.`
            }
            break;
          case '<':
            if (!(fieldLength < quantityChars)) {
              msg = `Ожидмаемая длина поля не более ${quantityChars}.`
            }
            break;
          case '<=':
            if (!(fieldLength <= quantityChars)) {
              msg = `Ожидмаемая длина поля более ${quantityChars}.`
            }
            break;
          case '===':
            if (fieldLength !== quantityChars) {
              msg = `Ожидмаемая длина поля  ${quantityChars}.`
            }
            break;
        }
        return msg
      },

      mustContainNumbers(field) {
        return Number.isInteger(Number(field.value)) ? null : 'Ожидаются только цифры.'
      },

      mustMatch(field, args) {
        console.log('mustMatch');
        return field.value === document.getElementById(args).value ? null : 'Ожидается совпадение с полем password.'
      }

    };

    let validationRules = [
      {
        id: 'name',
        methods: [
          {
            name: 'length',
            args: ['>=', 1]
          },
          {
            name: 'length',
            args: ['<', 50]
          },
        ]
      },
      {
        id: 'phone',
        methods: [
          {
            name: 'mustContainNumbers',
            args: []
          },
          {
            name: 'length',
            args: ['===', 11]
          },
        ]
      },
      {
        id: 'password',
        methods: [
          {
            name: 'length',
            args: ['>=', 5]
          },
          {
            name: 'length',
            args: ['<', 50]
          },
        ]
      },
      {
        id: 'repeatPassword',
        methods: [
          {
            name: 'mustMatch',
            args: ['password']
          },
        ]
      },
    ];

    for (let rule of validationRules) {
      let inputEl = document.getElementById(rule.id);
      for (let method of rule.methods) {
        let validationMethod = validationMethods[method.name];
        let msgError = validationMethod(inputEl, method.args);
        if (msgError) {
          console.error(msgError);
          setError(inputEl, msgError);
          return false;
        } else {
          console.log('Данные норм.');
          clearError(inputEl);
        }

      }

    }

    function setError(el, msg) {
      el.classList.add('is-invalid');
      let errorEl = document.createElement('p');
      errorEl.textContent = msg;
      errorEl.classList.add('error');
      el.parentElement.appendChild(errorEl);
    }

    function clearError(el) {
      el.classList.remove('is-invalid');
    }

    return true
  }
}