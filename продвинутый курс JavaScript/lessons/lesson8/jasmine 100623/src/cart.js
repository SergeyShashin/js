function sum(a, b, flag) {
  if (flag) {
    return Math.abs(a) + Math.abs(b);
  } else {
    return a + b
  }
}

function Cart() {
  this.items = [];
}

Cart.prototype.addToCart = function (item) {
  this.items.push(item);
}

Cart.prototype.total = function () {
  var total = 0;
  this.items.forEach(function (item) {
    total += item.price * item.quantity;
  })

  return total;
}