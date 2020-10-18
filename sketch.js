var back, backImage, base, baseImage, bird, birdAnimation, gameover, gameoverImage, start, startImage, pipe, pipeImage, pipeImageRotate, gamestate = "idle",
  score, restart, restartImage, pipeGroup;

function preload() {
  backImage = loadImage("background-day.png");
  baseImage = loadImage("base.png");
  birdAnimation = loadAnimation("yellowbird-downflap.png", "yellowbird-midflap.png", "yellowbird-upflap.png");
  gameoverImage = loadImage("gameover.png");
  startImage = loadImage("message.png");
  pipeImage = loadImage("pipe-green.png");
  pipeImageRotate = loadImage("pipe-green-rotate.png");
  restartImage = loadImage("1048199789-removebg-preview.png");
}


function setup() {
  createCanvas(250, 400);

  back = createSprite(125, 200, 10, 10);
  back.addImage("background", backImage);
  back.scale = 1.5;
  back.y = 150;

  base = createSprite(125, 400, 10, 10);
  base.addImage("base", baseImage);
  base.scale = 1.4;
  base.y = 430;
  base.depth = 5;

  bird = createSprite(25, 200, 10, 10);
  bird.addAnimation("birdFly", birdAnimation);
  bird.visible = false;

  start = createSprite(125, 200, 10, 10);
  start.addImage("message", startImage);
  start.visible = false;

  gameover = createSprite(125, 200, 10, 10);
  gameover.addImage("gameover", gameoverImage);
  gameover.visible = false;

  restart = createSprite(165, 240, 10, 10);
  restart.addImage("restart", restartImage);
  restart.scale = 0.5;
  restart.visible = false;

  pipeGroup = new Group();
}

function draw() {
  background(220);
  drawSprites();
  createEdgeSprites();
  if (back.x < 80) {
    back.x = back.width / 2;
  }
  if (base.x < 80) {
    base.x = base.width / 2;
  }
  if (gamestate === "idle") {
    start.visible = true;
    bird.y = height / 2;
    gameover.visible = false;
    restart.visible = false;
    if (mousePressedOver(start) && gamestate === "idle") {
      gamestate = "play";
    }
  }
  if (gamestate === "play") {
    back.velocityX = -1;
    SpawnPipe();
    bird.velocityY = bird.velocityY + 0.6;
    base.velocityX = -5
    restart.visible = false;
    if (keyDown('space')) {
      bird.velocityY = -5
    }
    if (bird.isTouching(base)) {
      gamestate = "end";
    }
    if (bird.y > 350) {
      bird.velocityY = 0;
      gamestate = "end";
    }
    bird.visible = true;
    start.visible = false;
    gameover.visible = false;
  }
  if (gamestate === "end") {
    base.velocityX = 0;
    back.velocityX = 0;
    pipeGroup.destroyEach();
    gameover.visible = true;
    restart.visible = true;
    if (mousePressedOver(restart) && gamestate === "end") {
      gamestate = "idle";
    }
  }
}

function SpawnPipe() {
  if (frameCount % 50 === 0) {
    var rect , belowrect;
    pipe = createSprite(400, 0, 50, random(10, 150));
    console.log(pipe.y);
    var belowpipe;
    belowpipe = createSprite(400, 400, 50, random(390, 250));
    pipe.velocityX = -5;
    belowpipe.velocityX = -5;
    pipeGroup.add(pipe);
    pipeGroup.add(belowpipe);
    pipe.shapeColor= color(26,168,45);
    belowpipe.shapeColor = color(26,168,45);
    pipeGroup.setDepthEach = 1;
    pipe.depth = base.depth - 1;
    belowpipe.depth = base.depth-1 
  }
}