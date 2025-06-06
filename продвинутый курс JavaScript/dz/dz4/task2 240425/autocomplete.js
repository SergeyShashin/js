'use strict';

/*
2) В форму обратной связи добавить возможность выбора города обращения.
Сам список должен загружаться после загрузки страницы через AJAX.
*/

buildListTowns();

function getDataFromJson(method, link, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, link);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    }
  };
}

function buildListTowns() {

  getDataFromJson('GET', 'http://localhost:3000/towns', function (towns) {
    var dataTownsEl = document.getElementById('dataTowns');
    for (let town of towns) {
      var optionEl = document.createElement('option');
      optionEl.textContent = town;
      dataTownsEl.appendChild(optionEl);
    }
  });

}