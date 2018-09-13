var debug = true;

var screenWidth = 800;
var screenHeight = 600;
var gravity = 10; //gravitational constant
var accelMax = 30; //how much over gravity we can fall

//player variables
var player;
var playerStartX = screenWidth/2;
var playerStartY = 35;
var playerVelocity = 20;
var playerStartVelocity = 2;

var helicopter;

var goldBonus = 100;
var silverBonus = 60;
var bronzeBonus = 40;

//spotlight animation stuff
var spotlights;
var killboxes;
var tweens;
var killBoxOffsetX = 110;
var killBoxOffsetY = 75;
var killBoxTrailX = 70;

//score variables
var score = 0;
var landingFactor = 1;

//bools/gamestates
var hasJumped = false;
var alive = true;
var landed = false;


//UI
var hudText;
var messageText;
var message = 'Press Space to Launch';;

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

//game actors
var platforms; //generic ground
var gold;
var silver;
var bronze;


//asset variables
var parachuteName = 'parachute';
var helicopterName = 'helicopter';
var groundName = 'ground';
var spotlightName = 'spotlight';
var killboxName = 'hitbox';
var backgroundName = 'background';
var goldName = 'gold';
var silverName = 'silver';
var bronzeName = 'bronze';

var parachutePath = 'assets/parachute.png';
var helicopterPath = 'assets/helicopter.png';
var groundPath = 'assets/ground.png';
var spotlightPath = 'assets/spotlight.png';
var killboxPath = 'assets/killbox.png';
var backgroundPath = 'assets/background.png';
var goldPath = 'assets/gold.png';
var silverPath = 'assets/silver.png';
var bronzePath = 'assets/bronze.png';

var black =  "#000000";
var white = "#ffffff";
var green = "#00b605";
var red = "#d91d23";

var gameEnded = false;
