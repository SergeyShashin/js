'use strict';

const settings = {
  galleryEl: 'gallery',
  galleryWrapEl: 'gallery-wrap',
  pathToImgBtnClose: 'img/gallery/close.png',
  btnCloseEl: 'btnClose',
  openImgEl: 'openImg'
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
    document.getElementById(this.settings.openImgEl).src = pathFullImg;
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

    let monitorEl = document.createElement('div');
    monitorEl.id = 'monitor';
    containerEl.appendChild(monitorEl);

    let fullImg = new Image();
    fullImg.id = this.settings.openImgEl;
    monitorEl.appendChild(fullImg);

  }

}

gallery.init();

