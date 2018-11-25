/* class used to paint Modal */
class Modal {
    constructor(overlay) {
        this.overlay = overlay;
        const replay = overlay.querySelector('.button-replay');
        replay.addEventListener('click', this.close.bind(this));

    }
    open() {
        this.overlay.classList.remove('hide-modal');
    }

    close() {
        this.overlay.classList.add('hide-modal');
        player = new Player();
        allEnemies = [new Enemy(-200, 55, 100), new Enemy(-10, 140, 120), new Enemy(-100, 55, 50), new Enemy(-400, 140, 100), new Enemy(-50, 220, 200), new Enemy(-300, 220, 50), new Enemy(-150, 220, 50)];

    }

}

/* Enemy class to implement and handle bugs */
class Enemy {
    /* constructor to add properties to a bug */
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        const resetPosX = x;
        const resetPosY = y;
        this.sprite = 'images/enemy-bug.png';
    }
/* update method moves bugs with respective speeds */
    update(dt) {
        if (this.x <= 450) {
            this.x += this.speed * dt;
        }
        else {
            this.x = -this.speed;
        }

    };
/* update end */

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y); /* to draw bugs on screen */
    };

};

/* Enemy class end */

/* Player class to paint and handle hero/player */
class Player {
     /* constructor to add properties to a bug */
    constructor() {
        this.sprite = 'images/char-princess-girl.png';
        this.x = 200;
        this.y = 400;
    };
    /* to draw player */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
    /* to detect collisions and update players  and enemies' location to initial ones */
    update() {
        for (let enemy of allEnemies) {
            let base = this.x - enemy.x - 5;
            let height = this.y - enemy.y - 10;
            let distance = Math.sqrt(base * base + height * height);
            if (distance < 54) {
                this.x = 200;
                this.y = 400;

                allEnemies = [new Enemy(-200, 55, 100), new Enemy(-10, 140, 120), new Enemy(-100, 55, 50), new Enemy(-400, 140, 100), new Enemy(-50, 220, 200), new Enemy(-300, 220, 50), new Enemy(-150, 220, 50)];
            }
        }
    };
    /* HandleInput method handles the movements of player
     * It has conditions to stop player from moving outside of board 
    */
    handleInput(code) {
        console.log('in inout handle');
        if (code === 'left') {

            if (this.x >= 50)
                this.x -= 100;
        }
        else if (code === 'up') {
            if (this.y >= 50)
                this.y -= 90;
            else {
                /* if player reached water call Modal class to paint modal */
                let modal = new Modal(document.querySelector('.modal-overlay'));
                modal.open();
            }
        }
        else if (code === 'right') {
            if (this.x <= 300)
                this.x += 100;
        }
        else if (code === 'down') {
            if (this.y <= 350)
                this.y += 90;

        }
    };

};

/* intantiating enemy and player variables */
let allEnemies = [new Enemy(-200, 55, 100), new Enemy(-10, 140, 120), new Enemy(-100, 55, 50), new Enemy(-400, 140, 100), new Enemy(-50, 220, 200), new Enemy(-300, 220, 50), new Enemy(-150, 220, 50)];

let player = new Player();

/* eventlistener to handle key press */
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
