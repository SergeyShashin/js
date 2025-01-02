/*
Создать модуль сбора отзывов:

a) модуль может выводить отзывы (пока из json-заглушки);
b) модуль может добавлять отзывы;
c) модуль может одобрять отзывы;
d) модуль может удалять отзывы;
e) модуль подчиняется следующим соглашениям:

| Название обмена | Добавить отзыв |
|---------------------------------|-----------------------------------------------------------------|
| URL | review.add.json |
| Тип запроса | POST, asynchronous |
| Передаваемые данные | {"id_user" : 123,“text” : “”} |
| Ожидаемый ответ | {result: 1, userMessage: "Ваш отзыв был передан на модерацию" } |
| Ответ в случае системной ошибки | {result : 0, error_message : “Сообщение об ошибке”} |

| Название обмена | Одобрить отзыв |
|---------------------------------|-----------------------------------------------------------|
| URL | review.submit.json |
| Тип запроса | POST, asynchronous |
| Передаваемые данные | {" id_comment" : 123} // ID отзыва, который одобряется |
| Ожидаемый ответ | {result: 1} |
| Ответ в случае системной ошибки | { result : 0, error_message : “Сообщение об ошибке” } |

| Название обмена | Удалить отзыв |
|---------------------------------|-------------------------------------------------------|
| URL | review.delete.json |
| Тип запроса | POST, asynchronous |
| Передаваемые данные | {"id_comment" : 123} // ID отзыва, который удаляется |
| Ожидаемый ответ | {result: 1} |
| Ответ в случае системной ошибки | { result : 0,error_message : “Сообщение об ошибке”} |

| Название обмена | Показать все отзывы |
|---------------------------------|------------------------------------------------------|
| URL | review.list.json |
| Тип запроса | POST, asynchronous |
| Передаваемые данные | {} |
| Ожидаемый ответ | {comments: [{id_comment: 123,text: ‘Текст отзыва’}]} |
| Ответ в случае системной ошибки | {result : 0,error_message : “Сообщение об ошибке”} |
*/

(function ($) {
  var review = {
    reviewsEl: null,

    init() {
      this.reviewsEl = $('#reviews')[0];
      this.buildReviewsList();
      this.setEventHandlers();
      // this.buildCart();
    },

    buildReviewsList() {
      $.ajax({
        url: 'http://localhost:3000/reviews',
        dataType: 'json',
        success(data) {
          if ($('#reviews table')[0]) {
            $('#reviews table')[0].remove();
          }
          var tableEl = document.createElement('table');
          var tHeadEl = document.createElement('thead');
          var tBodyEl = document.createElement('tbody');
          var thIdEl = document.createElement('th');
          var thTextEl = document.createElement('th');
          var thForBtnApproveEl = document.createElement('th');
          var thForBtnDeclineEl = document.createElement('th');
          var thForBtnDeleteEl = document.createElement('th');

          thIdEl.textContent = 'id';
          thTextEl.textContent = 'text';

          tHeadEl.appendChild(thIdEl);
          tHeadEl.appendChild(thTextEl);
          tHeadEl.appendChild(thForBtnApproveEl);
          tHeadEl.appendChild(thForBtnDeclineEl);
          tHeadEl.appendChild(thForBtnDeleteEl);

          tableEl.appendChild(tHeadEl);
          tableEl.appendChild(tBodyEl);

          review.reviewsEl.appendChild(tableEl);

          for (let el of data) {
            var trReviewEl = document.createElement('tr');
            var tdIdEl = document.createElement('td');
            var tdTextEl = document.createElement('td');

            trReviewEl.dataset.id = el.id;

            tdIdEl.textContent = el.id;
            tdTextEl.textContent = el.text;
            trReviewEl.appendChild(tdIdEl);
            trReviewEl.appendChild(tdTextEl);

            if (el.status === 'standart') {
              var tdForBtnApproveEl = document.createElement('td');
              var tdForBtnDeclineEl = document.createElement('td');
              var btnApproveEl = document.createElement('button');
              var btnDeclineEl = document.createElement('button');

              btnApproveEl.textContent = 'Одобрить';
              btnDeclineEl.textContent = 'Отклонить';

              trReviewEl.appendChild(tdForBtnApproveEl);
              tdForBtnApproveEl.appendChild(btnApproveEl);
              tdForBtnDeclineEl.appendChild(btnDeclineEl);
              trReviewEl.appendChild(tdForBtnDeclineEl);
            } else if (el.status === 'approved') {
              tdTextEl.classList.add('approved');
            } else if (el.status === 'declined') {
              tdTextEl.classList.add('declined');
            }

            var tdForBtnDeleteEl = document.createElement('td');
            var btnDeleteEl = document.createElement('button');

            btnDeleteEl.textContent = 'Удалить';
            tdForBtnDeleteEl.appendChild(btnDeleteEl);
            trReviewEl.appendChild(tdForBtnDeleteEl);

            tBodyEl.appendChild(trReviewEl);
          }
        }
      });
    },

    setEventHandlers() {
      $('#reviews').on('click', function (e) {
        var target = e.target;
        if (target.tagName !== 'BUTTON') {
          return
        }

        if (target.textContent === 'Добавить') {
          addReview();
        }

        if (target.textContent === 'Удалить') {
          deleteReview(e.target);
        }

        if (target.textContent === 'Одобрить') {
          setApprove(e.target);
        }

        if (target.textContent === 'Отклонить') {
          setDecline(e.target);
        }

        function addReview() {
          var textReview = $('#inputReview')[0].value;

          $.ajax({
            url: ` http://localhost:3000/reviews`,
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            data: JSON.stringify({
              text: `${textReview}`,
              status: 'standart'
            }),
            success() {
              review.buildReviewsList();
            }
          });

        }

        function deleteReview(btnDeleteEl) {
          var reviewId = btnDeleteEl.parentElement.parentElement.dataset.id;
          $.ajax({
            url: `http://localhost:3000/reviews/${reviewId}`,
            type: 'DELETE',
            headers: {
              'content-type': 'application/json'
            },

            success() {
              review.buildReviewsList();
            }
          });
        }

        function setApprove(btnApproveEl) {
          var reviewId = btnApproveEl.parentElement.parentElement.dataset.id;
          $.ajax({
            url: `http://localhost:3000/reviews/${reviewId}`,
            type: 'PATCH',
            headers: {
              'content-type': 'application/json'
            },
            data: JSON.stringify({
              status: 'approved'
            }),

            success() {
              review.buildReviewsList();
            }
          });
        }

        function setDecline(btnDeclineEl) {
          var reviewId = btnDeclineEl.parentElement.parentElement.dataset.id;
          $.ajax({
            url: `http://localhost:3000/reviews/${reviewId}`,
            type: 'PATCH',
            headers: {
              'content-type': 'application/json'
            },
            data: JSON.stringify({
              status: 'declined'
            }),

            success() {
              review.buildReviewsList();
            }
          });
        }

      });
    },
  };

  window.onload = review.init();
})(jQuery);


