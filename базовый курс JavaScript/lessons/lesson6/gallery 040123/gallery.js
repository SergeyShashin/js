'use strict';

/**
 * @type {Object} Настройки.
 */
const settings = {
  idGallaryElement: 'gallery',
  idGallaryWrapElement: 'gallery-wrap',
  classImgBtnWrapElement: 'img-btn-wrap',
  classImgElement: 'img-max',
  buttonCloseClass: 'btn-close',
  buttonCloseSrcImage: 'img/gallery/close.png',
};

/**
 * @type {Object} Галерея.
 */
const gallery = {
  settings,

  /**
   * Инициализация галереи
   * @param {Object} userSettings Возможность изменить настройки 
   */
  init(userSettings = {}) {
    Object.assign(this.settings, userSettings);
    let galleryElement = document.getElementById(this.settings.idGallaryElement);
    galleryElement.addEventListener('click', event => this.handlerClick(event));
  },

  /**
   * Обрабатывает клик по картинке
   * @param {Event} event 
   */
  handlerClick(event) {
    if (event.target.tagName !== 'IMG') {
      return;
    }
    let srcFullImageUrl = event.target.dataset.fullImageUrl;

    this.openMaxImg(srcFullImageUrl);

  },

  openMaxImg(srcFullImageUrl) {
    this.createImgBtnWrap();
    document.querySelector('.' + this.settings.classImgElement).src = srcFullImageUrl;

  }, 

  createImgBtnWrap() {
    let imgBtnWrapElement = document.createElement('div');
    imgBtnWrapElement.className = this.settings.classImgBtnWrapElement;
    document.body.appendChild(imgBtnWrapElement);

    imgBtnWrapElement.appendChild(this.createImg());

    let btnCloseElement = document.createElement('button');
    btnCloseElement.className = this.settings.buttonCloseClass;
    imgBtnWrapElement.appendChild(btnCloseElement);

    let imgCloseElement = new Image();
    imgCloseElement.src = this.settings.buttonCloseSrcImage;
    btnCloseElement.appendChild(imgCloseElement);
    imgCloseElement.addEventListener('click', () => this.handlerClickClose(imgBtnWrapElement));
  },

  createImg() {
    let imgElement = new Image();
    imgElement.className = this.settings.classImgElement;
    return imgElement;
  },

  handlerClickClose(imgBtnWrapElement) {
    imgBtnWrapElement.remove();
  },

};

window.onload = gallery.init();