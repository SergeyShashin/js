'use strict';

const settings = {
  idGallery: 'gallery',
  idWrap: 'wrap',
  idDisplay: 'display',
  idFullImg: 'fullImg',
  idBtnClose: 'close',
  srcImgClose: 'img/gallery/close.png'
};

const gallery = {
  settings,
  htmlElementGallery: null,

  init(userSettings = {}) {
    Object.assign(this.settings, userSettings);
    this.htmlElementGallery = document.getElementById(this.settings.idGallery);
    this.htmlElementGallery.addEventListener('click', event => this.handlerClickGallery(event));
  },

  handlerClickGallery(event) {
    let targetElement = event.target;

    if (targetElement.tagName !== 'IMG') {
      return
    }

    let pathFullImage = targetElement.dataset.fullImageUrl;

    this.openImage(pathFullImage);
  },

  openImage(pathFullImage) {
    this.getWrap();
    let fullImg = document.getElementById(this.settings.idFullImg)
    fullImg.src = pathFullImage;
  },

  getWrap() {
    let wrap = document.getElementById(this.settings.idWrap);
    
    if (wrap) {
      return wrap;
    }
    
    this.createWrap();
  },

  createWrap() {
    let divWrap = document.createElement('div');
    divWrap.id = 'wrap';
    document.body.appendChild(divWrap);

    let divDisplay = document.createElement('div');
    divDisplay.id = 'display';
    divWrap.appendChild(divDisplay);

    let fullImg = new Image();
    fullImg.id = this.settings.idFullImg;
    divDisplay.appendChild(fullImg);

    let btnClose = new Image();
    btnClose.id = this.settings.idBtnClose;
    btnClose.src = this.settings.srcImgClose;
    divWrap.appendChild(btnClose);
    btnClose.addEventListener('click', ()=>this.close());
  },

  close(){
    document.getElementById(this.settings.idWrap).remove();
  }

}

gallery.init();