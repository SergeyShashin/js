'use strict';

/*
3) * Список из п.2 превратить в текстовое поле-автокомплит.
Если пользователь ввел три и более символов, нужно подгрузить список городов и показать подходящие по вводу.
При клике на подходящий город ввести его полное название в текстовое поле.
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

function getListTowns() {
  getData('GET', ' http://localhost:3000/towns', function (towns) {
    var selectEl = document.getElementById('towns');
    towns.forEach(function (town) {
      var divEl = document.createElement('div');
      divEl.textContent = town;
      selectEl.appendChild(divEl);
    });
  })
}

function buildListTowns() {
  getData('GET', ' http://localhost:3000/towns', function (towns) {
    var selectEl = document.getElementById('towns');
    towns.forEach(function (town) {
      var divEl = document.createElement('div');
      divEl.textContent = town;
      selectEl.appendChild(divEl);
    });

  });
}

buildListTowns();

var findTown = document.getElementById('findTown');
findTown.oninput = function (e) {
  var content = this.value;
  var townsFromDivEl = [];
  var filterTowns = [];
  if (content.length >= 3) {
    console.log(content);
    var rgxp = new RegExp(`^${content}`, 'ig');

    Object.values(document.getElementsByTagName('div')).map(function (el) {
      townsFromDivEl.push(el.textContent);
    });

    townsFromDivEl.map(function (el) {
      rgxp.test(el) ? console.log(el) : '';
    });
  }
  console.log(filterTowns);
}

