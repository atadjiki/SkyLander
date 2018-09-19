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

function pauseTweens(input){

    for(let i = 0; i < input.length; i++){
        input[i].pause();
    }
    if(debug) console.log("Tweens Paused");

}

function UnPauseTweens(input){

    for(let i = 0; i < input.length; i++){
        input[i].resume();
    }
    if(debug) console.log("Tweens Unpaused");

}

