
window.onload = function () {

  document.getElementById('send').addEventListener('click', function () {

    let xhr = new XMLHttpRequest();

    // xhr.open('GET', 'http://127.0.0.1:8080');
    xhr.open('GET', 'http://localhost:3000/items');
    xhr.send();
    xhr.onreadystatechange = function () {

      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var items = JSON.parse(xhr.responseText);
        var elements = [];

        items.map(function (item) {
          elements.push(new MenuItem(item.label, item.href));
        });

        var menu = new Menu('menuId', 'menuClass', elements);
        document.body.appendChild(menu.render());

      }
    };

  })

};