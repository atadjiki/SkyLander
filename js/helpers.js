function restart() {

    //reset variables
    inAir = true;
    falling = false;
    score = 0;
    player.setVelocity(0, 0);
    //player.setGravityY(-1 * playerGravity);

    player.anims.play('turn', true);
    player.x = playerStartX;
    player.y = playerStartY;

    hideGameActors();
    hideEndMenu();

    startMenu = true;
    endMenu = false;

    showStartMenu();
}

function playerLand(player, platforms) {
    inAir = false;
    player.setVelocity(0, 0);
    player.anims.play('turn', true);
    endTime = new Date();
    endMenu = true;
}

