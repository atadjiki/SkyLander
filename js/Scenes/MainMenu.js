var MainMenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function MainMenu() {
            Phaser.Scene.call(this, {key: 'mainmenu'});
            window.MENU = this;
        },

    create: function () {

      //  var bg = this.add.image(screenWidth / 2, screenHeight / 2, backgroundName);

       // bg.setInteractive();
        var title = this.add.text(screenWidth / 2, screenHeight / 2, 'SpyLander - Click to start', {font: '24px Courier', fill: '#00ff00'});
        title.setInteractive();

        title.once('pointerup', function () {

            this.scene.start('game');

        }, this);
    }

});