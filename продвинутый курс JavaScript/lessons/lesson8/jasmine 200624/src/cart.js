function Cart() {
  this.items = [];
}

Cart.prototype.addItem = function (item) {
  this.items.push(item)
};

Cart.prototype.totalSum = function () {
  var sum = 0;
  this.items.forEach(function (item) {
    sum += item.price * item.quantity;
  });

  return sum
}