function restart() {

    //reset variables
    inAir = true;
    alive = true;
    falling = false;
    score = 0;
    player.setVelocity(0, 0);
    player.body.acceleration.y = 1;

    player.anims.play('turn', true);
    player.x = playerStartX;
    player.y = playerStartY;

    for(let i = 0; i < platforms.length; i++){

        platforms[i].setVelocity(0, 0);
        platforms[i].setAngularVelocity(0);
        platforms[i].setGravityY(-1*gravity);
        platforms[i].setGravityX(0);
    }
}

function playerLand(player, ground) {
    inAir = false;
    player.setVelocity(0, 0);
    player.anims.play('turn', true);
    endTime = new Date();
}

function playerSeen(player, spotlight){

    player.setVelocity(0,0);
    //TODO: play death animation?
    console.log("Dead!");
    alive = false;
}

function pauseTweens(tweens){

    for(let i = 0; i < tweens.length; i++){
        tweens[i].stop();
    }

}

