function playerCrash(player, ground) {

    if(debug) console.log("Player Crashed");
    alive = false;
}

function playerSeen(player, spotlight){

    if(debug) console.log("Player Spotted!");
    alive = false;
}

function landGold(player, zone) {

    if(debug) console.log("Player Landed on Gold");
    landingFactor*=goldBonus;
    this.doLand();
}

function landSilver(player, zone) {

    if(debug) console.log("Player Landed on Silver");
    landingFactor*=silverBonus;
    this.doLand();
}

function landBronze(player, zone) {

    if(debug) console.log("Player Landed on Bronze");
    landingFactor*=bronzeBonus;
    this.doLand();
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

