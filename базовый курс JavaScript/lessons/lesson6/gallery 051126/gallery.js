'use strict';

const gallery = {
  settings: {
    btnClosePath: 'img/gallery/close.png',
    btnCloseID: 'btnClose',
    minSizeImagesID: 'galleryMinSize',
    maxSizeImagesID: 'galleryMaxSize',
    pHTMLElIDforMaxSize: 'images'
  },
  minSizeImagesHTMLEl: null,
  currentIMGHTMLEl: null,
  nextImgHTMLEl: null,
  prevImgHTMLEl: null,
  init(userSettings = {}) {
    Object.assign(this.settings, userSettings);
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

    this.openCurrentIMG(e.target.dataset.maxSize);
  },
  openCurrentIMG(srcMaxSize) {
    console.log(srcMaxSize);
    let imgMaxSizeHTMLEl = new Image();
    imgMaxSizeHTMLEl.src = srcMaxSize;
    let maxSizeImagesHTMLEl = this.getGalleryMaxSize();
    maxSizeImagesHTMLEl
      ? maxSizeImagesHTMLEl.getElementById(this.settings.pHTMLElIDforMaxSize).appendChild(imgMaxSizeHTMLEl)
      : this.createMaxSizeImagesHTMLEl().appendChild(imgMaxSizeHTMLEl);
  },
  getGalleryMaxSize() {
    return document.getElementById(this.settings.maxSizeImagesID).getElementById(this.settings.pHTMLElIDforMaxSize).innerHTML = '';
  },
  createMaxSizeImagesHTMLEl() {
    let maxSizeImagesHTMLEl = document.createElement('article');
    let pHTMLElIDforMaxSize = document.createElement('p');
    let btnCloseHTMLEl = document.createElement('p');
    let imgForBtnClose = new Image();
    
    maxSizeImagesHTMLEl.id = this.settings.maxSizeImagesID;
    pHTMLElIDforMaxSize.id = this.settings.pHTMLElIDforMaxSize;
    btnCloseHTMLEl.id = this.settings.btnCloseID;
    
    imgForBtnClose.src = this.settings.btnClosePath;

    btnCloseHTMLEl.appendChild(imgForBtnClose);
    maxSizeImagesHTMLEl.appendChild(pHTMLElIDforMaxSize);
    maxSizeImagesHTMLEl.appendChild(btnCloseHTMLEl);
  }
};

window.onload = () => gallery.init();