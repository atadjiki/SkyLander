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

        if (debug) console.log("Enter Create");
        if (debug) console.log("Initializing Sprites");

        //static group for spotlight
        spotlights = [];
        killBoxes = [];
        gameTweens = []; //keep track of tweens so we can pause/unpause them


        if (debug) console.log("Creating Tweens");
        //to add a spotlight, add the x and y coordinates, and the rotation below
        var xSP =    [58,  210, 537, 675, 843, 1150]; //screen width = 1280/1920
        var ySP =    [600, 558, 430, 450, 650, 625 ]; //screen height = 800/1080
        var rotSP =  [45,  30,  35,  50,  30,  30];
        var durSP =  [5000,6000,2000,3000,2000,4000];
        var xScale = [0.4, 0.2, 0.3, 0.2, 0.3, 0.5];
        var yScale = [0.4, 0.2, 0.3, 0.2, 0.3, 0.5];
        var yOffset =[175, 150, 150, 175, 150, 135];
        var xTrail = [70,  50,  140, 210, 140, 70];


        //the darker image to mask
        var backdrop = this.add.image(screenWidth/2, screenHeight/2, blackBackgroundName).setDisplaySize(screenWidth, screenHeight).setAlpha(0.6);

        //place foreground mountain range in front of mask
        var foreground = this.add.image(screenWidth/2, screenHeight/2, foregroundName).setDisplaySize(screenWidth, screenHeight);

        //initialize killzones, creates the circle that floats above the spotlight
        for (let i = 0; i < xSP.length; i++) {

            var killbox = this.physics.add.image((xSP[i]), (ySP[i] - yOffset[i]), killboxName);
            killbox.setScale(0.2);
            killbox.setCircle(killbox.width/3, killbox.width/5, killbox.height/7);
            killbox.setGravityY(-1 * gravity);
            killbox.setGravityX(0);
            var temp = this.tweens.add({
                targets: killbox,
                x: (xSP[i] + xTrail[i]),
                duration: durSP[i],
                ease: 'Power.5',
                yoyo: true,
                delay: 250,
                loop: -1,
                scaleX: xScale[i],
                scaleY: yScale[i]
            });
            var pic = this.add.image(screenWidth / 2, screenHeight / 2, backgroundName).setDisplaySize(screenWidth, screenHeight);
            pic.mask = new Phaser.Display.Masks.BitmapMask(this, killbox);
            killBoxes.push(killbox);
            if (lunarMode) killbox.visible = false;
            gameTweens.push(temp);
        }

        //create spotlight cones
        for (let i = 0; i < xSP.length; i++) {
            var spotlight = this.physics.add.image(xSP[i], ySP[i] + 25, spotlightName);
            spotlight.setScale(0.05, 0.08);
            spotlight.setGravityY(-1 * gravity); //for now we have to suspend these objects
            spotlight.setGravityX(0);
            spotlight.setAlpha(0.5);
            if (lunarMode) temp.visible = false;
            var pic = this.add.image(screenWidth / 2, screenHeight / 2, backgroundName).setDisplaySize(screenWidth, screenHeight);
            pic.mask = new Phaser.Display.Masks.BitmapMask(this, spotlight);
            pic.setAlpha(0.5);

            //animate spotlights
            var temp = this.tweens.add({
                targets: spotlight,
                angle: rotSP[i],
                duration: durSP[i],
                ease: 'Power.5',
                yoyo: true,
                delay: 250,
                loop: -1,
            });
            gameTweens.push(temp);
            spotlights.push(spotlight);
            spotlights.push(pic);
        }

        //static group for ground, these are unnaffected by physics
        platforms = this.physics.add.staticGroup();
        platforms.create(screenWidth / 2, screenHeight, groundName).setDisplaySize(screenWidth, screenHeight / 15).setVisible(false).refreshBody();

        var hudBox = this.physics.add.staticGroup();
        hudBox.create(screenWidth / 2, hudHeight / 2, groundName).setDisplaySize(screenWidth, hudHeight + playerStartY).setVisible(false).refreshBody();

        //create landing zones
        gold = this.physics.add.staticGroup();
        gold.create(goldX, goldY + 10, goldName).setSize(0.0625 * screenWidth, 0, true).setVisible(false);

        silver = this.physics.add.staticGroup();
        silver.create(silverX, silverY + 10, silverName).setSize(70, 0, true).setVisible(false);

        bronze = this.physics.add.staticGroup();
        bronze.create(bronzeX, bronzeY + 2, bronzeName).setSize(70, 0, true).setVisible(false);

        //add helicopter
        helicopter = this.physics.add.sprite(50, 50 + hudHeight, helicopterName).setDisplaySize(0.05 * screenWidth, 0.08 * screenHeight);
        helicopter.setBounce(0);
        helicopter.setGravityY(-1 * gravity); //for now we have to suspend these objects
        helicopter.setGravityX(0);
        helicopter.setCollideWorldBounds(true);
        helicopter.setFlipX(true);

        //animate helicopter
        var heliTween = this.tweens.add({
            targets: helicopter,
            x: screenWidth-50,
            duration: 10000,
            ease: 'Power.2',
            flipX: true,
            yoyo: true,
            repeat: -1
        });
        gameTweens.push(heliTween);

        //opacity for end game
        opacity = this.add.image(screenWidth/2, screenHeight/2 + hudHeight, opacityName).setDisplaySize(screenWidth, screenHeight).setAlpha(0.5);
        opacity.setVisible(false);

        //add player sprite to game world
        player = this.physics.add.sprite(playerStartX, playerStartY + (screenHeight * 0.0125) + hudHeight, parachuteName);
        player.setBounce(0);
        player.setCollideWorldBounds(true);
        player.setCircle(player.width / 4, player.width / 4, player.height / 4);
        player.visible = false;
        player.on('outofbounds', function () {
            player.x = playerStartX;
            player.y = playerStartY
        });

        this.physics.pause();

        //collider between player and platforms
        this.physics.add.collider(player, platforms, playerCrash, null, this);
        this.physics.add.collider(player, hudBox, function () {}, null, this);

        //for landing zones
        this.physics.add.collider(player, gold, landGold, null, this);
        this.physics.add.collider(player, silver, landSilver, null, this);
        this.physics.add.collider(player, bronze, landBronze, null, this);

        //overlap between player and spotlights
        if (!lunarMode) {
            for (let i = 0; i < killBoxes.length; i++) {

                this.physics.add.overlap(player, killBoxes[i], playerSeen, null, this);

            }
        }

        //draw watchtower sprites
        for (let i = 0; i < xSP.length; i++) {
            var temp = this.physics.add.staticGroup();
            temp.create(xSP[i], ySP[i]+50, towerName).setScale(0.8).setSize(temp.width/4, temp.height/4, temp.width/2, temp.height/2).refreshBody();
            //setSize( [width] [, height] [, center])
            if (lunarMode) temp.visible = false;
            this.physics.add.overlap(player, temp, playerCrash, null ,this);
        }

        if (debug) console.log("Creating UI");
        //initialize UI
        var headerPanel = new Phaser.Geom.Rectangle(0, 0, screenWidth, hudHeight);
        var graphics = this.add.graphics({fillStyle: {color: 0x000000}});
        graphics.fillRectShape(headerPanel);
        this.hudText = this.add.text(5, 2, '   ', {font: '20px '+ fontName, fill: white});
        messageText = this.add.text(screenWidth / 2 + 100, 2, message, {font: '20px '+ fontName, fill: green});

        integrity = integrityMax;

        if (debug) console.log("Initializing Input");
        //setup key press listeners
        qKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        pKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //initialize audio
        backgroundMusic = this.sound.add(backgroundMusicName);
        winMusic = this.sound.add(winMusicName);
        loseMusic = this.sound.add(loseMusicName);
        fallFX = this.sound.add(fallExplosionName);
        spottedFX = this.sound.add(spottedExplosionName);
        alarmFX = this.sound.add(alarmName);
        jumpFX = this.sound.add(jumpName);
        landFX = this.sound.add(landName);


        if(audio) backgroundMusic.play();

        //kick the player out of the heli if they dont launch in time
        var bootPlayerEvent = this.time.delayedCall(21000 + Math.floor((Math.random() * 900) + 250), function(){

            if(!hasJumped){
                hasJumped = true;
                jumpFX.play();
                player.x = helicopter.x;
                player.y = helicopter.y + 50;
                player.visible = true;
                messageText.setText('');
                this.physics.resume();
                startTime = new Date();
                currentTime = startTime;
                if (debug) console.log("Booting Player");
                if (debug) console.log("Start Time is " + startTime);
            }

        }, [], this);
    },


    update: function () {


        //allow player to reset midair
        if (qKey.isDown && hasJumped && !gameEnded && debug) {
            this.physics.pause();
            pauseTweens(tweens);
            this.restart()
            if (debug) console.log("Q Pressed");
            qKey.reset();
        }

        if (pKey.isDown && !gameEnded && hasJumped) {

            if (!paused) {
                this.physics.pause();
                pauseTweens(gameTweens);
                messageText.setText('Paused');
                paused = true;
            } else {
                this.physics.resume();
                UnPauseTweens(gameTweens);
                messageText.setText('');
                paused = false;
            }

            pKey.reset();

        }

        //if the parachute hasnt jumped yet, wait for signal to
        if (spaceKey.isDown && !hasJumped) {
            hasJumped = true;
            jumpFX.play();
            player.x = helicopter.x;
            player.y = helicopter.y + 50;
            player.visible = true;
            messageText.setText('');
            this.physics.resume();
            startTime = new Date();
            currentTime = startTime;
            if (debug) console.log("Space Pressed");
            if (debug) console.log("Start Time is " + startTime);
        }

        //if parachute has jumped, start tracking time
        if (hasJumped && alive && !paused) {
            currentTime = new Date();
            var elapsed = currentTime - startTime;
            this.hudText.setText('Time: ' + parseInt((elapsed / 1000).toString())
                + '  Accel: ' + parseInt(player.body.acceleration.y).toString()
                + '  Integrity: ' + parseInt(100 * (integrity / integrityMax)).toString() + '%'
                + '  X: ' + parseInt(player.x).toString()
                + '  Y: ' + parseInt(player.y).toString()
                + '  Score: ' + parseInt(score).toString());
            this.hudText.setColor(white);
        }

        //if player is midair
        if (hasJumped) {
            if (integrity > 0) {
                if (leftKey.isDown) {
                    player.setVelocityX(-1 * playerVelocity);
                    player.setRotation(playerRotation);
                    integrity -= horizDamage;
                    player.anims.play('left', true);

                } else if (rightKey.isDown) {
                    player.setVelocityX(playerVelocity);
                    player.setRotation(-playerRotation);
                    integrity -= horizDamage;
                    player.anims.play('right', true);

                } else if (upKey.isDown) {

                    if (player.body.acceleration.y > (accelMin)) { //player cant fall upwards
                        var decrement = player.body.acceleration.y - 1;
                        player.body.setAccelerationY(decrement);
                        integrity -= vertDamage;
                    } else {
                        if (debug) console.log("Player at min acceleration");
                    }
                    player.setRotation(0);
                    player.anims.play('turn', true);

                } else if (downKey.isDown) {

                    if (player.body.acceleration.y < accelMax) {
                        var increment = player.body.acceleration.y + 1;
                        player.body.setAccelerationY(increment);
                        integrity -= vertDamage;
                    } else {
                        if (debug) console.log("Player at max acceleration");
                    }

                    player.setRotation(0);
                    player.anims.play('turn', true);

                }

                else {
                    if (debug) console.log("Parachute Integrity at 0%");
                    player.setRotation(0);
                    player.anims.play('turn', true);
                }
            }
            else {
                if (hasJumped) {
                    //set back to original rotiation
                    if (player.body.acceleration.y < 0) {
                        var increment = player.body.acceleration.y + 0.25;
                        player.body.setAccelerationY(increment);
                    }
                    player.setRotation(0);
                    player.anims.play('turn', true);
                }
            }
        }
        //if the player jumped and died, present lose screen
        if (!alive && hasJumped) {

            if (!gameEnded) {
                this.physics.pause();
                if(audio){
                    backgroundMusic.stop();
                    loseMusic.play();
                }
                pauseTweens(gameTweens);
                this.doDeath();
                gameEnded = true;
            }

            if (spaceKey.isDown) {
                spaceKey.reset();
                this.restart();
                if(audio) backgroundMusic.stop();
                this.scene.start('mainmenu');
            }

        }
    }, restart: function () {

        //reset variables
        gameEnded = false;
        hasJumped = false;
        alive = true;
        landingFactor = 1;
        score = 0;
        integrity = integrityMax
        messageText.setText(message);
        messageText.setColor(green);
        player.setVelocity(0, 0);
        player.body.setAccelerationY(0);
        player.x = playerStartX;
        player.y = playerStartY + (screenHeight * 0.0125) + hudHeight;
        player.visible = false;
        helicopter.visible = true;

        for (let i = 0; i < platforms.length; i++) {

            platforms[i].setVelocity(0, 0);
            platforms[i].setAngularVelocity(0);
            platforms[i].setGravityY(-1 * gravity);
            platforms[i].setGravityX(0);
        }

        UnPauseTweens(gameTweens);

        if(audio){
            spottedFX.stop();
            loseMusic.stop();
            winMusic.stop();
            backgroundMusic.play();
        }

        this.hudText.setText('');

        if (debug) console.log("Restarting Game");
    },

    doLand: function () {

        var landedGuy = this.physics.add.sprite(player.x, player.y, landedParachuteName);
        landedGuy.anims.play('emote', true);
        landedGuy.setGravityY(-1*gravity);
        landedGuy.setGravityX(0);
        landedGuy.setVelocity(0,0);
        landFX.play();

        player.x = helicopter.x;
        player.y = helicopter.y + 50;
        jumpFX.play();

        endTime = new Date();
        var diffTime = endTime - startTime;
        score = landingFactor - (diffTime / 1000); //the less time it took the better
    },

    doDeath: function () {

        messageText.setText('Game Over! Space to Insert Coin');
        messageText.setColor(red);
        player.setVelocity(0, 0);

        var timedEvent = this.time.delayedCall(3250, function(){

            player.visible = false;

            var explode = this.physics.add.sprite(player.x, player.y, explosionName);
            explode.anims.play(explosionName, false);
            if(audio) spottedFX.play();

        }, [], this);

        alarmFX.play();

        for(let i = 0; i < spotlights.length; i++){
            spotlights[i].setVisible(false);
        }

        //spotlight track tween
        for(let i = 0; i < killBoxes.length; i++){

            this.tweens.add({
                targets: killBoxes[i],
                x: player.x,
                y: player.y,
                duration: 2000,
                delay: 250,
                ease: 'Power2',
            });
        }

        opacity.setVisible(true);
    }

});

