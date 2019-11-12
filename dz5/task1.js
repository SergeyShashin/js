/**
 * 1 Создать функцию, генерирующую шахматную доску. При этом можно использовать любые
html-теги по своему желанию.
Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые
ячейки.
Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F,
G, H.
 */

generatorChessBoard();


function generatorChessBoard() {
    let tr, td;
    let letters=['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', '',];
    letters.reverse();
    document.body.style.backgroundColor = 'gray';
    document.body.style.color = 'gray';

    for (let i = 8; i >= 1; i--) {
        tr = document.createElement('tr');
        document.body.appendChild(tr);
        for (let j = 8; j >= 1; j--) {
            td = document.createElement('td');
            if (j === 8) {
                td.textContent = i;
            }
            if (i === 1) {
                td.textContent += letters[j];
            }

            (i % 2 === 0 && j % 2 === 0 || i % 2 != 0 && j % 2 != 0)
                ? td.style.backgroundColor = 'white'
                : td.style.backgroundColor = 'black';


            td.style.width = '40px';
            td.style.lineHeight = '40px';                        
            document.body.appendChild(td);
        }
    }


}
