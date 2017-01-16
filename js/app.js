/* -------------------------- */
/* ---------Enemy------------ */
/* -------------------------- */
var Enemy = function(x,y) {
    this.x = x;
    this.y = y;
    this.coordinate = [x,y];
    this.speed = (Math.random() * 200)+100;
    this.sprite = 'images/enemy-bug.png';
};

// update - This function will update the movement of 
// each enemy. 
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > 650) {
        this.x = 0;
    }
};

// reset - This reset function will reset the current postion
// of the each enemy to the default postion.
Enemy.prototype.reset = function() {
    this.x = this.coordinate[0];
    this.y = this.coordinate[1];
}

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/* -------------------------- */
/* ---------Player----------- */
/* -------------------------- */
var Player = function(x,y) {
    this.x = x;
    this.y = y;
    this.coordinate = [x,y];
    this.sprite = 'images/char-horn-girl.png';
    this.score = 0;
    this.lives = 3;
    this.gem = 0;
};

// update - this function will update the postion of the player
// based on the keyup function and and set the boundary for the
// movement.
Player.prototype.update = function() {
    if (this.lives > 0) {
        // X Coordinate
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x > 400) {
            this.x = 400;
        }

        // Y Coordinate 
        if (this.y < 60) {
            //update score;
            this.score++;
            document.getElementById("playerScore").innerHTML = this.score;
            //reset current position of player to the default postion
            this.reset();
            //reset gem position
            gem.reset();
            //reset enemies's speed and position
            for (var i = 0; i<allEnemies.length; i++){
                allEnemies[i].reset();
                //set a new speed for each enemy
                var newspeed = (allEnemies[i].speed) + (Math.random()*100);
                allEnemies[i].speed = newspeed;
            };
            //reset heart postion 
            heart.reset();
        } else if (this.y > 400) {
            this.y = 400;
        }     
    } else if (this.lives == 0) { //Player disappears when lives become 0
        this.x = 2000;
        this.y = 2000;
    }
    this.checkCollision();
    this.collectGem();
    this.collectHeart();
};

// render - this function is to draw the player image on canvas
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// handleInput - this function handles the the movement of the player
// based on the key press value.
Player.prototype.handleInput  = function(keys) {
    switch(keys){
        case 'left':
            this.x -= 100;
            break;
        case 'up':
            this.y -= 85;
            break;
        case 'right':
            this.x += 100;
            break;
        case 'down':
            this.y += 85;
            break;
    }
};

// reset - this function reset the positon of the player
// to default postion.
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

// checkCollisions - this function check the collision between
// the player and the enemies. If the collision happened, the
// player will be reset to the default postion and player's lives
// will be decreased and update it on the screen.
Player.prototype.checkCollision = function() {
    for (var i = 0; i<allEnemies.length; i++) {
        if ((this.y -5)== allEnemies[i].y){
            if ((this.x - 4 < allEnemies[i].x+50) && 
                (this.x + 46 > allEnemies[i].x)) {
                    this.reset();
                    this.checkLives();
                    document.getElementById("playerLives").innerHTML = this.lives;
            }
        }
    }
};

// checkLives - this function checks the player's lives. The player's lives
// will be reduced when the enemies collide with the player. When the player
// has no more lives, all enemies will be freezed and will alert the player
// to refresh the page to restart the game.
Player.prototype.checkLives = function() {
    this.lives--;
    if (this.lives < 1) {
        this.lives = 0;
        //Freeze the movement of enemies;
        for (var i = 0; i < allEnemies.length; i++) {
            allEnemies[i].speed = 0;
        }
        alert("Game Over - Please refresh the page to Reset the game!");
        //Enemy Disappears
        for (var i = 0; i < allEnemies.length; i++) {
            allEnemies[i].x = 1000;
            allEnemies[i].y = 1000;
        }
        //Gem disappears
        gem.x = 1000;
        gem.y = 1000;
        //Heart disappears
        heart.x = 1000;
        heart.y = 1000;
    }
};

// collectGem -  this function will let the player collect gem
Player.prototype.collectGem = function () {
    if (this.y - 5 == gem.y) {
        //console.log("matching y - CollectGem function");
        if (this.x == gem.x) {
            this.gem++;
            var gemCollection = document.getElementById("gemCollection");
            gemCollection.innerHTML = this.gem;
            //gem reset postion
            gem.x = 1000;
            gem.y = 1000;
        }
    }
};
// collectHeart - this function will give player more lives
Player.prototype.collectHeart = function () {
    if (this.y - 5 == heart.y) {
        //console.log("matching y - CollectGem function");
        if (this.x == heart.x) {
            console.log("matching x and y - collectHeart");
            this.lives++;
            document.getElementById("playerLives").innerHTML = this.lives;
            //heart _ reset postion
            heart.x = 1000;
            heart.y = 1000;    
        }
    }
};

/* -------------------------- */
/* -----------Gem------------ */
/* -------------------------- */
var Gem = function() {
    this.x = Math.random() * 1000;
    if (this.x < 100) {
        this.x = 0;
    } else if (this.x < 200) {
        this.x = 100;
    } else if (this.x < 300) {
        this.x = 200;
    } else if( this.x < 400) {
        this.x =  300;
    } else {
        this.x = 400;
    }

    this.y = Math.random() * 1000;
    if (this.y < 100) {
        this.y = 55;//50;
    } else if (this.y < 200) {
        this.y = 140;//135;
    } else if (this.y < 300) {
        this.y = 225;//220;
    } else {
        this.y = 310;//315;
    }
    this.sprite = 'images/Gem_Green.png';
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Gem.prototype.reset = function() {
    this.x = Math.random() * 1000;
    if (this.x < 100) {
        this.x = 0;
    } else if (this.x < 200) {
        this.x = 100;
    } else if (this.x < 300) {
        this.x = 200;
    } else if (this.x < 400) {
        this.x =  300;
    } else {
        this.x = 400;
    }

    this.y = Math.random() * 1000;
    if (this.y < 100) {
        this.y = 55;//50;
    } else if (this.y < 200) {
        this.y = 140;//135;
    } else if (this.y < 300) {
        this.y = 225;//220;
    } else {
        this.y = 310;//315;
    }
};

/* -------------------------- */
/* -----------Heart------------ */
/* -------------------------- */
var Heart = function() {
    this.x = Math.random() * 1000;
    if (this.x < 100) {
        this.x = 0;
    } else if (this.x < 200) {
        this.x = 100;
    } else if (this.x < 300) {
        this.x = 200;
    } else if (this.x < 400) {
        this.x =  300;
    } else {
        this.x = 400;
    }

    this.y = Math.random() * 1000;
    if (this.y < 100) {
        this.y = 55;
    } else if (this.y < 200) {
        this.y = 140;
    } else if (this.y < 300) {
        this.y = 225;
    } else {
        this.y = 310;
    }
    this.sprite = 'images/Heart.png';
};

Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Heart.prototype.reset = function() {
    this.x = Math.random() * 1000;
    if (this.x < 100) {
        this.x = 0;
    } else if (this.x < 200) {
        this.x = 100;
    } else if (this.x < 300) {
        this.x = 200;
    } else if (this.x < 400) {
        this.x =  300;
    } else {
        this.x = 400;
    }

    this.y = Math.random() * 1000;
    if (this.y < 100) {
        this.y = 55;
    } else if (this.y < 200) {
        this.y = 140;
    } else if (this.y < 300) {
        this.y = 225;
    } else {
        this.y = 310;
    }
};
/*-----------------------*/
// Now instantiate your objects.
//Enemy
var allEnemies = [];
var enemy_one = new Enemy(0,55);
var enemy_two = new Enemy(0,140);
var enemy_three = new Enemy(0,225);
var enemy_four = new Enemy(0,310);
allEnemies.push(enemy_one, enemy_two, enemy_three, enemy_four);

//Player
var player = new Player(200, 400);

//Gem
var gem = new Gem();

//Heart
var heart = new Heart();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
