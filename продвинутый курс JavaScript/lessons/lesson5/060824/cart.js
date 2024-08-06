

buildList();
buildCart();

document.getElementById('pageCatalog').addEventListener('click', function (e) {
  var target = e.target;
  var cartEl = document.getElementById('cart');

  switch (target.id) {
    case "btnBuy":
      var dataProduct = {
        id: target.dataset.id,
        name: target.dataset.name,
        price: Number(target.dataset.price),
      };
      var cartHasEl = document.querySelector(`#cart [data-id="${target.dataset.id}"] `);

      if (cartHasEl) {
        dataProduct.quantity = Number(cartHasEl.dataset.id) + 1;
        sendData('PATCH', `http://localhost:3000/cart/${target.dataset.id}`, dataProduct);
      } else {
        dataProduct.quantity = 1;
        sendData('POST', 'http://localhost:3000/cart', dataProduct);
      }
      break;
    case "btnDel":
      sendData('DELETE', `http://localhost:3000/cart/${target.dataset.id}`, '');

      break;
  }

  cartEl.innerHTML = '';
  buildCart();
});



function buildList() {
  getDataFromJson("GET", "http://localhost:3000/goods", function (data) {
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
  getDataFromJson("GET", "http://localhost:3000/cart", function (data) {
    var goodsEl = document.getElementById('cart');

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

      goodsEl.appendChild(tr);

    }
  })

}

function getDataFromJson(method, link, callback) {
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
  sendDataToJson(method, link, data, function (answer) {

  });

}

function sendDataToJson(method, link, data, callback) {
  var xhr = new XMLHttpRequest();
  if (method === "POST") {
    xhr.open(method, link);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({ id: data.id, name: data.name, price: data.price, quantity: data.quantity }));
  }
  if (method === "PATCH") {
    xhr.open(method, link);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({ quantity: data.quantity }));
  }
  if (method === "DELETE") {
    xhr.open(method, link);
    xhr.send();
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      callback(XMLHttpRequest.DONE);
    }
  }
}
