'use strict';

const gallery = {
  settings: {
    idHTMLElGallery: 'gallery',
    nameClassWrap: '.gallery-wrap',
    pathToImgBtnClose: 'img/gallery/close.png',
  },

  init(userSeting={}) {
    console.log('Старт.');

  }
}

window.onload = () => gallery.init()