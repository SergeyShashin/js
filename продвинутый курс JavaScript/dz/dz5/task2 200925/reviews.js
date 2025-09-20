
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

var reviewsEl = document.getElementById('reviews');
updateReviews('http://localhost:3000/reviews', 'GET', '');
setEventHandlers();

function updateReviews(url, method, data) {
  var xhr = new XMLHttpRequest();
  switch (method) {
    case 'GET':
      xhr.open(method, url);
      xhr.send();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          updateHTML(JSON.parse(xhr.responseText));
        }
      }
      break;
    case 'POST':
      if (data.length > 0) {
        var dataForSend = JSON.stringify({
          status: "new",
          text: data,
          author: "Человек"
        })
        xhr.open(method, url);
        xhr.setRequestHeader('content-type', 'appliction/json');
        xhr.send(dataForSend);
        console.dir(xhr);
      }
      break;
  }


}

function updateHTML(reviews) {
  for (var review of reviews) {
    switch (review.status) {
      case 'new':
        createReview(review.id, review.text, true);
        break;
      case 'approved':
        createReview(review.id, review.text)
        break;
      case 'decline':
        break;
    }

  }
}

function createReview(id, text, addButtons) {
  var trEl = document.createElement('tr');
  trEl.id = id;
  var tdEl = document.createElement('td');
  tdEl.textContent = text;
  trEl.appendChild(tdEl);
  reviewsEl.appendChild(trEl);

  if (addButtons) {
    var btnApprovedEl = document.createElement('button');
    btnApprovedEl.textContent = 'Одобрить';
    trEl.appendChild(btnApprovedEl);
    var btnDeclineEl = document.createElement('button');
    btnDeclineEl.textContent = 'Отклонить';
    trEl.appendChild(btnDeclineEl);
    reviewsEl.appendChild(trEl);
  }
}

function setEventHandlers() {
  reviewsEl.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
      e.preventDefault();
      switch (e.target.textContent) {
        case 'Добавить':
          updateReviews('http://localhost:3000/reviews', 'POST', document.getElementById('textNewReview').value);
      }
    }
  })

}