'use strict';

const settings = {
  idGallery: 'gallery',
  idWrapForBigImg: "wrapForBigImg",
  idImgClose: 'imgClose',
  pathToImgClose: 'img/gallery/close.png',
  classImgMax: 'imgMax',

};

const gallery = {
  settings,

  init() {
    let galleryElement = document.getElementById(this.settings.idGallery);
    this.setHandlerClick(galleryElement);

  },

  setHandlerClick(galleryElement) {
    galleryElement.addEventListener('click', (event) => this.handlerClick(event));
  },

  handlerClick(event) {
    if (event.target.tagName !== 'IMG') {
      return;
    }

    let src = event.target.dataset.fullImgUrl;

    this.openBigImage(src);
  },

  openBigImage(src) {
    this.createWrapForBigImg();    
    document.getElementById(this.settings.idWrapForBigImg).querySelector('.' + this.settings.classImgMax).src = src;
  },

  createWrapForBigImg() {
    let wrapForBigImgElement = document.createElement('div');
    wrapForBigImgElement.id = this.settings.idWrapForBigImg;
    document.body.appendChild(wrapForBigImgElement);

    let imgClose = new Image();
    imgClose.id = this.settings.idImgClose;
    imgClose.src = this.settings.pathToImgClose;
    wrapForBigImgElement.appendChild(imgClose);
    imgClose.addEventListener('click', () => wrapForBigImgElement.remove());

    let imgMax = new Image();
    imgMax.className = this.settings.classImgMax;
    wrapForBigImgElement.appendChild(imgMax);

  }




};

window.onload = gallery.init();