/*1 Объясните почему код даёт именно такие результаты?
*/

let a = 1, b = 1, c, d;
c = ++a;
alert(c); //  c=1+1
d = b++; 
alert(d); //  b=1 
c = 2 + ++a;
alert(c); // c=2+3
d = 2 + b++;
alert(d); //  2+2
alert(a); //  3
alert(b); //  3