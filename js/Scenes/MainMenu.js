var MainMenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function MainMenu() {
            Phaser.Scene.call(this, {key: 'mainmenu'});
            window.MENU = this;
        },

    create: function () {

        var bg = this.add.image(screenWidth / 2, screenHeight / 2, backgroundName).setDisplaySize(screenWidth, screenHeight);
        this.add.text(screenWidth/3, 100, 'SpyLander', {font: '100px Courier', fill: '#ffffff'});
        this.add.text(screenWidth/3 + 50, 700, 'Spacebar to Start', {font: '24px Courier', fill: '#ffffff'});

        this.input.keyboard.on('keydown_SPACE', function (event) {
            this.scene.start('game');
            this.input.keyboard.stopListeners();

        }, this);
    }

});