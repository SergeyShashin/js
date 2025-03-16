"use strict";

// Объясните почему код даёт именно такие результаты?

let a = 1, b = 1, c, d;
c = ++a;
console.log(`c = ++a; c=${c} 2 т.к. 1+1=2`); //a=2
d = b++;
console.log(`d = b++; d=${d} 1 т.к. 1`); //b=2
c = 2 + ++a;
console.log(`c = 2 + ++a; c=${c} 5 т.к. 2+3`); //a=3 
d = 2 + b++;
console.log(`d = 2 + b++; d=${d} 4 т.к. 2+2`); //b=3 

