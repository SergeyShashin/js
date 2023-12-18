'use strict';

/*
1. Дан большой текст, в котором для обозначения диалогов используются одинарные кавычки. 
Придумать шаблон, который меняет одинарные кавычки на двойные.
*/


let pElement = document.querySelectorAll('p');

pElement.forEach(function (element) {
  let str = element.textContent;
  str = str.replace(/\B\'|\'\B/g, '"');
  element.textContent = str;
});
