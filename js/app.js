// Size of the grid's squares
var squareHeight = 83,
    squareWidth = 101;

// Returns a random integer between min (included) and max (excluded)
var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Takes a relative position on the game's grid
// Returns x and y position 
// For example: setPosition(1,1) will return the position the enemy or the player 
// should have to be in the first square of the grid (left upper corner) 
var setPosition = function(xGrid, yGrid) {

    var x = (xGrid - 1) * squareWidth;
    var y = (yGrid - 2) * squareHeight + 60;

    return {'x': x, 'y': y};

}

// Takes x and y position 
// Returns relative position on the game's grid
var getPosition = function(x, y) {

    var xGrid = x / squareWidth + 1;
    var yGrid = (y - 60) / squareHeight + 2;

    return {'xGrid': xGrid, 'yGrid': yGrid};

}

// Enemies our player must avoid
var Enemy = function() {

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Determine initial position
    // Row position randomly chose between 3 stone paths
    var pos = setPosition(-1, getRandomInt(2, 5));
    this.x = pos['x'];
    this.y = pos['y'];

    // Randomly determine speed factor between 1 and 3
    this.speed = squareWidth * getRandomInt(1, 4);

}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';

    var pos = setPosition(3, 6);
    
    this.x = pos['x'];
    this.y = pos['y'];
}

Player.prototype.update = function(dt) {

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    
    var pos = getPosition(this.x, this.y);

    if (key === 'left' && pos['xGrid'] > 1) {
        this.x -= squareWidth;
    }
    
    else if (key === 'up' && pos['yGrid'] > 2) {
        this.y -= squareHeight;
    }
    
    else if (key === 'right' && pos['xGrid'] < 5) {
        this.x += squareWidth;
    }

    else if (key === 'down' && pos['yGrid'] < 6) {
        this.y += squareHeight;
    }
}

// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
allEnemies = [new Enemy(), new Enemy(), new Enemy()];

// Place the player object in a variable called player
player = new Player();


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
