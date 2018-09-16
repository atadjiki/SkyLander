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
        progressBox.fillRect(190, 270, 320, 50);

        var width = screenWidth/2
        var height = screenHeight/2;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(200, 280, 300 * value, 30);
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
        this.load.image(groundName, groundPath);
        this.load.image(spotlightName, spotlightPath);
        this.load.image(killboxName, killboxPath);
        this.load.image(goldName, goldPath);
        this.load.image(silverName, silverPath);
        this.load.image(bronzeName, bronzePath);
        this.load.image(helicopterName, helicopterPath);

        if(debug) console.log("Loading Spritesheets");
        this.load.spritesheet(parachuteName, parachutePath, { frameWidth: 64, frameHeight: 64, endFrame: 2 });
        this.load.spritesheet(explosionName, explosionPath, { frameWidth: 128, frameHeight: 128, endFrame: 18 });

        if(debug) console.log("Loading Audio");
        this.load.audio(fallExplosionName, fallExplosionPath);
        this.load.audio(spottedExplosionName, spottedExplosionPath);

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
            key: explosionName,
            frames: this.anims.generateFrameNumbers(explosionName, { start: 0, end: 19, first: 0}),
            frameRate: 25,

        });

        this.scene.start('mainmenu');

    }


});