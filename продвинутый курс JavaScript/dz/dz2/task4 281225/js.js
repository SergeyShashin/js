'use strict';

/*
4. *Создать два статических ответа {result : “success”} и {result: “error”}. 
В зависимости от каждого из них навесить на определенный ajax-запрос обработчик результата.
*/
var btnGetDataHTMLEl = document.getElementById('btnGetData');
btnGetDataHTMLEl.addEventListener('click', function () {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/result');
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      if (JSON.parse(xhr.responseText)[0]) {
        btnGetDataHTMLEl.style.color = 'green';
      } else {
        btnGetDataHTMLEl.style.color = 'red';
      }
    }
  }
})