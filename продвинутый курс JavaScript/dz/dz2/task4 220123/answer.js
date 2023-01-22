'use strict';

/*
4. *Создать два статических ответа {result : “success”} и {result: “error”}. 
В зависимости от каждого из них навесить на определенный ajax-запрос обработчик результата.
*/

var btnEl= document.getElementById('btnSend');

btnEl.addEventListener('click', function () {
  var xhr = new XMLHttpRequest;
  xhr.open('GET', 'http://localhost:3000/result');
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        if('success'===JSON.parse(this.response)[0]){
          btnEl.className = 'success';
        }else{
          btnEl.className = 'error'
        };
      }
    }
  }

})

