
document.getElementById('btn').addEventListener('click', (e) => handlerClick(e));

function handlerClick(e) {
  getXhr(
    function (result) {

      var items = result.map(function (item) {
       return new MenuItem('i', 'c', item.href, item.label);
      });

      var menu = new Menu('f', 'f', items);

      console.log(items);
      console.log(menu.render());

      document.body.appendChild(menu.render());
      document.getElementById('btn').textContent = 'Меню постройся!';
    }
  )
}


function getXhr(callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', ' http://localhost:3000/items');
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      var result = JSON.parse(xhr.responseText);
      callback(result);
    }
  }
}

