
var cartEl = document.getElementById('cart');

buildList();
buildCart();

document.getElementById('pageCatalog').addEventListener('click', function (e) {
  var target = e.target;
  switch (target.id) {
    case "btnBuy":
      console.log(target.dataset.id);

      dataProduct = {
        id: target.dataset.id,
        name: target.dataset.name,
        price: target.dataset.price,
        quantity: 1
      };

      console.log(dataProduct);

      sendData('POST', 'http://localhost:3000/cart', dataProduct);
      // sendData('PATCH', 'http://localhost:3000/cart', dataProduct);
      break;
    case "btnDel":
      console.log(target.dataset.id);
      break;
  }

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
      tdBtnBuy.dataset.price = product.name;
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

}