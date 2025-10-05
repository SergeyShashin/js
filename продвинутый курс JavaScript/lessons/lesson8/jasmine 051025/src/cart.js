function Cart() {
  this.items = [];
  this.sum = 0;
}

Cart.prototype.addItem = function (item) {
  this.items.push(item);
}

Cart.prototype.getSum = function () {
  for (let item of this.items) {
    this.sum += item.quantity * item.price;
  }
  return this.sum;
}