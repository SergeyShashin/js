'use strict';

/*
1. Дан большой текст, в котором для обозначения диалогов используются одинарные кавычки. 
Придумать шаблон, который меняет одинарные кавычки на двойные.
*/

var textElements = document.querySelectorAll('p');

textElements.forEach(function (element) {
  element.textContent = element.textContent.replace(/\B\'|\'\B/g, '"');
});

