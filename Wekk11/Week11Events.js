 //Canvas & Player
 let player;
 let playerSize = 20;
 
 //obstacles
 let obstacles = [];
 
 // exit
 let exitZone;
 
 function setup() {
   createCanvas(600, 400); //Canvas
 
    //player.
   player = {
     x: 50,
     y: height / 2,
     speed: 3
   };
 
 //obstacles
   for (let i = 0; i < 2; i++) {
     obstacles.push(createRandomObstacle());
   }
 
      //exit
   exitZone = {
     x: width - 60,
     y: height / 2 - 25,
     w: 50,
     h: 50
   };
 }
 
 function draw() {
   background(220);
 
     // Draw and move player
   fill(0, 0, 255);
   ellipse(player.x, player.y, playerSize);
 
   movePlayer(); //move the player.
 
 // Draw exit.
 fill(0, 255, 0); 
 stroke(0);       
 strokeWeight(3);
 rect(exitZone.x, exitZone.y, exitZone.w, exitZone.h);
 
  //exit text
 noStroke();
 fill(0);
 textSize(16);
 textAlign(CENTER, CENTER);
 text("EXIT", exitZone.x + exitZone.w / 2, exitZone.y + exitZone.h / 2);
 
 //winning the game.
   if (player.x > exitZone.x && player.y > exitZone.y && player.y < exitZone.y + exitZone.h) {
     fill(0);
     textSize(32);
     text("You Win!", width / 2 - 70, height / 2);
     noLoop(); //stop game 
   }
 
   //loop for obstacles
   for (let i = 0; i < obstacles.length; i++) {
     let obs = obstacles[i];
 
     fill(obs.color);
     rect(obs.x, obs.y, obs.w, obs.h);
 
     //only moves the objects that are intented to move
     if (obs.move) {
       obs.x += obs.xSpeed;
       obs.y += obs.ySpeed;
 
       //logic for wrapping around.
       if (obs.x > width) obs.x = 0;
       else if (obs.x < 0) obs.x = width;
       if (obs.y > height) obs.y = 0;
       else if (obs.y < 0) obs.y = height;
     }
   }
 }
 
 // Keyboard controls
 function movePlayer() {
   if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { // A key
     player.x -= player.speed;
   } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // D key
     player.x += player.speed;
   }
 
   if (keyIsDown(UP_ARROW) || keyIsDown(87)) { // W key
     player.y -= player.speed;
   } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) { // S key
     player.y += player.speed;
   }
 }
 
 //adds obsticle when mouse is clicked
 function mousePressed() {
   let newObstacle = {
     x: mouseX,
     y: mouseY,
     w: random(20, 50),
     h: random(20, 50),
     xSpeed: 0,
     ySpeed: 0,
     move: false,
     color: color(random(255), random(255), random(255))
   };
   obstacles.push(newObstacle);
 }
 
 //move objects randomly
 function createRandomObstacle() {
   return {
     x: random(width),
     y: random(height),
     w: random(20, 50),
     h: random(20, 50),
     xSpeed: random(-2, 2),
     ySpeed: random(-2, 2),
     move: true,
     color: color(random(255), random(255), random(255))
   };
 }
 