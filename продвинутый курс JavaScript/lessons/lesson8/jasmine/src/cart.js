
function Cart() {
  this.items = [];
}

Cart.prototype.addItem = function (item) {
  this.items.push(item);
}

Cart.prototype.cartTotal = function () {
  var total = 0;

  this.items.forEach(function (el) {
    total += el.price * el.quantity
  })

  return total;

}