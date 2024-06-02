'use strict';

/*
2) В форму обратной связи добавить возможность выбора города обращения.
Сам список должен загружаться после загрузки страницы через AJAX.
*/

/**
 * Получая данные из json
 * @param {String} method Метод (GET, POST, PATCH, DELETE, PATCH)
 * @param {String} link Ссылка по которой нужно получить данные. 
 * @param {Function} callBack Функция возвращающая данные из json
 */
function dataJson(method, link, callBack) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, link);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      callBack(data);
    }

  }

}

/**
 * Создаёт HTML элементы с названиями городов
 */
function buildTownsList() {
  var selectEl = document.getElementById('towns');

  dataJson('GET', 'http://localhost:3000/towns', function (dataFromJson) {
    dataFromJson.forEach(function (town) {
      var optionEl = document.createElement('option');
      optionEl.textContent = town;
      optionEl.value = town;
      selectEl.appendChild(optionEl);
    });;

  })

}

buildTownsList();