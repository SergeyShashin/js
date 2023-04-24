'use strict';

const settings = {
  galleryElementId: 'gallery',
  displayElementClass: 'display',
  buttonClosePathImg: 'img/gallery/close.png',
}

const gallery = {
  settings,
  galleryElement: null,

  init(userSettings = {}) {
    Object.assign(this.settings, userSettings);
    this.galleryElement = document.getElementById(this.settings.galleryElementId);

    this.galleryElement.addEventListener('click', (e) => this.handlerClick(e));
  },

  handlerClick(e) {
    let targetClick = e.target.tagName;


    if (e.target.tagName !== 'IMG') {
      return
    }

    let srcFullImgUrl = targetClick.dataset.fullImageUrl;
    

  }



}

gallery.init();