'use strict';

/*
3*. Добавить в галерею функцию перехода к следующему изображению. По сторонам от большой картинки
должны быть стрелки “вперед” и “назад”, по нажатию на которые происходит замена изображения на
следующее или предыдущее.
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
  idCurentImg: null,
  idPreviousImg: null,
  idNextImg: null
}

/**
 * @type {Object} Галерея
 */
const gallery = {
  settings,
  galleryElement: null,
  idCurentImg: null,
  idPreviousImg: null,
  idNextImg: null,

  /**
   * Инициализация галереи
   * @param {Object} userSettings Пользовательские настройки 
   */
  init(userSettings = {}) {
    Object.assign(this.settings, userSettings);
    this.galleryElement = document.getElementById(this.settings.galleryElementId);

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

    this.setIdImages(e.target);

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
    fullImgElement.id = 'imgInWrap' + this.idCurentImg;

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
    let imgElementinwrap = document.getElementById('wrap').querySelector('img');
    let previosImgElement = document.getElementById(this.idPreviousImg);
    imgElementinwrap.src = previosImgElement.dataset.fullImageUrl;
    this.setIdImages(previosImgElement);
  },

  handleRightClick() {
    let imgElementinwrap = document.getElementById('wrap').querySelector('img');
    let nextImgElement = document.getElementById(this.idNextImg);

    imgElementinwrap.src = nextImgElement.dataset.fullImageUrl;
    this.setIdImages(nextImgElement);
  },

  setIdImages(curentImgElement) {
    this.idCurentImg = curentImgElement.id;

    this.idPreviousImg = curentImgElement.previousElementSibling
      ? curentImgElement.previousElementSibling.id
      : curentImgElement.parentElement.lastElementChild.id;

    this.idNextImg = curentImgElement.nextElementSibling
      ? curentImgElement.nextElementSibling.id
      : curentImgElement.parentElement.firstElementChild.id;
  }

}

gallery.init();