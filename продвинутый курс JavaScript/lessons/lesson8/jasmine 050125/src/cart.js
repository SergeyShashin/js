function Cart() {
  this.items = [];
}

Cart.prototype.add = function (item) {
  this.items.push(item);
}

Cart.prototype.total = function () {
  var sum = 0;
  for (var item of this.items) {
    sum += item.price * item.quantity;
  }
  return sum
}