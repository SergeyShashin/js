'use strict';
/*
3*. Добавить в галерею функцию перехода к следующему изображению. По сторонам от большой картинки
должны быть стрелки “вперед” и “назад”, по нажатию на которые происходит замена изображения на
следующее или предыдущее.
*/

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
   * @property {string} imgBtnClosePath Путь к файлу с изображением кнопки закрыть.
   * @property {string} imgNotLoadingPath Путь к файлу с запасным изображением.
   */
  settings: {
    idGallery: 'gallery',
    classGallaryWrap: 'gallery-wrap',
    classImgBtnWrap: 'img-btn-wrap',
    classImgMax: 'img-max',
    classBtnClose: 'btn-close',
    imgBtnClosePath: 'img/gallery/close.png',
    imgNotLoadingPath: 'img/gallery/nothing.png',
  },
  elementGallery: null,
  pathToImgBigSize: null,
  galleryWrapElement: null,
  imgBtnWrapElement: null,
  imgMax: null,

  curentOpenImgId: null,

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

    this.curentOpenImgId = event.target.id;

    this.pathToImgBigSize = event.target.dataset.fullImageUrl;

    this.createGalleryWrapElement();

    this.createImgBtnWrapElement();

    this.createArrowLeft();

    this.addImgMax();

    this.createArrowRight();

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
   * Создаёт блок для большого изображения и кнопки закрыть
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
    imgBtnClose.src = this.settings.imgBtnClosePath;
    btnClosecElement.appendChild(imgBtnClose);

    imgBtnClose.addEventListener('click', () => this.close());
  },

  /**
   * Создает и добавляет изображение большого размера в imgBtnWrap 
   */
  addImgMax() {
    this.imgMax = document.createElement('img');
    this.imgMax.classList.add(this.settings.classImgMax);
    this.imgMax.src = this.pathToImgBigSize;
    this.imgMax.onerror = () => this.imgMax.src = this.settings.imgNotLoadingPath;
    this.imgBtnWrapElement.appendChild(this.imgMax);
  },

  /**
   * Закрывает текущеее изображение большого размера
   */
  close() {
    this.imgBtnWrapElement.remove();
    this.galleryWrapElement.remove();
  },

  /**
   * Создает элемент стрелки влево
   */
  createArrowLeft() {
    let arrowLeft = document.createElement('div');
    arrowLeft.classList.add('arrow-left');
    arrowLeft.textContent = '<';
    this.imgBtnWrapElement.appendChild(arrowLeft);
    arrowLeft.addEventListener('click', (e) => this.clickLeft(e));

  },

  /**
   * Создает элемент стрелки вправо
   */
  createArrowRight() {
    let arrowRight = document.createElement('div');
    arrowRight.classList.add('arrow-right');
    arrowRight.textContent = '>';
    this.imgBtnWrapElement.appendChild(arrowRight);
    arrowRight.addEventListener('click', () => this.clickRight());
  },

  /**
   * Обрабатывает клик влево
   */
  clickLeft() {
    if (document.getElementById(this.curentOpenImgId).previousElementSibling) {
      this.imgMax.src = document.getElementById(this.curentOpenImgId).previousElementSibling.dataset.fullImageUrl;
      this.curentOpenImgId = document.getElementById(this.curentOpenImgId).previousElementSibling.id;
    } else {
      this.imgMax.src = document.getElementById(this.curentOpenImgId).parentElement.lastElementChild.dataset.fullImageUrl;
      this.curentOpenImgId = document.getElementById(this.curentOpenImgId).parentElement.lastElementChild.id;
    }
  },

  /**
   * Обрабатывает клик вправо
   */
  clickRight() {
    if (document.getElementById(this.curentOpenImgId).nextElementSibling) {
      this.imgMax.src = document.getElementById(this.curentOpenImgId).nextElementSibling.dataset.fullImageUrl;
      this.curentOpenImgId = document.getElementById(this.curentOpenImgId).nextElementSibling.id;
    } else {
      this.imgMax.src = document.getElementById(this.curentOpenImgId).parentElement.firstElementChild.dataset.fullImageUrl;
      this.curentOpenImgId = document.getElementById(this.curentOpenImgId).parentElement.firstElementChild.id;
    }
  },


}

window.onload = () => gallery.init();