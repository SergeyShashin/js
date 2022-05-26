function Burger(size, stuffing) {
  this.size = size;
  this.price = 0;
  this.calories = 0;
  this.stuffing = stuffing;
  this.toppings = [];

  switch (this.size) {
    case Burger.SIZE_BIG:
      this.price += 100;
      this.calories += 40;
      break;
    case Burger.SIZE_SMALL:
      this.price += 50;
      this.calories += 20;
      break;
    default: throw new BurgerException('Неверный размер' + this.size);
  }

  switch (this.stuffing) {
    case Burger.STUFFING_CHEESE:
      this.price += 10;
      this.calories += 20;
      break;
    case Burger.STUFFING_SALAD:
      this.price += 20;
      this.calories += 5;
      break;
    case Burger.STUFFING_POTATO:
      this.price += 15;
      this.calories += 10;
      break;
    default: throw new BurgerException('Неверная начинка' + this.stuffing);

  }

}


Burger.SIZE_BIG = 1;
Burger.SIZE_SMALL = 2;
Burger.STUFFING_CHEESE = 3;
Burger.STUFFING_SALAD = 4;
Burger.STUFFING_POTATO = 5;
Burger.TOPPING_SPICE = 6;
Burger.TOPPING_MAYO = 7;

function BurgerException(message) {
  this.name = 'BurgerException';
  this.message = message;
}


Burger.prototype.addToppings = function (topping) {
  switch (topping) {
    case Burger.TOPPING_MAYO:
        if (this.toppings.indexOf(Burger.TOPPING_MAYO) == -1) {
            this.toppings.push(Burger.TOPPING_MAYO);
            this.price += 20;
            this.calories += 5;               
        }
        break;
    case Burger.TOPPING_SPICE:
        if (this.toppings.indexOf(Burger.TOPPING_SPICE) == -1) {
            this.toppings.push(Burger.TOPPING_SPICE);
            this.price += 15;                
        }
        break;
    default:
        throw new BurgerException('Bad topping' + topping);
}


}
