// Size of the grid's squares
var squareHeight = 83,
    squareWidth = 101,
    gridHeight = 6,
    gridWidth = 5;

// Returns a random integer between min (included) and max (excluded)
var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Takes a relative position on the game's grid
// Returns x and y position 
// For example: setPosition(1,1) will return the position the enemy or the player 
// should have to be on the first square of the grid (left upper corner) 
var setPosition = function(xGrid, yGrid) {
    var x = (xGrid - 1) * squareWidth;
    var y = (yGrid - 2) * squareHeight + 60;

    return {'x': x, 'y': y};
};

// Enemies our player must avoid
var Enemy = function() {
    // Reset enemy
    this.reset();
};

// Reset enemy position, direction and speed
Enemy.prototype.reset = function() {
    // Randomly determine if enemy will walk reverse way
    // (from right to left)
    this.reverseWay = [true, false][Math.round(Math.random())];

    // Determine initial position
    // Row position randomly chose between 3 stone paths
    if (this.reverseWay) {
        // Set reverse image for reverseWay enemies
        this.sprite = 'images/enemy-bug-reverse.png';

        //Enemy begins course outside of screen on right side
        this.x = gridWidth + 1;
    }
    else {
        this.sprite = 'images/enemy-bug.png';

        // Enemy begins course outside of screen on left side
        this.x = -1;
    }

    // Randomly determine row position of enemy (stone path)
    this.y = getRandomInt(2, 5);

    // Randomly determine speed factor between 1 and 3
    this.speed = getRandomInt(1, 4);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Reset enemy when gets out of the screen
    if (this.x > (gridWidth + 1) || this.x < -1) {
        this.reset();
    }
    // Direction set reverse way for reverseWay enemies
    else if (this.reverseWay) {
        this.x -= dt * this.speed;   
    }

    else {
        this.x += dt * this.speed;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    // Translate position
    var pos = setPosition(this.x, this.y);

    // Draw enemy objects
    ctx.drawImage(Resources.get(this.sprite), pos['x'], pos['y']);
}

// Player the user will play
var Player = function() {
    // Define initial position of player
    // Positioned at the center-bottom of the screen
    this.xInitial = Math.ceil(gridWidth / 2);
    this.yInitial = gridHeight;

    // Define initial number of lives
    this.livesNumInitial = 4;

    // Define array of character images
    this.charactersImages = [
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-princess-girl.png',
        'images/char-pink-girl.png'
    ];

    // Initialize character's position in this.charactersImages array
    this.character = 0;

    // Initialize highscore
    this.highscore = 0;

    // Reset player
    this.reset();
};

// Reset player image, position and number of lives
Player.prototype.reset = function() {    
    // Initialize player position
    this.x = this.xInitial;
    this.y = this.yInitial; 

    // Reset number of lives
    this.livesNum = this.livesNumInitial;

    // Reset score
    this.score = 0;

    // Initialize menu screen behavior
    this.menu = true;
}

// Collision handling
Player.prototype.collision = function() {
    // Initialize player position
    this.x = this.xInitial;
    this.y = this.yInitial; 

    // Reduce number of lives
    this.livesNum -= 1;

    // Reset player if no life left
    if (this.livesNum === 0) {
        this.reset();
    }
}

// Collection of gems handling
Player.prototype.collect = function() {
    // Increment player's score
    this.score += 1;

    // Change highscore if passed by score
    if (this.score > this.highscore) {
        this.highscore = this.score;
    }
}

Player.prototype.update = function(dt) {

}

// Draw the player on the screen
Player.prototype.render = function() {
    // Set character image
    this.sprite = this.charactersImages[this.character];

    // Translate position
    var pos = setPosition(this.x, this.y);

    // Draw player object
    ctx.drawImage(Resources.get(this.sprite), pos['x'], pos['y']);
}

// Handle keyboard input (left, up, right or down)
Player.prototype.handleInput = function(key) {
    // Menu screen input handling behavior.
    // Left and right arrows will allow the user to change the player's sprite.
    // Hit ENTER to launch a new game.
    if (this.menu) {
        if (key === 'left') {
            if (this.character === 0) {
                this.character = this.charactersImages.length-1;
            }

            else {
                this.character -= 1;
            }
        }

        else if (key === 'right') {
            if (this.character === this.charactersImages.length-1) {
                this.character = 0;
            }
            
            else {
                this.character += 1;
            }
        }

        else if (key === 'enter') {
            player.menu = false;
        }
    }

    // Game screen input handling behavior.
    // Hit arrow keys to move the player on the game screen.
    else if (key === 'left' && this.x > 1) {
        this.x -= 1;
    }
    
    else if (key === 'up' && this.y > 2) {
        this.y -= 1;
    }
    
    else if (key === 'right' && this.x < gridWidth) {
        this.x += 1;
    }

    else if (key === 'down' && this.y < gridHeight) {
        this.y += 1;
    }
}

// Gems the player will have to fetch
var Gem = function() {
    // Reset gem
    this.reset();
};

Gem.prototype.reset = function() {
    // Randomly determine gem color
    this.sprite = ['images/Gem Green.png', 'images/Gem Blue.png', 
        'images/Gem Orange.png'][getRandomInt(0, 3)];

    // Randomly determine column position of gem (stone path)
    this.x = getRandomInt(1, 6);

    // Randomly determine row position of gem (stone path)
    this.y = getRandomInt(2, 5);
}

// Draw the gem on the screen
Gem.prototype.render = function() {
    // Translate position
    var pos = setPosition(this.x, this.y);

    // Draw enemy objects
    ctx.drawImage(Resources.get(this.sprite), pos['x'], pos['y']);
}

// Place all enemy objects in an array called allEnemies
allEnemies = [new Enemy(), new Enemy(), new Enemy()];

// Place the player object in a variable called player
player = new Player();

// Place the gem object in a variable called gem
gem = new Gem();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
