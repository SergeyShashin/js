'use strict';

/*
Нарисовать горку с помощью console.log (используя цикл for), как показано на
рисунке,
только у вашей горки должно быть 20 рядов, а не 5:
```
x
xxx
xxxxx
xxxxxxx
xxxxxxxxx
*/
for (let i = 0, x = 'x'; i < 21; console.log(`${x}\n`), i++, x += 'x') {  }