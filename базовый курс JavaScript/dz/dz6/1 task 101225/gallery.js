'use strict';

/*
1. Доработать функцию замены картинки в галерее таким образом, чтобы она проверяла наличие большой
картинки по указанному в src адресу. Если такой картинки не существует или она не доступна, то должна
ставиться картинка-заглушка сообщающая об ошибке.
*/


const gallery = {
  settings: {
    idGallery: 'gallery',
    idMonitorHTMLEl: 'idMonitorHTMLEl',
    idBtnCloseHTMLEl: 'idBtnCloseHTMLEl',
    classBackground: 'background',
    classOpenedImage: 'classOpenedImage',
    pathToNofing: 'img/gallery/nothing.png'
  },
  galleryHTMLEl: null,


  init(userSettings = {}) {
    Object.assign(this.settings, userSettings);

    this.galleryHTMLEl = document.getElementById(this.settings.idGallery);
    this.galleryHTMLEl.addEventListener('click', e => this.handlerClickOnGallery(e));
  },


  handlerClickOnGallery(e) {
    if (e.target.tagName !== 'IMG') {
      return
    }

    let src = e.target.dataset.fullImageUrl;
    let testImg = new Image();
    testImg.src = src;
    testImg.onload = () => this.openImage(src);
    testImg.onerror = () => this.openImage(this.settings.pathToNofing);

  },


  openImage(src) {
    this.getImageHTMLEl().src = src;
  },


  getImageHTMLEl() {

    if (!this.getMonitorHTMLEl()) {
      this.createMonitorHTMLEl();
    }

    let imgHTMLEl = new Image();
    imgHTMLEl.classList.add(this.settings.classOpenedImage);
    this.getMonitorHTMLEl().appendChild(imgHTMLEl);

    return imgHTMLEl
  },


  getMonitorHTMLEl() {

    return document.getElementById(this.settings.idMonitorHTMLEl);
  },


  createMonitorHTMLEl() {
    let monitorHTMLEl = document.createElement('div');
    monitorHTMLEl.id = this.settings.idMonitorHTMLEl;
    let backgroundHTMLEl = document.createElement('div');
    backgroundHTMLEl.classList.add(this.settings.classBackground);
    let btnCloseHTMLEl = document.createElement('button');
    btnCloseHTMLEl.id = this.settings.idBtnCloseHTMLEl;
    btnCloseHTMLEl.textContent = 'X';

    monitorHTMLEl.appendChild(backgroundHTMLEl);
    monitorHTMLEl.appendChild(btnCloseHTMLEl);

    document.body.appendChild(monitorHTMLEl);

    btnCloseHTMLEl.addEventListener('click', () => monitorHTMLEl.remove());

    return monitorHTMLEl;
  }

};

window.onload = () => gallery.init();