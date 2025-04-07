// square variables
var x = 200
var y = 92
var diameter = 60

// circle variables, same diameter
var c = 120
var v = 125

// ovement variable
var movement = 10;

// triangle variable
var q = 240
var w = 92
var e = 229
var r = 219

// text variable
var size = 22;
var count = 0;
var sizeDirection = 2;



function setup() {
  createCanvas(400, 400);
  movement = floor(random() * 10) +1
}

function draw() {
  background(255, 219, 172);
  fill('black')
 
  // eyes, moving along the x-axis
  square(x, x, diameter);
  circle(c, v, diameter);
  if(x >= 400 || x <= 0)
  if(c >= 400 || c <= 0)
    {
      movement *=-1;
     }
   {
     x += movement;
     c -= movement;
   }

  function draw() {
  background(255, 219, 172);
  }
  
  // nose, mouth
  triangle(179, 230, 200, 182, 233, 230)
  line(124, 305, 320, 305)
  
  // head

  point(81, q);
  point(80, 230)
  point(85, 234)
  point(72, 234)
  point(72, 245)
  point(w, 242)
  point(322,222)
  point(333,r)
  point(340, 225)
  point(329, e)
  point(336, 230)
  if(w >= 400 || w <= 0)
  if(q >= 400 || q <= 0)
  if(e >= 400 || e <= 0)
  if(r >= 400 || r <= 0)
    {
      movement *=-1;
    }
      q += movement;
      w -= movement;
      r += movement;
      e -= movement;
  textSize(size);
  size+= sizeDirection;
  count++;
  if(count >  5)
    {
      sizeDirection *=-1;
      count = 0;
    }
  text("Abstract Me",180, 50)
  text("~Terrell Perez", 30, 390)
  
}
