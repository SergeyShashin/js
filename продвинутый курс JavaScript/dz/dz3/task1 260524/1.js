'use strict';

/*
1. Дан большой текст, в котором для обозначения диалогов используются одинарные кавычки. 
Придумать шаблон, который меняет одинарные кавычки на двойные.
*/

Object.values(document.getElementsByTagName('p')).map(el => el.textContent = el.textContent.replace(/\B'|'\B/g, '"'));



