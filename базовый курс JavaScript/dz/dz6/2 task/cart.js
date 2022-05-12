'use strict';

/*
2. Реализовать модуль корзины. У каждого товара есть кнопка «Купить», при нажатии на которую
происходит добавление имени и цены товара в блок корзины. Корзина должна уметь считать
общую сумму заказа. Один товар можно добавить несколько раз.
*/

/**
 * @type {Object} Корзина. Содержит свойства и методы для добавления имени и цены товара в блок корзины, и подсчета общей суммы заказа.
 */
const cart = {
  cartElement: null,
  productsElement: null,
  productElement: null,
  totalSumElement: null,
  cartWithProducts: null,
  sum: null,
  product: {
    name: null,
    price: null,
    quantity: null,
  },

  /**
   * Инициализация объекта
   * Получаем элемент корзины
   * Получаем элемент продукты
   * Получаем элемент total-sum
   * Устанавливаем обработчик клика
   */
  init() {
    this.cartElement = document.getElementById('cart');
    this.productsElement = document.getElementById('products');
    this.totalSumElement = document.getElementById('total-sum');
    this.cartWithProducts = [];
    this.sum = 0;
    this.productsElement.addEventListener('click', (e) => this.clickHandlerProductsElement(e));
  },

  /** 
   * @param {Event} e Событие по которому был клик 
   * @returns 
   */
  clickHandlerProductsElement(e) {
    if (e.target.tagName === 'DIV') {
      return
    }

    this.productElement = e.target.parentElement;

    this.product.name = this.getNameThisClickProduct(e.target.parentElement);
    this.product.price = this.getPriceThisClickProduct(e.target.parentElement);
    this.product.quantity = this.getQuantityThisClickProduct(e.target.parentElement);

    this.productAddTocart();
  },


  /**
   * Возвращает наименование товара по которому кликнули
   * 
   * @param {HTML Element} productElement
   * @returns {string} 
   */
  getNameThisClickProduct(productElement) {
    return productElement.dataset.name;
  },

  /**
   * Возвращает цену товара по которому кликнули
   * 
   * @param {HTML Element} productElement
   * @returns {string} 
   */
  getPriceThisClickProduct(productElement) {
    return productElement.dataset.price;
  },

  /**
   * Возвращает количество товара по которому кликнули
   * 
   * @param {HTML Element} productElement
   * @returns {string} 
   */
  getQuantityThisClickProduct(productElement) {
    return productElement.dataset.quantity;
  },

  /**
   * Добавляет товар в корзину, увеличивает количество товара, считает итоговую сумму.
   * @param {obj} product Объект продукта с наименованием, ценой и количеством.
   */
  productAddTocart() {
    this.product.quantity++;
    this.productElement.dataset.quantity++;
    this.sum += +this.product.price;
    if (!this.cartWithProducts.includes(this.product.name)) {
      this.cartWithProducts.push(this.product.name);
      let productInCartElement = document.createElement('div');
      productInCartElement.classList.add('product-in-cart');
      productInCartElement.id = this.product.name;
      productInCartElement.textContent = `${this.product.name} - ${this.product.quantity} шт.  цена: ${this.product.price} ₽ `;
      this.cartElement.appendChild(productInCartElement);
    } else {
      document.getElementById(this.product.name).textContent = `${this.product.name} - ${this.product.quantity} шт.  цена: ${this.product.price} ₽ `;
    }

    this.totalSumElement.textContent = this.sum;
  }
}

cart.init();