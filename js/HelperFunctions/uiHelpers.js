function hideGameActors(){
    player.setVisible(false);
    scoreText.setVisible(false);

    for(let i = 0; i < spotlights.length; i++){
        spotlights[i].setVisible(false);
    }

}

function showGameActors(){
    player.setVisible(true);
    scoreText.setVisible(true);

    for(let i = 0; i < spotlights.length; i++){
        spotlights[i].setVisible(true);
    }
}

function hideStartMenu(){
    menuText.setVisible(false);
}

function showStartMenu(){
    menuText.setVisible(true);
}

function hideWinMenu(){
    winText.setVisible(false);
}

function showWinMenu(){
    var time = endTime = startTime;
    time = time/1000;
    score = time * landingFactor;
    //scoreText.setText('Score: ' + score);
    winText.setText('Your score is: ' + score + '\n Press Enter to Restart');
    winText.setVisible(true);
}

function hideDieMenu(){
    dieText.setVisible(false);
}

function showDieMenu(){

    dieText.setVisible(true);
}

