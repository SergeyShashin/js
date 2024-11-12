'use strict';

const settings = {
  galleryEl: 'gallery',
  galleryWrapEl: 'gallery-wrap',
  pathToImgBtnClose: 'img/gallery/close.png',
};

const gallery = {
  settings,
  init(userSettings = {}) {
    Object.assign(this.settings, userSettings);
    console.log(this.settings);
  },
}

gallery.init();

