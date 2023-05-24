'use strict';

/*
3) * Список из п.2 превратить в текстовое поле-автокомплит.
Если пользователь ввел три и более символов, нужно подгрузить список городов и показать подходящие по вводу.
При клике на подходящий город ввести его полное название в текстовое поле.
*/

var townsElement = document.getElementById('towns');
var towns = [];
var citySelectionElement = document.getElementById('citySelection');
var order = document.createElement('div');
order.id = 'listTowns';
order.addEventListener('click', (e) => handlerClick(e));

citySelectionElement.addEventListener('input', function () {
  var content = citySelectionElement.value;
  var contentLength = content.length;

  if (contentLength >= 3) {
    document.body.appendChild(order);
    order.innerHTML = '';
    var regExp = new RegExp(content);
    var filteredTowns = towns.filter(element => regExp.test(element));

    filteredTowns.forEach(function (town, idx) {
      var townElement = document.createElement('p');
      townElement.textContent = town;
      townElement.id = idx;
      order.appendChild(townElement);
    });

  }

});

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

function handlerClick(e) {
  if (e.target.tagName === 'P') {
    citySelectionElement.value= e.target.textContent;
    document.getElementById('listTowns').remove();
  }
}

