


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255, 219, 172);
 
  // eyes
  square(280, 92, 60);
  circle(120, 125, 60)
  
  // pupil
  fill('black')
  circle(120, 125, 30)
  square(300, 110, 30)
  
  // nose
  triangle(179, 230, 200, 182, 233, 230)
  
  // mouth
  line(124, 305, 320, 305)
  
  // head
  point(81, 240);
  point(80, 230)
  point(85, 234)
  point(72, 234)
  point(72, 245)
  point(92, 242)
  point(322,222)
  point(333,219)
  point(340, 225)
  point(329, 229)
  point(336, 230)
  text("Abstract Me",180, 50)
  text("~Terrell Perez", 320, 390)
  
}
