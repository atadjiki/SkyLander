var config = {
    type: Phaser.AUTO,
    width: screenWidth,
    height: screenHeight,
    backgroundColor: '#000000',
    parent: 'gameDiv',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: gravity},
            debug: true
        }
    },
    scene: [Preloader, MainMenu, Game]
};

var game = new Phaser.Game(config);