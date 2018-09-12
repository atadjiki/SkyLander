var screenWidth = 800;
var screenHeight = 600;
var gravity = 10;
var accelMax = 30;
var accelMin = 0;

//player variables
var player;
var playerStartX = screenWidth/2;
var playerStartY = 25;
var playerVelocity = 20;
var playerStartVelocity = 2;

//game actors
var platforms; //generic ground
var gold;
var silver;
var bronze;

var goldBonus = 100;
var silverBonus = 60;
var bronzeBonus = 40;


//spotlight animation stuff
var spotlights;
var killboxes;
var tweens;

//score variables
var score = 0;
var landingFactor = 1;

//UI
var scoreText;

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

//asset variables
var parachuteName = 'parachute';
var groundName = 'ground';
var spotlightName = 'spotlight';
var backgroundName = 'background';
var goldName = 'gold';
var silverName = 'silver';
var bronzeName = 'bronze';

var parachutePath = 'assets/parachute.png';
var groundPath = 'assets/ground.png';
var spotlightPath = 'assets/spotlight.png';
var backgroundPath = 'assets/background.png';
var goldPath = 'assets/gold.png';
var silverPath = 'assets/silver.png';
var bronzePath = 'assets/bronze.png';

