'use strict';
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
function reviewsRender() {
  $.ajax({
    url: 'http://localhost:3000/reviews',
    dataType: 'json',
    success: function (reviews) {
      var $ul = $('<ul/>');

      reviews.forEach(function (review) {
        var $li = $('<li/>', {
          text: review.content + ' ',
          id: review.id,
          class: review.class
        })


        if (review.class === 'undefined') {
          var $buttonApprove = $('<button/>', {
            text: 'Approve',
            class: 'approve'

          });
          var $buttonDecline = $('<button/>', {
            text: 'Decline',
            class: 'decline'
          });
          $li.append($buttonApprove);
          $li.append($buttonDecline);
        }
        $ul.append($li);

      });
      $('#containerReviews').empty();
      $('#containerReviews').append($ul);
    }
  })
}

function addStatusApprove(event) {
  var id = event.currentTarget.parentElement.id;

  $.ajax({
    url: 'http://localhost:3000/reviews/' + id,
    type: 'PATCH',
    dataType: 'json',
    headers: { 'content-type': 'application/json' },
    data: JSON.stringify({
      class: 'approved'
    }),
    success: function () {
      reviewsRender();
    }
  });
}
function addStatusDecline(event) {
  var id = event.currentTarget.parentElement.id;
  $.ajax({
    url: 'http://localhost:3000/reviews/' + id,
    type: 'PATCH',
    dataType: 'json',
    headers: { 'content-type': 'application/json' },
    data: JSON.stringify({
      class: 'declined'
    }),
    success: function () {
      reviewsRender();
    }
  });
}

(function ($) {
  $(function () {
    reviewsRender();

    document.getElementById('send').addEventListener('click', function () {

      event.preventDefault();
      var newReview = document.getElementById('review').value
      $.ajax({
        url: 'http://localhost:3000/reviews',
        type: 'POST',
        dataType: 'json',
        headers: { 'content-type': 'application/json' },
        data: JSON.stringify({
          content: newReview,
          class: 'undefined',
        }),
        success: function () {
          reviewsRender();
        }
      });
    });

    $('#containerReviews').on('click', '.approve', function (event) {
      addStatusApprove(event);
    });
    $('#containerReviews').on('click', '.decline', function (event) {
      addStatusDecline(event);
    });


  })

})(jQuery)

