'use strict';

/*
2) В форму обратной связи добавить возможность выбора города обращения.
Сам список должен загружаться после загрузки страницы через AJAX.
*/


function loadJson(callback) {
  var xhr = new XMLHttpRequest;
  xhr.open('GET', 'http://localhost:3000/towns');
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        callback(JSON.parse(xhr.responseText));
      }
    }
  }
}

loadJson(function (towns) {
  var selectEl = document.getElementById('towns')
  towns.forEach(function (town) {
    var optionEl = document.createElement('option');
    optionEl.textContent = town;
    optionEl.id = town;
    selectEl.appendChild(optionEl);
  });
})
