var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running, monkey_collied;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, ObstaclesGroup;
var survivalTime = 0;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkey_collied = loadImage("sprite_3.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}

function setup() {
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.addAnimation("stopped", monkey_collied);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,9000,5);
  ground.velocityX = -4;
  //console.log(ground.x);
  
  FoodGroup = new Group ();
  ObstaclesGroup = new Group ();
}


function draw() {
  createCanvas (400,400);
  background(255);
  monkey.collide(ground);
  
    //stroke("black");
  fill("Black");
  textSize (15);
  text("Survival Time- " + survivalTime,100,50);
  
  if (gameState === PLAY) 
  { 
  survivalTime = Math.ceil(frameCount/frameRate());
  
    if (ground.x < 0)
  {
      ground.x = ground.width/2;
  }
  
  if (keyDown("space")) 
    {
      monkey.velocityY = -12;
    }
  // gravity
  monkey.velocityY = monkey.velocityY + 0.8;
    
    if (FoodGroup.isTouching(monkey))
      {
        FoodGroup.destroyEach();
      }
  
    spawnFood();
    spawnRock();
    
    if (ObstaclesGroup.isTouching(monkey))
      {
        gameState = END;
      }
  }
    
    if (gameState === END)
      {
        ground.velocityX = 0;
        monkey.changeAnimation("stopped",monkey_collied);
        ObstaclesGroup.setLifetimeEach (-1);
        ObstaclesGroup.setVelocityXEach (0);
        FoodGroup.setLifetimeEach (-1);
        FoodGroup.destroyEach ();
        background ("red");
        fill("white");
        textSize (30);
        text("Game Over!",130,200); 
      }
  drawSprites();
}
 

  function spawnFood() {
  //write code here to spawn the clouds
  if (frameCount % 50 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    banana.lifetime = 200;
    FoodGroup.add(banana);
  }
}
 
   function spawnRock() 
{
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var rock = createSprite(350,329,40,10);
    rock.addImage(obstaceImage);
    rock.scale = 0.1;
    rock.velocityX = -3;
    
    rock.lifetime = 200;
    ObstaclesGroup.add(rock);
  }
}




