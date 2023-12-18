"use strict";

// Объясните почему код даёт именно такие результаты?

let a = 1, b = 1, c, d;
c = ++a;
// console.log(`c=1+1=2 c=${c} a=${a}  ++a`);
d = b++;
// console.log(`d=1 d=${d} b=2 b=${b} b++`);
c = 2 + ++a;
// console.log(`c=2+3=5 c=${c} a=3 a=${a} ++a`);
d = 2 + b++;
console.log(`d=2+2=4 d=${d} b=3 b=${b} b++`);


