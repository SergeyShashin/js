describe('Function: cart', function () {
  var cart = new Cart();

  var item = {
    price: 8
  };

  var item2 = {
    price: 64
  };

  var item3 = {
    price: 192
  };

  cart.addItem(item);
  cart.addItem(item2);
  cart.addItem(item3);

  console.log(cart.items.length);

  it('item length to be equal 3', function () {
    expect(cart.items.length).toBe(3);
  });

  it('item total to be equal 264', function () {
    expect(cart.total()).toBe(264);
  });

  
});