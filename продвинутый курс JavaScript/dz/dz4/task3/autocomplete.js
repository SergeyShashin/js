'use strict';

/*
3) * Список из п.2 превратить в текстовое поле-автокомплит.
Если пользователь ввел три и более символов, нужно подгрузить список городов и показать подходящие по вводу.
При клике на подходящий город ввести его полное название в текстовое поле.
*/


window.onload = function () {
  loadTowns(function (responce) {
    if (responce) {
      renderTowns(responce);
    }
  })
}

/**
 * Загружает список городов c http://localhost:3000/towns
 * @param {function} callback 
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

/**
 * 
 * @param {array} towns Список городов
 * @param {string} elementToInsert Название элемента в который нужно вставить список городов
 * @param {string} element Тип создаваемого html элемента
 */
function createListOfTowns(towns, elementToInsert, element) {
  var townsElement = document.getElementById(elementToInsert);
  townsElement.classList.remove('hidden');
  townsElement.size = towns.length;

  var townElement = null;
  towns.forEach(function (town) {
    townElement = document.createElement(element);
    townElement.textContent = town;
    townElement.value = town;
    townsElement.appendChild(townElement);
  });
}

/**
 * Очищает полученный элемент
 * @param {string} element Название элемента для очистки 
 */
function clearElement(element) {
  document.getElementById(element).textContent = '';
}

/**
 * При клике на город вставляет его название в элемент с id inputTown и очищает список городов
 * @param {string} idElement название элемента для обработки клика
 */
function setInputTownElementContetnClickElement(idElement) {
  document.getElementById(idElement).addEventListener('click', function (e) {
    document.getElementById('inputTown').value = e.target.textContent
    clearElement('list');
  })
}

/**
 * Отображает список городов в зависимости от того, что вводят
 * @param {array} towns 
 */
function renderTowns(towns) {
  var inputTown = document.getElementById('inputTown');

  inputTown.oninput = function () {
    if (inputTown.value.length > 2) {

      var filteredListOfCities = towns.filter(function (town) {
        var regular = new RegExp('^' + inputTown.value, 'i');
        return regular.test(town);
      });

      if (filteredListOfCities.length > 0) {
        clearElement('list');
        createListOfTowns(filteredListOfCities, 'list', 'li');
      }

    }
  }

  setInputTownElementContetnClickElement('list');
}