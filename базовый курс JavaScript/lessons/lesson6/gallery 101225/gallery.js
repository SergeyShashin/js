'use strict';

const gallery = {
  settings: {
    idGallery: 'gallery'
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
    console.log(src);
  }
};

window.onload = () => gallery.init();