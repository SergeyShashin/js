'use strict';

/*
3*. Добавить в галерею функцию перехода к следующему изображению. По сторонам от большой картинки
должны быть стрелки “вперед” и “назад”, по нажатию на которые происходит замена изображения на
следующее или предыдущее.
*/


const gallery = {
  settings: {
    idGallery: 'gallery',
    idMonitorHTMLEl: 'idMonitorHTMLEl',
    idBtnCloseHTMLEl: 'idBtnCloseHTMLEl',
    idBtnLeftHTMLEl: 'idBtnLeftHTMLEl',
    idBtnRightHTMLEl: 'idBtnRightHTMLEl',
    classBackground: 'background',
    classOpenedImage: 'classOpenedImage',
    pathToNofing: 'img/gallery/nothing.png'
  },
  galleryHTMLEl: null,
  monitorHTMLEl: null,
  imagesHTMLEls: null,
  imagesFullImageUrl: null,
  numberCurrentOpenedImg: null,


  init(userSettings = {}) {
    Object.assign(this.settings, userSettings);

    this.galleryHTMLEl = document.getElementById(this.settings.idGallery);
    this.imagesHTMLEls = this.galleryHTMLEl.querySelectorAll('img');
    this.imagesFullImageUrl = [];


    for (let i = 0; i < this.imagesHTMLEls.length; i++) {
      let dataset = this.imagesHTMLEls[i].dataset;
      this.imagesFullImageUrl.push(dataset.fullImageUrl);
      dataset.number = i;
    }


    this.galleryHTMLEl.addEventListener('click', e => this.handlerClickOnGallery(e));
  },


  handlerClickOnGallery(e) {

    if (e.target.tagName !== 'IMG') {
      return
    }
    this.numberCurrentOpenedImg = e.target.dataset.number;

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
    this.monitorHTMLEl = document.createElement('div');
    this.monitorHTMLEl.id = this.settings.idMonitorHTMLEl;

    let backgroundHTMLEl = document.createElement('div');
    backgroundHTMLEl.classList.add(this.settings.classBackground);

    let btnCloseHTMLEl = document.createElement('button');
    btnCloseHTMLEl.id = this.settings.idBtnCloseHTMLEl;
    btnCloseHTMLEl.textContent = 'x';

    let btnLeftHTMLEl = document.createElement('button');
    btnLeftHTMLEl.id = this.settings.idBtnLeftHTMLEl;
    btnLeftHTMLEl.textContent = '<';

    let btnRightHTMLEl = document.createElement('button');
    btnRightHTMLEl.id = this.settings.idBtnRightHTMLEl;
    btnRightHTMLEl.textContent = '>';

    this.monitorHTMLEl.appendChild(backgroundHTMLEl);
    this.monitorHTMLEl.appendChild(btnCloseHTMLEl);
    this.monitorHTMLEl.appendChild(btnLeftHTMLEl);
    this.monitorHTMLEl.appendChild(btnRightHTMLEl);

    document.body.appendChild(this.monitorHTMLEl);

    this.monitorHTMLEl.addEventListener('click', (e) => this.handlerClickMonitorHTMLEl(e.target));

    return this.monitorHTMLEl;
  },

  handlerClickMonitorHTMLEl(target) {
    switch (target.id) {
      case this.settings.idBtnCloseHTMLEl:
        this.monitorHTMLEl.remove();
        break;
      case this.settings.idBtnLeftHTMLEl:
        alert('Нужно показать соседа слева.');
        this.numberCurrentOpenedImg = this.numberCurrentOpenedImg - 1 > 0 ? this.numberCurrentOpenedImg - 1 : this.imagesFullImageUrl.length;
        this.openImage(this.imagesFullImageUrl[this.numberCurrentOpenedImg]);
        break;
      case this.settings.idBtnRightHTMLEl:
        alert('Нужно показать соседа справа.');
        this.numberCurrentOpenedImg = this.numberCurrentOpenedImg + 1 < this.imagesFullImageUrl.length - 1 ? this.numberCurrentOpenedImg + 1 : 0;
        this.openImage(this.imagesFullImageUrl[this.numberCurrentOpenedImg]);
        break;
    }
  }

};

window.onload = () => gallery.init();