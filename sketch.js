var sea,fish,shark,coral
var seaImg, fishImg,sharkImg,coralImg,endImg
var time =0;
var coralG,sharkG
var score
var PLAY=1;
var END=0;
var gameState=1;

var gameOver,restart

function preload(){
    fishImg = loadImage("fish.png");
    sharkImg = loadImage("shark.png");
    seaImg = loadImage ("sea.jpg");
    coralImg = loadImage("coral.png");
    endImg = loadImage("gameOver.png");
}

function setup() {
    createCanvas(500,500);

    sea=createSprite(300,300);
    sea.addImage(seaImg);
    sea.scale=2;


   fish = createSprite(100,300,20,20);
   fish.scale=0.4
   fish.addImage(fishImg)

    

   coralG=createGroup();
   sharkG=createGroup();

    gameOver = createSprite(250,200);
    gameOver.addImage(endImg);
    gameOver.scale = 0.8;
    gameOver.visible = false;  

    score=0;
}

function draw() {
    background("pink");
    drawSprites()

    textSize(20);
    fill("yellow")
    text ("Score : " +score,200,30 )

     if(gameState===1){
        sea.velocityX = -5;
        fish.y = World.mouseY;
        if(sea.x <0 ){
            sea.x=300;
        }
        sharks();
        corals();

        if(coralG.isTouching(fish)){
            gameState = 0;
        }
        if(sharkG.isTouching(fish)){
            gameState = 0; 
        }
    }
    
    
    else if (gameState === 0) {
        gameOver.visible = true;
        coralG.setVelocityEach(0,0);
        sharkG.setVelocityEach(0,0);
        textSize(25);
        fill("white");
        text("Press space bar to Restart the game!",30,350);
    
        sea.velocityX = 0;
        fish.velocityY = 0;

        coralG.setLifetimeEach(-1);
        sharkG.setLifetimeEach(-1);
        
        if(keyDown("space")) {
            reset();
        }
    }

}
function corals(){
    if(frameCount%70 ==0){
        coral =createSprite(600,Math.round(random(20, 450)));
        coral.scale =0.3;
        coral.velocityX = -(6+score/10);
        coral.addImage(coralImg);
        coral.lifetime=170;
        coralG.add(coral);
        score++;
    }
}

function sharks(){
    if(frameCount%100 ==0){
        shark =createSprite(600,Math.round(random(50, 350)));
        shark.scale =0.4;
        shark.velocityX =  -(6+score/10);
        shark.addImage(sharkImg);
        shark.lifetime=170;
        sharkG.add(shark);
        score++;
        
    }
}

function reset(){
    gameState = 1;
    gameOver.visible = false;
     
    coralG.destroyEach();
    sharkG.destroyEach();
   score=0
}
