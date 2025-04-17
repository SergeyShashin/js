'use strict';

/*
4. *Создать два статических ответа {result : “success”} и {result: “error”}. 
В зависимости от каждого из них навесить на определенный ajax-запрос обработчик результата.
*/

var btnGetDataEl = document.getElementById('btnGetData');

btnGetDataEl.addEventListener('click', function (e) {
  console.log('click');
  getData('GET', 'http://localhost:3000/result', function (data) {
    document.getElementById('btnGetData').style.color = data[0] ? 'green' : 'red';
  });


});

function getData(method, link, callBack) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, link);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      callBack(JSON.parse(xhr.responseText));
    }
  }
}