function update() {

    if(startMenu == false && endMenu == false){

        if (this.qKey.isDown) {
            this.physics.pause();
            restart();
        }

        if (this.spaceKey.isDown && falling == false) {
            falling = true;
            // player.setGravityY(playerGravity);
            this.physics.resume();
            startTime = new Date();
            currentTime = startTime;
            console.log("Start Time is " + startTime);

        }

        if(falling){
            currentTime = new Date();
            var elapsed = currentTime - startTime;
            scoreText.setText('Time: ' + parseInt((elapsed/1000).toString()));
        }

        if(falling){
            if (this.leftKey.isDown) {
                if (inAir) {
                    player.setVelocityX(-1 * playerVelocity);

                    player.anims.play('left', true);
                }
            } else if (this.rightKey.isDown) {
                if (inAir) {
                    player.setVelocityX(playerVelocity);

                    player.anims.play('right', true);
                }
            } else {
                if (inAir) {

                    player.anims.play('turn', true);
                }
            }
        }
        else if(!falling){
            if (this.leftKey.isDown) {
                if (inAir) {
                    player.x -= playerStartVelocity;

                    player.anims.play('left', true);
                }
            } else if (this.rightKey.isDown) {
                if (inAir) {

                    player.x += playerStartVelocity;

                    player.anims.play('right', true);
                }
            } else {
                if (inAir) {

                    player.anims.play('turn', true);
                }
            }
        }
    } else if(startMenu == false && endMenu == true){
        showEndMenu();
        if(this.enterKey.isDown){
            hideEndMenu();
            this.physics.pause();
            restart();
        }
    } else if(startMenu == true && endMenu == false){
        if(this.enterKey.isDown){
            startMenu = false;
            showGameActors();
            hideStartMenu();
        }
    }


}