'use strict';
/*
3*. Добавить в галерею функцию перехода к следующему изображению. По сторонам от большой картинки
должны быть стрелки “вперед” и “назад”, по нажатию на которые происходит замена изображения на
следующее или предыдущее.
*/

const gallery = {
  settings: {
    buttonCLosePathIMG: './img/gallery/close.png',
    imgNothingPathIMG: './img/gallery/nothing.png',
  },
  galleryEl: null,
  currentImgEl: null,
  prevImgEl: null,
  nextImgEl: null,
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
    if (eTarget.tagName === 'IMG') {
      this.currentImgEl = eTarget;
      this.setSiblings();
      this.openImg(eTarget.dataset.fullImageUrl);
    }
  },
  openImg(srcIMG) {
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
    let btnLeft = document.createElement('button');
    btnLeft.id = 'btnLeft';
    btnLeft.textContent = '<';
    let btnRight = document.createElement('button');
    btnRight.textContent = '>';
    btnRight.id = 'btnRight';
    containerEl.classList.add('monitor');
    imgClose.src = this.settings.buttonCLosePathIMG;
    backGroundEl.classList.add('background');
    wrapForIMGClose.classList.add('close');
    containerEl.appendChild(backGroundEl);
    containerEl.appendChild(wrapForIMGClose);
    containerEl.appendChild(btnLeft);
    containerEl.appendChild(btnRight);
    wrapForIMGClose.appendChild(imgClose);
    document.body.appendChild(containerEl);

    imgClose.onclick = () => containerEl.remove();
    btnLeft.onclick = e => this.moveLeft(e);
    btnRight.onclick = e => this.moveRight(e);


    return containerEl
  },
  setPrevImgEl() {
    this.prevImgEl = this.currentImgEl.previousElementSibling
      ? this.currentImgEl.previousElementSibling
      : this.currentImgEl.parentElement.lastElementChild
  },
  setNextImgEl() {
    this.nextImgEl = this.currentImgEl.nextElementSibling
      ? this.currentImgEl.nextElementSibling
      : this.currentImgEl.parentElement.firstElementChild
  },
  moveLeft(e) {
    this.openImg(this.prevImgEl.src);
    this.currentImgEl = this.prevImgEl;
    this.setSiblings();
  },
  moveRight(e) {
    this.openImg(this.nextImgEl.src);
    this.currentImgEl = this.nextImgEl;
    this.setSiblings()
  },
  setSiblings() {
    this.setPrevImgEl();
    this.setNextImgEl();
  }
}

window.onload = () => gallery.init();