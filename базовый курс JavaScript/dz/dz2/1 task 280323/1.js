"use strict";

// Объясните почему код даёт именно такие результаты?

let a = 1, b = 1, c, d;
c = ++a;
console.log(c); //2 префиксная форма 'a'
d = b++;
console.log(d); //1 постфиксная форма 'b'
c = 2 + ++a;
console.log(c); //5 2 + 3
d = 2 + b++;
console.log(d); //4 2 + 2


