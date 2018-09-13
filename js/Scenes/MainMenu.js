var MainMenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function MainMenu() {
            Phaser.Scene.call(this, {key: 'mainmenu'});
            window.MENU = this;
        },

    create: function () {

        var bg = this.add.image(screenWidth / 2, screenHeight / 2, backgroundName).setDisplaySize(screenWidth, screenHeight);
        this.add.text(screenWidth/3, 100, 'SpyLander', {font: '50px Courier', fill: '#ffffff'});
        this.add.text(screenWidth/3, 300, 'Click anywhere to start', {font: '24px Courier', fill: '#ffffff'});
        bg.setInteractive();

        bg.once('pointerup', function () {

            this.scene.start('game');

        }, this);
    }

});