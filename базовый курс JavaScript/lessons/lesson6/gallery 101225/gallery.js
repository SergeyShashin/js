'use strict';

const gallery = {
  settings: {
    idGallery: 'gallery'
  },
  galleryHTMLel: null,
  init(userSettings = {}) {
    Object.assign(this.settings, userSettings);
    this.galleryHTMLel = document.getElementById(this.settings.idGallery).addEventListener;
  }
}

window.onload = () => gallery.init();