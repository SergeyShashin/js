'use strict';

/*
Программа спрашивает у пользователя температуру в градусах по Цельсию(используем
prompt чтобы ее получить).Используя alert программа выводит данную температуру в градусах
по Фаренгейту.
  Подсказка, расчёт идёт по формуле:
Tf = (9 / 5) * Tc + 32, где Tf – температура по Фаренгейту, Tc – температура по Цельсию.
 */

alert(`Температура по Фаренгейту ${((9 / 5) * Number(prompt('Какая температура по Цельсию?', 37)) + 32).toFixed(2)}`);