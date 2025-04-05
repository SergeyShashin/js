'use strict';

const settings = {
  galleryElId: 'gallery',
  monitorClass: 'monitor',
  backgroundClass: 'background',
  imgClass: 'img',
  btnCloseClass: 'close',
  pathImgClose: 'img/gallery/close.png'
}

const gallery = {
  settings,
  galleryEl: null,

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

    let srcImg = e.target.dataset.fullImageUrl;
    this.openImg(srcImg);
  },

  openImg(src) {
    let divForImgEl = document.createElement('div');
    divForImgEl.classList.add(this.settings.imgClass);
    let imgEl = document.createElement('img');
    imgEl.src = src;
    divForImgEl.appendChild(imgEl);
    let monitorEl = this.getMonitor();
    monitorEl.appendChild(divForImgEl);
  },

  getMonitor() {
    let monitorEl = document.querySelector('.' + this.settings.monitorClass);
    if (monitorEl) {
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

    btnCloseEl.addEventListener('click', () => this.closeMonitor(monitorEl));

    return monitorEl;
  },

  closeMonitor(monitorEl) {
    monitorEl.remove();
  }

}

window.onload = () => gallery.init();