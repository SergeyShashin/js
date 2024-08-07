buildList();
buildCart();
setEventHandlers();


function buildList() {
  getData("GET", "http://localhost:3000/goods", function (data) {
    var goodsEl = document.getElementById('goods');

    for (var product of data) {
      var tr = document.createElement('tr');
      var tdNameEl = document.createElement('td');
      var tdPriceEl = document.createElement('td');
      var tdBtnBuy = document.createElement('button');
      tdNameEl.textContent = product.name;
      tdPriceEl.textContent = product.price;
      tdBtnBuy.id = 'btnBuy';
      tdBtnBuy.textContent = 'купить';
      tdBtnBuy.dataset.id = product.id;
      tdBtnBuy.dataset.name = product.name;
      tdBtnBuy.dataset.price = product.price;
      tr.appendChild(tdNameEl);
      tr.appendChild(tdPriceEl);
      tr.appendChild(tdBtnBuy);

      goodsEl.appendChild(tr);

    }
  })

}

function buildCart() {
  getData("GET", "http://localhost:3000/cart", function (data) {
    var cartEl = document.getElementById('cart');

    for (var product of data) {
      var tr = document.createElement('tr');
      var tdNameEl = document.createElement('td');
      var tdPriceEl = document.createElement('td');
      var tdQuantityEl = document.createElement('td');
      var tdSquEl = document.createElement('td');
      var tdBtnDel = document.createElement('button');
      tdNameEl.textContent = product.name;
      tdPriceEl.textContent = product.price;
      tdQuantityEl.textContent = product.quantity;
      tdBtnDel.id = 'btnDel';
      tdSquEl.textContent = 'шт.';
      tdBtnDel.textContent = 'x';
      tdBtnDel.dataset.id = product.id;
      tdBtnDel.dataset.quantity = product.quantity;

      tr.appendChild(tdNameEl);
      tr.appendChild(tdPriceEl);
      tr.appendChild(tdQuantityEl);
      tr.appendChild(tdSquEl);
      tr.appendChild(tdBtnDel);

      cartEl.appendChild(tr);

    }
  })

}

function getData(method, link, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, link);
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      var responce = JSON.parse(xhr.responseText);
      callback(responce);
    }
  }

}

function sendData(method, link, data) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, link);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(data);
}

function setEventHandlers() {

  document.getElementById('cart').addEventListener('click', function (e) {
    if (e.target.tagName !== 'BUTTON') {
      return
    }
    sendData('DELETE', `http://localhost:3000/cart/${e.target.dataset.id}`, null);

    document.getElementById('cart').innerHTML = '';
    buildCart();
  });


}

