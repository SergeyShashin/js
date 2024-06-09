'use stict';

var reviewSendBtnHTMLEl = document.getElementById('reviewSendBtn');
var reviewTextAreaHTMLEl = document.getElementById('reviewTextArea');

reviewSendBtnHTMLEl.addEventListener('click', function () { handlerClickReviewSendBtnHTMLEl() });

function handlerClickReviewSendBtnHTMLEl() {
  var dataForSend = JSON.stringify({
    text: reviewTextAreaHTMLEl.value,
    status: 'new'
  })

  sendToJson('POST', 'http://localhost:3000/reviews', dataForSend);
  renderReview();
}

function sendToJson(method, link, dataForSend) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, link);
  xhr.setRequestHeader(
    "content-Type",
    `application/json`);
  xhr.send(dataForSend);
}

function renderReview() {
  var reviewsHTMLEl = document.getElementById('reviews');
  reviewsHTMLEl.innerHTML = '';

  loadJson('GET', 'http://localhost:3000/reviews', function (reviews) {
    console.log(reviews);
  })
}

function loadJson(method, link, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, link);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE && xhr.status === 200) {
      callback(JSON.parse(this.responseText));
    }
  }
}