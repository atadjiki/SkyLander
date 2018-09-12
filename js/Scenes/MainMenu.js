var MainMenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function MainMenu() {
            Phaser.Scene.call(this, {key: 'mainmenu'});
            window.MENU = this;
        },

    create: function () {

        var bg = this.add.image(screenWidth / 2, screenHeight / 2, backgroundName);
        this.add.text(screenWidth/4, screenHeight/2, 'SpyLander - Click anywhere to start', {font: '24px Courier', fill: '#000000'});
        bg.setInteractive();

        bg.once('pointerup', function () {

            this.scene.start('game');

        }, this);
    }

});