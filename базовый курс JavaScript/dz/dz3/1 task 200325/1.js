'use strict';

/*
С помощью цикла do…while написать алгоритм для вывода чисел от 0 до 10
включительно, чтобы результат выглядел так:
```
0 – это ноль
1 – нечетное число
2 – четное число
3 – нечетное число
…
10 – четное число
```
*/

let i = 1;

do {

  if (i === 1) {
    console.log(`0 – это ноль`);
  }

  console.log(i % 2 === 0 ? `${i} – чётное число` : `${i} – нечётное число`);

  i++;

} while (i < 11)