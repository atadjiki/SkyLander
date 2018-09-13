var Preloader = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Preloader() {
            Phaser.Scene.call(this, {key: 'preloader'});
        },

    preload: function () {

        if(debug) console.log("Loading Assets");
        this.load.image(backgroundName, backgroundPath);
        this.load.image(groundName, groundPath);
        this.load.image(spotlightName, spotlightPath);
        this.load.image(killboxName, killboxPath);
        this.load.image(goldName, goldPath);
        this.load.image(silverName, silverPath);
        this.load.image(bronzeName, bronzePath);
        this.load.image(helicopterName, helicopterPath);
        this.load.image(parachuteName, parachutePath);
    },

    create: function ()
    {

        if(debug) console.log("Creating Spritesheets");

        this.scene.start('mainmenu');

    }


});