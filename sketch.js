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


function draw() {
  background(0);
  world.enableGravity();
  world.addWind(0.05);
  world.show();
}
window.setup = setup;
window.draw = draw;
