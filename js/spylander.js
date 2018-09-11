var config = {
    title: "SpyLander",
    type: Phaser.AUTO,
    parent: 'gameDiv',
    width: screenWidth,
    height: screenHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: playerGravity},
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};


var game = new Phaser.Game(config);