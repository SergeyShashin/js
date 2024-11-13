'use strict';

/*
3*. Добавить в галерею функцию перехода к следующему изображению. По сторонам от большой картинки
должны быть стрелки “вперед” и “назад”, по нажатию на которые происходит замена изображения на
следующее или предыдущее.
*/


const settings = {
  galleryEl: 'gallery',
  galleryWrapEl: 'gallery-wrap',
  pathToImgBtnClose: 'img/gallery/close.png',
  pathToImgNothing: 'img/gallery/nothing.png',
  btnCloseEl: 'btnClose',
  openImgEl: 'openImg',
};

const gallery = {
  settings,
  imagesEls: [],
  imagesPathsToFullImg: [],

  init(userSettings = {}) {
    Object.assign(this.settings, userSettings);
    this.run();
  },

  run() {
    let galleryEl = document.getElementById(this.settings.galleryEl);
    this.imagesEls = galleryEl.querySelectorAll('img');

    for (let el of this.imagesEls) {
      this.imagesPathsToFullImg.push(el.dataset.fullImageUrl);
    }

    galleryEl.addEventListener('click', e => this.handlerClick(e));
  },

  handlerClick(e) {
    if (e.target.tagName !== 'IMG') {
      return
    }

    this.openImg(e.target.dataset.fullImageUrl);

  },

  openImg(pathFullImg) {

    this.getScreenContainer();
    let openImgEl = document.getElementById(this.settings.openImgEl);
    openImgEl.src = pathFullImg;
    openImgEl.onerror = () => openImgEl.src = this.settings.pathToImgNothing;
  },

  getScreenContainer() {
    let screenContainer = document.getElementById(this.settings.galleryWrapEl);

    if (screenContainer) {
      return screenContainer;
    }

    this.createScrinContainer();

    return screenContainer;

  },

  createScrinContainer() {
    let containerEl = document.createElement('section');
    containerEl.id = this.settings.galleryWrapEl;
    document.body.appendChild(containerEl);

    let imgBtnClose = new Image;
    imgBtnClose.src = this.settings.pathToImgBtnClose;
    imgBtnClose.id = this.settings.btnCloseEl;
    containerEl.appendChild(imgBtnClose);
    imgBtnClose.addEventListener('click', () => this.closeScrinContainer(containerEl));

    let monitorEl = document.createElement('div');
    monitorEl.id = 'monitor';
    containerEl.appendChild(monitorEl);

    let fullImg = new Image();
    fullImg.id = this.settings.openImgEl;
    monitorEl.appendChild(fullImg);

    let arrowRightEl = document.createElement('div');
    arrowRightEl.textContent = '>';
    arrowRightEl.id = 'arrowRight';
    containerEl.appendChild(arrowRightEl);
    arrowRightEl.addEventListener('click', () => this.moveRightHandler());

    let arrowLeftEl = document.createElement('div');
    arrowLeftEl.textContent = '<';
    arrowLeftEl.id = 'arrowLeft';
    containerEl.appendChild(arrowLeftEl);
  },

  closeScrinContainer(containerEl) {
    containerEl.remove();
  },

  moveRightHandler() {

  }
}

gallery.init();

