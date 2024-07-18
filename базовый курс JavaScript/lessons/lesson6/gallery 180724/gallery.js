'use strict';

const gallery = {

  settings: {
    idHTMLElGallery: 'gallery',
    nameIdWrap: 'imgBtnWrap',
    nameClassWrap: 'img-btn-wrap',
    classFullImg: 'img-max',
    pathToImgBtnClose: 'img/gallery/close.png',
    classBtnClose: 'btn-close',
  },

  elementHTMLGallery: null,

  init(userSetings = {}) {
    Object.assign(this.settings, userSetings);
    this.elementHTMLGallery = document.getElementById(this.settings.idHTMLElGallery);
    this.elementHTMLGallery.addEventListener('click', (e) => this.handlerClickGallery(e));
  },

  handlerClickGallery(e) {
    if (e.target.tagName !== 'IMG') {
      return
    }
    let srcFullImgUrl = e.target.dataset.fullImageUrl;
    this.openImg(srcFullImgUrl);
  },

  openImg(src) {
    let fullImg = this.getScreenContainer().querySelector('.' + this.settings.classFullImg);
    fullImg.src = src;
  },

  getScreenContainer() {
    let screenContainer = document.getElementById('imgBtnWrap');
    return screenContainer ? screenContainer : this.createScreenContainer()
  },

  createScreenContainer() {
    let container = document.createElement('div');
    container.id = this.settings.nameIdWrap;
    container.className = this.settings.nameClassWrap;
    document.body.appendChild(container);

    let fullImg = new Image();
    fullImg.className = this.settings.classFullImg;
    container.appendChild(fullImg);

    let btnClose = document.createElement('button');
    btnClose.className = this.settings.classBtnClose;
    let imgBtnClose = new Image();
    imgBtnClose.src = this.settings.pathToImgBtnClose;
    btnClose.appendChild(imgBtnClose);
    container.appendChild(btnClose);
    btnClose.addEventListener('click', () => this.close());

    return container
  },

  close() {
    document.getElementById(this.settings.nameIdWrap).remove();
  }

}

window.onload = () => gallery.init()