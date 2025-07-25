import { World } from "./world.js";
import { Object } from "./object.js";



let world;

let massSlider;
let massSliderValue = 1;

let gravitySlider ;
let bounceSlider;

let intialVelocitySlider;

let windSlider;

let simulationActive = false;
export let bounceSound;

document.getElementById("continueBtn").addEventListener("click", () => {
  document.querySelector(".overlay").style.display = "none";
  simulationActive = true;
});

function preload() {
  bounceSound = loadSound('ballSound1.wav',
    () => console.log("Sound loaded"),
    (err) => console.error("Failed to load sound:", err)
  );
}

function drawWind(x, y, len) {
  beginShape();
  for (let i = 0; i < len; i++) {
    let px = x + i;
    let py;
    if(windSlider.value() > 0){
       py = y + sin((i + frameCount * 0.2) * 0.1) * 5;
    }else{
       py = y + sin((i*-1 + frameCount * 0.2) * 0.1) * 5;
    }
    
    vertex(px, py);
  }
  endShape();
}

let windCheckBox ;
let resetCheckBox;

export let shapeSelector;
let windLines = [];
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);  
  

  
  // Create multiple wind lines
  for (let i = 0; i < 5; i++) {
    windLines.push({
      x: random(-200, 0),   // Start off-screen
      y: 100 + i * 80,      // Vertical position
      speed: random(1, 3),  // Different speeds
      length: random(60, 120)
    });
  }



  frameRate(120);
  world = new World(0.2, 0);

  // Create a div to hold all sliders responsively
  const sliderContainer = createDiv().class('slider-group');

  windSlider = createSlider(-1, 1, 0.2, 0.2).parent(sliderContainer);
  intialVelocitySlider = createSlider(-30, 30, 5, 1).parent(sliderContainer);
  gravitySlider = createSlider(0, 1, 0.2, 0.05).parent(sliderContainer);
  bounceSlider = createSlider(0, 1, 0.8, 1).parent(sliderContainer);
  massSlider = createSlider(2, 100, 5, 1).parent(sliderContainer);
  
  windCheckBox = createCheckbox("Wind", false).parent(sliderContainer).style('color', 'white').style('font-size', '20px').style('transform-origin', 'left').style('transform', 'scale(1.2)');
  resetCheckBox = createCheckbox("Reset", false).parent(sliderContainer).style('color', 'white').style('font-size', '20px').style('transform', 'scale(1.5)')
  .style('transform-origin', 'left');
  // shapeSelector = createSelect().parent(sliderContainer);
  // shapeSelector.option('ball');
  // shapeSelector.option('rect');
  // shapeSelector.option('triangle');
}


function mouseClicked() {

  if (!simulationActive) return;

  // let selectedShape = shapeSelector.value();

  if((mouseY > 50) ){
  let newObject = new Object(mouseX,mouseY,20,20,"ball");
  newObject.mass = massSlider.value();
  newObject.id = world.objects.length;
  newObject.velocity.x = intialVelocitySlider.value();
  world.addObject(newObject);
  }




}
function draw() {
  background(20);
  // world.addWind(-0.1);

  world.show();
  world.checkBounds();
  world.enableGravity();
  world.gravity = gravitySlider.value();
  world.restitution = bounceSlider.value();
  
  if (windowWidth > 768) { // Only display text on wider screens (PC/tablets)
    fill(220);
    textSize(20);
    text("Gravity: " + gravitySlider.value(), windowWidth - windowWidth*0.68, 50);
    text("Restitution:" + " " + bounceSlider.value(), windowWidth - windowWidth*0.53, 50);
    text("Mass: " + massSlider.value(), windowWidth - windowWidth*0.36, 50);
    text("Initial Velocity: " + intialVelocitySlider.value(), windowWidth - windowWidth*0.84, 50);
    text("Wind velocity: " + windSlider.value(), windowWidth -windowWidth*.99, 50);
    // text("Enable Wind", windowWidth - windowWidth*0.15, 50);
  }else{
   fill(255);
  textSize(20);
  textAlign(LEFT);
  let yStart = 200;
  text("Gravity: " + gravitySlider.value(), 20, yStart);
  text("Mass: " + massSlider.value(), 20, yStart + 30);
  text("Velocity: " + intialVelocitySlider.value(), 20, yStart + 60);
  text("Wind: " + windSlider.value(), 20, yStart + 90);
  text("Restitution: " + bounceSlider.value(), 20, yStart -30);
  }

 
  
    if (windCheckBox.checked()) {
      world.addWind(windSlider.value());
      
     for (let line of windLines) {
    line.x += windSlider.value()*3;

    // Draw the wind gust as a straight or wavy line
    if(windSlider.value() != 0){
      drawWind(line.x, line.y, line.length);
    }
    

    // Reset when off screen
    if (line.x > width + 50 && windSlider.value() >0) {
      line.x = random(-200, -100);
      line.y = random(50, height - 50);
      line.speed = random(1, 3);
      line.length = random(60, 120);
    }else if(line.x < -50 && windSlider.value() <0){
      line.x = random(width+100, width+200);
      line.y = random(50, height - 50);
      line.speed = random(1, 3);
      line.length = random(60, 120);
    }
  }
  } 
  if(resetCheckBox.checked()){
    resetCheckBox.checked(false);
    location.reload();
  }
}
window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;
window.preload = preload;