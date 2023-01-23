'use strict';

/*
1. Дан большой текст, в котором для обозначения диалогов используются одинарные кавычки. 
Придумать шаблон, который меняет одинарные кавычки на двойные.
*/

var pEl = document.querySelectorAll('p');

console.log(pEl);

pEl.forEach(function(element){
  var text = element.textContent;

  element.textContent=text.replace(/\B'|'\B/g, '"');

})
