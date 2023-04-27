'use strict';

/*
1. Доработать функцию замены картинки в галерее таким образом, чтобы она проверяла наличие большой
картинки по указанному в src адресу. Если такой картинки не существует или она не доступна, то должна
ставиться картинка-заглушка сообщающая об ошибке.
*/

/**
 * @type {Object} Настройки галереи
 */
const settings = {
  galleryElementId: 'gallery',
  displayElementId: 'display',
  closeElementPathImg: 'img/gallery/close.png',
  closeId: 'close',
  wrapId: 'wrap',
}

/**
 * @type {Object} Галерея
 */
const gallery = {
  settings,
  galleryElement: null,

  /**
   * Инициализация галереи
   * @param {Object} userSettings Пользовательские настройки 
   */
  init(userSettings = {}) {
    Object.assign(this.settings, userSettings);
    this.galleryElement = document.getElementById(this.settings.galleryElementId);

    this.imgElemnts = this.galleryElement.querySelectorAll('img');

    this.galleryElement.addEventListener('click', (e) => this.handlerClick(e));
  },

  /**
   * Открывает изображение в полном разрешении
   * @param {Event} e Событие клика по галерее 
   */
  handlerClick(e) {

    if (e.target.tagName !== 'IMG') {
      return
    }

    let srcFullImgUrl = e.target.dataset.fullImageUrl;
    this.openFullImg(srcFullImgUrl);
  },

  /**
   * Открывает дисплей с картинкой в полном разрешении
   * @param {string} src Путь к картинке 
   */
  openFullImg(src) {
    let displayElement = this.getDisplay(src);
    document.body.appendChild(displayElement);
  },

  /**
   * Возвращает или создаёт дисплей
   * @param {string} src Путь к картинке
   */
  getDisplay(src) {
    let displayElement = document.getElementById(this.settings.displayElementId);

    if (displayElement) {
      return displayElement;
    }

    displayElement = document.createElement('div');
    displayElement.id = this.settings.displayElementId;

    let closeElement = new Image();
    closeElement.id = this.settings.closeId;
    closeElement.src = this.settings.closeElementPathImg;
    displayElement.appendChild(closeElement);
    closeElement.addEventListener('click', () => this.close(displayElement));

    let wrapElement = document.createElement('div');
    wrapElement.id = this.settings.wrapId;

    let fullImgElement = new Image();
    fullImgElement.src = src;

    wrapElement.appendChild(fullImgElement);

    let arrowLeftElement = document.createElement('div');
    arrowLeftElement.id = 'arrow-left';
    arrowLeftElement.textContent = '<';
    arrowLeftElement.addEventListener('click', () => this.handleLeftClick());
    let arrowRightElement = document.createElement('div');
    arrowRightElement.id = 'arrow-right';
    arrowRightElement.textContent = '>';
    arrowRightElement.addEventListener('click', () => this.handleRightClick());
    wrapElement.appendChild(arrowLeftElement);
    wrapElement.appendChild(arrowRightElement);

    displayElement.appendChild(wrapElement);

    return displayElement;
  },

  /**
   * Закрывает дисплей с картинкой
   * @param {HTMLElement} displayElement Дисплей 
   */
  close(displayElement) {
    displayElement.remove();
  },

  handleLeftClick() {
    console.log('Клик влево.');

  },

  handleRightClick() {
    console.log('Клик вправо.');
  }

}

gallery.init();