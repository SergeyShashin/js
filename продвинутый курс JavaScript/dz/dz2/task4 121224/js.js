
document.getElementById('btn').addEventListener('click', function (e) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/result');
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      JSON.parse(xhr.responseText).answer ? e.target.className = 'green' : e.target.className = 'brown';
    }
  }
});