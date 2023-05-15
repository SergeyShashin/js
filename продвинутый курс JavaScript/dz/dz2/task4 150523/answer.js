'use strict';

/*
4. *Создать два статических ответа {result : “success”} и {result: “error”}. 
В зависимости от каждого из них навесить на определенный ajax-запрос обработчик результата.
*/

var buttonSendElement = document.getElementById('btnSend');

buttonSendElement.addEventListener('click', function () {
  return loadData(handlerClick);
});

function loadData(handlerClick) {

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'db.json');
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        handlerClick(JSON.parse(xhr.responseText));
      }
    }
  }

}

function handlerClick(responce) {
  if (responce.result === "success") {
    buttonSendElement.className = 'success'
  }else{
    buttonSendElement.className = 'error'
  }

}