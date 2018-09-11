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
    winMenu = false;

    showStartMenu();
}

function playerLand(player, platforms) {
    inAir = false;
    player.setVelocity(0, 0);
    player.anims.play('turn', true);
    endTime = new Date();
    winMenu = true;
}

function playerSeen(player, lightsaber){

    player.setVelocity(0,0);
    //TODO: play death animation?
    console.log("Dead!");
    alive = false;
}

