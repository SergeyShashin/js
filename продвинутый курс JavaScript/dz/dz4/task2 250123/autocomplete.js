'use strict';

/*
2) В форму обратной связи добавить возможность выбора города обращения.
Сам список должен загружаться после загрузки страницы через AJAX.
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