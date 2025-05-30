let obstacles = [];
let addedObstacles = [];
let player;
let exit;
let win = false;

function setup() {
  createCanvas(800, 600);
  
  // Create starting obstacles
  for (let i = 0; i < 5; i++) {
    obstacles.push(new Obstacle(
      random(width), random(height),
      random(30, 60), random(30, 60),
      true
    ));
  }
  
  // Create player
  player = createVector(50, height / 2);
  
  // Create exit
  exit = {
    x: width - 100,
    y: height / 2,
    w: 80,
    h: 80
  };
}

function draw() {
  background(200);

  // Draw and move starting obstacles
  for (let obs of obstacles) {
    obs.move();
    obs.display();
  }

  // Draw and move added obstacles
  for (let obs of addedObstacles) {
    obs.move();
    obs.display();
  }

  // Draw player
  fill(0, 0, 255);
  stroke(0);
  strokeWeight(2);
  ellipse(player.x, player.y, 30, 30);

  // Draw exit
  fill(0, 255, 0);
  stroke(0);
  strokeWeight(4);
  rect(exit.x, exit.y, exit.w, exit.h);

  // Draw exit label
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  text("EXIT", exit.x + exit.w / 2, exit.y + exit.h / 2);

  // Player movement
  if (keyIsDown(LEFT_ARROW)) {
    player.x -= 3;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    player.x += 3;
  }
  if (keyIsDown(UP_ARROW)) {
    player.y -= 3;
  }
  if (keyIsDown(DOWN_ARROW)) {
    player.y += 3;
  }

  // Keep player inside the canvas
  player.x = constrain(player.x, 0, width);
  player.y = constrain(player.y, 0, height);

  // Check win condition (player reaches exit)
  if (
    player.x > exit.x &&
    player.x < exit.x + exit.w &&
    player.y > exit.y &&
    player.y < exit.y + exit.h
  ) {
    win = true;
  }

  if (win) {
    fill(0);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("You Win!", width / 2, height / 2);
    noLoop(); // Stop game
  }
}

function mousePressed() {
  // Add a new moving obstacle where the mouse is clicked
  addedObstacles.push(new Obstacle(
    mouseX, mouseY,
    random(30, 60), random(30, 60),
    true // now they MOVE!
  ));
}

class Obstacle {
  constructor(x, y, w, h, moves) {
    this.pos = createVector(x, y);
    this.w = w;
    this.h = h;
    this.moves = moves;
    this.col = color(random(255), random(255), random(255));
    this.vel = createVector(random(-2, 2), random(-2, 2));
  }

  move() {
    if (this.moves) {
      this.pos.add(this.vel);

      // Wrap fully when off-screen
      if (this.pos.x > width) this.pos.x = -this.w;
      if (this.pos.x + this.w < 0) this.pos.x = width;
      if (this.pos.y > height) this.pos.y = -this.h;
      if (this.pos.y + this.h < 0) this.pos.y = height;
    }
  }

  display() {
    fill(this.col);
    stroke(0);
    strokeWeight(2);
    rect(this.pos.x, this.pos.y, this.w, this.h);
  }
}
