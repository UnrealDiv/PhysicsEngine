import { World } from "./world.js";
import { Object } from "./object.js";



let world;

let massSlider;
let massSliderValue = 1;

export let shapeSelector;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);  
  world = new World(1,0);
  // let circle1 = new Object(100,100,20,20,"ball");
  // let circle2 = new Object(200,200,20,20,"ball");
 
  massSlider = createSlider(2, 100, 5, 1);
  massSlider.position(window.innerWidth-300, 100);

  shapeSelector = createSelect();
  shapeSelector.position(20, 20);
  shapeSelector.option('ball');
  shapeSelector.option('rect');
  shapeSelector.option('triangle');
  shapeSelector.selected('ellipse');  // default selection
  
  // world.addObject(circle1);
  // world.addObject(circle2);
  // world.addObject(rect1);
}


function mouseClicked() {
  let selectedShape = shapeSelector.value();
  console.log(selectedShape);
  
  let newObject = new Object(mouseX,mouseY,20,20,selectedShape);
  newObject.mass = massSlider.value();
  newObject.id = world.objects.length;
  world.addObject(newObject);
  console.log(world.objects);
  
}
function draw() {
  background(0);
  // world.addWind(-0.1);
  world.show();
  world.checkBounds();
  world.enableGravity();
}
window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;