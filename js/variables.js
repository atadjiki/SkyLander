var screenWidth = 800;
var screenHeight = 600;
var playerGravity = 10;

//player variables
var player;
var playerStartX = screenWidth/2;
var playerStartY = 25;
var playerVelocity = 20;
var playerStartVelocity = 2;

var platforms;

//score variables
var score = 0;
var landingFactor = 1;

//UI
var scoreText;
var menuText;
var endText;

//inputs
var qKey;
var leftKey;
var rightKey;
var enterKey;
var spaceKey;

//elapsed time
var startTime;
var endTime;
var currentTime;

//bools/gamestates
var inAir = true;
var falling = false;
var startMenu = true;
var endMenu = false;
