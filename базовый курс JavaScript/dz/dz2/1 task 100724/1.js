"use strict";

// Объясните почему код даёт именно такие результаты?

let a = 1, b = 1, c, d;
c = ++a;
console.log(c + ' = 2 (1+1=2)');
d = b++;
console.log(d + ' = 1');
c = 2 + ++a;
console.log(c + ' = 5 (2+3)');
d = 2 + b++;
console.log(d + ' = 4 (2+2)');

