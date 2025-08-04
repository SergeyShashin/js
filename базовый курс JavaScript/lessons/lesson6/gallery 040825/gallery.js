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
    let containerElForFullIMG = this.getContainerElForFullIMG();
    containerElForFullIMG.appendChild(fullIMGEl);
  },
  getContainerElForFullIMG() {
    let containerEl = document.querySelector('.monitor');

    if (!containerEl) {
      containerEl = this.createContainerEl();
    }

    return containerEl;
  },
  createContainerEl() {
    let containerEl = document.createElement('div');
    containerEl.classList.add('monitor');
    let imgClose = new Image();
    imgClose.src = this.settings.buttonCLosePathIMG;
    containerEl.appendChild(imgClose);
    let backGroundEl = document.createElement('div');
    backGroundEl.classList.add('background');
    containerEl.appendChild(backGroundEl);
    document.body.appendChild(containerEl);
    return containerEl
  }

}

window.onload = () => gallery.init();