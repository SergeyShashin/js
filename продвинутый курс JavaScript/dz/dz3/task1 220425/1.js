'use strict';

/*
1. Дан большой текст, в котором для обозначения диалогов используются одинарные кавычки. 
Придумать шаблон, который меняет одинарные кавычки на двойные.
*/

for(let elP of document.querySelectorAll('p')){
  elP.textContent=elP.textContent.replace(/('\B|\B')/ig, '"');
}

