'use strict';

/*
Создать функционал фотогалереи. Имеется статичный json-набор миниатюр,
на основании которого строится сетка изображений со ссылками на полноразмерные картинки.
*/

buildImages();
document.getElementById('galleryMini').addEventListener('click', function (e) {
  console.log(e.target.tagName);
  if (e.target.tagName === 'IMG') {
    console.log(e.target);
    document.getElementById('monitor').innerHTML = `<img src=${e.target.dataset.imgMaxPath}/>`;    
  }
})

function loadFromJson(method, link, callback) {

  var xhr = new XMLHttpRequest();
  xhr.open(method, link);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    }
  }
}

function buildImages() {
  loadFromJson('GET', 'http://localhost:3000/images', function (images) {
    var galleryMiniEl = document.getElementById('galleryMini');
    images.forEach(function (image) {
      // var linkEl = document.createElement('a');
      // linkEl.href = image.imgMaxPath;
      var imgEl = new Image();
      imgEl.src = image.imgMiniPath;
      imgEl.dataset.imgMaxPath = image.imgMaxPath
      // linkEl.appendChild(imgEl);
      galleryMiniEl.appendChild(imgEl);
    });
  })
}