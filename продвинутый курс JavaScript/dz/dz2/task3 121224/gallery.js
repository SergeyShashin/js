'use strict';

/*
Создать функционал фотогалереи. Имеется статичный json-набор миниатюр,
на основании которого строится сетка изображений со ссылками на полноразмерные картинки.
*/

const gallery = {
  galleryEl: null,
  monitorEl: null,

  init() {
    this.galleryEl = document.getElementById('galleryMini');
    this.monitorEl = document.getElementById('monitor');
    this.appendMinImgToGalleryEl();
    this.setEventHandlers();
  },

  setEventHandlers() {
    this.monitorEl.addEventListener('click', function (e) {
      this.handlerClickImg(e);
    })
  },

  handlerClickImg(e) {
    var target = e.target;
    if (target.tagName === 'IMG') {
      var bigImgEl = new Image();
      bigImgEl.src = target.dataset.pathToBigImg;
      this.monitorEl.appendChild(bigImgEl);
    }
  },

  appendMinImgToGalleryEl() {
    let dataImages = this.getDataImages('GET', 'http://localhost:3000/images', function (data) {
      return data
    });

    console.log(dataImages);
  },

  getDataImages(method, link, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, link);
    xhr.send();
    console.log(xhr);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        console.log('+');
        callback(JSON.parse(xhr.responseText));
      }
    }
  }

};

window.onload = gallery.init();