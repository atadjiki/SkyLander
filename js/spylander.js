var screenWidth = 800;
var screenHeight = 600;
var playerGravity = 10;


var config = {
    title: "SpyLander",
    type: Phaser.AUTO,
    parent: 'gameDiv',
    width: screenWidth,
    height: screenHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: playerGravity},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

//player variables
var player;
var playerStartX = screenWidth/2;
var playerStartY = 25;
var playerVelocity = 20;
var playerStartVelocity = 2;

var platforms;

//score variables
var score = 0;
var landingFactor = 1;

//UI
var scoreText;
var menuText;
var endText;

//inputs
var qKey;
var leftKey;
var rightKey;
var enterKey;
var spaceKey;

//elapsed time
var startTime;
var endTime;
var currentTime;

var game = new Phaser.Game(config);

//bools/gamestates
var inAir = true;
var falling = false;
var startMenu = true;
var endMenu = false;



function preload() {
    this.load.image('background', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude',
        'assets/dude.png',
        {frameWidth: 32, frameHeight: 48}
    );
}

function create() {


    //set background
    this.add.image(screenWidth / 2, screenHeight / 2, 'background');

    //static group for ground, these are unnaffected by physics
    platforms = this.physics.add.staticGroup();
    platforms.create(screenWidth / 2, screenHeight - 2, 'ground').setScale(2).refreshBody();

    //add player sprite to game world
    player = this.physics.add.sprite(playerStartX, playerStartY, 'dude');
    player.setBounce(0);
    player.setCollideWorldBounds(true);
    //player.setGravityY(-1 * playerGravity);
    this.physics.pause();

    //setup spritesheets for character
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{key: 'dude', frame: 4}],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
    });

    //collider object
    this.physics.add.collider(player, platforms, playerLand, null, this);

    //initialize text
    scoreText = this.add.text(16, 16, 'Time: 0', {fontSize: '32px', fill: '#000'});
    menuText = this.add.text(screenWidth/4, screenHeight/2,
        'Welcome to SpyLander! \n Press Enter to Start Game',{fontSize: '32px', fill: '#000'});

    endText = this.add.text(screenWidth/4, screenHeight/2,
        '',{fontSize: '32px', fill: '#000'});


    //setup key press listeners
    this.qKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    //hide game actors for now
    hideGameActors();
    hideEndMenu();
    showStartMenu();

}

function restart() {

    //reset variables
    inAir = true;
    falling = false;
    score = 0;
    player.setVelocity(0, 0);
    //player.setGravityY(-1 * playerGravity);

    player.anims.play('turn', true);
    player.x = playerStartX;
    player.y = playerStartY;

    hideGameActors();
    hideEndMenu();

    startMenu = true;
    endMenu = false;

    showStartMenu();


}

function update() {

    if(startMenu == false && endMenu == false){

        if (this.qKey.isDown) {
            this.physics.pause();
            restart();
        }

        if (this.spaceKey.isDown && falling == false) {
            falling = true;
            // player.setGravityY(playerGravity);
            this.physics.resume();
            startTime = new Date();
            currentTime = startTime;
            console.log("Start Time is " + startTime);

        }

        if(falling){
            currentTime = new Date();
            var elapsed = currentTime - startTime;
            scoreText.setText('Time: ' + parseInt((elapsed/1000).toString()));
        }

        if(falling){
            if (this.leftKey.isDown) {
                if (inAir) {
                    player.setVelocityX(-1 * playerVelocity);

                    player.anims.play('left', true);
                }
            } else if (this.rightKey.isDown) {
                if (inAir) {
                    player.setVelocityX(playerVelocity);

                    player.anims.play('right', true);
                }
            } else {
                if (inAir) {

                    player.anims.play('turn', true);
                }
            }
        }
        else if(!falling){
            if (this.leftKey.isDown) {
                if (inAir) {
                    player.x -= playerStartVelocity;

                    player.anims.play('left', true);
                }
            } else if (this.rightKey.isDown) {
                if (inAir) {

                    player.x += playerStartVelocity;

                    player.anims.play('right', true);
                }
            } else {
                if (inAir) {

                    player.anims.play('turn', true);
                }
            }
        }
    } else if(startMenu == false && endMenu == true){
        showEndMenu();
        if(this.enterKey.isDown){
            hideEndMenu();
            this.physics.pause();
            restart();
        }
    } else if(startMenu == true && endMenu == false){
        if(this.enterKey.isDown){
            startMenu = false;
            showGameActors();
            hideStartMenu();
        }
    }


}

function playerLand(player, platforms) {
    inAir = false;
    player.setVelocity(0, 0);
    player.anims.play('turn', true);
    endTime = new Date();
    endMenu = true;
}

function hideGameActors(){
    player.setVisible(false);
   // platforms.setVisible(false);
    scoreText.setVisible(false);
}

function showGameActors(){
    player.setVisible(true);
    //platforms.setVisible(true);
    scoreText.setVisible(true);
}

function hideStartMenu(){
    menuText.setVisible(false);
}

function showStartMenu(){
    menuText.setVisible(true);
}

function hideEndMenu(){

    endText.setVisible(false);

}

function showEndMenu(){

    var time = endTime = startTime;
    time = time/1000;
    score = time * landingFactor;
    //scoreText.setText('Score: ' + score);
    endText.setText('Your score is: ' + score + '\n Press Enter to Restart');
    endText.setVisible(true);

}

