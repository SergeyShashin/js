'use strict';

/*
3) * Список из п.2 превратить в текстовое поле-автокомплит.
Если пользователь ввел три и более символов, нужно подгрузить список городов и показать подходящие по вводу.
При клике на подходящий город ввести его полное название в текстовое поле.
*/

buildTownsList();

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
  var cityEl = document.getElementById('city');

  dataJson('GET', 'http://localhost:3000/towns', function (dataFromJson) {

    insertTowns(dataFromJson);

    cityEl.oninput = function () {
      if (this.value.length >= 3) {
        var rgxp = new RegExp(`^${this.value}`, 'i');
        var filteredData = dataFromJson.filter(function (town) {
          if (rgxp.test(town)) {
            return town
          }
        });

        insertTowns(filteredData);
      }

    };

  });

  function insertTowns(dataFromJson) {
    var selectEl = document.getElementById('towns');
    selectEl.addEventListener('click', function (e) {
      handlerClickSelectEl(e, cityEl);
    });
    selectEl.innerHTML = '';

    if (dataFromJson.length < 5) {
      selectEl.size = dataFromJson.length + 1;
    }

    dataFromJson.forEach(function (town) {
      var optionEl = document.createElement('option');
      optionEl.textContent = town;
      optionEl.value = town;
      selectEl.appendChild(optionEl);
    });

  }

}

function handlerClickSelectEl(e, cityEl) {
  cityEl.value = e.target.textContent
}


