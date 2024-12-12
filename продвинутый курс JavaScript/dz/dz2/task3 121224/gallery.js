'use strict';

/*
Создать функционал фотогалереи. Имеется статичный json-набор миниатюр,
на основании которого строится сетка изображений со ссылками на полноразмерные картинки.
*/

const gallery = {
  galleryMiniEl: null,
  monitorEl: null,

  init() {
    this.galleryMiniEl = document.getElementById('galleryMini');
    this.monitorEl = document.getElementById('monitor');
    this.addMinImgToGalleryEl('GET', 'http://localhost:3000/images', this.createElements);
    this.setEventHandlers(this.monitorEl);
  },

  setEventHandlers(monitorEl) {
    this.galleryMiniEl.addEventListener('click', function (e) {
      var target = e.target;
      if (target.tagName === 'IMG') {
        var bigImgEl = document.createElement('img');
        bigImgEl.src = target.dataset.pathToMaxImg;
        monitorEl.innerHTML = '';
        monitorEl.appendChild(bigImgEl);
      }
    });
  },

  addMinImgToGalleryEl(method, link, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, link);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        callback(JSON.parse(xhr.responseText));
      }
    }
  },

  createElements(data) {
    for (let item of data) {
      var liEl = document.createElement('li');
      var aEl = document.createElement('a');
      var imgEl = document.createElement('img');
      imgEl.src = item.pathToMinImg;
      imgEl.dataset.pathToMaxImg = item.pathToMaxImg;
      aEl.appendChild(imgEl);
      liEl.appendChild(aEl);
      document.getElementById('galleryMini').appendChild(liEl);
    }
  }

};

window.onload = gallery.init();