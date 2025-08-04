'use strict';

const gallery = {
  settings: {
    buttonCLosePathIMG: './img/gallery/close.png',
  },
  galleryEl: null,
  init(userSettings) {
    Object.assign(this.settings, userSettings);
    this.galleryEl = document.getElementById('gallery');
    this.setEventHandlers();
  }

}

window.onload = () => gallery.init();