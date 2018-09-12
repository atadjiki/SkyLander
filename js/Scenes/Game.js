var Game = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Game() {
            Phaser.Scene.call(this, {key: 'game'});
            window.GAME = this;

            this.controls;
            this.track;
        },

    create: function () {

        if(debug) console.log("Enter Create");
        if(debug) console.log("Initializing Sprites");

        //set background
        this.add.image(screenWidth / 2, screenHeight / 2, backgroundName);


        //static group for ground, these are unnaffected by physics
        platforms = this.physics.add.staticGroup();
        platforms.create(screenWidth / 2, screenHeight - 2, groundName).setScale(2).refreshBody();

        //create landing zones
        gold = this.physics.add.staticGroup();
        gold.create(screenWidth / 2, (screenHeight + 10), goldName);

        silver = this.physics.add.staticGroup();
        silver.create((screenWidth / 2 - 250), (screenHeight + 10), silverName);

        bronze = this.physics.add.staticGroup();
        bronze.create((250 + screenWidth / 2), (screenHeight + 10), bronzeName);

        //add player sprite to game world
        player = this.physics.add.sprite(playerStartX, playerStartY, parachuteName);
        player.setBounce(0);
        player.setCollideWorldBounds(true);

        //player.setGravityY(-1 * gravity);
        this.physics.pause();

        //collider between player and platforms
        this.physics.add.collider(player, platforms, playerCrash, null, this);

        //for landing zones
        this.physics.add.collider(player, gold, landGold, null, this);
        this.physics.add.collider(player, silver, landSilver, null, this);
        this.physics.add.collider(player, bronze, landBronze, null, this);

        //static group for spotlight
        spotlights = [];
        killBoxes = [];
        tweens = []; //keep track of tweens so we can pause/unpause them


        if(debug) console.log("Creating Tweens");
        //to add a spotlight, copy and paste this block below, killboxes will automatically get created
        var spOne = this.physics.add.image(400, 400, spotlightName);
        spOne.setScale(0.1).setRotation(-90);
        spOne.setGravityY(-1 * gravity); //for now we have to suspend these objects
        spOne.setGravityX(0);
        spotlights.push(spOne);

        var spTwo = this.physics.add.image(650, 200, spotlightName);
        spTwo.setScale(0.1).setRotation(-90);
        spTwo.setGravityY(-1 * gravity);
        spTwo.setGravityX(0);
        spotlights.push(spTwo);


        //create tweens for spotlights, in the future we can add more configs for different spotlight types
        for (let i = 0; i < spotlights.length; i++) {
            var temp = this.tweens.add({
                targets: spotlights[i],
                angle: 45,
                duration: 5000,
                ease: 'Power.5',
                yoyo: true,
                delay: 1000,
                loop: -1
            });

            tweens.push(temp);
        }

        //initialize killzones, creates the hitbox that floats above the spotlight
        for (let i = 0; i < spotlights.length; i++) {

            var killbox = this.physics.add.image((spotlights[i].x - killBoxOffsetX), (spotlights[i].y - killBoxOffsetY), killboxName);
            killbox.setScale(0.1);
            killbox.setGravityY(-1 * gravity);
            killbox.setGravityX(0);

            var temp = this.tweens.add({
                targets: killbox,
                x: (spotlights[i].x + killBoxTrailX),
                duration: 5000,
                ease: 'Power.5',
                yoyo: true,
                delay: 1000,
                loop: -1
            });

            killBoxes.push(killbox);
            tweens.push(temp);
        }


        //overlap between player and spotlights
        for (let i = 0; i < spotlights.length; i++) {

            this.physics.add.overlap(player, killBoxes[i], playerSeen, null, this);

        }

        if(debug) console.log("Creating UI");
        //initialize UI
        var headerPanel = new Phaser.Geom.Rectangle(0, 0, screenWidth, 2*playerStartY/3);
        var graphics = this.add.graphics({ fillStyle: { color: 0x000000 } });
        graphics.fillRectShape(headerPanel);

        scoreText = this.add.text(2, 2, '', {fontSize: '16px', fill: white});
        messageText = this.add.text(screenWidth/2-100, 2, 'Press Space to Launch', {fontSize: '16px', fill: green});

        if(debug) console.log("Initializing Input");
        //setup key press listeners
        this.qKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    },


    update: function () {


        //allow player to reset midair
        if (this.qKey.isDown && hasJumped) {
            this.physics.pause();
            pauseTweens(tweens);
            restart();
            if(debug) console.log("Q Pressed");
        }

        //if the parachute hasnt jumped yet, wait for signal to
        if (this.spaceKey.isDown && !hasJumped) {
            hasJumped = true;
            messageText.setText('');
            this.physics.resume();
            startTime = new Date();
            currentTime = startTime;
            if(debug) console.log("Space Pressed");
            if(debug) console.log("Start Time is " + startTime);


        }

        //if parachute has jumped, start tracking time
        if (hasJumped && alive && !landed) {
            currentTime = new Date();
            var elapsed = currentTime - startTime;
            scoreText.setText('Time: ' + parseInt((elapsed / 1000).toString()) + '  Accel: ' + player.body.acceleration.y);
            scoreText.setColor(white);
        }

        //if player is midair
        if (hasJumped) {
            if (this.leftKey.isDown) {
                player.setVelocityX(-1 * playerVelocity);

                player.anims.play('left', true);

            } else if (this.rightKey.isDown) {
                player.setVelocityX(playerVelocity);

                player.anims.play('right', true);

            } else if (this.upKey.isDown) {
                if (player.body.acceleration.y > (-1 * gravity)) { //player cant fall upwards
                    var decrement = player.body.acceleration.y - 1;
                    player.body.setAccelerationY(decrement);
                } else{
                    if(debug) console.log("Player at min acceleration");
                }


                player.anims.play('turn', true);

            } else if (this.downKey.isDown) {

                if (player.body.acceleration.y < accelMax) {
                    var increment = player.body.acceleration.y + 1;
                    player.body.setAccelerationY(increment);
                } else{
                    if(debug) console.log("Player at max acceleration");
                }

                player.anims.play('turn', true);

            } else {
                if (hasJumped) {

                    player.anims.play('turn', true);
                }
            }
        }
        //if player is choosing starting position
        else if (!hasJumped) {
            if (this.leftKey.isDown) {

                player.x -= playerStartVelocity;

                player.anims.play('left', true);

            } else if (this.rightKey.isDown) {

                player.x += playerStartVelocity;

                player.anims.play('right', true);

            } else {


                player.anims.play('turn', true);
            }
        }
        //if the player jumped and died, present lose screen
        if (!alive && hasJumped &&!landed) {

            if(!gameEnded){
                this.physics.pause();
                pauseTweens(tweens);
                gameEnded = true;
            }

            if (this.enterKey.isDown) {
                this.enterKey.reset();
                restart();
                this.scene.start('mainmenu');
            }

        }
        //if the player landed on a zone, display this
        if (alive && hasJumped && landed) {

            if(!gameEnded){
                this.physics.pause();
                pauseTweens(tweens);
                gameEnded = true;
            }
            if (this.enterKey.isDown) {
                this.enterKey.reset();
                restart();
                this.scene.start("mainmenu");
            }
        }
    }

});

