
function Burger(size, stuffing) {
  this.size = size;
  this.stuffing = size;
  this.price = 0;
  this.calories = 0;
  this.toppings = [];

  switch (size) {
    case Hamburger.SIZE_SMALL:
      this.price += 10;
      this.calories += 10;
      break;
    case Hamburger.SIZE_LARGE;
      this.price += 20;
      this.calories += 20;
      break;
    default: throw new Hamburger('Неверный размер' + this.size);
  }
}