'use strict';

/*
2) В форму обратной связи добавить возможность выбора города обращения.
Сам список должен загружаться после загрузки страницы через AJAX.
*/


loadListFromAJAX("GET", "http://localhost:3000/towns", handleRequest);

function loadListFromAJAX(method, link, handleRequest) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, link);
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      return handleRequest(JSON.parse(xhr.responseText));
    }
  }
}

function handleRequest(towns) {
  console.log(towns);
  var dataListEl = document.getElementById('dataTowns');

  for (let town of towns) {
    var optionEl = document.createElement('option');
    optionEl.value = town;
    dataListEl.appendChild(optionEl);
  }
}