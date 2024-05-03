'use strict';

/*
1. Доработать функцию замены картинки в галерее таким образом, чтобы она проверяла наличие большой
картинки по указанному в src адресу. Если такой картинки не существует или она не доступна, то должна
ставиться картинка-заглушка сообщающая об ошибке.
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
    div.id = 'monitor';
    img.src = src;
    img.onerror = () => img.src = this.settings.pathNothingImg;
    img.className = 'img-max';
    wrap.id = 'wrap';
    wrap.appendChild(img);
    div.appendChild(wrap);
    document.body.appendChild(div);
    btnClose.src = this.settings.pathBtnClose;
    btnClose.className = 'btn-close';
    btnClose.addEventListener('click', () => div.remove());
    div.appendChild(btnClose);
  },

};

window.onload = () => gallery.init();
