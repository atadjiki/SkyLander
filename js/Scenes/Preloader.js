var Preloader = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Preloader() {
            Phaser.Scene.call(this, {key: 'preloader'});
        },

    preload: function () {

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(190*2, 270*2, 320*2, 50);

        var width = screenWidth;
        var height = screenHeight;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px Courier',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px Courier',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px Courier',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(200*2, 280*2, 300*2 * value, 10);
        });

        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        if(debug) console.log("Loading Assets");
        this.load.image(backgroundName, backgroundPath);
        this.load.image(blackBackgroundName, blackBackgroundPath);
        this.load.image(foregroundName, foregroundPath);
        this.load.image(titleName, titlePath);
        this.load.image(opacityName, opacityPath);
        this.load.image(groundName, groundPath);
        this.load.image(spotlightName, spotlightPath);
        this.load.image(killboxName, killboxPath);
        this.load.image(towerName, towerPath);
        this.load.image(goldName, goldPath);
        this.load.image(silverName, silverPath);
        this.load.image(bronzeName, bronzePath);
        this.load.image(helicopterName, helicopterPath);

        if(debug) console.log("Loading Spritesheets");
        this.load.spritesheet(parachuteName, parachutePath, { frameWidth: 64, frameHeight: 64, endFrame: 2 });
        this.load.spritesheet(landedParachuteName, landedParachutePath, {frameWidth: 64, frameHeight: 64, endFrame: 1});

        for(var i = 1; i < 15; i++){
            this.load.image(explosionName+i, explosionPath + i +'.png');
        }


        if(debug) console.log("Loading Audio");
        this.load.audio(fallExplosionName, fallExplosionPath);
        this.load.audio(spottedExplosionName, spottedExplosionPath);
        this.load.audio(alarmName, alarmPath);
        this.load.audio(landName, landPath);
        this.load.audio(jumpName, jumpPath);

        this.load.audio(backgroundMusicName, backgroundMusicPath);
        this.load.audio(startMusicName, startMusicPath);
        this.load.audio(loseMusicName, loseMusicPath);
        this.load.audio(winMusicName, winMusicPath);

    },

    create: function ()
    {

        if(debug) console.log("Creating Animations");

        this.anims.create({
            key: 'left',
            frames: [ { key: parachuteName, frame: 0 } ],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: parachuteName, frame: 1 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: [ { key: parachuteName, frame: 2 } ],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'emote',
            frames: [{ key: landedParachuteName, frame: 0}, {key: landedParachuteName, frame: 1}],
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: explosionName,
            frames: [
                { key: explosionName+'1'},
                { key: explosionName+'2'},
                { key: explosionName+'3'},
                { key: explosionName+'4'},
                { key: explosionName+'5'},
                { key: explosionName+'6'},
                { key: explosionName+'7'},
                { key: explosionName+'8'},
                { key: explosionName+'9'},
                { key: explosionName+'10'},
                { key: explosionName+'11'},
                { key: explosionName+'12'},
                { key: explosionName+'13'},
                { key: explosionName+'14'}
            ],
            frameRate: 20,
            repeat: -1
        });

        this.scene.start('mainmenu');

    }


});