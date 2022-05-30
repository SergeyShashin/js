'use strict';

/*
Создать функционал фотогалереи. Имеется статичный json-набор миниатюр,
на основании которого строится сетка изображений со ссылками на полноразмерные картинки.
*/

function loadImg(callback) {

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/gallery');
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        callback(response);

      }
    }
  }
}

loadImg(function (response) {
  var galleryElement = document.getElementById('gallery');
  var ul = document.createElement('ul');

  response.forEach(function (item) {
    var img = new Image();
    var a = document.createElement('a');
    var li = document.createElement('li');
    a.href = item.pathFullImg;
    img.id = item.id;
    img.src = item.pathImg;
    li.appendChild(img);
    a.appendChild(li);
    ul.appendChild(a);
    galleryElement.appendChild(ul);
  });
});
