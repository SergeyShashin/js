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


(
  function ($) {
    $(function () {
      exchangeDB('http://localhost:3000/reviews', 'GET');
      setEventHandlers();

      function addReviews(linkDB, data) {
        var review = {
          textReview: data,
          statusReview: "waiting"
        }
        exchangeDB(linkDB, 'POST', review);
        exchangeDB(linkDB, 'GET');
      }

      function updateReviews(linkDB, idReview, newStatusReview) {
        if (newStatusReview === 'approve') {
          exchangeDB(linkDB + '/' + idReview, 'PATCH', { statusReview: newStatusReview });
        } else {
          exchangeDB(linkDB + '/' + idReview,'DELETE');
        }
        exchangeDB(linkDB, 'GET');
      }

      function setEventHandlers() {
        $('#reviews').on('click', function (e) {
          handlerClick(e);
        }
        );
      }

      function outputHTML(idMonitor, data) {
        $monitorHTMLEl = $('#' + idMonitor);
        $monitorHTMLEl.empty();

        $tableHTMLEl = $('<table>');
        $monitorHTMLEl.append($tableHTMLEl);

        $trHeaderTableHTMLEl = $('<tr/>');

        [
          $('<th/>').text('id'),
          $('<th/>').text('отзыв'),
          $('<th/>').text(''),
          $('<th/>').text(''),
          $('<th/>').text('')
        ].map(function ($th) {
          $trHeaderTableHTMLEl.append($th);
        });

        $tableHTMLEl.append($trHeaderTableHTMLEl);

        if (Array.isArray(data)) {
          data.map(function (el) {

            $trHTMLEl = $('<tr/>', {
              'data-id': 'reviewTrId_' + el.id
            });

            if (el.statusReview === 'approve') {
              $trHTMLEl.addClass('approvedReview');
            }

            var tdArr = [
              $('<td/>').text(el.id),
              $('<td/>').text(el.textReview),
            ];

            if (el.statusReview === 'waiting') {
              tdArr.push($('<td/>').append($('<button/>', {
                class: 'btnApprove',
                text: 'одобрить',
                'data-id': 'approve_' + el.id
              })));
              tdArr.push($('<td/>').append($('<button/>', {
                class: 'btnDelete',
                text: 'удалить',
                'data-id': 'delete_' + el.id
              })));
            }

            tdArr.map(function ($td) {
              $trHTMLEl.append($td);
            });

            $tableHTMLEl.append($trHTMLEl);

          });
        }
      }

      function exchangeDB(linkDB, method, data) {
        var objForAjax = {
          url: linkDB,
          type: method,
          headers: { 'content-type': 'application/json' },
          dataType: 'json',
          success: function (answerData) {
            outputHTML('monitor', answerData);
          }
        }

        if (data) {
          objForAjax.data = JSON.stringify(data);
        }

        $.ajax(objForAjax);

      }

      function handlerClick(e) {
        switch (e.target.className) {
          case 'btnSendReview':
            addReviews('http://localhost:3000/reviews', $('#textareaAddReview').val());
            break;
          case 'btnApprove':
            updateReviews('http://localhost:3000/reviews', e.target.dataset.id.split('_')[1], 'approve');
            break;
          case 'btnDelete':
            updateReviews('http://localhost:3000/reviews', e.target.dataset.id.split('_')[1], 'delete');
            break;
        }
      }

    });
  }
)(jQuery);