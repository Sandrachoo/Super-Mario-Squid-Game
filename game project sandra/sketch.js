//The extensions that I applied on my game project are sound and platform. The sound extension was the background music of Squid Game which is relevant to my game project theme. When choosing sound extension, it is advisable to choose some which are licensed and credit them later. Besides some platforms were created for my character to hop on, the graphics were first created then it was later being called in checkIfGameCharIsOverAnyPlatform function to check if the character is on Platform range and if so, the character will stop plummeting.

//The bits I found difficult on is when creating better extensions. I actually planned to include more advanced enemies with better graphics, however it needs 3 dimensions as the enemies hover left and right. 

//I definitely learn to make my code cleaner. Different graphics were called in separate function and called later on draw function. It makes the draw function more neat and easier to debug since it is called individually and bugs on one side does not affect the other one. Besides, I also learned to create repeated animation by initiating their position in an array. Using an array allow us to add in more animation by just declaring their position in their respective array.


var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
var isPlummeting;
var isFalling;
var gameChar_width;
var staircase;
var trees_x;
var clouds;
var mountain;
var jumpSound;

//1. declare collection and canyons array
var collectables;
var canyons;

//1. declare scroll position
var scrollPos;

//1. declare gamechar_world_x
var gameChar_world_x;

//1. declare game_score
var game_score;

//1. declare flagpole
var flagpole;

//1. declare lives
var lives;

//1. declare platforms
var platforms;

//1. declare onPlatform
var onPlatform;

//1. declare enemies
var enemies;

//1. declare hitByEnemy
var hitByEnemy;




//load sound extension
function preload() {
  soundFormats('mp3');
jumpSound = loadSound('assets/squidgame.mp3');
} 

function setup()
{
	createCanvas(1024, 576);
    
	floorPos_y = height * 3/4;
    
    lives = 3;
    
    startGame();
}

function startGame(){
    gameChar_x = width/2;
	gameChar_y = floorPos_y;
    isLeft =false;
    isRight =false;
    isPlummeting =false;
    isFalling =false;
    onPlatform = false;
    hitByEnemy = false;
    gameChar_width=60; 
    
    
    //animation graphics in separate array
    clouds = [{grey_midX :220,grey_midY : 78,size:70},
              {grey_midX :480,grey_midY : 118,size:60},
             {grey_midX :1080,grey_midY : 118,size:70},
              {grey_midX :620,grey_midY : 98,size:70},
              {grey_midX :820,grey_midY : 78,size:70}
             ];
    

    
    mountain = [{x_1:770,y_1:285,x_2:770,y_2:0,size:1},
                 {x_1:50,y_1:285,x_2:50,y_2:0,size:2},
               {x_1:460,y_1:285,x_2:460,y_2:0,size:1},
               {x_1:1960,y_1:285,x_2:1960,y_2:0,size:1},
               {x_1:1460,y_1:285,x_2:1460,y_2:0,size:1}];
    
    trees_x = [{x1 : -300, y1 : floorPos_y-42,size:-300},
               {x1 : 300, y1 : floorPos_y-42,size:300},
               {x1 : 800, y1 : floorPos_y-42,size:800},
               {x1 : 1000, y1 : floorPos_y-42,size:1000},
               {x1 : 1500, y1 : floorPos_y-42,size:1500},
               {x1 : 1200, y1 : floorPos_y-42,size:1200}];

    
    staircase = [{x_pos: 100,
               y_pos: 50},
                 {x_pos: 450,
               y_pos: 30},
                {x_pos: 850,
               y_pos: 60},
                {x_pos: 1050,
               y_pos: 40}];
    
    //2. init scrollPoss
    scrollPos = 0;
    
    //2. init gamecharworld_x
    gameChar_world_x = gameChar_x;
    
    //2. init collectables 
    var collectable1 = {x: 30, y:floorPos_y-27, size: 40, 
                        line_x:-19.5,line_y:0, isFound: false};
    var collectable2 = {x: 720, y:floorPos_y-27, size: 40, line_x:669.5,line_y:0, isFound: false};
    var collectable3 = {x: 410, y:floorPos_y-27, size: 40,line_x:359.5,line_y:0, isFound: false};
    collectables = [collectable1,collectable2,collectable3];
    
    //2. init canyons as array
    var canyon1 = {x_pos: 180,y_pos:100, width: 100};
    var canyon2 = {x_pos: 920,y_pos:100, width: 100};
    var canyon3 = {x_pos: 1620,y_pos:100, width: 100};
    
    canyons = [canyon1,canyon2,canyon3];
    
    //2. init game_score as 0
    game_score = 0;
    
    //2. init flagpole as false 
    flagpole = {isReached:false, x_pos:1500};
    
    //2. init platform
    platforms = [];
    var p1 = createPlatform(160,floorPos_y-100,100);
    var p2 = createPlatform(800,floorPos_y-200,100);
    var p3 = createPlatform(1050,floorPos_y-100,100);
    platforms.push(p1);
    platforms.push(p2);
    platforms.push(p3);
    
    
    //2. init enemies
    enemies = [];
    enemies.push(new Enemy(400,floorPos_y-10,100));
    enemies.push(new Enemy(1200,floorPos_y-10,100));
    enemies.push(new Enemy(-400,floorPos_y-10,100));
    enemies.push(new Enemy(-800,floorPos_y-10,100));
    
 
}



function draw()
{

	///////////DRAWING CODE//////////

	background(100,155,255); //fill the sky blue


	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

    //3. push and translate
    push(); // remember the current origin 
    translate(scrollPos,0); // change the origin to (scrollPos, 0) 
    
	//draw extensions and animations
    drawCanyons();
    
    drawMountains();
    
    drawTrees();
    
    drawClouds();
    
    drawPlatforms();
    
    drawCollectables();
    
    checkPlayerDie();
    
    checkIfGameCharInContactWithEnemies();
    
    renderFlagPole();
    
    drawEnemies();
    
    ////////////////////////////////////////edit////////

    
    
    pop();

    
    fill(255);
    textSize(10);
    noStroke();
    text("score: " + game_score,50,50);
    

    //////////////////////////////////////edit///////////
    
    //live score animation reduce as character loses one live
    for (var i = 0; i < lives; i++)
        {
            fill(255,0,0);
            squid (900 + 40 * i, 10, 20);
        }
    
    //show text below if live score more than 1
    if (lives < 1){
        fill(255);
        textSize(50);
        text("Game Over, Press space to continue.", 80,295);
        return;
    }
    
    //show text below if character reaches flagpole
    if(flagpole.isReached == true){
        fill(255);
        textSize(50);
        text("Level Complete. Press space to continue. ", 80,295);
        return;
        
    }
    
    noStroke();
    
    
    // draw game character with different dimensions while in different positions and movement
    
    if (onPlatform && isLeft)
    {
        drawIsLeft();
    }
    else if (onPlatform && isRight)
    {
        drawIsRight();
    }
    
	else if(isLeft && isFalling)
	{
		// add your jumping-left code
        drawIsLeftAndIsFalling();
	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
        drawIsRightAndIsFalling();
	}
	else if(isLeft)
	{
		// add your walking left code
        drawIsLeft();
	}
	else if(isRight)
	{
		// add your walking right code
        drawIsRight();
	}
    else if (onPlatform)
    {
        facingforward();
    }
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
        drawIsFallingAndIsPlummeting();
	}
	else
	{
		// add your standing front facing code
        facingforward();
	}

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
       var isGameOver = checkIsGameOver();
    
    // call drawGameOver is variable is GameOver is true
    if(isGameOver==true){
        drawGameOver();
        return;
    }
    
    // if game character hit by enemy and the lives is still more than 0, start Game over
    if(hitByEnemy == true)
    {
        if(lives>0){
            startGame();
        }
        return;
    }
    
    
    // increase the game character y position to make it plummets 
    if (isPlummeting){
        gameChar_y+=10;
    }
    
    // if the game character position is still above the game y position, allow game character to plummet. Otherwise, if it is already on the ground stop plummeting
    if(gameChar_y<floorPos_y){
        isFalling = true;
    }else{
        isFalling = false;
    }
    
    if(isLeft==true){
        //if gameChar is within the original frame
        if (gameChar_x > width*0.2){
            gameChar_x-= 5;
        }
        else{//translate drawing towards the right
            //get the effect of moving to the left
            scrollPos+=5;
        }
    }
    else if(isRight==true){
        // if gameChar is within the original frame 
        if(gameChar_x < width*0.8){
        gameChar_x += 5;}
        else{
            //translate drawing towards the left
            //get the effrct of moving to the right
            scrollPos-=5;
        }
    }
    
    //3. update gameChar_world_x
    //update the real position of gameChar for collision detection
    gameChar_world_x = gameChar_x - scrollPos;
    
      if(flagpole.isReached == false){
        checkFlagPole();
    }
    
    
    
    //check if game character is in the range of the collectable
    checkIfGameCharInCollectablesRange();
    

     //check if game character is over the canyon
    checkIfGameCharIsOverCanyons();
    
    checkIfGameCharIsOverAnyPlatform();
    
    
    
}



function checkIfGameCharIsOverAnyPlatform(){
    if(isFalling){
        var isContact = false;
        onPlatform = false;
        
        //if character is within the length of platform, game character will stop plummeting and stay on the platform((onPlatform true)).
        for(var i = 0; i < platforms.length; i++){
            isContact = platforms[i].checkContact(gameChar_world_x,gameChar_y);
            if(isContact){
                onPlatform=true;
                break;
            }
        }
        
        //else game character continue to plummet
        if(!isContact){
            gameChar_y+=1;
        }
    }
}

function checkIfGameCharInContactWithEnemies(){
    if(checkIsGameOver()){
        return;
    }
    
    //check if the variable enemy is in contact with with the game character position in checkcContact function, if it is true, game character lives reduce by 1.
    for (i in enemies){
        var enemy = enemies[i];
        var isContact = enemy.checkContact(gameChar_world_x,gameChar_y);
        
        if(isContact){
            hitByEnemy = true;
            lives -- ;
            break;
        }
    }
}


// create Platform animation 
function createPlatform(x,y,length){
    
    var p = {
        x: x,
        y: y,
        length: length,
        draw: function (){
             noStroke();
             fill(0,155,0);
             rect(this.x,this.y,this.length+15,12);
            
             fill(0, 123, 0);
             rect(this.x,this.y,this.length-65,12);
            
             fill(148, 110, 70);
             rect(this.x+8,this.y+11.5,this.length-4,14);
            
             fill(129,62,36);
             rect(this.x+8,this.y+11.5,this.length-79,14);
        },
        checkContact: function(gc_x,gc_y){
            //check for x axis
            var c1 =  gc_x+20>this.x;
            var c2 = gc_x<this.x+this.length+20;
            if(c1&&c2)
                {
                    //checkfor y axis
                    var d = this.y-gc_y;
                    if(d>=0 && d<1){
                        return true;
                    }
                }
            return false;
        }
    }
    return p;
}

// create enemy animation 
function Enemy(x,y,range){
    //x position, y position and the range of enemy moving around
    this.x = x;
    this.y = y;
    this.range = range;
    
    
    this.currentX = x;
    this.inc = 1;
    
    //draw enemy
    this.draw = function(){
        this.update();
        fill(255,0,0);
        ellipse(this.currentX,this.y,20,20);
    }
    
    //enemy moving left and right
    this.update = function(){
        this.currentX += this.inc;
        if(this.currentX > this.x + this.range){
            this.inc = -1;
        }else if (this.currentX < this.x){
            this.inc = 1;
        }
    }
    
    //check enemy contact with game character
    this.checkContact = function(gc_x,gc_y){
        var d = dist(gc_x, gc_y, this.currentX,this.y);
        if(d<20){
            return true;
        }
        return false;
    }
}



function drawPlatforms(){
    for(i in platforms){
        var platform = platforms [i];
        platform.draw();
    }
}

function drawEnemies(){
    for (var i = 0; i < enemies.length; i++)
        {
            enemies[i].draw();
        }
}


//live score animation 
function squid(x,y,size){
    noStroke();
    fill(235, 64, 52);
    rect(x,y,30,30,30,30,10,10);
    fill(0,0,0);
    rect(x+3,y+4,24,24,30,30,8,8);
    stroke(255,255,255);
    strokeWeight(1.5);
    line(x+15,y+20,x+15,y+27);
    line(x+4,y+20,x+26,y+20);
    noFill();
    triangle(x+15,y+8,x+8,y+16,x+21,y+16);
}


function drawIsLeftAndIsFalling()
{
    // add your jumping-left code
    fill(0);
    arc ( gameChar_x,gameChar_y-56,15,20,PI,PI);
    fill(0);
    ellipse(gameChar_x+6,gameChar_y-48,8,8);
    
    //skin
    fill(239,214,189);
    rect(gameChar_x-7,gameChar_y-60,14,15,5,5,40,40);
    rect(gameChar_x-2.5,gameChar_y-50,5,7);
        
    //yellow shirt
    fill(233,216,57);
    rect(gameChar_x-5.5,gameChar_y-43,11.5,15);
   
    //orange dress
    fill(233,145,57);
    rect(gameChar_x-5.5,gameChar_y-37,11.5,8);
   
    beginShape();
    curveVertex(gameChar_x-5.5,gameChar_y-29);
    curveVertex(gameChar_x-5.5,gameChar_y-29);
    curveVertex(gameChar_x-9,gameChar_y-20);
    curveVertex(gameChar_x+9,gameChar_y-20);   curveVertex(gameChar_x+6.5,gameChar_y-29);
    curveVertex(gameChar_x+6.5,gameChar_y-29);
    endShape(CLOSE);
   
    //hand
    fill(239,214,189);
    rect(gameChar_x-1,gameChar_y-40,3,12);

    // leg skin
    fill(239,214,189);
    rect(gameChar_x-4,gameChar_y-23,3,8,0,0,2,2);
    rect(gameChar_x+1,gameChar_y-19,3,8,0,0,2,2);
    
     //socks
    fill(193,186,178);
    rect(gameChar_x-4.5,gameChar_y-19,4,8);
    rect(gameChar_x+0.5,gameChar_y-15,4,8);
    
    //shoes
    fill(0);
    rect(gameChar_x-4.5,gameChar_y-11,4,3);
    rect(gameChar_x+0.5,gameChar_y-7,4,3);
    
    //eyes
    fill(255);    
    beginShape();
    vertex(gameChar_x-3,gameChar_y-54);
    bezierVertex(gameChar_x-1,gameChar_y-58,gameChar_x+1,gameChar_y-58,gameChar_x+3,gameChar_y-55);
    endShape(CLOSE);
    beginShape();
    vertex(gameChar_x-3,gameChar_y-55);
    bezierVertex(gameChar_x-1,gameChar_y-53,gameChar_x+1,gameChar_y-53,gameChar_x+3,gameChar_y-55);
    endShape(CLOSE);

    fill(0);
    ellipse(gameChar_x-2,gameChar_y-55,2.5,2.5);
    
    stroke(233,61,61);
    line(gameChar_x-5,gameChar_y-49,gameChar_x-3,gameChar_y-50);

}

function drawIsRightAndIsFalling()
{
    fill(0);
    arc ( gameChar_x,gameChar_y-56,15,20,PI,PI);
    fill(0);
    ellipse(gameChar_x-6,gameChar_y-48,8,8);
    
    //skin
    fill(239,214,189);
    rect(gameChar_x-7,gameChar_y-60,14,15,5,5,40,40);
    rect(gameChar_x-2.5,gameChar_y-50,5,7);
  
    //yellow shirt
    fill(233,216,57);
    rect(gameChar_x-5.5,gameChar_y-43,11.5,15);
   
    //orange dress
    fill(233,145,57);
    rect(gameChar_x-5.5,gameChar_y-37,11.5,8);
   
    beginShape();
    curveVertex(gameChar_x-5.5,gameChar_y-29);
    curveVertex(gameChar_x-5.5,gameChar_y-29);
    curveVertex(gameChar_x-9,gameChar_y-20);
    curveVertex(gameChar_x+9,gameChar_y-20);   curveVertex(gameChar_x+6.5,gameChar_y-29);
    curveVertex(gameChar_x+6.5,gameChar_y-29);
    endShape(CLOSE);
   
    //hand
    fill(239,214,189);
    rect(gameChar_x-1,gameChar_y-40,3,12);
    // leg skin
    fill(239,214,189);
    rect(gameChar_x-4,gameChar_y-19,3,8,0,0,2,2);
    rect(gameChar_x+1,gameChar_y-23,3,8,0,0,2,2);
    
     //socks
    fill(193,186,178);
    rect(gameChar_x-4.5,gameChar_y-15,4,8);
    rect(gameChar_x+0.5,gameChar_y-19,4,8);
    
    //shoes
    fill(0);
    rect(gameChar_x-4.5,gameChar_y-7,4,3);
    rect(gameChar_x+0.5,gameChar_y-11,4,3);
    //eyes
    fill(255);   
    beginShape();
    vertex(gameChar_x-3,gameChar_y-55);
    bezierVertex(gameChar_x-1,gameChar_y-58,gameChar_x+1,gameChar_y-58,gameChar_x+3,gameChar_y-54);
    endShape(CLOSE);
    beginShape();
    vertex(gameChar_x-3,gameChar_y-55);
    bezierVertex(gameChar_x-1,gameChar_y-53,gameChar_x+1,gameChar_y-53,gameChar_x+3,gameChar_y-54);
    endShape(CLOSE);

    fill(0);
    ellipse(gameChar_x+1,gameChar_y-55,2.5,2.5);
    
    stroke(233,61,61);
    line(gameChar_x+4,gameChar_y-49,gameChar_x+3,gameChar_y-50);
}

function drawIsLeft()
{//hair
    fill(0);
    arc ( gameChar_x,gameChar_y-56,15,20,PI,PI);
    fill(0);
    ellipse(gameChar_x+6,gameChar_y-48,8,8);
    
    //skin
    fill(239,214,189);
    rect(gameChar_x-7,gameChar_y-60,14,15,5,5,40,40);
    rect(gameChar_x-2.5,gameChar_y-50,5,7);
   
    //yellow shirt
    fill(233,216,57);
    rect(gameChar_x-5.5,gameChar_y-43,11.5,15);
    
    //orange dress
    fill(233,145,57);
    rect(gameChar_x-5.5,gameChar_y-37,11.5,8);
   
    beginShape();
    curveVertex(gameChar_x-5.5,gameChar_y-29);
    curveVertex(gameChar_x-5.5,gameChar_y-29);
    curveVertex(gameChar_x-9,gameChar_y-20);
    curveVertex(gameChar_x+9,gameChar_y-20);   curveVertex(gameChar_x+6.5,gameChar_y-29);
    curveVertex(gameChar_x+6.5,gameChar_y-29);
    endShape(CLOSE);
  
    //hand
    fill(239,214,189);
    rect(gameChar_x-1,gameChar_y-40,3,12);
        
    // leg skin
    fill(239,214,189);
    rect(gameChar_x-1.5,gameChar_y-19,4,8,0,0,2,2);
  
    //socks
    fill(193,186,178);
    rect(gameChar_x-2,gameChar_y-15,5,8);
  
    //shoes
    fill(0);
    rect(gameChar_x-2,gameChar_y-7,5,4);
   
    //eyes
    fill(255); 
    beginShape();
    vertex(gameChar_x-3,gameChar_y-54);
    bezierVertex(gameChar_x-1,gameChar_y-58,gameChar_x+1,gameChar_y-58,gameChar_x+3,gameChar_y-55);
    endShape(CLOSE);
    beginShape();
    vertex(gameChar_x-3,gameChar_y-55);
    bezierVertex(gameChar_x-1,gameChar_y-53,gameChar_x+1,gameChar_y-53,gameChar_x+3,gameChar_y-55);
    endShape(CLOSE);
    fill(0);
    ellipse(gameChar_x-2,gameChar_y-55,2.5,2.5);
    stroke(233,61,61);
    line(gameChar_x-5,gameChar_y-49,gameChar_x-3,gameChar_y-50);
}

function drawIsRight()
{
    //hair
    fill(0);
    arc ( gameChar_x,gameChar_y-56,15,20,PI,PI);
    fill(0);
    ellipse(gameChar_x-6,gameChar_y-48,8,8);
    
    //skin
    fill(239,214,189);
    rect(gameChar_x-7,gameChar_y-60,14,15,5,5,40,40);
    rect(gameChar_x-2.5,gameChar_y-50,5,7);
    
    //yellow shirt
    fill(233,216,57);
    rect(gameChar_x-5.5,gameChar_y-43,11.5,15);
   
    //orange dress
    fill(233,145,57);
    rect(gameChar_x-5.5,gameChar_y-37,11.5,8);
   
    beginShape();
    curveVertex(gameChar_x-5.5,gameChar_y-29);
    curveVertex(gameChar_x-5.5,gameChar_y-29);
    curveVertex(gameChar_x-9,gameChar_y-20);
    curveVertex(gameChar_x+9,gameChar_y-20);   curveVertex(gameChar_x+6.5,gameChar_y-29);
    curveVertex(gameChar_x+6.5,gameChar_y-29);
    endShape(CLOSE);
    
    //hand
    fill(239,214,189);
    rect(gameChar_x-1,gameChar_y-40,3,12);
        
    // leg skin
    fill(239,214,189);
    rect(gameChar_x-1.5,gameChar_y-19,4,8,0,0,2,2);
  
    //socks
    fill(193,186,178);
    rect(gameChar_x-2,gameChar_y-15,5,8);
   
    //shoes
    fill(0);
    rect(gameChar_x-2,gameChar_y-7,5,4);
  
    //eyes
    fill(255);   
    beginShape();
    vertex(gameChar_x-3,gameChar_y-55);
    bezierVertex(gameChar_x-1,gameChar_y-58,gameChar_x+1,gameChar_y-58,gameChar_x+3,gameChar_y-54);
    endShape(CLOSE);
    beginShape();
    vertex(gameChar_x-3,gameChar_y-55);
    bezierVertex(gameChar_x-1,gameChar_y-53,gameChar_x+1,gameChar_y-53,gameChar_x+3,gameChar_y-54);
    endShape(CLOSE);

    fill(0);
    ellipse(gameChar_x+1,gameChar_y-55,2.5,2.5);
    
    stroke(233,61,61);
    line(gameChar_x+4,gameChar_y-49,gameChar_x+3,gameChar_y-50);
}

function drawIsFallingAndIsPlummeting()
{
    //hair
    fill(0);
    arc ( gameChar_x,gameChar_y-56,22,22,PI,PI);
    fill(0);
    ellipse(gameChar_x-8,gameChar_y-46,8,8);
    ellipse(gameChar_x+8,gameChar_y-46,8,8);
    
    //skin
    fill(239,214,189);
    rect(gameChar_x-11,gameChar_y-60,22,15,5,5,40,40);
    rect(gameChar_x-2.5,gameChar_y-50,5,7);
        
    //hand
    beginShape();
    vertex(gameChar_x-9,gameChar_y-35);
    vertex(gameChar_x-9,gameChar_y-35);
    vertex(gameChar_x-12,gameChar_y-28);
    vertex(gameChar_x-9,gameChar_y-28);
    vertex(gameChar_x-6,gameChar_y-35);
    vertex(gameChar_x-6,gameChar_y-35);
    endShape(CLOSE);
    
    beginShape();
    vertex(gameChar_x+6,gameChar_y-35);
    vertex(gameChar_x+6,gameChar_y-35);
    vertex(gameChar_x+9,gameChar_y-28);
    vertex(gameChar_x+12,gameChar_y-28);
    vertex(gameChar_x+9,gameChar_y-35);
    vertex(gameChar_x+9,gameChar_y-35);
    endShape(CLOSE);
    
    //hand
    beginShape();
    vertex(gameChar_x-9,gameChar_y-35);
    vertex(gameChar_x-9,gameChar_y-35);
    vertex(gameChar_x-12,gameChar_y-28);
    vertex(gameChar_x-9,gameChar_y-28);
    vertex(gameChar_x-6,gameChar_y-35);
    vertex(gameChar_x-6,gameChar_y-35);
    endShape(CLOSE);
    
    beginShape();
    vertex(gameChar_x+6,gameChar_y-35);
    vertex(gameChar_x+6,gameChar_y-35);
    vertex(gameChar_x+9,gameChar_y-28);
    vertex(gameChar_x+12,gameChar_y-28);
    vertex(gameChar_x+9,gameChar_y-35);
    vertex(gameChar_x+9,gameChar_y-35);
    endShape(CLOSE);
    
    //yellow shirt
    fill(233,216,57);
    rect(gameChar_x-5.5,gameChar_y-43,11.5,8);
    beginShape();
    curveVertex(gameChar_x-5.5,gameChar_y-43);
    curveVertex(gameChar_x-5.5,gameChar_y-43);
    curveVertex(gameChar_x-5.5,gameChar_y-35);
    curveVertex(gameChar_x-10,gameChar_y-35);
    curveVertex(gameChar_x-10,gameChar_y-35);
    endShape(CLOSE);
    beginShape();
    curveVertex(gameChar_x+6,gameChar_y-43);
    curveVertex(gameChar_x+6,gameChar_y-43);
    curveVertex(gameChar_x+6,gameChar_y-35);
    curveVertex(gameChar_x+10.5,gameChar_y-35);
    curveVertex(gameChar_x+10.5,gameChar_y-35);
    endShape(CLOSE);
    
    //orange dress
    fill(233,145,57);
    rect(gameChar_x-5.5,gameChar_y-43,2,8);
    rect(gameChar_x+4,gameChar_y-43,2,8);
    rect(gameChar_x-5.5,gameChar_y-37,11.5,8);
   
    beginShape();
    curveVertex(gameChar_x-5.5,gameChar_y-29);
    curveVertex(gameChar_x-5.5,gameChar_y-29);
    curveVertex(gameChar_x-12,gameChar_y-20);
    curveVertex(gameChar_x+12,gameChar_y-20);   curveVertex(gameChar_x+6.5,gameChar_y-29);
    curveVertex(gameChar_x+6.5,gameChar_y-29);
    endShape(CLOSE);
    
    // leg skin
    fill(239,214,189);
    rect(gameChar_x-4,gameChar_y-19,3,8,0,0,2,2);
    

    rect(gameChar_x+2,gameChar_y-23,3,8,0,0,2,2);
    
     //socks
    fill(193,186,178);
    rect(gameChar_x-4.5,gameChar_y-15,4,9);

    rect(gameChar_x+1.5,gameChar_y-16,4,8);
    
    //shoes
    fill(0);
    rect(gameChar_x-4.5,gameChar_y-7,4,4);
    rect(gameChar_x+1.5,gameChar_y-10,4,4);

    
    //eyes
    fill(255);
    beginShape();
    vertex(gameChar_x-8,gameChar_y-55);
    bezierVertex(gameChar_x-6,gameChar_y-58,gameChar_x-4,gameChar_y-58,gameChar_x-2,gameChar_y-54);
    endShape(CLOSE);
    beginShape();
    vertex(gameChar_x-8,gameChar_y-56);
    bezierVertex(gameChar_x-6,gameChar_y-53,gameChar_x-4,gameChar_y-53,gameChar_x-2,gameChar_y-54);
    endShape(CLOSE);
    
    beginShape();
    vertex(gameChar_x+1,gameChar_y-54);
    bezierVertex(gameChar_x+3,gameChar_y-58,gameChar_x+5,gameChar_y-58,gameChar_x+7,gameChar_y-55);
    endShape(CLOSE);
    beginShape();
    vertex(gameChar_x+1,gameChar_y-55);
    bezierVertex(gameChar_x+3,gameChar_y-53,gameChar_x+5,gameChar_y-53,gameChar_x+7,gameChar_y-55);
    endShape(CLOSE);

    fill(0);
    ellipse(gameChar_x-5,gameChar_y-55.5,2.5,2.5);
    ellipse(gameChar_x+4,gameChar_y-55.5,2.5,2.5);
    
    stroke(233,61,61);
    line(gameChar_x-2,gameChar_y-50,gameChar_x,gameChar_y-50);
    
}

function facingforward()
{//hair
    fill(0);
    arc ( gameChar_x,gameChar_y-56,22,22,PI,PI);
    fill(0);
    ellipse(gameChar_x-8,gameChar_y-46,8,8);
    ellipse(gameChar_x+8,gameChar_y-46,8,8);
    
    //skin
    fill(239,214,189);
    rect(gameChar_x-11,gameChar_y-60,22,15,5,5,40,40);
    rect(gameChar_x-2.5,gameChar_y-50,5,7);
    //hand
    beginShape();
    vertex(gameChar_x-9,gameChar_y-35);
    vertex(gameChar_x-9,gameChar_y-35);
    vertex(gameChar_x-12,gameChar_y-28);
    vertex(gameChar_x-9,gameChar_y-28);
    vertex(gameChar_x-6,gameChar_y-35);
    vertex(gameChar_x-6,gameChar_y-35);
    endShape(CLOSE);
    
    beginShape();
    vertex(gameChar_x+6,gameChar_y-35);
    vertex(gameChar_x+6,gameChar_y-35);
    vertex(gameChar_x+9,gameChar_y-28);
    vertex(gameChar_x+12,gameChar_y-28);
    vertex(gameChar_x+9,gameChar_y-35);
    vertex(gameChar_x+9,gameChar_y-35);
    endShape(CLOSE);
    

    //hand
    beginShape();
    vertex(gameChar_x-9,gameChar_y-35);
    vertex(gameChar_x-9,gameChar_y-35);
    vertex(gameChar_x-12,gameChar_y-28);
    vertex(gameChar_x-9,gameChar_y-28);
    vertex(gameChar_x-6,gameChar_y-35);
    vertex(gameChar_x-6,gameChar_y-35);
    endShape(CLOSE);
    
    beginShape();
    vertex(gameChar_x+6,gameChar_y-35);
    vertex(gameChar_x+6,gameChar_y-35);
    vertex(gameChar_x+9,gameChar_y-28);
    vertex(gameChar_x+12,gameChar_y-28);
    vertex(gameChar_x+9,gameChar_y-35);
    vertex(gameChar_x+9,gameChar_y-35);
    endShape(CLOSE);
    
    //yellow shirt
    fill(233,216,57);
    rect(gameChar_x-5.5,gameChar_y-43,11.5,8);
    beginShape();
    curveVertex(gameChar_x-5.5,gameChar_y-43);
    curveVertex(gameChar_x-5.5,gameChar_y-43);
    curveVertex(gameChar_x-5.5,gameChar_y-35);
    curveVertex(gameChar_x-10,gameChar_y-35);
    curveVertex(gameChar_x-10,gameChar_y-35);
    endShape(CLOSE);
    beginShape();
    curveVertex(gameChar_x+6,gameChar_y-43);
    curveVertex(gameChar_x+6,gameChar_y-43);
    curveVertex(gameChar_x+6,gameChar_y-35);
    curveVertex(gameChar_x+10.5,gameChar_y-35);
    curveVertex(gameChar_x+10.5,gameChar_y-35);
    endShape(CLOSE);
    
    //orange dress
    fill(233,145,57);
    rect(gameChar_x-5.5,gameChar_y-43,2,8);
    rect(gameChar_x+4,gameChar_y-43,2,8);
    rect(gameChar_x-5.5,gameChar_y-37,11.5,8);
   
    beginShape();
    curveVertex(gameChar_x-5.5,gameChar_y-29);
    curveVertex(gameChar_x-5.5,gameChar_y-29);
    curveVertex(gameChar_x-12,gameChar_y-20);
    curveVertex(gameChar_x+12,gameChar_y-20);   curveVertex(gameChar_x+6.5,gameChar_y-29);
    curveVertex(gameChar_x+6.5,gameChar_y-29);
    endShape(CLOSE);
    
    // leg skin
    fill(239,214,189);
    rect(gameChar_x-4,gameChar_y-19,3,8,0,0,2,2);
    rect(gameChar_x+1,gameChar_y-19,3,8,0,0,2,2);
    
     //socks
    fill(193,186,178);
    rect(gameChar_x-4.5,gameChar_y-15,4,8);
    rect(gameChar_x+0.5,gameChar_y-15,4,8);
    
    //shoes
    fill(0);
    rect(gameChar_x-4.5,gameChar_y-7,4,3);
    rect(gameChar_x+0.5,gameChar_y-7,4,3);
    
    // eyes
    fill(255);
    beginShape();
    vertex(gameChar_x-8,gameChar_y-55);
    bezierVertex(gameChar_x-6,gameChar_y-58,gameChar_x-4,gameChar_y-58,gameChar_x-2,gameChar_y-54);
    endShape(CLOSE);
    beginShape();
    vertex(gameChar_x-8,gameChar_y-56);
    bezierVertex(gameChar_x-6,gameChar_y-53,gameChar_x-4,gameChar_y-53,gameChar_x-2,gameChar_y-54);
    endShape(CLOSE);
    
    beginShape();
    vertex(gameChar_x+1,gameChar_y-54);
    bezierVertex(gameChar_x+3,gameChar_y-58,gameChar_x+5,gameChar_y-58,gameChar_x+7,gameChar_y-55);
    endShape(CLOSE);
    beginShape();
    vertex(gameChar_x+1,gameChar_y-55);
    bezierVertex(gameChar_x+3,gameChar_y-53,gameChar_x+5,gameChar_y-53,gameChar_x+7,gameChar_y-55);
    endShape(CLOSE);

    fill(0);
    ellipse(gameChar_x-5,gameChar_y-55.5,2.5,2.5);
    ellipse(gameChar_x+4,gameChar_y-55.5,2.5,2.5);
    
    stroke(233,61,61);
    line(gameChar_x-2,gameChar_y-50,gameChar_x,gameChar_y-50);
}


function drawCanyons (){
    for (var i =0; i<canyons.length; i++){
        var canyon = canyons [i];
        drawCanyon(canyon);
    }
}

function drawCanyon(canyon){

    noStroke();
    //draw canyon
    //background sky
    fill(100, 155, 255);
    rect(canyon.x_pos,floorPos_y,canyon.width-40,48);
    rect(canyon.x_pos-5,canyon.y_pos+347,canyon.width-90,32);

        
    fill(129,62,36);
    rect(canyon.x_pos-30,canyon.y_pos+347,canyon.width-75,144);
    rect(canyon.x_pos+60,canyon.y_pos+347,canyon.width-75,144);

    
    //water canyon
    fill(152, 235, 222);
    rect(canyon.x_pos-5,canyon.y_pos+380,canyon.width-35,116);

    
    fill(102, 209, 198);
    rect(canyon.x_pos+60,canyon.y_pos+380,canyon.width-75,311);

    
    //darker floor green
    fill(0, 123, 0);
    rect(canyon.x_pos+53,floorPos_y,canyon.width-68,15);

}



function checkIfGameCharIsOverCanyons(){
    for (var i = 0; i<canyons.length; i++){
        var canyon = canyons [i];
        checkIfGameCharIsOverCanyon(canyon);
    }
}

function checkIfGameCharIsOverCanyon(canyon){
    //check if game character is on the ground
    var cond1 = gameChar_y == floorPos_y;
    
    //check if game character is within the width of canyon
    var cond2 = gameChar_world_x-5.5-(gameChar_width-11)/2>canyon.x_pos+5;
    var cond3 = (gameChar_world_x-5.5)+(gameChar_width-11)/2<(canyon.x_pos+5+canyon.width-45);
    
    // all three conditions true, game character fall to the canyon
    if (cond1==true && cond2==true && cond3== true){
        isPlummeting = true;
    }
}




function checkIsGameOver(){
    var gameOver = false;
    
    if (lives<1 || flagpole.isReached){
        gameOver = true;
    }
    return gameOver;
}


// flagpole rendering
function renderFlagPole()
{
    // draw flagpole when it is not reached 
    push();
    strokeWeight(5);
    stroke(182, 184, 173);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos,floorPos_y-250);
    stroke(139, 140, 132);
    line(flagpole.x_pos-3, floorPos_y, flagpole.x_pos-3,floorPos_y-250);
    
    fill(0,0,0);
    noStroke();
    if(flagpole.isReached)
    {
    triangle(flagpole.x_pos,floorPos_y-250,flagpole.x_pos,floorPos_y-190,flagpole.x_pos+80,floorPos_y-220);
    strokeWeight(2);
    stroke(255,255,255);
    ellipse(flagpole.x_pos+13,floorPos_y-220, 13,13);
    triangle(flagpole.x_pos+26,floorPos_y-215, flagpole.x_pos+31,floorPos_y-225,flagpole.x_pos+36,floorPos_y-215 );
    rect(flagpole.x_pos+43,floorPos_y-225,10,10);

    }
    
    // draw flagpole when it is reached 
    else
    {
    triangle(flagpole.x_pos,floorPos_y-60,flagpole.x_pos,floorPos_y,flagpole.x_pos+80,floorPos_y-30)
    }
    pop();
    
}

//check flagpole if it is reached 
function checkFlagPole(){
    var d = abs(gameChar_world_x - flagpole.x_pos);
    
    if (d<15)
        {
            flagpole.isReached = true;
        }
}

//check player die
function checkPlayerDie(){
    //if game character y position is more than the height and hit by the enmey, lives reduced by 1. 
    if (gameChar_y>height || hitByEnemy){
        lives-=1;
        //if lives is more than 0, game is start over.
        if(lives>0)
            {
                startGame();
            }
    }
}


//check if the game character is in coin collectable range
function checkIfGameCharInCollectablesRange(){
    for(var i = 0; i < collectables.length; i++){
        var collectable = collectables[i];
        if (collectable.isFound == false){
        checkIfGameCharInCollectableRange(collectable);
        }
    }
}

//if the distance of game character position x and y and coin position x and y is less than 20, coin is collected and game score increase by 1
function checkIfGameCharInCollectableRange(collectable){
    var d = dist(gameChar_world_x,gameChar_y,collectable.x,collectable.y+27);
    if(d<20){
        collectable.isFound=true;
        game_score += 1;
    }
}


//draw coin
function drawCollectables(){
    for (var i = 0; i<collectables.length; i++){
        var collectable = collectables[i];
        drawCollectable(collectable);
    }
}

function drawCollectable(collectable){
    if(collectable.isFound==false){

    noStroke();
    fill(245, 234, 20);
    ellipse(collectable.x,
            collectable.y,
            50-35,
            50-20);
        

    
    stroke(181, 155, 71);
    strokeWeight(4);
    line(collectable.line_x+50,
         collectable.line_y+397,
         collectable.line_x+50,
         collectable.line_y+412);
        
  
    };
}



function drawTrees(){
    // Draw trees.
    for(var i = 0; i < trees_x.length; i++)
    {
    fill(138,98,74);
    rect(trees_x[i].x1,trees_x[i].y1,18,42);
        
    fill(89, 73, 39);

    triangle(trees_x[i].x1,trees_x[i].y1,trees_x[i].x1+18,floorPos_y-42,trees_x[i].size,floorPos_y-17);
    
    
    fill(63,111,33);
    triangle(trees_x[i].x1+9,trees_x[i].y1-35,trees_x[i].x1-22,floorPos_y-42,trees_x[i].size+40,floorPos_y-42);
    
    fill(73,133,46);
    triangle(trees_x[i].x1+9,trees_x[i].y1-50,trees_x[i].x1-22,floorPos_y-57,trees_x[i].size+40,floorPos_y-57);
    
    fill(81,152,57);
    triangle(trees_x[i].x1+9,trees_x[i].y1-65,trees_x[i].x1-22,floorPos_y-72,trees_x[i].size+40,floorPos_y-72);
    };
}

function drawClouds(){
for(var i = 0; i < clouds.length; i++)
    {
    //draw cloud
    //grey cloud
    fill(192, 196, 188);
    ellipse(clouds[i].grey_midX,
            clouds[i].grey_midY,
            clouds[i].size,
            clouds[i].size-10);
    ellipse(clouds[i].grey_midX + 30,
            clouds[i].grey_midY +10,
            clouds[i].size- 20,
            clouds[i].size- 40);
    ellipse(clouds[i].grey_midX - 30,
            clouds[i].grey_midY + 5,
            clouds[i].size- 20,
            clouds[i].size- 35);

    //white clouds
    fill(255,255,255);
    ellipse(clouds[i].grey_midX + 5,
            clouds[i].grey_midY - 8,
            clouds[i].size,
            clouds[i].size-10);
    ellipse(clouds[i].grey_midX + 35,
            clouds[i].grey_midY + 2,
            clouds[i].size - 20,
            clouds[i].size - 40);
    ellipse(clouds[i].grey_midX - 25,
            clouds[i].grey_midY - 3,
            clouds[i].size - 20,
            clouds[i].size - 35);
    

}
}

function drawMountains(){
      //mountain 
    for (var i = 0; i < mountain.length; i++)
    {
    noStroke();
    fill(84, 92, 74,255);
 triangle(mountain[i].x_1,
          mountain[i].y_1 / mountain[i].size,
          mountain[i].x_1 - 140,
          (mountain[i].y_1 + 147), 
          mountain[i].x_1  - 50,
          (mountain[i].y_1 + 147))
          
 fill(110, 117, 102,255);
 triangle(mountain[i].x_1,
          mountain[i].y_1 / mountain[i].size,
          mountain[i].x_1-50,
         (mountain[i].y_1 + 147) ,
          mountain[i].x_1+120,
          (mountain[i].y_1+147));
        
    fill(110, 117, 102,255);
    noStroke();
triangle(mountain[i].x_2-100,
         mountain[i].y_2+250 / mountain[i].size,
         mountain[i].x_2-220,
         mountain[i].y_2+432,
         mountain[i].x_2-150,
         mountain[i].y_2+432);

        
    fill(160, 173, 144,255);
triangle(mountain[i].x_2-100,
         mountain[i].y_2+250  / mountain[i].size,
         mountain[i].x_2-150,
         mountain[i].y_2+432,
         mountain[i].x_2+20,
         mountain[i].y_2+432);


    };
}


function mousePressed(){
    jumpSound.play();
}


function keyPressed()
{
    
     var isGameOver = checkIsGameOver();
    if(isGameOver==true){
        return;
    }
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
    if (keyCode == 37)
        {
        isLeft = true;
        }
    else if (keyCode == 39)
        {
        isRight = true;
        }
    else if (keyCode == 32)
        //ensure that the character only jump when it is touching the ground
        if(gameChar_y>=floorPos_y || onPlatform){
        //console.log("up arrow");
            gameChar_y -= 150;
        }
        }


function keyReleased()
{
      var isGameOver = checkIsGameOver();
    if(isGameOver==true){
        return;
    }
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
    if (keyCode == 37)
        {
        isLeft = false;
        }
    else if (keyCode == 39)
        {
        isRight = false;
        }
    else if (keyCode == 32)
        {
           isFalling = false; 
        }

}
