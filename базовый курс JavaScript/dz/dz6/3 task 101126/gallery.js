'use strict';

/*
3*. Добавить в галерею функцию перехода к следующему изображению. По сторонам от большой картинки
должны быть стрелки “вперед” и “назад”, по нажатию на которые происходит замена изображения на
следующее или предыдущее.
*/

const gallery = {
  settings: {
    galleryHTMLElID: 'gallery',
    btnClosePath: 'img/gallery/close.png',
    btnCloseID: 'btnClose',
    minSizeImagesID: 'galleryMinSize',
    maxSizeImagesID: 'galleryMaxSize',
    pHTMLElIDforMaxSize: 'images',
    pathForInfoIMG: 'img/gallery/nothing.png',
    btnLeftId: 'btnLeft',
    btnRightId: 'btnRight',
    btnLeftCursor: '<',
    btnRightCursor: '>',
  },
  galleryHTMLEl: null,
  minSizeImagesHTMLEl: null,
  currentIMGHTMLEl: null,
  nextImgHTMLEl: null,
  prevImgHTMLEl: null,
  init(userSettings = {}) {
    Object.assign(this.settings, userSettings);
    this.galleryHTMLEl = document.getElementById(this.settings.galleryHTMLElID);
    this.minSizeImagesHTMLEl = document.getElementById(this.settings.minSizeImagesID);
    this.minSizeImagesHTMLEl.addEventListener('click', (e) => this.handlerClickMinSizeImages(e));
    this.setEventHandlers();
  },
  handlerClickMinSizeImages(e) {
    if (e.target.tagName !== 'IMG') {
      return
    }
    this.currentIMGHTMLEl = e.target;
    this.setNextImgHTMLEl();
    this.setPrevImgHTMLEl();

    let srcForOpenIMG = e.target.dataset.maxSize;

    this.chooseNormPathOrPathForInfoIMG(srcForOpenIMG);

  },
  openCurrentIMG(srcMaxSize) {
    let imgMaxSizeHTMLEl = new Image();
    imgMaxSizeHTMLEl.src = srcMaxSize;
    let pHTMLElIDforMaxSize = this.getGalleryMaxSize();
    if (pHTMLElIDforMaxSize) {
      pHTMLElIDforMaxSize.innerHTML = '';
      pHTMLElIDforMaxSize.appendChild(imgMaxSizeHTMLEl);
    } else {
      this.createMaxSizeImagesHTMLEl().appendChild(imgMaxSizeHTMLEl);
    }
  },
  getGalleryMaxSize() {
    return document.getElementById(this.settings.pHTMLElIDforMaxSize);
  },
  createMaxSizeImagesHTMLEl() {
    let maxSizeImagesHTMLEl = document.createElement('article');
    let pHTMLElforMaxSize = document.createElement('p');
    let btnCloseHTMLEl = document.createElement('p');
    let btnLeftHTMLEl = document.createElement('button');
    let btnRightHTMLEl = document.createElement('button');
    let imgForBtnClose = new Image();

    maxSizeImagesHTMLEl.id = this.settings.maxSizeImagesID;
    pHTMLElforMaxSize.id = this.settings.pHTMLElIDforMaxSize;
    btnCloseHTMLEl.id = this.settings.btnCloseID;
    btnLeftHTMLEl.id = this.settings.btnLeftId;
    btnRightHTMLEl.id = this.settings.btnRightId;
    imgForBtnClose.src = this.settings.btnClosePath;

    btnLeftHTMLEl.textContent = this.settings.btnLeftCursor;
    btnRightHTMLEl.textContent = this.settings.btnRightCursor;

    btnCloseHTMLEl.appendChild(imgForBtnClose);
    maxSizeImagesHTMLEl.appendChild(btnLeftHTMLEl);
    maxSizeImagesHTMLEl.appendChild(pHTMLElforMaxSize);
    maxSizeImagesHTMLEl.appendChild(btnRightHTMLEl);
    maxSizeImagesHTMLEl.appendChild(btnCloseHTMLEl);
    this.galleryHTMLEl.insertBefore(maxSizeImagesHTMLEl, this.minSizeImagesHTMLEl);

    btnCloseHTMLEl.addEventListener('click', () => maxSizeImagesHTMLEl.remove());

    return pHTMLElforMaxSize;
  },

  setNextImgHTMLEl() {
    this.nextImgHTMLEl =
      this.currentIMGHTMLEl.nextElementSibling
        ? this.currentIMGHTMLEl.nextElementSibling
        : this.currentIMGHTMLEl.parentElement.firstElementChild;
  },

  setPrevImgHTMLEl() {
    this.prevImgHTMLEl = this.currentIMGHTMLEl.previousElementSibling
      ? this.currentIMGHTMLEl.previousElementSibling
      : this.currentIMGHTMLEl.parentElement.lastElementChild;
    ;
  },

  chooseNormPathOrPathForInfoIMG(srcForOpenIMG) {
    let testIMG = new Image();
    testIMG.src = srcForOpenIMG;
    testIMG.onload = () => this.openCurrentIMG(srcForOpenIMG);
    testIMG.onerror = () => this.openCurrentIMG(this.settings.pathForInfoIMG);
  },

  setEventHandlers() {
    this.galleryHTMLEl.addEventListener('click', e => this.clickHandlersGalleryHTMLEl(e));
  },
  clickHandlersGalleryHTMLEl(e) {
    switch (e.target.id) {
      case this.settings.btnLeftId:
        // e.target.nextElementSibling.firstElementChild.src = this.prevImgHTMLEl.dataset.maxSize;
        this.chooseNormPathOrPathForInfoIMG(this.prevImgHTMLEl.dataset.maxSize);
        this.currentIMGHTMLEl = this.prevImgHTMLEl;
        this.setPrevImgHTMLEl();
        this.setNextImgHTMLEl();
        break;
      case this.settings.btnRightId:
        // e.target.previousElementSibling.firstElementChild.src = this.nextImgHTMLEl.dataset.maxSize;
        this.chooseNormPathOrPathForInfoIMG(this.nextImgHTMLEl.dataset.maxSize);
        this.currentIMGHTMLEl = this.nextImgHTMLEl;
        this.setPrevImgHTMLEl();
        this.setNextImgHTMLEl();
        break;
      default:
        console.log('Можно что-нибудь сделать.');
        break;
    }
  }
};

window.onload = () => gallery.init();