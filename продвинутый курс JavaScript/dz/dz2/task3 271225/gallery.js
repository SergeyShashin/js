'use strict';

/*
Создать функционал фотогалереи. Имеется статичный json-набор миниатюр,
на основании которого строится сетка изображений со ссылками на полноразмерные картинки.
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

    console.log(this.imagesHTMLEls);


    this.galleryHTMLEl.addEventListener('click', e => this.handlerClickOnGallery(e));
  },


  handlerClickOnGallery(e) {

    if (e.target.tagName !== 'IMG') {
      return
    }

    this.numberCurrentOpenedImg = Number(e.target.dataset.number);

    this.openImage(e.target.dataset.fullImageUrl);
  },


  openImage(src) {

    let testImg = new Image();
    testImg.src = src;

    testImg.onload = () => this.getImageHTMLEl().src = src;
    testImg.onerror = () => this.getImageHTMLEl().src = this.settings.pathToNofing;

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
        this.numberCurrentOpenedImg = this.numberCurrentOpenedImg - 1 > -1 ? this.numberCurrentOpenedImg - 1 : this.imagesFullImageUrl.length - 1;
        this.monitorHTMLEl.querySelector('img').remove();
        this.openImage(this.imagesFullImageUrl[this.numberCurrentOpenedImg]);
        break;
      case this.settings.idBtnRightHTMLEl:
        this.monitorHTMLEl.querySelector('img').remove();
        this.numberCurrentOpenedImg = this.numberCurrentOpenedImg + 1 < this.imagesFullImageUrl.length - 1 ? this.numberCurrentOpenedImg + 1 : 0;
        this.openImage(this.imagesFullImageUrl[this.numberCurrentOpenedImg]);
        break;
    }
  }

};


function getData(createIMGS) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', "http://localhost:3000/imgs");
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      createIMGS(JSON.parse(xhr.responseText), gallery);
    }
  }
}

function createIMGS(data, gallery) {
  var galleryHTMLEl = document.getElementById('gallery');
  data.map(function (el) {
    var imgHTMLEl = new Image();
    imgHTMLEl.src = el.pathIMG;
    imgHTMLEl.dataset.fullImageUrl = el.fullImageUrl;
    imgHTMLEl.alt = el.alt;
    galleryHTMLEl.appendChild(imgHTMLEl);
  });
  gallery.init();
}

window.onload = () => getData(createIMGS);