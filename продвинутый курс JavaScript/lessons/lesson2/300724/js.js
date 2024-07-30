
var xhr = new XMLHttpRequest();

xhr.open('GET', 'http://localhost:3000/items');
xhr.send();

xhr.onreadystatechange = function () {
  if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    var result = JSON.parse(xhr.responseText);

    var items = [];

    for (var item of result) {
      items.push(new MenuItem(item.href, item.label));
    }

    var menu = new Menu('idMenu', 'classMenu', items);

    document.body.appendChild(menu.render());

  }

}