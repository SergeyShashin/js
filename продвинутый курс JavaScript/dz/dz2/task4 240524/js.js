'use strict';

/*
4. *Создать два статических ответа {result : “success”} и {result: “error”}. 
В зависимости от каждого из них навесить на определенный ajax-запрос обработчик результата.
*/

var result = document.getElementById('result');
var btnGetData = document.getElementById('someData');

/**
 * Загрузка данных из json файла
 * @param {string} method Метод запроса: GET, POST, PUT, PATCH, DELETE 
 * @param {string} link Ссылка по которой находятся данные 
 * @param {function} callback Функция обратного вызова в которую передаются полученные данные. 
 */
function json(method, link, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, link);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      callback(data);
    }
  }
}

btnGetData.addEventListener('click', function () {

  json('GET', 'http://localhost:3000/result', function (data) {
    if (data[0]) {
      result.textContent = data[0];
    } else {
      result.textContent = data[0];
    }
  });

});
