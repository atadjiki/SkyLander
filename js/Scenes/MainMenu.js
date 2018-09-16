var MainMenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function MainMenu() {
            Phaser.Scene.call(this, {key: 'mainmenu'});
            window.MENU = this;
        },

    create: function () {

        menuMusic = this.sound.add(startMusicName);
        if(audio) menuMusic.play();

        this.add.image(screenWidth / 2, screenHeight / 2, backgroundName).setDisplaySize(screenWidth, screenHeight);
        this.add.text(screenWidth/3, 100, 'SpyLander', {font: '100px Courier', fill: '#ffffff'});
        this.add.text(screenWidth/3 + 50, 700, 'Spacebar to Start', {font: '24px Courier', fill: '#ffffff'});

        this.input.keyboard.on('keydown_SPACE', function (event) {
            if(audio) menuMusic.pause();
            this.scene.start('game');
            this.input.keyboard.stopListeners();

        }, this);
    }

});