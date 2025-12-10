'use strict';

const gallery = {
  settings: {
    idGallery: 'gallery',
    idMonitorHTMLEl: 'idMonitorHTMLEl',
    idBtnCloseHTMLEl: 'idBtnCloseHTMLEl',
    classBackground: 'background',
    classOpenedImage: 'classOpenedImage'
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

    this.openImage(e.target.dataset.fullImageUrl);
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