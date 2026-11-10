'use strict';

/*
1. Доработать функцию замены картинки в галерее таким образом, чтобы она проверяла наличие большой
картинки по указанному в src адресу. Если такой картинки не существует или она не доступна, то должна
ставиться картинка-заглушка сообщающая об ошибке.
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
  },
  handlerClickMinSizeImages(e) {
    if (e.target.tagName !== 'IMG') {
      return
    }
    this.currentIMGHTMLEl = e.target;
    this.nextImgHTMLEl = this.currentIMGHTMLEl.nextElementSibling
      ? this.currentIMGHTMLEl.nextElementSibling
      : this.currentIMGHTMLEl.parentElement.firstElementChild;
    this.prevImgHTMLEl = this.currentIMGHTMLEl.previousElementSibling
      ? this.currentIMGHTMLEl.previousElementSibling
      : this.currentIMGHTMLEl.parentElement.lastElementChild;
    ;

    let srcForOpenIMG = e.target.dataset.maxSize;

    let testIMG = new Image();
    testIMG.src = srcForOpenIMG;

    testIMG.onload = () => this.openCurrentIMG(srcForOpenIMG);
    testIMG.onerror = () => this.openCurrentIMG(this.settings.pathForInfoIMG);

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
    let imgForBtnClose = new Image();

    maxSizeImagesHTMLEl.id = this.settings.maxSizeImagesID;
    pHTMLElforMaxSize.id = this.settings.pHTMLElIDforMaxSize;
    btnCloseHTMLEl.id = this.settings.btnCloseID;
    imgForBtnClose.src = this.settings.btnClosePath;

    btnCloseHTMLEl.appendChild(imgForBtnClose);
    maxSizeImagesHTMLEl.appendChild(pHTMLElforMaxSize);
    maxSizeImagesHTMLEl.appendChild(btnCloseHTMLEl);
    this.galleryHTMLEl.insertBefore(maxSizeImagesHTMLEl, this.minSizeImagesHTMLEl);

    btnCloseHTMLEl.addEventListener('click', () => maxSizeImagesHTMLEl.remove());

    return pHTMLElforMaxSize;
  }
};

window.onload = () => gallery.init();