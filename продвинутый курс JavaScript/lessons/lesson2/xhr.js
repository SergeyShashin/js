'use strict';

document.getElementById('btn').addEventListener('click', function () {

  var xhr = new XMLHttpRequest();
  console.dir(xhr);
  xhr.open('GET', 'http://localhost:3000/menu');
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      var items = JSON.parse(xhr.responseText);
      items = items.map(function (item) {
        return new MenuItem(item.id, item.class, item.link, item.label);
      })
      var menu = new Menu('menu', 'menu', items);
      document.body.appendChild(menu.render());
    }
  }
})
