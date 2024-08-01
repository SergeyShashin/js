'use strict';

/*
1. Дан большой текст, в котором для обозначения диалогов используются одинарные кавычки. 
Придумать шаблон, который меняет одинарные кавычки на двойные.
*/

var p = document.getElementsByTagName('p');

for (let item of p) {
  item.textContent = item.textContent.replace(/\B'|'\B/g, '"');
}