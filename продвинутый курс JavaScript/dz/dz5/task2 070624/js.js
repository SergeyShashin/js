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
  var templateReview = document.createElement('tr');

  if (this.status = 'new') {
    templateReview.dataset.review = "reviewNew";
    templateReview.innerHTML = `
    <td data-review="reviewText"> </td>
    <td> <button data-btn="reviewApprove">+</button></td>
    <td> <button data-btn="reviewDecline">-</button></td>`;
  } else {
    templateReview.dataset.review = "review";
    templateReview.innerHTML = `<td data-review="reviewText"> </td>`;
  }

  return templateReview
};