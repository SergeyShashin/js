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
  var reviewsHTMLel = document.createElement('table');
  reviewsHTMLel.id = this.idReviews;
  var textAreaHTMlEl = document.createElement('textarea');
  textAreaHTMlEl.dataset.inputReview = 'inputReview';
  reviewsHTMLel.appendChild(textAreaHTMlEl);
  return reviewsHTMLel;
};

/**
 * Отзыв
 * @param {string} text 
 * @param {string} status 
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


    // templateReviewHTMLEl.innerHTML = `
    // <td> <button data-btn="reviewApprove">+</button></td>
    // <td> <button data-btn="reviewDecline">-</button></td>`;
  } else {
    templateReviewHTMLEl.dataset.review = "review";
    templateReviewHTMLEl.className = this.status;
    templateReviewHTMLEl.appendChild(reviewTextHTMLEl);
  }



  return templateReviewHTMLEl
};