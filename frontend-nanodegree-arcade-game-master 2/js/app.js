"use strict";
// alert massage 
alert("Press space key to change hero\nGood Luck");
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x ,
    this.y = y,
    this.speed = speed,
    this.sprite = 'images/enemy-bug.png'
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed) * dt;
    if ( this.x >= 550)
    {
        this.x = -50;
        this.randomSpeed(); 
    }
    checkCollision(this);
};
// enemy random speed 
var enemySpeed = 2;
Enemy.prototype.randomSpeed = function (){
    this.speed = enemySpeed * Math.floor(Math.random() * 3 + 1);
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

let starsXLocation = [400, 300, 200, 100, 0];
let starsYLocation = [400, 310, 220, 130, 40];
// star class 
class Stars {
    constructor(x, y){
        this.stars = 'images/Star.png',
        this.x = x,
        this.y = y
    }
    update(){
    }
    render(){
        ctx.drawImage(Resources.get(this.stars), this.x, this.y);
    }
}


// player class 
class Player {
    constructor(x, y){
        this.img = 'images/char-boy.png',
        this.y = y,
        this.x = x,
        this.score = 0,
        this.hero = [
            'images/char-boy.png',
            'images/char-cat-girl.png',
            'images/char-horn-girl.png',
            'images/char-pink-girl.png',
            'images/char-princess-girl.png',
        ]
    }
    update(){
    }
    

    render(){
        ctx.drawImage(Resources.get(this.img), this.x, this.y);
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.fillText("Score: " + this.score, 5, 45, 120);
        // ctx.fillText("press space to change hero", 60, 595, 400);
    }
//Player movements
    handleInput(key){
        //Player move Up
        if (key == 'up' && this.y > 0)
        {
          this.y -= 90;
        }
        //Player move Down
        if (key == 'down' && this.y < 400)
        {
          this.y += 90; 
        }
        //Player move Right
        if (key == 'right' && this.x < 400)
        {
          this.x += 100; 
        }
        //Player move Left
        if (key == 'left' && this.x > 0)
        {
          this.x -= 100;
        }
        //hero change with space key
        if (key == 'space'){
            changePlayerImg();
        }
    }
}
let c = 0;

// Function to change the hero
function changePlayerImg() {
    c = (c + 1) % player.hero.length;
    player.img = player.hero[c];
};

// Function to reset hero location
function reset(){
    player.x = 200;
    player.y = 400;
};

function checkCollision (enemy) {
    //collision between player & enemy
    if (
        player.y + 130 >= enemy.y + 90
        && player.x + 10 <= enemy.x + 75
        && player.y + 80 <= enemy.y + 135
        && player.x + 70 >= enemy.x + 10){
            reset();
            player.score -= 1;
    }
    //collision between player & winning zone
    if (player.y === -50){
        reset();
        player.score += 1;
    }
    //collision between player & star
    if (player.y === stars.y && player.x === stars.x){
        player.score += 10;
        stars = new Stars(starsXLocation[Math.floor(Math.random(starsXLocation)*5)], starsYLocation[Math.floor(Math.random(starsYLocation)*5)]);
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let enemiesPlaces = [60, 140, 220];
let player = new Player(200,400);
let enemy = [];
let stars = new Stars(200, 130);


// enemy loop
for (let i = 0 ; i < 4 ; i++ ){
        enemy = new Enemy(-50, enemiesPlaces[i], i + 1);
    if (i === 3){
        enemy = new Enemy(-50, enemiesPlaces[Math.floor(Math.random(enemiesPlaces)*3)], i+1);
    }
        allEnemies.push(enemy);
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
