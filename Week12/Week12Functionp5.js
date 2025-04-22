// Player
let player;
let playerSize = 20;

// Obstacles
let obstacles = [];

// Exit
let exitZone;

//function for setup
function setup() {
  createCanvas(600, 400);
  createPlayer();
  createObstacles();
  createExit();
}

//drawing function
function draw() {
  background(220);
  drawBorders();
  movePlayer();
  drawPlayer();
  drawObstacles();
  moveObstacles();
  drawExit();
  checkWin();
}

//create player 
function createPlayer() {
  player = {
    x: 50,
    y: height / 2,
    speed: 3
  };
}

//draw player
function drawPlayer() {
  fill(0, 0, 255);
  ellipse(player.x, player.y, playerSize);
}

//mopvement function
function movePlayer() {
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { // Left or 'A'
    player.x -= player.speed;
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // Right or 'D'
    player.x += player.speed;
  }
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) { // Up or 'W'
    player.y -= player.speed;
  }
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) { // Down or 'S'
    player.y += player.speed;
  }
}

//mousepress function
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

//Multiple obstacles
function createObstacles() {
  for (let i = 0; i < 2; i++) {
    obstacles.push(createRandomObstacle());
  }
}

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

//Create obstacle
function drawObstacles() {
  for (let obs of obstacles) {
    fill(obs.color);
    rect(obs.x, obs.y, obs.w, obs.h);
  }
}

//Function to move randomnly/wrap
function moveObstacles() {
  for (let obs of obstacles) {
    if (obs.move) {
      obs.x += obs.xSpeed;
      obs.y += obs.ySpeed;

      // Wrap around screen edges
      if (obs.x > width) obs.x = 0;
      if (obs.x < 0) obs.x = width;
      if (obs.y > height) obs.y = 0;
      if (obs.y < 0) obs.y = height;
    }
  }
}

//Border function
function drawBorders() {
  stroke(0);
  strokeWeight(5);
  noFill();
  rect(0, 0, width, height);
}

//Create exit function
function createExit() {
  exitZone = {
    x: width - 60,
    y: height / 2 - 25,
    w: 50,
    h: 50
  };
}

function drawExit() {
  fill(0, 255, 0);
  stroke(0);
  strokeWeight(3);
  rect(exitZone.x, exitZone.y, exitZone.w, exitZone.h);

  //exitlabel
  noStroke();
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("EXIT", exitZone.x + exitZone.w / 2, exitZone.y + exitZone.h / 2);
}

//winning function
function checkWin() {
  let insideX = player.x > exitZone.x && player.x < exitZone.x + exitZone.w;
  let insideY = player.y > exitZone.y && player.y < exitZone.y + exitZone.h;

  if (insideX && insideY) {
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("You Win!", width / 2, height / 2);
    noLoop(); // Stop the game loop
  }
}
