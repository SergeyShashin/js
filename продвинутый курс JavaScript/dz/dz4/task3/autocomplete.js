'use strict';

/*
3) * Список из п.2 превратить в текстовое поле-автокомплит.
Если пользователь ввел три и более символов, нужно подгрузить список городов и показать подходящие по вводу.
При клике на подходящий город ввести его полное название в текстовое поле.
*/

function loadTowns(callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/towns');
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var responce = JSON.parse(xhr.responseText);
        callback(responce);
      }
    }
  }
}

window.onload = function () {
  loadTowns(function (responce) {
    responce.forEach(function (town) {
      var townsElement = document.getElementById('towns');
      var townElement = document.createElement('option');
      townElement.textContent = town;
      townElement.value = town;
      townsElement.appendChild(townElement);
    });

  })
}