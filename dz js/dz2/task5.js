/**
 * 5 Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation),
где arg1, arg2 – значения аргументов, operation – строка с названием операции. В зависимости
от
переданного значения операции (использовать switch) выполнить одну из арифметических
операций
(использовать функции из задания 4) и вернуть полученное значение.
 */

console.log(mathOperation(10, 10, '+'));
console.log(mathOperation(10, 10, '-'));
console.log(mathOperation(10, 10, '/'));
console.log(mathOperation(10, 10, '*'));
console.log(mathOperation(10, 10, 'фигня'));


function mathOperation(arg1, arg2, operation) {
    switch (operation) {
        case '+': return sum(arg1, arg2);
        case '-': return subtraction(arg1, arg2);
        case '/': return divide(arg1, arg2);
        case '*': return multiplication(arg1, arg2);
        default: return 'ввели фигню. нужно дописывать код проверки или введите одну из четырех базоввых операций';
    }
}

function sum(a, b) {
    return a + b;
}
function subtraction(a, b) {
    return a - b;
}
function divide(a, b) {
    return a / b;
}
function multiplication(a, b) {
    return a * b;
}



