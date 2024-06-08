'use stict';

// var reviewsHTMLel = document.getElementById('reviews');
// var templateNewReview = document.createElement('tr');
// var templateReview = document.createElement('tr');

// templateNewReview.dataset.review = "reviewNew";
// templateNewReview.dataset.review = "review";

// templateNewReview.innerHTML = `
// <td data-review="reviewText"> </td>
// <td> <button data-btn="reviewApprove">+</button></td>
// <td> <button data-btn="reviewDecline">-</button></td>`;

// templateReview.innerHTML = `
// <td data-review="reviewText"> </td>
// `;

function Reviews(idReviews) {
  this.idReviews = idReviews;
}

Reviews.prototype.create = function () {
  var reviewsHTMLEl = document.createElement('table');
  var trTextAreaHTMlEl = document.createElement('tr');
  var trSendReviewBtnHTMLEl = document.createElement('tr');

  var textAreaHTMlEl = document.createElement('textarea');
  var sendReviewBtnHTMLEl = document.createElement('button');

  reviewsHTMLEl.id = this.idReviews;
  textAreaHTMlEl.dataset.inputReview = 'inputReview';

  sendReviewBtnHTMLEl.textContent = 'Отправить';
  sendReviewBtnHTMLEl.dataset.sendReviewBtn = 'sendReview';

  trTextAreaHTMlEl.appendChild(textAreaHTMlEl);
  trSendReviewBtnHTMLEl.appendChild(sendReviewBtnHTMLEl);
  reviewsHTMLEl.appendChild(trTextAreaHTMlEl);
  reviewsHTMLEl.appendChild(trSendReviewBtnHTMLEl);

  return reviewsHTMLEl;
};

/**
 * Создает отзыв
 * @param {string} text Текст отыва
 * @param {string} status Статус отзыва. Ваиранты: new, approve, decline,
 * @method create Возвращает <tr>
 */
function Review(text, status) {
  this.text = text;
  this.status = status;
}

Review.prototype.create = function () {
  var templateReviewHTMLEl = document.createElement('tr');
  var reviewTextHTMLEl = document.createElement('td');

  reviewTextHTMLEl.textContent = this.text;

  if (this.status === 'new') {
    var approveBtnHTMLEl = document.createElement('button');
    var declineBtnHTMLEl = document.createElement('button');

    templateReviewHTMLEl.dataset.review = "reviewNew";

    reviewTextHTMLEl.className = this.status;
    reviewTextHTMLEl.dataset.review = "reviewText";

    approveBtnHTMLEl.textContent = '+';
    approveBtnHTMLEl.dataset.approveBtn = 'reviewApprove';

    declineBtnHTMLEl.textContent = '-';
    declineBtnHTMLEl.dataset.declineBtn = 'reviewDecline';

    templateReviewHTMLEl.appendChild(reviewTextHTMLEl);
    templateReviewHTMLEl.appendChild(approveBtnHTMLEl);
    templateReviewHTMLEl.appendChild(declineBtnHTMLEl);

  } else {
    templateReviewHTMLEl.dataset.review = "review";
    templateReviewHTMLEl.className = this.status;
    templateReviewHTMLEl.appendChild(reviewTextHTMLEl);
  }

  return templateReviewHTMLEl
};