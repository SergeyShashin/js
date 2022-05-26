/*3. * ���� ��������� ���������� ��������� ����� �����������:
** - ���������(50 ������, 20 �������);**
    - �������(100 ������, 40 �������).
��������� ����� ���� � ����� �� ���������� ����� �������(�����������):
** - �����(+ 10 ������, + 20 �������);**
** - �������(+ 20 ������, + 5 �������);**
    - ����������(+ 15 ������, + 10 �������).

* ������������� ��������� ����� �������� ���������(+ 15 ������, 0 �������) � ������ ���������(+ 20 ������, + 5 �������). *

    �������� ���������, �������������� ��������� � ������������ ����������.����������� ��� - ������(���������: ����� ����� ���������, ���������, ������ ��� ������ ����� � ������� ������ �������).


/**
* �����, ������� �������� ��������� ��������� ����������. 
* 
* @constructor
* @param size        ������
* @param stuffing    �������
* @throws {HamburgerException}  ��� ������������ �������������
*/
function Hamburger(size, stuffing) {
    this.PROP = '��� �������� ����������';
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


/* �������, ���� ������� � ������� */
Hamburger.SIZE_SMALL = 1;
Hamburger.SIZE_LARGE = 2;
Hamburger.STUFFING_CHEESE = 3;
Hamburger.STUFFING_SALAD = 4;
Hamburger.STUFFING_POTATO = 5;
Hamburger.TOPPING_MAYO = 6;
Hamburger.TOPPING_SPICE = 7;
/**
* �������� ������� � ����������. ����� �������� ���������
*� ��� �������, ��� ��� ������.
* 
* /*@param topping     ��� �������
* /*@throws {HamburgerException}  ��� ������������ �������������
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
 * ������ ������� � ��� �������, ��� ��� ����� ���� 
 * ���������.
 * 
 * /*@param topping   ��� �������
 * /*@throws {HamburgerException}  ��� ������������ �������������
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
 * �������� ������ �������.
 *
 * /*@return {Array} ������ ����������� �������, �������� ���������
 *                 Hamburger.TOPPING_*
 */
Hamburger.prototype.getToppings = function () {
    return this._toppings;
}
/**
 * ������ ������ ����������
 */
Hamburger.prototype.getSize = function () {
    return this._size;
}
/**
 * ������ ������� ����������
 */
Hamburger.prototype.getStuffing = function () {
    return this._stuffing;
}
/**
 * ������ ���� ����������
 * /*@return {Number} ���� � ��������
 */
Hamburger.prototype.calculatePrice = function () {
    return this._prise;
}
/**
 * ������ ������������
 * /*@return {Number} ������������ � ��������
 */
Hamburger.prototype.calculateCalories = function () {
    return this._calories;
}

/**
 * ������� ��������� � ���� ������ ������
 * /*@return {String} �������� ����������
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
 * ������������ ���������� �� ������ � ���� ������ � �����������. 
 * ����������� �������� � �������� message.
 * /*@constructor 
 */
function HamburgerException(message) {
    this.name = HamburgerException;
    this.message = message;
    }