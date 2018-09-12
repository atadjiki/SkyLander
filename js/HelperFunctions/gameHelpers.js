function restart() {

    //reset variables
    gameEnded = false;
    hasJumped = false;
    alive = true;
    landed = false;
    score = 0;
    scoreText = '';
    messageText = '';
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

    if(debug) console.log("Restarting Game");
}

function playerCrash(player, ground) {

    if(debug) console.log("Player Crashed");
    doDeath(player);

}

function playerSeen(player, spotlight){

    if(debug) console.log("Player Spotted!");
    doDeath(player);

}

function doDeath(player){

    messageText.setText('You Lose! Enter to Restart');
    messageText.setColor(red);

    player.anims.play('turn', true);
    player.setVelocity(0,0);
    alive = false;

}

function landGold(player, zone) {

    if(debug) console.log("Player Landed on Gold");
    landingFactor*=goldBonus;
    doLand(player);

}

function landSilver(player, zone) {

    if(debug) console.log("Player Landed on Silver");
    landingFactor*=silverBonus;
    doLand(player);

}

function landBronze(player, zone) {

    if(debug) console.log("Player Landed on Bronze");
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
    messageText.setText('You Win! Score ' + parseInt(score) + ' Press Enter to Restart');
    messageText.setColor(green);

}

function pauseTweens(tweens){

    for(let i = 0; i < tweens.length; i++){
        tweens[i].stop();
    }
    if(debug) console.log("Tweens Paused");

}

function UnPauseTweens(tweens){

    for(let i = 0; i < tweens.length; i++){
        tweens[i].play();
    }
    if(debug) console.log("Tweens Unpaused");

}

