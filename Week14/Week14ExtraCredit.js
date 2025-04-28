// Define a Shape class
class Shape {
    constructor(x, y, w, h, col) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.col = col;
    }
  
    // Display function to show the shape
    display() {
      fill(this.col);
      stroke(0);
      strokeWeight(2);
      rect(this.x, this.y, this.w, this.h);
    }
  }
  
  // Create three objects
  let shape1;
  let shape2;
  let shape3;
  
  function setup() {
    createCanvas(800, 600);
    
    // Initialize the shapes with different values
    shape1 = new Shape(100, 150, 60, 90, color(255, 0, 0)); // Red
    shape2 = new Shape(300, 250, 100, 50, color(0, 255, 0)); // Green
    shape3 = new Shape(500, 100, 80, 80, color(0, 0, 255)); // Blue
  }
  
  function draw() {
    background(220);
    
    // Call the display function for each shape
    shape1.display();
    shape2.display();
    shape3.display();
  }
  