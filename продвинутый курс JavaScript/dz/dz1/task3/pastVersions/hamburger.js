/*3. * Сеть фастфудов предлагает несколько видов гамбургеров:
** - маленький(50 рублей, 20 калорий);**
    - большой(100 рублей, 40 калорий).
Гамбургер может быть с одним из нескольких видов начинок(обязательно):
** - сыром(+ 10 рублей, + 20 калорий);**
** - салатом(+ 20 рублей, + 5 калорий);**
    - картофелем(+ 15 рублей, + 10 калорий).

* Дополнительно гамбургер можно посыпать приправой(+ 15 рублей, 0 калорий) и полить майонезом(+ 20 рублей, + 5 калорий). *

    Напишите программу, рассчитывающую стоимость и калорийность гамбургера.Используйте ООП - подход(подсказка: нужен класс Гамбургер, константы, методы для выбора опций и расчета нужных величин).


/**
* Класс, объекты которого описывают параметры гамбургера. 
* 
* @constructor
* @param size        Размер
* @param stuffing    Начинка
* @throws {HamburgerException}  При неправильном использовании
*/
function Hamburger(size, stuffing) {
    this.PROP = 'ЭТО СВОЙСТВО ГАМБУРГЕРА';
    this._toppings = [];
    this._prise = 0;
    this._calories = 0;

    switch (size) {
        case Hamburger.SIZE_SMALL:         
            this._prise += 50;
            this._calories += 20;
            break;
        case Hamburger.SIZE_LARGE:            
            this._prise += 100;
            this._calories += 40;
            break;
        default:
            throw new HamburgerException('Bad size '+size);
    }
    this._size = size;

    switch (stuffing) {
        case Hamburger.STUFFING_CHEESE:            
            this._prise += 10;
            this._calories += 20;
            break;
        case Hamburger.STUFFING_SALAD:            
            this._prise += 20;
            this._calories += 5;
            break;
        case Hamburger.STUFFING_POTATO:            
            this._prise += 15;
            this._calories += 10;
            break;
        default:
            throw new HamburgerException('Bad stuffing ' + stuffing);
    }
    this._stuffing = stuffing;


}


/* Размеры, виды начинок и добавок */
Hamburger.SIZE_SMALL = 1;
Hamburger.SIZE_LARGE = 2;
Hamburger.STUFFING_CHEESE = 3;
Hamburger.STUFFING_SALAD = 4;
Hamburger.STUFFING_POTATO = 5;
Hamburger.TOPPING_MAYO = 6;
Hamburger.TOPPING_SPICE = 7;
/**
* Добавить добавку к гамбургеру. Можно добавить несколько
*– при условии, что они разные.
* 
* /*@param topping     Тип добавки
* /*@throws {HamburgerException}  При неправильном использовании
*/
Hamburger.prototype.addTopping = function (topping) {    
    
        switch (topping) {
            case Hamburger.TOPPING_MAYO:
                if (this._toppings.indexOf(Hamburger.TOPPING_MAYO) == -1) {
                    this._toppings.push(Hamburger.TOPPING_MAYO);                    
                    this._prise += 20;
                    this._calories += 5;
                }
                break;
            case Hamburger.TOPPING_SPICE:
                if (this._toppings.indexOf(Hamburger.TOPPING_SPICE) == -1) {
                    this._toppings.push(Hamburger.TOPPING_SPICE);                    
                    this._prise += 15;
                }
                break;
            default:
                throw new HamburgerException('Bad topping ' + topping);
        }        
    
}
/**
 * Убрать добавку – при условии, что она ранее была 
 * добавлена.
 * 
 * /*@param topping   Тип добавки
 * /*@throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.removeTopping = function (topping) {
    if (this._toppings.indexOf(topping) >= 0) {
        switch (topping) {
            case Hamburger.TOPPING_MAYO: this._toppings.splice(this._toppings.indexOf(Hamburger.TOPPING_MAYO));
                this._prise -= 20;
                this._calories += 5;
                break;
            case Hamburger.TOPPING_SPICE: this._toppings.splice(this._toppings.indexOf(Hamburger.TOPPING_SPICE));
                this._prise -= 15;
                break;
            default:
                throw new HamburgerException('Bad topping ' + topping);
        }
    }
}
/**
 * Получить список добавок.
 *
 * /*@return {Array} Массив добавленных добавок, содержит константы
 *                 Hamburger.TOPPING_*
 */
Hamburger.prototype.getToppings = function () {
    return this._toppings;
}
/**
 * Узнать размер гамбургера
 */
Hamburger.prototype.getSize = function () {
    return this._size;
}
/**
 * Узнать начинку гамбургера
 */
Hamburger.prototype.getStuffing = function () {
    return this._stuffing;
}
/**
 * Узнать цену гамбургера
 * /*@return {Number} Цена в тугриках
 */
Hamburger.prototype.calculatePrice = function () {
    return this._prise;
}
/**
 * Узнать калорийность
 * /*@return {Number} Калорийность в калориях
 */
Hamburger.prototype.calculateCalories = function () {
    return this._calories;
}

/**
 * Вернуть гамбургер в виде строки текста
 * /*@return {String} Описание гамбургера
 */
Hamburger.prototype.toString = function () {
    var res = "Hamburger:\nSize: ";
    res += (this._size == Hamburger.SIZE_SMALL) ? "Small\n" : "Big\n";
    res += "Stuffing: ";
    res += (this._stuffing == Hamburger.STUFFING_CHEESE) ? "Chese\n" : (this._stuffing == Hamburger.STUFFING_POTATO) ? "Potato\n" : "Salad\n";
    res += "Toppings: ";
    res += (this._toppings.length >= 0) ?
                this._toppings.map(function (t) {
                return t == Hamburger.TOPPING_MAYO ? "Mayo" : "Spice"
            }).join(', ')+'\n'
        : "none\n"
    res += 'Price: ' + this._prise + "rub\n";
    res += 'Calories: ' + this._calories + "ccal";
    return res;
}

/**
 * Представляет информацию об ошибке в ходе работы с гамбургером. 
 * Подробности хранятся в свойстве message.
 * /*@constructor 
 */
function HamburgerException(message) {
    this.name = HamburgerException;
    this.message = message;
    }