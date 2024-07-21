'use strict';

/*
3*. Добавить в галерею функцию перехода к следующему изображению. По сторонам от большой картинки
должны быть стрелки “вперед” и “назад”, по нажатию на которые происходит замена изображения на
следующее или предыдущее.
*/

const gallery = {

  settings: {
    idHTMLElGallery: 'gallery',
    nameIdWrap: 'imgBtnWrap',
    nameClassWrap: 'img-btn-wrap',
    classFullImg: 'img-max',
    pathToImgBtnClose: 'img/gallery/close.png',
    pathToNothingImg: 'img/gallery/nothing.png',
    classBtnClose: 'btn-close',
  },

  elementHTMLGallery: null,
  idCurrentImg: null,

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
    this.idCurrentImg = e.target.id;
    // this.openImg(srcFullImgUrl);
    this.checkFullImg(srcFullImgUrl);
  },
  checkFullImg(src) {
    let checkImg = new Image();
    checkImg.onload = () => this.openImg(src);
    checkImg.onerror = () => this.openImg(this.settings.pathToNothingImg);
    checkImg.src = src;
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

    let btnLeft = document.createElement('div');
    btnLeft.textContent = '<';
    btnLeft.className = 'btnLeft';
    let btnRight = document.createElement('div');
    btnRight.textContent = '>';
    btnRight.className = 'btnRight';

    btnClose.appendChild(imgBtnClose);
    container.appendChild(btnClose);
    container.appendChild(btnLeft);
    container.appendChild(btnRight);
    btnClose.addEventListener('click', () => this.close());
    btnLeft.addEventListener('click', () => this.handlerClickLeft());
    btnRight.addEventListener('click', () => this.handlerClickRight());

    return container
  },

  close() {
    document.getElementById(this.settings.nameIdWrap).remove();
  },

  handlerClickLeft() {
    let currentElement = document.getElementById(this.idCurrentImg);
    let prevImg = currentElement.previousElementSibling;

    if (prevImg) {
      this.openImg(prevImg.dataset.fullImageUrl);
      this.idCurrentImg = prevImg.id;
      this.checkFullImg(prevImg.dataset.fullImageUrl);
    } else {
      let lastImg = currentElement.parentElement.lastElementChild;
      this.openImg(lastImg.dataset.fullImageUrl);
      this.idCurrentImg = lastImg.id;
      this.checkFullImg(lastImg.dataset.fullImageUrl);
    }
  },

  handlerClickRight() {
    let currentElement = document.getElementById(this.idCurrentImg);
    let nextImg = currentElement.nextElementSibling;

    if (nextImg) {
      this.openImg(nextImg.dataset.fullImageUrl);
      this.idCurrentImg = nextImg.id;
      this.checkFullImg(nextImg.dataset.fullImageUrl);

    } else {
      let firstImg = currentElement.parentElement.firstElementChild;
      this.openImg(firstImg.dataset.fullImageUrl);
      this.idCurrentImg = firstImg.id;
      this.checkFullImg(firstImg.dataset.fullImageUrl);
    }
  }

}

window.onload = () => gallery.init()