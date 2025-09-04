'use strict';

/*
4. *Создать два статических ответа {result : “success”} и {result: “error”}. 
В зависимости от каждого из них навесить на определенный ajax-запрос обработчик результата.
*/

var btnGetDataEl = document.getElementById('btnGetData');

btnGetDataEl.addEventListener('click', function () {
  console.log('click');
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/result');
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      console.log(JSON.parse(xhr.responseText)[0]);
      if (JSON.parse(xhr.responseText)[0]) {
        btnGetDataEl.style.color = 'green'
      } else {
        btnGetDataEl.style.color = 'red'
      }
    }
  }
})