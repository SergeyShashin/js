'use strict';
/*
3*. Добавить в галерею функцию перехода к следующему изображению. По сторонам от большой картинки
должны быть стрелки “вперед” и “назад”, по нажатию на которые происходит замена изображения на
следующее или предыдущее.
*/

const gallery = {
  galleryElement: null,
  prevImg: null,
  currentImg: null,
  nextImg: null,
  settings: {
    idGallery: 'gallery',
    pathBtnClose: 'img/gallery/close.png',
    pathNothingImg: 'img/gallery/nothing.png',
  },
  init(userSettings = {}) {
    Object.assign(this.settings, userSettings);
    this.galleryElement = document.getElementById(this.settings.idGallery);
    
    this.galleryElement.addEventListener('click', (e) => this.handlerClickGalleryElement(e));
  },
  handlerClickGalleryElement(e) {
    if (!(e.target.tagName === 'IMG')) {
      return
    }
    let src = e.target.dataset.fullImageUrl;
    this.currentImg = src;

    if (e.target.nextElementSibling) {
      this.nextImg = e.target.nextElementSibling.dataset.fullImageUrl;
    } else {
      this.nextImg = e.target.parentElement.firstElementChild.dataset.fullImageUrl;
    }

    if (e.target.previousElementSibling) {
      this.prevImg = e.target.previousElementSibling.dataset.fullImageUrl;
    } else {
      this.prevImg = e.target.parentElement.lastElementChild.dataset.fullImageUrl;
    }

    this.openImg(src);
  },
  openImg(src) {
    if (document.getElementById('monitor')) {
      console.log('Монитор создан. Изображение открыто.');
    } else {
      this.createMonitorAndImg(src);
    }
  },

  createMonitorAndImg(src) {
    let div = document.createElement('div');
    let btnClose = new Image();
    let img = new Image();
    let wrap = document.createElement('div');
    let btnLeft = document.createElement('div');
    let btnRight = document.createElement('div');
    div.id = 'monitor';
    img.src = src;
    img.dataset.current = src;
    img.onerror = () => img.src = this.settings.pathNothingImg;
    img.className = 'img-max';
    wrap.id = 'wrap';
    btnLeft.id = 'btnLeft';
    btnRight.id = 'btnRight';
    btnLeft.textContent = '<';
    btnRight.textContent = '>';
    btnLeft.className = 'btnControl';
    btnRight.className = 'btnControl';
    wrap.appendChild(img);
    wrap.appendChild(btnLeft);
    wrap.appendChild(btnRight);
    div.appendChild(wrap);
    document.body.appendChild(div);
    btnClose.src = this.settings.pathBtnClose;
    btnClose.className = 'btn-close';
    btnClose.addEventListener('click', () => div.remove());
    btnLeft.addEventListener('click', (e) => this.hadlerClickLeft(e));
    btnRight.addEventListener('click', (e) => this.hadlerClickRight(e));
    div.appendChild(btnClose);
  },
  hadlerClickLeft() {
    this.openImg(this.prevImg);
    let currentElement = document.querySelector(`[data-current="${this.currentImg}"]`);
    currentElement.src = this.prevImg;
    currentElement.dataset.current = this.prevImg;
    this.currentImg = this.prevImg;
    this.setPrevImg();
    this.setNextImg();
  },
  hadlerClickRight() {
    this.openImg(this.nextImg);
    let currentElement = document.querySelector(`[data-current="${this.currentImg}"]`);
    currentElement.src = this.nextImg;
    currentElement.dataset.current = this.nextImg;
    this.currentImg = this.nextImg;
    this.setPrevImg();
    this.setNextImg();
  },
  setPrevImg() {
    let currentElement = document.querySelector(`[data-full-image-url="${this.currentImg}"]`);
    if (currentElement.previousElementSibling) {
      this.prevImg = currentElement.previousElementSibling.dataset.fullImageUrl;
    } else {
      this.prevImg = currentElement.parentElement.lastElementChild.dataset.fullImageUrl;
    }
  },
  setNextImg() {
    let currentElement = document.querySelector(`[data-full-image-url="${this.currentImg}"]`);
    if (currentElement.nextElementSibling) {
      this.nextImg = currentElement.nextElementSibling.dataset.fullImageUrl;
    } else {
      this.nextImg = currentElement.parentElement.firstElementChild.dataset.fullImageUrl;
    }
  }
};

window.onload = () => gallery.init();
