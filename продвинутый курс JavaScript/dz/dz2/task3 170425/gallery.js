'use strict';

/*
Создать функционал фотогалереи. Имеется статичный json-набор миниатюр,
на основании которого строится сетка изображений со ссылками на полноразмерные картинки.
*/

function getData(method, link, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, link);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    }
  }
}

getData('GET', 'http://localhost:3000/images', builGallery);

function builGallery(data) {
  var galleryMiniEl = document.getElementById('galleryMini');
  galleryMiniEl.addEventListener('click', function (e) {
    if (e.target.tagName === 'IMG') {
      var monitorEl = document.getElementById('monitor');
      monitorEl.innerHTML = '';
      var imgEl = new Image();
      imgEl.src = e.target.dataset.imgMaxPath;
      monitorEl.appendChild(imgEl);
    }
  });

  for (let item of data) {
    var imgEl = document.createElement('img');
    var liEl = document.createElement('li');
    imgEl.src = item.imgMiniPath;
    imgEl.dataset.imgMaxPath = item.imgMaxPath;
    liEl.appendChild(imgEl);
    galleryMiniEl.appendChild(liEl);
  }
}