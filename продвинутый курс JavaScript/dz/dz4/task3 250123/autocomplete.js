'use strict';

/*
3) * Список из п.2 превратить в текстовое поле-автокомплит.
Если пользователь ввел три и более символов, нужно подгрузить список городов и показать подходящие по вводу.
При клике на подходящий город ввести его полное название в текстовое поле.
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
  var listEl = document.getElementById('list');
  renderTowns(listEl, towns);

  var inputTownEl = document.getElementById('inputTown');

  inputTownEl.onkeydown = function () {
    var inputValue = this.value;
    if (inputValue.length >= 3) {
      var townsFiltered = towns.filter(function (town) {
        var regex = new RegExp(`^${inputValue}`, 'i');
        return regex.test(town);
      })
      renderTowns(listEl, townsFiltered);
      listEl.addEventListener('click', function (event) {
        inputTownEl.remove();
        renderlistTowns(event.target.textContent);
      })
    };
  }





});

function renderTowns(listEl, towns) {
  listEl.textContent = '';
  towns.forEach(function (town) {
    var optionEl = document.createElement('option');
    optionEl.textContent = town;
    listEl.appendChild(optionEl);
  });
}

function renderlistTowns() {
  document.getElementById('listTowns').innerHTML = '';
  var inputNewTown = document.createElement('input');
  inputNewTown.value = event.target.textContent;
  inputNewTown.id = 'inputTown';
  document.getElementById('listTowns').appendChild(inputNewTown);
}