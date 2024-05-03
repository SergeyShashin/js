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
    this.openImg(e.target.dataset.fullImageUrl);
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
    div.id = 'monitor';
    let img = new Image();
    img.src = src;
    img.className = 'img-max';
    let wrap = document.createElement('div');
    wrap.id='wrap';
    wrap.appendChild(img);
    div.appendChild(wrap);
    document.body.appendChild(div);
    btnClose.src = this.settings.pathBtnClose;
    btnClose.className = 'btn-close';
    btnClose.addEventListener('click', () => div.remove());
    div.appendChild(btnClose);
  }

};

window.onload = () => gallery.init();
