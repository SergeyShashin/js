"use strict";

// Объясните почему код даёт именно такие результаты?

let a = 1, b = 1, c, d;

c = ++a;
console.log(`${c} = 2, т.к. a = 1  =>  с = ++a  =>  c = 1 + 1 `);

d = b++;
console.log(`${d} = 1, т.к. b = 1  =>  d = b++  =>  d = 1 `);

c = 2 + ++a;
console.log(`${c} = 5, т.к. a = 2  =>  с = 2 + ++a  =>  c = 2 + 3 `);

d = 2 + b++;
console.log(`${d} = 4, т.к. b = 2  =>  d = 2 + b++  =>  d = 2 + 2 `);

