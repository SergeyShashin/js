
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
  console.log(data);
  data.forEach(function (element) {
    var img = new Image();
    console.log(element);
    img.src = element.imgPathMin;
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = element.imgPathMax;
    li.appendChild(a);
    a.appendChild(img);
    galleryEl.appendChild(li);
  });

}

loadData(callback);

window.onload = gallery.init();