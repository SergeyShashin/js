let btnBuildMenuEl = document.getElementById('btnBuildMenu');

btnBuildMenuEl.addEventListener('click', function () {
  handlerClickBtnBuildMenu()
});

function handlerClickBtnBuildMenu() {

  function getData(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/menu');
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        callback(data);
      }
    };
  }

  getData(function buldMenu(data) {
    var itemsEls = [];
    data.map(function (el) {
      console.log(el.label);
      console.log(el.path);
      itemsEls.push(new MenuItem(el.label, el.path));
    });
    var monitorEl = document.getElementById('monitor');
    console.log(monitorEl);
    console.log(itemsEls);
    var menu = new Menu('menu', 'menu', [itemsEls]);
    monitorEl.appendChild(menu.render());
  })

}