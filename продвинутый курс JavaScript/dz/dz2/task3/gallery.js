'use strict';

/*
Создать функционал фотогалереи. Имеется статичный json-набор миниатюр,
на основании которого строится сетка изображений со ссылками на полноразмерные картинки.
*/

function loadImg(callback) {

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'db.json');
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        console.log(response)
        callback(response);

      }
    }
  }
}

window.onload = function () {

  loadImg(function (response) {
    console.log(response);
    var galleryElement = document.getElementById('gallery');
    var ul = document.createElement('ul');

    response.gallery.forEach(function (item) {
      var img = new Image();
      var a = document.createElement('a');
      var li = document.createElement('li');
      a.href = item.pathFullImg;
      img.id = item.id;
      img.src = item.pathImg;
      a.appendChild(img);
      li.appendChild(a);
      ul.appendChild(li);
      galleryElement.appendChild(ul);
    });
  });

}