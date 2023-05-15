'use strict';

/*
1. Дан большой текст, в котором для обозначения диалогов используются одинарные кавычки. 
Придумать шаблон, который меняет одинарные кавычки на двойные.
*/

var pElements = document.querySelectorAll('p');

console.log(pElements);

pElements.forEach(function(pElement){
  console.log(pElement.textContent);
  let text = pElement.textContent;
  pElement.textContent = text.replace(/\'\B|\B\'/g, '"');
})
