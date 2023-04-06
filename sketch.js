var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var score = 0

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200, 200);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.4;
  
  //defines & creates new groups
  doorsGroup = createGroup();
  climbersGroup = createGroup();
  invisibleBlockGroup = createGroup();
}

function draw() {
  background(200);
  
  if (gameState == "play") {
    if(tower.y > 400){
      tower.y = 300
    }

    if (keyDown("space"))  {
    ghost.velocityY = -10;
    }

    if (keyDown("left_arrow")) {
    ghost.velocityX = -2;
    }
  
    if (keyDown("right_arrow")) {
    ghost.velocityX = 2;
    }
  
  ghost.velocityY += 0.8

  if (invisibleBlockGroup.isTouching(ghost)) {
    gameState = "end"
  }
  
  //calls function to make doors
  spawnDoors()
  
  //shows and updates score
    score += 1
    
    textSize(50)
    text("Score: " + score, 175, 300);
  }
  
  if (gameState == "end") {
    ghost.velocityX = 0;
    ghost.velocityY = 0;

    tower.velocityY = 0;

    doorsGroup.velocityYEach(0);
    climbersGroup.velocityYEach(0);
    invisibleBlockGroup.velocityYEach(0);
    
    doorsGroup.lifetimeEach(-1);
    climbersGroup.lifetimeEach(-1);
    invisibleBlockGroup.lifetimeEach(-1);
  }
  
  drawSprites()
}


function spawnDoors() {
  if (frameCount % 240 === 0) {
    door = createSprite(200,-50);
    climber = createSprite(200, 10);
    invisibleBlock = createSprite(200, 15, climber.width, 2);

    //sorts x position
    door.x = Math.round(random(120, 400));
    climber.x = door.x;
    invisibleBlock.x = door.x;

    //adds images
    door.addImage(doorImg);
    climber.addImage(climberImg);

    //sets depth
    ghost.depth = door.depth;
    ghost.depth += 1;

    //test width
    climber.width = door.width + 10;

    //moves door down
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    //gives lifetime
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    invisibleBlock.visible = true
    invisibleBlock.debug = true
    
    //adds sprite into groups
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);

    //ghost to land on door
    climber.collide(ghost);
  }
}