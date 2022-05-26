function Burger(size, stuffing) {
    this.price = 0;
    this.calories = 0;
    this.size = size;
    this.stuffing = stuffing;
    this.toppings = [];

    switch (size) {
        case Burger.SIZE_SMALL:
            this.price += 50;
            this.calories += 20;
            break;
        case Burger.SIZE_LARGE:
            this.price += 100;
            this.calories += 40;
            break;
        default:
            throw new BurgerException('Bad size' + size);
    }

    switch (stuffing) {
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
        default:
            throw new BurgerException('Bad stuffing' + stuffing);
    }
}

Burger.SIZE_SMALL = 1;
Burger.SIZE_LARGE = 2;
Burger.STUFFING_CHEESE = 3;
Burger.STUFFING_SALAD = 4;
Burger.STUFFING_POTATO = 5;
Burger.TOPPING_MAYO = 6;
Burger.TOPPING_SPICE = 7

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

function BurgerException(message) {
    this.name = 'BurgerException';
    this.message = message;
}