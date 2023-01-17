//Settings!

//Bird Settings
var Start_timer = 75;
var Bird_size = 0.17;
var Bird_speed = -3;
var Bird_jump = -8;
var Bird_Gravity = 1;
//Controls
var Mouse_control = "leftButton";
var Keybind = "space";




















//Bird/player
var bird = createSprite(100, 200);
bird.setAnimation("birdside_16_1");
bird.scale = Bird_size;
bird.setCollider("circle");

//First group of pipes
function pipe(PipeName, Pipetype) {
  PipeName.setAnimation(Pipetype);
  PipeName.scale = 1.75;
  PipeName.velocityX = Bird_speed;
}

var tpipe1 = createSprite(450, randomNumber(-150, 50));
pipe(tpipe1, "Tpipe");

var bpipe1 = createSprite(450, tpipe1.y + 500);
pipe(bpipe1, "Bpipe");

//Second group of pipes;
var tpipe2 = createSprite(700, randomNumber(-150, 50));
pipe(tpipe2, "Tpipe");

var bpipe2 = createSprite(700, tpipe2.y + 500);
pipe(bpipe2, "Bpipe");
//Scoring
var Score = 0;
function point(pointID) {
  pointID.setAnimation("Point_giver");
  pointID.velocityX = Bird_speed;
  pointID.alpha = 0;
}

var point_timer = 0;
var point1 = createSprite(450, tpipe1.y + 250);
point(point1);
var point2 = createSprite(700, tpipe2.y + 250);
point(point2);
var timer = 0;
var GV_detector = 0;
var Debug_switch = 0;

function draw() {
  if (Debug_switch == 0) {
    background("skyblue");
  }
  textSize(30);
  text("Score:", 0, 25);
  text(Score, 90, 25);
  
  //Debuging mode
  if (Debug_switch == 1) {
    background("black");
  }
  if (keyWentDown("d")) {
    Debug_switch = 1;
    tpipe1.debug = true;
    bpipe1.debug = true;
    tpipe2.debug = true;
    bpipe2.debug = true;
    bird.debug = true;
    point1.debug = true;
    point2.debug = true;
  }
  //Barrier
  if (bird.y < 0) {
    GV_Screen(bpipe1, bpipe2);
  }
  if (bird.y > 400) {
    GV_Screen(bpipe1, bpipe2);
  }
  
  //Bird behavior
  Start_timer = Start_timer - 5;
  if (Start_timer < 0) {
    if (mouseWentDown(Mouse_control)) {
      bird.velocityY = Bird_jump;
      bird.rotation = -45;
      
      if (GV_detector == 0) {
        playSound("sound://category_whoosh/blade_whoosh_2.mp3", false);
      }
      timer = 50;
    }
  }
  if (Start_timer < 0) {
    if (keyWentDown(Keybind)) {
      bird.velocityY = Bird_jump;
      bird.rotation = -45;
      
      if (GV_detector == 0) {
        playSound("sound://category_whoosh/blade_whoosh_2.mp3", false);
      }
      timer = 50;
    } else {
      bird.velocityY = bird.velocityY + Bird_Gravity;
      if (timer < 0) {
        bird.rotation = bird.rotation + 10;
      }
      timer = timer - 4.5;
      
      if (bird.rotation > 95) {
        bird.rotation = bird.rotation - 10;
      }
    }
  }
  //Pipe behavior
  
  //1st pipes
  //Looping
  Looping(tpipe1, bpipe1, point1);
  
  //Scoring
  Scoring(point1);
  
  //Game over
  if (bird.isTouching(tpipe1)) {
    GV_Screen(tpipe1);
  }
  if (bird.isTouching(bpipe1)) {
    GV_Screen(bpipe1);
  }
  
  //2nd pipes
  //Looping
  Looping(tpipe2, bpipe2, point2);
  
  //Scoring
  Scoring(point2);
  
  //Game over
  if (bird.isTouching(tpipe2)) {
    GV_Screen(tpipe2);
  }
  if (bird.isTouching(bpipe2)) {
    GV_Screen(bpipe2);
  }
  
  //Functions
  //Looping
  function Looping(tpipe, bpipe, pointID) {
    if (tpipe.x < -75) {
      tpipe.x = 450;
      bpipe.x = 450;
      pointID.x = 450;
      tpipe.y = randomNumber(-150, 50);
      bpipe.y = tpipe.y + 500;
      pointID.y = tpipe.y + 250;
    }
  }
  
  //Scoring
  point_timer = point_timer + 1;
  function Scoring(pointID) {
    if (bird.isTouching(pointID)) {
      if (point_timer > 1) {
        Score = Score + 1;
        playSound("sound://category_alerts/vibrant_game_shutter_alert_1_short_quick.mp3", false);
      }
      point_timer = 0;
    }
  }
  
  //Game-over screen
  function GV_Screen(Main) {
    //Screen
    fill("Black");
    rect(-5, -5, 405, 405);
    fill("White");
    textSize(50);
    text("Game over", 80, 200);
    textSize(40);
    text("Score:", 110, 250);
    text(Score, 230, 250);
    //Sound effect
    if (GV_detector == 0) {
      playSound("sound://category_alerts/playful_quirky_negative_game_cue_2.mp3", false);
    }
    GV_detector = 1;
    //Pipe behavior
    tpipe1.velocityX = 0;
    tpipe2.velocityX = 0;
    bpipe1.velocityX = 0;
    bpipe2.velocityX = 0;
    bird.velocityY = 0;
    bird.x = Main.x;
    point1.velocityX = 0;
    point2.velocityX = 0;
    //Bird behavior
    Bird_Gravity = 0;
    bird.y = Main.y;
    //Invisibility
    tpipe1.alpha = 0;
    bpipe1.alpha = 0;
    tpipe2.alpha = 0;
    bpipe2.alpha = 0;
    bird.alpha = 0;
  }
  drawSprites();
}