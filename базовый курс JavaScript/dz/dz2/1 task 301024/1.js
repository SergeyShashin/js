"use strict";

// Объясните почему код даёт именно такие результаты?

let a = 1, b = 1, c, d;
c = ++a;
console.log(`${c}=2. c=++a a=1+1`);

d = b++;
console.log(`${d}=1. d=b++ b=1+1`);

c = 2 + ++a;
console.log(`${c}=5. c=2 + ++a a=2+1=3`);

d = 2 + b++;
console.log(`${d}=4. d = 4 + b++ b=2+1`);

