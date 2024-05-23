
window.onload = function () {

  document.getElementById('send').addEventListener('click', function () {

    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://127.0.0.1:8080');
    xhr.send();

    xhr.onreadystatechange = function () {

      if (xhr.readyState === XMLHttpRequest.DONE) {
        console.log(xhr.responseText);
      }
    }
  })

};