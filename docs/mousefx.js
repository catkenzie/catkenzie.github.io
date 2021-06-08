var theCircles = new Array(100);
var maxCircles = 100;
var numCircles = 0;
var currentCircle = 0;
var colorScheme = [
  [86, 128, 182], 
  [10, 68, 144], 
  [93, 34, 146], 
  [164, 92, 184],
  [207, 131, 229], 
  [145, 44, 103], 
  [236, 59, 234], 
  [31, 127, 175], 
  [175, 31, 135], 
  [184, 83, 100], 
  [84, 82, 252] 
];

class Circle
{
  constructor( xpos,  ypos)
  {
    // store x and y
    this.x = xpos;
    this.y = ypos;
    
    // randomize our size
    this.size = random(5, 15);
    
    // randomize our color
    
    this.colorFill = random(0,11);
    this.alpha = random(150,255);
    
    // randomize our speed
    this.speedX = random(-1, 1);
    this.speedY = random(-1, 1);

    //make the colors
    this.red = colorScheme[floor(this.colorFill)][0];
    this.green = colorScheme[floor(this.colorFill)][1];
    this.blue = colorScheme[floor(this.colorFill)][2];
  }

  move()  {
    // update position based on speed
    this.x += this.speedX;
    this.y += this.speedY;
    
    // bounce back if it hits the edge
    if (this.x > displayWidth)
    {
      this.x = width;
      this.speedX *= -1;
    }
    if (this.y > displayHeight)
    {
      this.y = height;
      this.speedY *= -1;
    }
    if (this.x < 0)
    {
      this.x = 0;
      this.speedX *= -1;
    }
    if (this.y < 0)
    {
      this.y = 0;
      this.speedY *= -1;
    }
  }
  
  
  // display the cirlces
  display(){
    let ci = floor(this.colorFill);
    this.red = colorScheme[ci][0];
    this.green = colorScheme[ci][1];
    this.blue = colorScheme[ci][2];
 
    noStroke();
    fill(this.red, this.green, this.blue, this.alpha);
    circle(this.x,  this.y, this.size);
  }
  
  // fade method - allows a ball to fade out of existence
  fade(){
    if (this.alpha > 0)
    {
      this.alpha -= 4;
    }
    else
    {
      this.alpha = 0;
    }
  }
  

}

function setup() 
{
  // general setup
  createCanvas(displayWidth,displayHeight);
  frameRate(30);
  smooth();
}

function draw() 
{
  //black background
  background(0); 
  if (frameCount%10 == 0)  {
      theCircles[ currentCircle ] = new Circle(mouseX, mouseY);
      currentCircle++;
    if (numCircles < maxCircles) {
      numCircles++;
    }
    if (currentCircle >= maxCircles)
    {
      currentCircle = 0;
      loop = true;
    }
  }
  
  for (var i = 0; i < numCircles; i++)
  {
    theCircles[i].fade();
    theCircles[i].move();
    theCircles[i].display();
  }
}


