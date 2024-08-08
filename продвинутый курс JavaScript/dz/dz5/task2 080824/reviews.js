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

(function ($) {
  $(function () {
    renderReviews();

    $('#send').on('click', function (e) {
      $.ajax({
        url: 'http://localhost:3000/reviews',
        method: 'POST',
        data: {
          content: $('#review').val(),
          class: ''
        },
        success: alert('Ваш отзыв был передан на модерацию'),
      });
      renderReviews();
    });

    function renderReviews() {
      $('#containerReviews').empty();
      $.ajax({
        url: 'http://localhost:3000/reviews',
        method: 'GET',
        success: function (result) {
          var containerEl = document.getElementById('containerReviews');
          for (var review of result) {
            var p = document.createElement('p');
            var btnApprove = document.createElement('button');
            var btnDecline = document.createElement('button');
            btnApprove.textContent = 'Approve';
            btnApprove.dataset.id = review.id;
            btnApprove.className = 'btnApprove';
            btnDecline.textContent = 'Decline';
            btnDecline.dataset.id = review.id;
            btnDecline.className = 'btnDecline';
            p.textContent = review.content;
            p.className = review.class;
            containerEl.appendChild(p);
            containerEl.appendChild(btnApprove);
            containerEl.appendChild(btnDecline);
          }
        },
      });
    }

    $('#containerReviews').on('click', function (e) {
      var target = e.target;
      var dataToJson;

      if (target.tagName !== 'BUTTON') {
        return
      }

      if (target.className === 'btnApprove') {
        dataToJson = {
          id: target.dataset.id,
          class: "approved"
        }
      }

      if (target.className === 'btnDecline') {
        dataToJson = {
          id: target.dataset.id,
          class: "declined"
        }
      }

      $.ajax({
        method: 'PATCH',
        url: `http://localhost:3000/reviews/${target.dataset.id}`,
        data: dataToJson,
        success: function (result) {
          console.log(result);
          renderReviews();
        }
      });

    })

  })
})(jQuery)
