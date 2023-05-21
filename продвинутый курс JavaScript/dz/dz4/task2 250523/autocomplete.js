'use strict';

/*
2) В форму обратной связи добавить возможность выбора города обращения.
Сам список должен загружаться после загрузки страницы через AJAX.
*/

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
  var townsElement = document.getElementById('towns');
  data.forEach(function (town) {
    var optionElement = document.createElement('option');
    optionElement.textContent = town;
    townsElement.appendChild(optionElement);
  });
}
);