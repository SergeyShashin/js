/*
4. *Создать два статических ответа {result : “success”} и {result: “error”}. 
В зависимости от каждого из них навесить на определенный ajax-запрос обработчик результата.
*/

console.log('Начали.');
var btn = document.getElementById('btn');
// btn.addEventListener('click', handlerAnswerAjax);

function handlerAnswerAjax(callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/result');
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    }
  }

}

handlerAnswerAjax(function (data) {
  if (data[0] === 'error') {
    btn.className = 'error';
    return
  }

  btn.className = 'success';

})

