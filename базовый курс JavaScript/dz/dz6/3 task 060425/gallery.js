'use strict';

/*
3*. Добавить в галерею функцию перехода к следующему изображению. По сторонам от большой картинки
должны быть стрелки “вперед” и “назад”, по нажатию на которые происходит замена изображения на
следующее или предыдущее.
*/

const settings = {
  galleryElId: 'gallery',
  monitorClass: 'monitor',
  backgroundClass: 'background',
  imgClass: 'img',
  btnCloseClass: 'close',
  pathImgClose: 'img/gallery/close.png',
  pathImgInfo: 'img/gallery/nothing.png'
}

const gallery = {
  settings,
  galleryEl: null,
  currentImgEl: null,
  prevImgEl: null,
  nextImgEl: null,

  init(userSettings = {}) {
    Object.assign(this.settings, userSettings);
    this.galleryEl = document.getElementById(this.settings.galleryElId);
    this.setEventHandlers();
  },

  setEventHandlers() {
    this.galleryEl.addEventListener('click', e => this.handlerClickGalleryEl(e));
  },

  handlerClickGalleryEl(e) {
    if (e.target.tagName !== 'IMG') {
      return
    }

    this.currentImgEl = e.target;
    this.setPrevAndNextImgEl(this.currentImgEl);

    let srcImg = e.target.dataset.fullImageUrl;
    this.openImg(srcImg);
  },

  openImg(src) {
    let divForImgEl = document.createElement('div');
    divForImgEl.classList.add(this.settings.imgClass);
    let imgEl = document.createElement('img');
    imgEl.src = src;
    imgEl.onerror = () => imgEl.src = this.settings.pathImgInfo;
    divForImgEl.appendChild(imgEl);
    let monitorEl = this.getMonitor();
    monitorEl.appendChild(divForImgEl);
  },

  getMonitor() {
    let monitorEl = document.querySelector('.' + this.settings.monitorClass);
    if (monitorEl) {
      monitorEl.querySelector('.img').remove();
      return monitorEl
    }

    return this.createMonitorEl();
  },

  createMonitorEl() {
    let monitorEl = document.createElement('div');
    monitorEl.classList.add(this.settings.monitorClass);
    let backgroundEl = document.createElement('div');
    backgroundEl.classList.add(this.settings.backgroundClass);
    monitorEl.appendChild(backgroundEl);
    let btnCloseEl = document.createElement('div');
    btnCloseEl.classList.add(this.settings.btnCloseClass);
    let imgBtnCloseEl = document.createElement('img');
    imgBtnCloseEl.src = this.settings.pathImgClose;
    btnCloseEl.appendChild(imgBtnCloseEl);
    monitorEl.appendChild(btnCloseEl);
    document.body.appendChild(monitorEl);

    let btnLeftEl = document.createElement('button');
    let btnRightEl = document.createElement('button');
    btnLeftEl.textContent = '<';
    btnRightEl.textContent = '>';
    btnLeftEl.id = 'btnLeft';
    btnRightEl.id = 'btnRight';
    monitorEl.appendChild(btnLeftEl);
    monitorEl.appendChild(btnRightEl);

    btnCloseEl.addEventListener('click', () => this.closeMonitor(monitorEl));
    btnLeftEl.addEventListener('click', e => this.moveLeft(e));
    btnRightEl.addEventListener('click', e => this.moveRight(e));

    return monitorEl;
  },

  closeMonitor(monitorEl) {
    monitorEl.remove();
  },

  moveLeft() {
    this.openImg(this.prevImgEl.dataset.fullImageUrl);
    this.currentImgEl = this.prevImgEl;
    this.setPrevAndNextImgEl(this.currentImgEl);
  },

  moveRight() {
    this.openImg(this.nextImgEl.dataset.fullImageUrl);
    this.currentImgEl = this.nextImgEl;
    this.setPrevAndNextImgEl(this.currentImgEl);
  },

  setPrevImgEl(currentImgEl) {
    this.prevImgEl =
      currentImgEl.previousElementSibling
        ? currentImgEl.previousElementSibling
        : currentImgEl.parentElement.lastElementChild;
  },

  setNextImgEl(currentImgEl) {
    this.nextImgEl = currentImgEl.nextElementSibling
      ? currentImgEl.nextElementSibling
      : currentImgEl.parentElement.firstElementChild;
  },

  setPrevAndNextImgEl(currentImgEl) {
    this.setPrevImgEl(currentImgEl);
    this.setNextImgEl(currentImgEl);
  }

}

window.onload = () => gallery.init();