function restart() {

    //reset variables
    hasJumped = false;
    alive = true;
    landed = false;
    score = 0;
    scoreText = '';
    player.setVelocity(0, 0);
    player.body.acceleration.y = 0;

    player.anims.play('turn', true);
    player.x = playerStartX;
    player.y = playerStartY;

    for(let i = 0; i < platforms.length; i++){

        platforms[i].setVelocity(0, 0);
        platforms[i].setAngularVelocity(0);
        platforms[i].setGravityY(-1*gravity);
        platforms[i].setGravityX(0);
    }

    UnPauseTweens(tweens);
}

function playerCrash(player, ground) {
    alive = false;
    player.setVelocity(0, 0);
    player.anims.play('turn', true);
    endTime = new Date();
    messageText.setText('You Lose! Enter to Restart');
}

function landGold(player, zone) {

    landingFactor*=goldBonus;


    doLand(player);

}

function landSilver(player, zone) {

    landingFactor*=silverBonus;

    doLand(player);

}

function landBronze(player, zone) {

    landingFactor*=bronzeBonus;

    doLand(player);

}

function doLand(player){

    landed = true;
    player.setVelocity(0, 0);
    player.anims.play('turn', true);
    endTime = new Date();

    var diffTime = endTime - startTime;

    score = landingFactor - (diffTime / 1000); //the less time it took the better

    messageText.setText('You Win!\n Your Score was: ' + score + ' \nPress Enter to Restart');

}

function playerSeen(player, spotlight){

    player.setVelocity(0,0);
    //TODO: play death animation?
    console.log("Dead!");
    alive = false;
    messageText.setText('You Lose! Enter to Restart');
}

function pauseTweens(tweens){

    for(let i = 0; i < tweens.length; i++){
        tweens[i].stop();
    }

}

function UnPauseTweens(tweens){

    for(let i = 0; i < tweens.length; i++){
        tweens[i].play();
    }

}

