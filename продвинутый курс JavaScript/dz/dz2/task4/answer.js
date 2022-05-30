'use strict';

/*
4. *Создать два статических ответа {result : “success”} и {result: “error”}. 
В зависимости от каждого из них навесить на определенный ajax-запрос обработчик результата.
*/

function handler(callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'db.json');
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        callback(response);
      }
    }
  }
}

window.onload = function () {
  var btnSendEl = document.getElementById('btnSend');
  btnSendEl.addEventListener('click', function () {
    handler(function (response) {
      if (response.result === 'success') {
        btnSendEl.className = 'success';
      }
      if (response.result === 'error') {
        btnSendEl.className = 'error';
      }

    });
  });



}