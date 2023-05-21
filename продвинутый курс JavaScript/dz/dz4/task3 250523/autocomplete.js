'use strict';

/*
3) * Список из п.2 превратить в текстовое поле-автокомплит.
Если пользователь ввел три и более символов, нужно подгрузить список городов и показать подходящие по вводу.
При клике на подходящий город ввести его полное название в текстовое поле.
*/

var townsElement = document.getElementById('towns');
var towns = [];
var citySelectionElement = document.getElementById('citySelection');

console.log(citySelectionElement);

function loadData(callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/towns');
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        return callback(JSON.parse(xhr.responseText));
      }
    }
  }
}

loadData(function callback(data) {
  towns = Array.from(data);
  data.forEach(function (town) {
    var optionElement = document.createElement('option');
    optionElement.textContent = town;
    townsElement.appendChild(optionElement);
  });
}
);

