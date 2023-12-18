'use strict';

/*
3*. Добавить в галерею функцию перехода к следующему изображению. По сторонам от большой картинки
должны быть стрелки “вперед” и “назад”, по нажатию на которые происходит замена изображения на
следующее или предыдущее.
*/

const settings = {
  idGallery: 'gallery',
  idWrap: 'wrap',
  idDisplay: 'display',
  classFullImg: 'fullImg',
  idBtnClose: 'close',
  srcImgClose: 'img/gallery/close.png',
  srcImgNothing: 'img/gallery/nothing.png',
  idArrowLeft: 'arrow-left',
  idArrowRight: 'arrow-right',
};

const gallery = {
  settings,
  htmlElementGallery: null,
  siblingLeft: null,
  siblingRight: null,

  init(userSettings = {}) {
    Object.assign(this.settings, userSettings);
    this.htmlElementGallery = document.getElementById(this.settings.idGallery);
    this.htmlElementGallery.addEventListener('click', event => this.handlerClickGallery(event));
  },

  handlerClickGallery(event) {
    let targetElement = event.target;

    if (targetElement.tagName !== 'IMG') {
      return
    }

    this.setSiblings(targetElement);
    // console.dir(targetElement.id);

    let pathFullImage = targetElement.dataset.fullImageUrl;

    this.getWrap();

    let img = new Image();
    img.onload = () => this.openImage(pathFullImage);
    img.onerror = () => this.openImage(this.settings.srcImgNothing);
    img.src = pathFullImage;
  },

  openImage(pathFullImage) {
    let fullImg = document.querySelector('.' + this.settings.classFullImg);
    fullImg.src = pathFullImage;
  },

  getWrap() {
    let wrap = document.getElementById(this.settings.idWrap);

    if (wrap) {
      return wrap;
    }

    this.createWrap();
  },

  createWrap() {
    let divWrap = document.createElement('div');
    divWrap.id = 'wrap';
    document.body.appendChild(divWrap);

    let divDisplay = document.createElement('div');
    divDisplay.id = 'display';
    divWrap.appendChild(divDisplay);

    let fullImg = new Image();
    fullImg.className = this.settings.classFullImg;
    divDisplay.appendChild(fullImg);

    let btnClose = new Image();
    btnClose.id = this.settings.idBtnClose;
    btnClose.src = this.settings.srcImgClose;
    divWrap.appendChild(btnClose);
    btnClose.addEventListener('click', () => this.close());

    let arrowLeft = document.createElement('div');
    arrowLeft.id = this.settings.idArrowLeft;
    arrowLeft.textContent = '<';
    divWrap.appendChild(arrowLeft);
    arrowLeft.addEventListener('click', () => this.handlerMoveLeft());
    
    let arrowRight = document.createElement('div');
    arrowRight.id = this.settings.idArrowRight;
    arrowRight.textContent = '>';
    divWrap.appendChild(arrowRight);
    arrowRight.addEventListener('click', () => this.handlerMoveRight());

  },

  close() {
    document.getElementById(this.settings.idWrap).remove();
  },

  setSiblings(targetElement) {
    this.siblingLeft = targetElement.previousElementSibling
      ? targetElement.previousElementSibling
      : targetElement.parentElement.lastElementChild;


    this.siblingRight = targetElement.nextElementSibling
      ? targetElement.nextElementSibling
      : targetElement.parentElement.firstElementChild;
  },

  handlerMoveLeft() {

    this.openImage(this.siblingLeft.dataset.fullImageUrl);
    this.setSiblings(this.siblingLeft);
  },

  handlerMoveRight() {
    this.openImage(this.siblingRight.dataset.fullImageUrl);
    this.setSiblings(this.siblingRight);
  },





}

gallery.init();