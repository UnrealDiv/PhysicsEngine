import { World } from "./world.js";
import { Object } from "./object.js";




let world;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);  
  world = new World(1,0);
  let circle1 = new Object(100,100,20,20);
  let circle2 = new Object(200,200,20,20);
 
  world.addObject(circle1);
  world.addObject(circle2);
}


function mouseClicked() {
  let newCircle = new Object(mouseX,mouseY,20,20);
  world.addObject(newCircle);
}
function draw() {
  background(0);
  // world.addWind(0.05);
  world.show();
  world.checkBounds();
  world.enableGravity();

}
window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;