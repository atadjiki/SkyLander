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


        //set background
        this.add.image(screenWidth / 2, screenHeight / 2, backgroundName);

        //static group for ground, these are unnaffected by physics
        platforms = this.physics.add.staticGroup();
        platforms.create(screenWidth / 2, screenHeight - 2, groundName).setScale(2).refreshBody();

        //add player sprite to game world
        player = this.physics.add.sprite(playerStartX, playerStartY, parachuteName);
        player.setBounce(0);
        player.setCollideWorldBounds(true);
        
        //player.setGravityY(-1 * gravity);
        this.physics.pause();

        //collider between player and platforms
        this.physics.add.collider(player, platforms, playerLand, null, this);

        //static group for spotlight
        spotlights = [];
        killBoxes = [];
        tweens = [];


        var spOne = this.physics.add.image(400, 400, spotlightName);
        spOne.setScale(0.1).setRotation(-90);
        spOne.setGravityY(-1 * gravity);
        spOne.setGravityX(0);
        spotlights.push(spOne);


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

        //initialize killzones
        for (let i = 0; i < spotlights.length; i++) {

            var killbox = this.physics.add.image((spotlights[i].x - 50), (spotlights[i].y - 75), spotlightName);
            killbox.setScale(0.1);
            killbox.setGravityY(-1 * gravity);
            killbox.setGravityX(0);

            var temp = this.tweens.add({
                targets: killbox,
                x: (spotlights[i].x + 70),
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

            this.physics.add.collider(player, killBoxes[i], playerSeen, null, this);

        }

        //initialize text
        scoreText = this.add.text(16, 16, 'Time: 0', {fontSize: '32px', fill: '#000'});

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


        if (this.qKey.isDown && falling && inAir) {
            this.physics.pause();
            pauseTweens(tweens);
            restart();
        }

        if (this.spaceKey.isDown && falling == false) {
            falling = true;
            this.physics.resume();
            startTime = new Date();
            currentTime = startTime;
            console.log("Start Time is " + startTime);

        }

        if (falling && inAir) {
            currentTime = new Date();
            var elapsed = currentTime - startTime;
            scoreText.setText('Time: ' + parseInt((elapsed / 1000).toString()) + '\nAccel: ' + player.body.acceleration.y);
        }

        if (falling) {
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
            } else if (this.upKey.isDown) {
                if (inAir) {
                    if(player.body.acceleration.y < accelMax){
                        var increment = player.body.acceleration.y  + 1;
                        player.body.setAccelerationY(increment);
                    }

                    player.anims.play('turn', true);
                }
            } else if (this.downKey.isDown) {
                if (inAir) {
                    if(player.body.acceleration.y > (-1*gravity)){
                        var decrement = player.body.acceleration.y - 1;
                        player.body.setAccelerationY(decrement);
                    }

                    player.anims.play('turn', true);
                }
            } else {
                if (inAir) {

                    player.anims.play('turn', true);
                }
            }
        }
        else if (!falling) {
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
        if (!alive) {

            this.physics.pause();
            pauseTweens(tweens);
            this.add.text(screenWidth / 2, screenHeight / 2, 'You Lose! Enter to Restart', {
                fontSize: '32px',
                fill: '#000000'
            });
            if (this.enterKey.isDown) {
                restart();
                this.scene.start('mainmenu');
            }

        }
        if (alive && !inAir) {

            this.physics.pause();
            pauseTweens(tweens);
            var diffTime = endTime - startTime;

            this.score = landingFactor - (diffTime/1000);

            this.add.text(screenWidth / 2, screenHeight / 2, 'You Win!\n Your Score was: ' + this.score + ' \nPress Enter to Restart', {
                fontSize: '24px',
                fill: '#000000'
            });
            if (this.enterKey.isDown) {
                restart();
                this.scene.start("mainmenu");
            }

        }
    }

});

