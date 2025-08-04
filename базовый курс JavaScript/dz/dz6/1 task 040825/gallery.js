'use strict';
/*
1. Доработать функцию замены картинки в галерее таким образом, чтобы она проверяла наличие большой
картинки по указанному в src адресу. Если такой картинки не существует или она не доступна, то должна
ставиться картинка-заглушка сообщающая об ошибке.
*/

const gallery = {
  settings: {
    buttonCLosePathIMG: './img/gallery/close.png',
    imgNothingPathIMG: './img/gallery/nothing.png',
  },
  galleryEl: null,
  init(userSettings) {
    Object.assign(this.settings, userSettings);
    this.galleryEl = document.getElementById('gallery');
    this.setEventHandlers();
  },
  setEventHandlers() {
    this.galleryEl.addEventListener('click', e => this.handleClickOnGalleryEl(e));
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
    fullIMGEl.onerror = () => fullIMGEl.src = this.settings.imgNothingPathIMG;
    let divEl = document.createElement('div');
    divEl.classList.add('img');
    divEl.appendChild(fullIMGEl);
    let containerElForFullIMG = this.getContainerElForFullIMG();
    containerElForFullIMG.appendChild(divEl);
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
    let backGroundEl = document.createElement('div');
    let imgClose = new Image();
    let wrapForIMGClose = document.createElement('div');
    containerEl.classList.add('monitor');
    imgClose.src = this.settings.buttonCLosePathIMG;
    backGroundEl.classList.add('background');
    wrapForIMGClose.classList.add('close');
    containerEl.appendChild(backGroundEl);
    containerEl.appendChild(wrapForIMGClose);
    wrapForIMGClose.appendChild(imgClose);
    document.body.appendChild(containerEl);

    imgClose.onclick = () => containerEl.remove();


    return containerEl
  }
}

window.onload = () => gallery.init();