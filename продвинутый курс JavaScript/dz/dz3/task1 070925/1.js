'use strict';

/*
1. Дан большой текст, в котором для обозначения диалогов используются одинарные кавычки. 
Придумать шаблон, который меняет одинарные кавычки на двойные.
*/


for (var el of document.querySelectorAll('p')) {
  el.textContent = el.textContent.replace(/'\B|\B'/g, '"');
}