var Preloader = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Preloader() {
            Phaser.Scene.call(this, {key: 'preloader'});
        },

    preload: function () {
        this.load.image(backgroundName, backgroundPath);
        this.load.image(groundName, groundPath);
        this.load.spritesheet(parachuteName,
            parachutePath,
            {frameWidth: 32, frameHeight: 48});
        this.load.image(spotlightName, spotlightPath);

    },

    create: function ()
    {

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

        this.scene.start('mainmenu');

    }


});