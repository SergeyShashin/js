/*
4. *Создать два статических ответа {result : “success”} и {result: “error”}. 
В зависимости от каждого из них навесить на определенный ajax-запрос обработчик результата.
*/

var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/result');
xhr.send();

xhr.onreadystatechange = function () {
  if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    var result = JSON.parse(xhr.responseText);
    document.getElementById('sendBtn').addEventListener('click', function (e) {
      console.log(result);
      if (result.result === 'success') {
        e.target.className = 'success';
      }
      if (result.result === 'error') {
        e.target.className = 'error';
      }

    })
  }
}
