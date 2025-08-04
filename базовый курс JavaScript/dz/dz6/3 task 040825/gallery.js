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
    let btnleft = document.createElement('button');
    btnleft.id = 'btnLeft';
    btnleft.textContent = '<';
    let btnRight = document.createElement('button');
    btnRight.textContent = '>';
    btnRight.id = 'btnRight';
    containerEl.classList.add('monitor');
    imgClose.src = this.settings.buttonCLosePathIMG;
    backGroundEl.classList.add('background');
    wrapForIMGClose.classList.add('close');
    containerEl.appendChild(backGroundEl);
    containerEl.appendChild(wrapForIMGClose);
    containerEl.appendChild(btnleft);
    containerEl.appendChild(btnRight);
    wrapForIMGClose.appendChild(imgClose);
    document.body.appendChild(containerEl);

    imgClose.onclick = () => containerEl.remove();


    return containerEl
  }
}

window.onload = () => gallery.init();