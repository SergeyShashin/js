'use strict';

/*
Создать функционал фотогалереи. Имеется статичный json-набор миниатюр,
на основании которого строится сетка изображений со ссылками на полноразмерные картинки.
*/


var gallery = document.getElementById('gallery');


getJson(function (data) {
  data.map(function (image) {
    let img = document.createElement('img');
    img.id = image.id;
    img.src = image.pathImg;
    let a = document.createElement('a');
    a.href = image.pathFullImg;
    a.appendChild(img);
    gallery.appendChild(a);
  });


});

function getJson(callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/gallery');
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      var result = JSON.parse(xhr.responseText);
      callback(result);
    }
  }
}