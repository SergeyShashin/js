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
  },
  setEventHandlers() {
    this.galleryEl.addEventListener('click', e => this.handleClickOnGalleryEl(e))
  },
  handleClickOnGalleryEl(e) {
    let eTarget = e.target;
    console.log(eTarget);
    if (eTarget.tagName === 'IMG') {
      this.openImg(eTarget.dataset.fullImageUrl);
    }
  },
  openImg(srcIMG) {
    console.log(srcIMG);
    let fullIMGEl = new Image();
    fullIMGEl.src = srcIMG;

  },


}

window.onload = () => gallery.init();