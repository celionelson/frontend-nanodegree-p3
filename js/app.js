// Size of the grid's squares
var squareHeight = 83,
    squareWidth = 101,
    gridHeight = 6,
    gridWidth = 5;

// Returns a random integer between min (included) and max (excluded)
var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Takes a relative position on the game's grid
// Returns x and y position 
// For example: setPosition(1,1) will return the position the enemy or the player 
// should have to be on the first square of the grid (left upper corner) 
var setPosition = function(xGrid, yGrid) {
    var x = (xGrid - 1) * squareWidth;
    var y = (yGrid - 2) * squareHeight + 60;

    return {'x': x, 'y': y};
}

// Enemies our player must avoid
var Enemy = function() {
    // The image/sprite for our enemies
    this.reset();
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > (gridWidth + 1) || this.x < -1) {
        this.reset();
    }
    else if (this.reverseWay) {
        this.x -= dt * this.speed;   
    }
    else {
        this.x += dt * this.speed;
    }
}

// Reset the enemy position and speed
Enemy.prototype.reset = function() {
    // Randomly determine if enemy will walk reverse way
    // (from right to left)
    this.reverseWay = [true, false][Math.round(Math.random())];

    // Determine initial position
    // Row position randomly chose between 3 stone paths
    if (this.reverseWay) {
        this.sprite = 'images/enemy-bug-reverse.png';
        this.x = gridWidth + 1;
    }
    else {
        this.sprite = 'images/enemy-bug.png';
        this.x = -1;
    }
    this.y = getRandomInt(2, 5);

    // Randomly determine speed factor between 1 and 3
    this.speed = getRandomInt(1, 4);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    var pos = setPosition(this.x, this.y);
    ctx.drawImage(Resources.get(this.sprite), pos['x'], pos['y']);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.reset();
}

Player.prototype.update = function(dt) {

}

Player.prototype.reset = function() {
    this.x = Math.ceil(gridWidth / 2);
    this.y = gridHeight;    
}

Player.prototype.render = function() {
    var pos = setPosition(this.x, this.y);
    ctx.drawImage(Resources.get(this.sprite), pos['x'], pos['y']);
}

Player.prototype.handleInput = function(key) {

    if (key === 'left' && this.x > 1) {
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
