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

/**
 * a) модуль может выводить отзывы;
 */
function buildReviews() {
  $('#reviews').empty();
  $.ajax({
    url: 'http://localhost:3000/reviews',
    dataType: 'json',
    success: function (data) {
      var $ul = $('<ul/>');
      data.forEach(function (reviews) {
        var $li = $('<li/>', {
          text: reviews.text,
          class: reviews.status
        });

        if (reviews.status === null) {
          var $btnApprove = $('<button/>', {
            text: 'Approve',
            class: 'approveBtn',
            'data-id': reviews.id,
          });
          var $btnDecline = $('<button/>', {
            text: 'Decline',
            class: 'declineBtn',
            'data-id': reviews.id,
          });
          var $btnDelete = $('<button/>', {
            text: 'X',
            class: 'delete',
            'data-id': reviews.id,
          });
          $li.append($btnApprove);
          $li.append($btnDecline);
          $li.append($btnDelete);
        }

        $ul.append($li);

      });
      $('#reviews').append($ul);
    }
  });
}

(function ($) {
  $(function () {

    buildReviews();

    /**
     * c) модуль может одобрять отзывы;
     */
    $('#reviews').on('click', '.approveBtn', function () {
      $.ajax({
        url: 'http://localhost:3000/reviews/' + $(this).attr('data-id'),
        type: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        data: JSON.stringify({
          status: 'approve'
        }),
        success: function () {
          buildReviews();
        }
      });
    });

     /**
     * модуль может отклонять отзывы;
     */
    $('#reviews').on('click', '.declineBtn', function () {
      $.ajax({
        url: 'http://localhost:3000/reviews/' + $(this).attr('data-id'),
        type: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        data: JSON.stringify({
          status: 'decline'
        }),
        success: function () {
          buildReviews();
        }
      });
    });

    /**
     * d) модуль может удалять отзывы;
     */
    $('#reviews').on('click', '.delete', function () {
      $.ajax({
        url: 'http://localhost:3000/reviews/' + $(this).attr('data-id'),
        type: 'DELETE',
        success: function () {
          buildReviews();
        }
      });
    });

    /**
     * b) модуль может добавлять отзывы;
     */
    $('#send').on('click', function () {
      $.ajax({
        url: 'http://localhost:3000/reviews' ,
        type: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        data: JSON.stringify({
          text: document.getElementById('newReview').value,
          status: null
        }),
        success: function () {
          buildReviews();
          document.getElementById('newReview').value = '';
        }

      });
    });

   

  })

})(jQuery);