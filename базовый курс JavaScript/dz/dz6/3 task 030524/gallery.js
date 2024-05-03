'use strict';
/*
3*. Добавить в галерею функцию перехода к следующему изображению. По сторонам от большой картинки
должны быть стрелки “вперед” и “назад”, по нажатию на которые происходит замена изображения на
следующее или предыдущее.
*/

const gallery = {
  galleryElement: null,
  settings: {
    idGallery: 'gallery',
    pathBtnClose: 'img/gallery/close.png',
    pathNothingImg: 'img/gallery/nothing.png',
  },
  init(userSettings = {}) {
    Object.assign(this.settings, userSettings);
    this.galleryElement = document.getElementById(this.settings.idGallery);
    this.galleryElement.addEventListener('click', (e) => this.handlerClickGalleryElement(e));
  },
  handlerClickGalleryElement(e) {
    if (!(e.target.tagName === 'IMG')) {
      return
    }
    let src = e.target.dataset.fullImageUrl;
    this.openImg(src);
  },
  openImg(src) {
    if (document.getElementById('monitor')) {
      console.log('Монитор создан. Изображение открыто.');
    } else {
      this.createMonitorAndImg(src);
    }
  },

  createMonitorAndImg(src) {
    let div = document.createElement('div');
    let btnClose = new Image();
    let img = new Image();
    let wrap = document.createElement('div');
    let btnLeft = document.createElement('div');
    let btnRight = document.createElement('div');
    div.id = 'monitor';
    img.src = src;
    img.onerror = () => img.src = this.settings.pathNothingImg;
    img.className = 'img-max';
    wrap.id = 'wrap';
    btnLeft.id = 'btnLeft';
    btnRight.id = 'btnRight';
    btnLeft.textContent = '<';
    btnRight.textContent = '>';
    btnLeft.className = 'btnControl';
    btnRight.className = 'btnControl';
    wrap.appendChild(img);
    wrap.appendChild(btnLeft);
    wrap.appendChild(btnRight);
    div.appendChild(wrap);
    document.body.appendChild(div);
    btnClose.src = this.settings.pathBtnClose;
    btnClose.className = 'btn-close';
    btnClose.addEventListener('click', () => div.remove());
    btnLeft.addEventListener('click', (e) => this.hadlerClickLeft(e));
    btnRight.addEventListener('click', (e) => this.hadlerClickRight(e));
    div.appendChild(btnClose);
  },
  hadlerClickLeft(e) {
    console.log(e.target.parentElement);
    let parentElement = e.target.parentElement;
    console.dir(parentElement.children[0].src);


  },
  hadlerClickRight(e) {

  }

};

window.onload = () => gallery.init();
