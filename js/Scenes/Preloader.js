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

        this.scene.start('mainmenu');
    },

});