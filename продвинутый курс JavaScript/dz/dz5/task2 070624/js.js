'use stict';

var reviewSendBtnHTMLEl = document.getElementById('reviewSendBtn');
var reviewTextAreaHTMLEl = document.getElementById('reviewTextArea');
var reviewsHTMLEl = document.getElementById('reviews');

renderReview();

reviewSendBtnHTMLEl.addEventListener('click', function () { handlerClickReviewSendBtnHTMLEl() });
reviewsHTMLEl.addEventListener('click', function (e) { handlerClickReviewsHTMLEl(e) })

function handlerClickReviewsHTMLEl(e) {
  if (e.target.tagName !== 'BUTTON') {
    return
  }

  var id = Number(e.target.dataset.reviewId);
  var status = e.target.dataset.type;

  sendToJson('PATCH', `http://localhost:3000/reviews/${id}`, JSON.stringify({ status: status }));
  renderReview();

}

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
    reviews.forEach(function (review) {
      var trHTMLEl = document.createElement('tr');
      var tdTextReviewHTMLEl = document.createElement('td');
      tdTextReviewHTMLEl.textContent = review.text;
      tdTextReviewHTMLEl.className = review.status;
      tdTextReviewHTMLEl.dataset.reviewId = review.id;
      trHTMLEl.appendChild(tdTextReviewHTMLEl);
      reviewsHTMLEl.appendChild(trHTMLEl);

      if (review.status === 'new') {
        var tdApproveBtnHTMLEl = document.createElement('td');
        var approveBtnHTMLEl = document.createElement('button');
        var tdDeclineBtnHTMLEl = document.createElement('td');
        var declineBtnHTMLEl = document.createElement('button');

        approveBtnHTMLEl.textContent = '+';
        declineBtnHTMLEl.textContent = '-';
        approveBtnHTMLEl.dataset.reviewId = review.id;
        approveBtnHTMLEl.dataset.type = 'approve';
        declineBtnHTMLEl.dataset.reviewId = review.id;
        declineBtnHTMLEl.dataset.type = 'decline';

        tdApproveBtnHTMLEl.appendChild(approveBtnHTMLEl);
        trHTMLEl.appendChild(tdApproveBtnHTMLEl);

        tdDeclineBtnHTMLEl.appendChild(declineBtnHTMLEl);
        trHTMLEl.appendChild(tdDeclineBtnHTMLEl);
      }
    })
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