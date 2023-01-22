'use strict';

/*
Создать функционал фотогалереи. Имеется статичный json-набор миниатюр,
на основании которого строится сетка изображений со ссылками на полноразмерные картинки.
*/

var galleryEl = document.getElementById('gallery');


function loadData(callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/gallery');
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      callback(JSON.parse(xhr.responseText));
    }
  }
}

function callback(data) {
  data.forEach(element => {
    var img = new Image();
    img.src = element.pathImg;
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = element.pathFullImg;
    li.appendChild(a);
    a.appendChild(img);
    galleryEl.appendChild(li);
  });

}

loadData(callback);
