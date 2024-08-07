
buildList();
buildCart();
setEventHandlers();

function writeSumGoodsInHtml(sum) {
  document.getElementById('sum').innerHTML = '';
  document.getElementById('sum').textContent = sum;
}


function writeQuantityGoodsInHtml(quantity) {
  document.getElementById('quantity').innerHTML = '';
  document.getElementById('quantity').textContent = quantity;
}

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
  var sumGoods = 0;
  var quantityGoods = 0;

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

      sumGoods += product.price * product.quantity;
      quantityGoods += product.quantity;

      cartEl.appendChild(tr);
    }
    writeSumGoodsInHtml(sumGoods);
    writeQuantityGoodsInHtml(quantityGoods);
  });

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

function sendData(method, link, data, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, link);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(data);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      callback(this.statusText);
    }
  }
}

function setEventHandlers() {

  document.getElementById('goods').addEventListener('click', function (e) {
    if (e.target.tagName !== 'BUTTON') {
      return
    }

    var datasetFromElOnClick = e.target.dataset;
    var productElInCart = document.querySelector(`#cart [data-id="${datasetFromElOnClick.id}"]`);



    var dataToJson = {
      id: datasetFromElOnClick.id,
      name: datasetFromElOnClick.name,
      price: datasetFromElOnClick.price,
      quantity: 1
    };

    if (productElInCart) {
      dataToJson.quantity = Number(productElInCart.dataset.quantity) + 1;
      sendData('PATCH', `http://localhost:3000/cart/${datasetFromElOnClick.id}`, JSON.stringify(dataToJson), function (answer) {
        if (answer === 'OK') {
          document.getElementById('cart').innerHTML = '';
          buildCart();
        }
      });
    } else {
      sendData('POST', `http://localhost:3000/cart/`, JSON.stringify(dataToJson), function (answer) {
        if (answer === 'Created') {
          document.getElementById('cart').innerHTML = '';
          buildCart();
        }
      });
    }


  });

  document.getElementById('cart').addEventListener('click', function (e) {
    if (e.target.tagName !== 'BUTTON') {
      return
    }
    if (e.target.dataset.quantity < 2) {
      sendData('DELETE', `http://localhost:3000/cart/${e.target.dataset.id}`, null, function (answer) {
        if (answer === 'OK') {
          document.getElementById('cart').innerHTML = '';
          buildCart();
        }
      });
    } else {
      sendData('PATCH', `http://localhost:3000/cart/${e.target.dataset.id}`, JSON.stringify({ quantity: Number(e.target.dataset.quantity) - 1 }), function (answer) {
        if (answer === 'OK') {
          document.getElementById('cart').innerHTML = '';
          buildCart();
        }
      });
    }
  });

}







