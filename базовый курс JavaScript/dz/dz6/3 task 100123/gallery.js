'use strict';

const settings = {
  idGallery: 'gallery',
  idWrapForBigImg: "wrapForBigImg",
  idImgClose: 'imgClose',
  pathToImgClose: 'img/gallery/close.png',
  pathToImgNothing: 'img/gallery/nothing.png',
  classImgMax: 'imgMax',
  idArrowLeft: 'arrowLeft',
  idArrowRight: 'arrowRight',

};

const gallery = {
  settings,
  galleryElement: null,


  init() {
    this.galleryElement = document.getElementById(this.settings.idGallery);
    this.setHandlerClick();

  },

  setHandlerClick() {
    this.galleryElement.addEventListener('click', (event) => this.handlerClick(event));
  },

  handlerClick(event) {
    if (event.target.tagName !== 'IMG') {
      return;
    }

    let src = event.target.dataset.fullImgUrl;


    let img = new Image();
    img.onload = () => this.openBigImage(src);
    img.onerror = () => this.openBigImage(this.settings.pathToImgNothing);
    img.src = src;


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

    let arrowLeft = document.createElement('div');
    arrowLeft.id = this.settings.idArrowLeft;
    wrapForBigImgElement.appendChild(arrowLeft);
    arrowLeft.addEventListener('click', () => this.moveLeft());

    let arrowRight = document.createElement('div');
    arrowRight.id = this.settings.idArrowRight;
    wrapForBigImgElement.appendChild(arrowRight);
    arrowRight.addEventListener('click', () => this.moveRight());

  },

  // moveLeft() {
  //   document.querySelector('.' + this.settings.classImgMax).src = this.leftElement;
  // },

  // moveRight() {
  //   document.querySelector('.' + this.settings.classImgMax).src = this.rightElement;
  // }




};

window.onload = gallery.init();