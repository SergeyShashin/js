'use strict';

/*
3) * Список из п.2 превратить в текстовое поле-автокомплит.
Если пользователь ввел три и более символов, нужно подгрузить список городов и показать подходящие по вводу.
При клике на подходящий город ввести его полное название в текстовое поле.
*/


autocomplete("GET", "http://localhost:3000/towns", handleRequest);

/**
 * Передает в handleRequest объект, полученные по link
 * @param {string} method 
 * @param {string} link 
 * @param {function} handleRequest 
 */
function autocomplete(method, link, handleRequest) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, link);
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      return handleRequest(JSON.parse(xhr.responseText));
    }
  }
}

/**
 * Добавляет список городов в dataList
 * @param {object} towns 
 */
function handleRequest(towns) {
  var inputEl = document.getElementById('towns');

  inputEl.addEventListener('input', function (e) {
    var monitorEl = document.getElementById('monitor');

    if (monitorEl) {
      monitorEl.remove();
    }

    if (checkLength(e.target.value, 2)) {
      var filterList = getFilterList(inputEl.value, towns);

      addMonitorEl(document.getElementById('autocomplete'), 'monitor', filterList, inputEl)
    }

  });

}

/**
 * Проверяет контент на длину
 * @param {string} content 
 * @param {number} length
 * @returns {boolean}
 */
function checkLength(content, length) {
  return content.length > length
}

/**
 * Фильтрует массив
 * @param {string} filter 
 * @param {array} listArr
 * @returns {array}
 */
function getFilterList(filter, listArr) {
  var rgxp = new RegExp(`^(${filter})`, 'ig');
  var result = [];
  var tracer = [];

  for (let el of listArr) {
    rgxp.test(el) ? result.push(el) : '';
    tracer.push(`Элемент ${el} проверка ${rgxp.test(el)}`);
  }

  return result
}

/**
 * Добавляет HTML element  в targetEl. По клику вставляет содержимое в outputInputEl. И удаляется.
 * @param {HTML} targetEl 
 * @param {string} idMonitor 
 * @param {array} dataForOutput 
 */
function addMonitorEl(targetEl, idMonitor, dataForOutput, outputInputEl) {
  var monitorEl = document.createElement('ul');
  monitorEl.id = idMonitor;

  for (let el of dataForOutput) {
    var liEl = document.createElement('li');
    liEl.textContent = el;
    monitorEl.appendChild(liEl);
  }

  targetEl.appendChild(monitorEl);

  monitorEl.addEventListener('click', function (e) {
    outputInputEl.value = e.target.textContent;
    monitorEl.remove();
  });
}


