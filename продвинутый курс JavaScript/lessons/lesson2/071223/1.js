
document.getElementById('btn').addEventListener('click', (e) => handlerClick(e));

function handlerClick(e) {
  getXhr(
    function (result) {
      result.map(function (user) {
        console.log(user);
      })
    }
  )
}


function getXhr(callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', ' http://localhost:3000/users');
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      var result = JSON.parse(xhr.responseText);
      callback(result);
    }
  }
}

