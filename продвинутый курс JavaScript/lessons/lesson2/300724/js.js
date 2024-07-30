
var xhr = new XMLHttpRequest();

xhr.open('GET', 'http://127.0.0.1:8080');
xhr.send();

xhr.onreadystatechange = function () {
  if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    var result = xhr.responseText;

    console.log(result);

  }

}