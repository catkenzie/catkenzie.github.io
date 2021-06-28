        
// create an array to store the circles
Circle [] theCircles = new Circle[100];

int maxCircles = 100;
int numCircles = 0;
int currentCircle = 0;
color [] colorScheme = {#5680B6, #0A4590, #5D2292, #A45CB8, #CF83E5, #912C67, #EC3BEA, #1F7FAF, #AF1F87, #B85364, #5452FC };


void setup() 
{
  // general setup
  size (500,500);
  frameRate(40);
  smooth();
}

void draw() 
{
  //black background
  background(0);

  noStroke();
  fill(255,0,0, 255);
  circle(100, 100, 20);
  
  if (frameCount%10 == 0)  {
    theCircles[ currentCircle ] = new Circle(this, mouseX, mouseY);
    currentCircle++;
    
    if (numCircles < theCircles.length) {
      numCircles++;
    }
    
    if (currentCircle >= theCircles.length)
    {
      currentCircle = 0;
    }
  }
  
  for (int i = 0; i < numCircles; i++)
  {
    theCircles[i].fade();
    theCircles[i].move();
    theCircles[i].display();
  }
}



class Circle
{
  // instance vars
  private float x;
  private float y;
  private float size;
  private float red;  
  private float green;
  private float blue;
  private float colorFill;
  
  private float alpha;
  private float speedX;
  private float speedY;
  
  // store a reference to the canvas for html
  private PApplet canvas;
  
  Circle(PApplet canvas, float x, float y)
  {
    // store a ref to the canvas
    this.canvas = canvas;
  
    // store x and y
    this.x = x;
    this.y = y;
    
    // randomize our size
    size = this.canvas.random(5,20);
    
    // randomize our color
    
    colorFill = this.canvas.random(0,11);
    alpha = this.canvas.random(100,255);
    
    // randomize our speed
    speedX = this.canvas.random(-2, 2);
    speedY = this.canvas.random(-2, 2);
  }
  
  // move our ball
  void move()
  {
    // update position based on speed
    x += speedX;
    y += speedY;
    
    // bounce back if it hits the edge
    if (x > width)
    {
      x = width;
      speedX *= -1;
    }
    if (y > height)
    {
      y = height;
      speedY *= -1;
    }
    if (x < 0)
    {
      x = 0;
      speedX *= -1;
    }
    if (y < 0)
    {
      y = 0;
      speedY *= -1;
    }
  }
  
  // display the cirlces
  void display()
  {
    color htmlColor = colorScheme[floor(colorFill)];
    // use our reference to the canvas to draw our ball
    this.canvas.noStroke();
    this.canvas.fill(htmlColor, alpha);
    this.canvas.circle(x,  y, size);
  }
  
  // fade method - allows a ball to fade out of existence
  void fade()
  {
    if (alpha > 0)
    {
      alpha -= 2;
    }
    else
    {
      alpha = 0;
    }
  }
  
}
