var screenWidth = 800;
var screenHeight = 600;
var gravity = 25;

var config = {
    title: "SpyLander",
    type: Phaser.AUTO,
    parent: 'gameDiv',
    width: screenWidth,
    height: screenHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: gravity},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var stars;
var platforms;
var score = 0;
var scoreText;
var qKey;
var leftKey;
var rightKey;

var game = new Phaser.Game(config);

var inAir = true;


function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude',
        'assets/dude.png',
        {frameWidth: 32, frameHeight: 48}
    );
}

function create() {

    //  Input Events
    // cursors = this.input.keyboard.createCursorKeys();
    //   quitKey = this.input.keyboard.keys().key(81);

    //game variables
    this.add.image(screenWidth / 2, screenHeight / 2, 'sky');

    //static group for ground, these are unnaffected by physics
    platforms = this.physics.add.staticGroup();

    platforms.create(screenWidth / 2, screenHeight - 2, 'ground').setScale(2).refreshBody();

    //add player sprite to game world
    player = this.physics.add.sprite(screenWidth, 5, 'dude');

    player.setBounce(0);
    player.setCollideWorldBounds(true);

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

    // stars = this.physics.add.group({
    //     key: 'star',
    //     repeat: 11,
    //     setXY: { x: 12, y: 0, stepX: 70 }
    // });
    //
    // stars.children.iterate(function (child) {
    //
    //     child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    //
    // });


    // //collider for obstacles
    // this.physics.add.collider(stars, platforms);
    //
    // this.physics.add.overlap(player, stars, collectStar, null, this); //check player/obstacle collide

    scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});


    this.qKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    //manageInput();
}

function restart() {

    //reset variables
    inAir = true;
    score = 0;
    player.setVelocity(0, 0);
    player.anims.play('turn', true);
    player.x = screenWidth / 2;
    player.y = 0;

}

function update() {
    if (this.qKey.isDown) {
        console.log('Q is pressed');
        restart();
    }

    if (this.leftKey.isDown) {
        if (inAir) {
            player.setVelocityX(-20);

            player.anims.play('left', true);
        }
    } else if (this.rightKey.isDown) {
        if (inAir) {
            player.setVelocityX(20);

            player.anims.play('right', true);
        }
    } else {
        if (inAir) {

            player.anims.play('turn', true);
        }
    }
}

function collectStar(player, star) {
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);
}

function playerLand(player, platforms) {
    inAir = false;
    player.setVelocity(0, 0);
    player.anims.play('turn', true);
}
