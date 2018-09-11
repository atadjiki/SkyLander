function create() {


    //set background
    this.add.image(screenWidth / 2, screenHeight / 2, backgroundName);

    //static group for ground, these are unnaffected by physics
    platforms = this.physics.add.staticGroup();
    platforms.create(screenWidth / 2, screenHeight - 2, groundName).setScale(2).refreshBody();

    //add player sprite to game world
    player = this.physics.add.sprite(playerStartX, playerStartY, parachuteName);
    player.setBounce(0);
    player.setCollideWorldBounds(true);
    //player.setGravityY(-1 * playerGravity);
    this.physics.pause();

    //setup spritesheets for character
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers(parachuteName, {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{key: parachuteName, frame: 4}],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers(parachuteName, {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
    });

    //collider between player and platforms
    this.physics.add.collider(player, platforms, playerLand, null, this);

    //static group for spotlight
    spotlights = [];

    var spOne = this.physics.add.image(400, 400, spotlightName);
    spOne.setScale(0.1).setRotation(-90);
    spOne.setGravityY(-1*playerGravity);
    spOne.setGravityX(0);
    spotlights.push(spOne);

    for(let i = 0; i < spotlights.length; i++){
        this.tweens.add({
            targets: spotlights[i],
            angle: 45,
            duration: 5000,
            ease: 'Power.5',
            yoyo: true,
            delay: 1000,
            loop: -1
        });
    }

    //overlap between player and spotlights
    for(let i = 0; i< spotlights.length; i++){

        this.physics.add.collider(player, spotlights[i], playerSeen, null, this);

    }


    //initialize text
    scoreText = this.add.text(16, 16, 'Time: 0', {fontSize: '32px', fill: '#000'});
    menuText = this.add.text(screenWidth/4, screenHeight/2,
        'Welcome to SpyLander! \n Press Enter to Start Game',{fontSize: '32px', fill: '#000'});

    winText = this.add.text(screenWidth/4, screenHeight/2,
        '',{fontSize: '32px', fill: '#000'});

    dieText = this.add.text(screenWidth/4, screenHeight/2, 'You Died! Press Enter to Restart' ,{fontSize: '32px', fill: '#000'});


    //setup key press listeners
    this.qKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    //hide game actors for now
    hideGameActors();
    hideWinMenu();
    hideDieMenu();
    showStartMenu();

}
