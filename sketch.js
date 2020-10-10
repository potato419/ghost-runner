var tower, towerImg;
var door, doorImg, doorGroup;
var climber, climberImg, climberGroup;
var block, blockGroup;
var ghost, ghostImg;
var gameState="play";
var spookySound;

function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
  spookySound=loadSound("spooky.wav");
}


function setup(){
  createCanvas(600,600);
  spookySound.loop();
  
  tower=createSprite(300,300,10,10);
  tower.addImage(towerImg);
  tower.velocityY=1;
  
  ghost=createSprite(200,200,10,10);
  ghost.addImage(ghostImg);
  ghost.scale=0.45;
  
  doorGroup=new Group();
  climberGroup=new Group();
  blockGroup=new Group();
}

function draw(){
 if(tower.y>600 ){
   tower.y=300;
 }
  if(gameState==="play"){
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  ghost.velocityY=ghost.velocityY+0.8;
  
  if(keyDown("left")){
    ghost.x=ghost.x-3;
  }
  
  if(keyDown("right")){
    ghost.x=ghost.x+3;
  }
  
  if(climberGroup.isTouching(ghost)){ 
    ghost.velocityY=0;
  }
  
  if(blockGroup.isTouching(ghost)){
    gameState="end";
  }
  
  spawnDoors();
  drawSprites();
  }
  if(gameState==="end"){
    background("black");
    fill("yellow");
    textSize(30);
    text("Game Over",230,250);
  }
}


function spawnDoors(){
  if(frameCount%240===0){
     door=createSprite(200,-50);
    door.addImage(doorImg); 
     door.x=Math.round(random(120,400));
    door.velocityY=1;
    door.lifetime=700;
      doorGroup.add(door);
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    
    climber=createSprite(200,10);
    climber.addImage(climberImg);
    climber.x=door.x;
    climber.velocityY=1;
    climber.lifetime=700;
    climberGroup.add(climber);
      ghost.depth=climber.depth;
    ghost.depth=ghost.depth+1;
    
    block=createSprite(200,15,20,2);
    block.width=climber.width;
    block.x=door.x;
    block.velocityY=1;
    blockGroup.add(block);
    block.debug=true;
      ghost.depth=block.depth;
    ghost.depth=ghost.depth+1;
     }
  
  
}

