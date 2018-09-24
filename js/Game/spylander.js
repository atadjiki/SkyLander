/*
 * Arash Tadjiki
 * 2018 - University of Utah MEAE
 * Prototype II
 */
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
            debug: debug
        }
    },
    scene: [Preloader, MainMenu, Game]
};

var game = new Phaser.Game(config);