'use strict';

const gallery = {
  galleryElement: null,
  settings: {
    idGallery: 'gallery',
    pathBtnClose: 'img/gallery/close.png',
  },
  init(userSettings = {}) {
    Object.assign(this.settings, userSettings);
    this.galleryElement = document.getElementById(this.settings.idGallery);
    this.galleryElement.addEventListener('click', (e) => this.handlerClickGalleryElement(e));
  },
  handlerClickGalleryElement(e) {
    if (!(e.target.tagName === 'IMG')) {
      return
    }
    this.openImg(e.target.dataset.fullImageUrl);
  },
  openImg(src) {
    let monitorEl = this.getMonitor();
    let img = new Image();
    img.src = src;
    img.className = 'img-max';
    monitorEl.appendChild(img);
  },
  getMonitor() {
    let monitorEl = document.getElementById('monitor');
    if (monitorEl) {
      return monitorEl
    } else {
      this.createMonitor();
    }

  },
  createMonitor() {
    let div = document.createElement('div');
    let btnClose = new Image();
    div.id = 'monitor';
    document.body.appendChild(div);
    btnClose.src = this.settings.pathBtnClose;
    btnClose.className = 'btn-close';
    btnClose.addEventListener('click', () => div.remove());
    div.appendChild(btnClose);
  }

};

window.onload = () => gallery.init();
