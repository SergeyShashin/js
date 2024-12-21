'use strict';

/*
1. Дан большой текст, в котором для обозначения диалогов используются одинарные кавычки. 
Придумать шаблон, который меняет одинарные кавычки на двойные.
*/


var pEls = document.querySelectorAll('p');

for (var pEl of pEls) {
  let content = pEl.textContent;
  pEl.textContent = content.replace(/'\B|\B'/ig, '"');
}
