function Cart() {
  this.items = [];
  this.total = 0;
}

Cart.prototype.addItem = function (item) {
  this.items.push(item);
}

Cart.prototype.getItems = function () {
  return this.items;
}

Cart.prototype.getTotal = function () {
  var total = this.total;
  this.items.map(function (item) {
    console.log(item.price);
    console.log(item.quantity);
    total += item.price * item.quantity;
  });
  this.total = total;
  return this.total
}