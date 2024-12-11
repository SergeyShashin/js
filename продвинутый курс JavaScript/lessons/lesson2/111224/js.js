var xhr = new XMLHttpRequest();

function getItems(method, link, callback) {

  xhr.open(method, link);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    }
  }
}

getItems('GET', 'http://localhost:3000/items', createMenu);

function createMenu(items) {
  var monitorEl = document.getElementById('monitor');
  var itemsEl = [];

  for (let item of items) {
    itemsEl.push(new MenuItems(item.link, item.name));
  }

  var menu = new Menu('idMenu', 'classMenu', itemsEl);

  monitorEl.appendChild(menu.render());
}


