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
var spotlights;

//score variables
var score = 0;
var landingFactor = 1;

//UI
var scoreText;
var menuText;
var winText;
var dieText;

//inputs
var qKey;
var leftKey;
var rightKey;
var upKey;
var downKey;
var enterKey;
var spaceKey;

//elapsed time
var startTime;
var endTime;
var currentTime;

//bools/gamestates
var inAir = true;
var falling = false;
var alive = true;
var startMenu = true;
var winMenu = false;

//asset variables
var parachuteName = 'parachute';
var groundName = 'ground';
var spotlightName = 'spotlight';
var backgroundName = 'background';

var parachutePath = 'assets/parachute.png';
var groundPath = 'assets/ground.png';
var spotlightPath = 'assets/spotlight.png';
var backgroundPath = 'assets/background.png';

