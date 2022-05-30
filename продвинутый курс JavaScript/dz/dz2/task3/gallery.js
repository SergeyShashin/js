'use strict';

/*
Создать функционал фотогалереи. Имеется статичный json-набор миниатюр,
на основании которого строится сетка изображений со ссылками на полноразмерные картинки.
*/

var galleryElement = document.getElementById('gallery');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/gallery');
xhr.send();

xhr.onreadystatechange = function () {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    var response = JSON.parse(xhr.responseText);
    response.forEach(function (item) {
      var img = new Image();
      var a = document.createElement('a');
      a.href = item.pathFullImg;
      img.id = item.id;
      img.src = item.pathImg;
      a.appendChild(img);
      document.body.appendChild(a);
    });
  }
}


