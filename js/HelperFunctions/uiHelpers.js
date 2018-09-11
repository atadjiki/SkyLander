function hideGameActors(){
    player.setVisible(false);
    // platforms.setVisible(false);
    scoreText.setVisible(false);
}

function showGameActors(){
    player.setVisible(true);
    //platforms.setVisible(true);
    scoreText.setVisible(true);
}

function hideStartMenu(){
    menuText.setVisible(false);
}

function showStartMenu(){
    menuText.setVisible(true);
}

function hideEndMenu(){

    winText.setVisible(false);

}

function showEndMenu(){

    var time = endTime = startTime;
    time = time/1000;
    score = time * landingFactor;
    //scoreText.setText('Score: ' + score);
    winText.setText('Your score is: ' + score + '\n Press Enter to Restart');
    winText.setVisible(true);

}