"use strict";

// Объясните почему код даёт именно такие результаты?

let a = 1, b = 1, c, d;
c = ++a;
console.log(c + ' 1+1=2');
d = b++;
console.log(d + ' 1');
c = 2 + ++a;
console.log(c + ' 2+3=5');
d = 2 + b++;
console.log(d + ' 2+2=4');

