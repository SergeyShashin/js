/**
 * 2*. Заполнить созданную таблицу фигурами, фигуры должны выглядеть как картинки, либо
можно использовать символы (существуют символы шахматных фигур) причем все фигуры
должны стоять на своих местах и быть соответственно черными и белыми.
 */

generatorChessBoard();


function generatorChessBoard() {
    let tr, td;
    let letters = ['','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', '',];
    letters.reverse();
    document.body.style.backgroundColor = 'gray';
    document.body.style.color = 'gray';

    for (let i = 9; i >= 0; i--) {
        tr = document.createElement('tr');
        document.body.appendChild(tr);

        for (let j = 9; j >= 0; j--) {
            td = document.createElement('td');
            if (j === 9) {
                td.textContent = i;
            }
            if (i === 0) {
                td.textContent += letters[j];
            }

            (i != 9 && j != 9 && i != 0 && j != 0 && i % 2 === 0 && j % 2 === 0 || i != 9 && j != 9 &&i != 0 && j != 0 && i % 2 != 0 && j % 2 != 0)
                ? td.style.backgroundColor = 'white'
                : td.style.backgroundColor = 'black';
            
            td.style.textAlign='center';

            if (i === 2&&j!=0&&j!=9) {
                td.innerHTML += '&#9823';
            }

            if (i === 7&&j!=0&&j!=9) {
                td.innerHTML += '&#9817';
            }

            if (i === 1 && j === 5) {
                td.innerHTML += '&#9818';
            }
            if (i === 1 && j === 4) {
                td.innerHTML += '&#9813';
            }
            if (i === 8 && j === 5) {
                td.innerHTML += '&#9812';
            }
            if (i === 8 && j === 4) {
                td.innerHTML += '&#9819';
            }
            if (i === 8 && (j === 1|| j==8)) {
                td.innerHTML += '&#9814';
            }
            if (i === 8 && (j === 2|| j==7)) {
                td.innerHTML += '&#9816';
            }
            if (i === 8 && (j === 3|| j==6)) {
                td.innerHTML += '&#9815';
            }
            if (i === 1 && (j === 1|| j==8)) {
                td.innerHTML += '&#9820';
            }
            if (i === 1 && (j === 2|| j==7)) {
                td.innerHTML += '&#9822';
            }
            if (i === 1 && (j === 3|| j==6)) {
                td.innerHTML += '&#9821';
            }


            td.style.width = '40px';
            td.style.lineHeight = '40px';
            document.body.appendChild(td);
        }
    }


}
