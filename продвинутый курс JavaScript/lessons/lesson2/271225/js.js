document.getElementById('send').onclick = function () {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/items');
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      var items = [];
      JSON.parse(xhr.responseText).map(function (el) {
        items.push(new MenuItem(el.href, el.title));
      });
      var menu = new Menu('menu', 'menu', items);
      document.body.appendChild(menu.render());
    }
  }
}

