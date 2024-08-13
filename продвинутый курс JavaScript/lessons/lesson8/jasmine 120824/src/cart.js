function Cart() {
  this.items = [];
}

Cart.prototype.addItem = function (item) {
  this.items.push(item);
}

Cart.prototype.total = function () {
  var sum = 0;

  this.items.forEach(function (el) {
    sum += el.price
  });

  return sum
}

