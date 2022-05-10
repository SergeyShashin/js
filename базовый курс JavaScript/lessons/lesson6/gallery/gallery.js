'use strict';
/**
 * @type {Object} gallery Галерея.
 * @property {Object} settings Настройки.
 */
const gallery = {
  /**
   * @type {Object} settings Настройки.
   * @property {string} idGallery id Галереи.
   * @property {string} classGallaryWrap Класс обертки для открытия изображений большого размера.
   * @property {string} classImgBtnWrap Класс блока с большим изображением и кнопкой закрыть.
   * @property {string} classImgMax Класс для изображения большого размера.
   * @property {string} classBtnClose Класс для кнопки закрыть.
   * @property {string} ImgBtnClosePath Путь к файлу с изображением кнопки закрыть.
   */
  settings: {
    idGallery: 'gallery',
    classGallaryWrap: 'gallery-wrap',
    classImgBtnWrap: 'img-btn-wrap',
    classImgMax: 'img-max',
    classBtnClose: 'btn-close',
    ImgBtnClosePath: 'img/gallery/close.png',
  },
  elementGallery: null,
  pathToImgBigSize: null,
  galleryWrapElement: null,
  imgBtnWrapElement: null,

  /**
   * Инициализация объекта галереи
   */
  init(userSettings = {}) {
    Object.assign(this.settings, userSettings);
    this.elementGallery = document.getElementById(this.settings.idGallery);
    this.elementGallery.addEventListener('click', (event) => this.clickHandler(event));
  },

  /**
   * Обработчик клика
   * @param {NodeList} event Событие клика.
   */
  clickHandler(event) {
    if (event.target.tagName !== 'IMG') {
      return
    }

    this.pathToImgBigSize = event.target.dataset.fullImageUrl;

    this.createGalleryWrapElement();

    this.createImgBtnWrapElement();

    this.addImgMax();

    this.createBtnClose();

  },

  /**
   * Создаёт обертку для открытия изображений большого размера.
   */
  createGalleryWrapElement() {
    this.galleryWrapElement = document.createElement('div');
    this.galleryWrapElement.classList.add(this.settings.classGallaryWrap);
    document.body.appendChild(this.galleryWrapElement);
  },

  /**
   * Создаёт блок для большого изображения и кнопки закрытью
   */
  createImgBtnWrapElement() {
    this.imgBtnWrapElement = document.createElement('div');
    this.imgBtnWrapElement.classList.add(this.settings.classImgBtnWrap);
    document.body.appendChild(this.imgBtnWrapElement);
  },

  /**
   * Создаёт кнопку закрыть и добавляет её в блок imgBtnWrap.
   */
  createBtnClose() {
    let btnClosecElement = document.createElement('button');
    btnClosecElement.classList.add(this.settings.classBtnClose);
    this.imgBtnWrapElement.appendChild(btnClosecElement);

    let imgBtnClose = document.createElement('img');
    imgBtnClose.src = this.settings.ImgBtnClosePath;
    btnClosecElement.appendChild(imgBtnClose);
  },

  //*Создает и добавляет изображение большого размера в imgBtnWrap
  addImgMax() {
    let imgMax = document.createElement('img');
    imgMax.classList.add(this.settings.classImgMax);
    imgMax.src = this.pathToImgBigSize;
    this.imgBtnWrapElement.appendChild(imgMax);
  }

}

window.onload = () => gallery.init();