
const settings = {
    rowsCount: 7,
    cellCount: 7,
    startPlayerX: 2,
    startPlayerY: 2,
}


const field = {
    rowsCount: null,
    cellCount: null,

    init(rowsCount, cellCount) {
        this.rowsCount = rowsCount;
        this.cellCount = cellCount;
    },

};

const player = {
    x: null,
    y: null,

    init(startPlayerX, startPlayerY) {
        this.x = startPlayerX;
        this.y = startPlayerY;
    },

    move(moveX, moveY) {
        this.x = moveX;
        this.y = moveY;
    },

};

const game = {
    settings,
    field,
    player,

    /**
     * старт бродилки
     */
    run() {
        field.init(this.settings.rowsCount, this.settings.cellCount);
        player.init(this.settings.startPlayerX, this.settings.startPlayerY);
        this.render();
        this.movePlayer();
    },

    /**
     * обновление экрана
     */
    render() {
        this.createField();
    },


    /**
     * создание поля
     */

    createField() {

        let gameElement = document.getElementById('game');
        gameElement.innerHTML = " ";



        for (let i = 0; i < this.field.rowsCount; i++) {
            let tr = document.createElement('tr');

            gameElement.appendChild(tr);

            for (let j = 0; j < this.field.cellCount; j++) {
                let td = document.createElement('td');
                td.classList.add('x' + i + 'y' + j);
                if (i === this.player.x && j === this.player.y) {
                    td.classList.add('player');
                }
                tr.appendChild(td);
            }
        }

    },

    /**
     * передвижение игрока
     */
    movePlayer() {
        let moveX = player.x;
        let moveY = player.y;

        addEventListener('keydown', (e) => {
            switch (e.key) {
                case '2':
                case 'ArrowDown':
                    if (moveX >= 0 && moveX < field.rowsCount - 1) {
                        moveX++;
                        player.move(moveX, moveY);                      
                    }
                    this.render();
                    break;

                case '8':
                case 'ArrowUp':
                    if (moveX > 0) {
                        moveX--;
                        player.move(moveX, moveY);                       
                    }
                    this.render();
                    break;
                case '4':
                case 'ArrowLeft':
                    if (moveY > 0) {
                        moveY--;
                        player.move(moveX, moveY);                       
                    }
                    this.render();
                    break;
                case '6':
                case 'ArrowRight':
                    if (moveY >= 0 && moveY < field.cellCount - 1) {
                        moveY++;
                        player.move(moveX, moveY);                        
                    }
                    this.render();
                    break;
                case '1':
                    if ((moveY > 0) && (moveX >= 0 && moveX < field.rowsCount - 1)) {
                        moveY--;
                        moveX++;
                        player.move(moveX, moveY);                       
                    }
                    this.render();
                    break;
                case '3':
                    if ((moveY >= 0 && moveY < field.cellCount - 1) && (moveX >= 0 && moveX < field.rowsCount - 1)) {
                        moveY++;
                        moveX++;
                        player.move(moveX, moveY);                       
                    }
                    this.render();
                    break;
                case '7':
                    if ((moveY > 0) && (moveX > 0)) {
                        moveY--;
                        moveX--;
                        player.move(moveX, moveY);                        
                    }
                    this.render();
                    break;
                case '9':
                    if ((moveY >= 0 && moveY < field.cellCount - 1) && (moveX > 0)) {
                        moveY++;
                        moveX--;
                        player.move(moveX, moveY);                        
                    }
                    this.render();
                    break;
            }
        })
    }


};

game.run();