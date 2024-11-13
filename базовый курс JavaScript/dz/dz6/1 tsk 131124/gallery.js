'use strict';

/*
1. Доработать функцию замены картинки в галерее таким образом, чтобы она проверяла наличие большой
картинки по указанному в src адресу. Если такой картинки не существует или она не доступна, то должна
ставиться картинка-заглушка сообщающая об ошибке.
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

  init(userSettings = {}) {
    Object.assign(this.settings, userSettings);
    this.run();
  },

  run() {
    document.getElementById(this.settings.galleryEl).addEventListener('click', e => this.handlerClick(e));
  },

  handlerClick(e) {
    if (e.target.tagName !== 'IMG') {
      return
    }

    this.openImg(e.target);
  },

  openImg(target) {
    let pathFullImg = target.dataset.fullImageUrl;
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
  },

  closeScrinContainer(containerEl) {
    containerEl.remove();
  },

}

gallery.init();

