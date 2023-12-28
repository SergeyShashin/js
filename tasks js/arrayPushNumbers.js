'use strict';

export function arrayPushNumbers(num1, num2) {
  let arrNumbers = [];

  for (let i = num1; i < num2; i++) {
    arrNumbers.push(i);
  }

  return arrNumbers;
}
