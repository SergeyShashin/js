'use strict';

/*
3) * Список из п.2 превратить в текстовое поле-автокомплит.
Если пользователь ввел три и более символов, нужно подгрузить список городов и показать подходящие по вводу.
При клике на подходящий город ввести его полное название в текстовое поле.
*/

/**Массив для списка гордов из json файлов */
var townsFromDivEl = [];

/**HTMLElement для ввода нужного города */
var findTown = document.getElementById('findTown');

/** HTMLElement в который добавляются города*/
var townsDiv = document.getElementById('towns');

setHandlers();
buildListTowns();

/**
 * Устанавливает слушателей событий.
 */
function setHandlers() {
  townsDiv.addEventListener('click', function (e) {
    if (e.target.tagName === 'DIV') {
      findTown.value = e.target.textContent;
      townsDiv.innerHTML = '';
    }
  });

  findTown.oninput = function () {
    if (this.value.length >= 3) {
      townsDiv.innerHTML = '';
      var newList = getItems(this.value);
      for (var el of newList) {
        var div = document.createElement('div');
        div.textContent = el;
        townsDiv.appendChild(div);
      }
    }
  };
}

/**
 * Получает данные из db.json.
 * @param {String} method 
 * @param {String} link 
 * @param {Function} callback 
 */
function getData(method, link, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, link);
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    }
  }
}

/**
 * Создаёт список городов.
 */
function buildListTowns() {
  getData('GET', ' http://localhost:3000/towns', function (towns) {
    var selectEl = document.getElementById('towns');
    towns.forEach(function (town) {
      townsFromDivEl.push(town)
      var divEl = document.createElement('div');
      divEl.textContent = town;
      selectEl.appendChild(divEl);
    });

  });
}

/**
 * Возвращает списк городов, подходящих под введенные данные.
 * @param {String} content 
 * @returns {Array} Список городов подходящих под шаблон content.
 */
function getItems(content) {
  var rgxp = new RegExp('^' + content, 'ig');
  var result = [];

  for (let town of townsFromDivEl) {
    while (rgxp.test(town)) {
      result.push(town);
    }
  }
  return result
};

