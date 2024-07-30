'use strict';

/*
Создать функционал фотогалереи. Имеется статичный json-набор миниатюр,
на основании которого строится сетка изображений со ссылками на полноразмерные картинки.
*/
var galleriMiniEl = document.getElementById('galleryMini');
var monitor = document.getElementById('monitor');

galleriMiniEl.addEventListener('click', function (e) {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
    // console.dir(e.target.src);
    var imgMax = new Image();
    imgMax.src = e.target.parentElement.href;
    monitor.innerHTML = '';
    monitor.appendChild(imgMax);
  }

});


var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/images');
xhr.send();
xhr.onreadystatechange = function () {
  if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    var result = JSON.parse(xhr.responseText);
    for (let item of result) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      var img = new Image();
      a.href = item.imgMaxPath;
      img.src = item.imgMiniPath;
      a.appendChild(img);
      li.appendChild(a);
      galleriMiniEl.appendChild(li);
    }
  }
};
