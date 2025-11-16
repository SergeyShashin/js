"use strict";

// Объясните почему код даёт именно такие результаты?

let a = 1, b = 1, c, d;
c = ++a;
console.log(`${c} = 2, т.к. а = 2.`);
d = b++;
console.log(`${d} = 1, т.к. b = 1.`);
c = 2 + ++a;
console.log(`${c} = 5, т.к. 2 + a = 3.`);
d = 2 + b++;
console.log(`${d} = 4, т.к. 2 + b = 2.`);

