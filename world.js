

export let massSlider;
export let massSliderValue = 1;

export class World {
  constructor(gravity, friction) {
    this.gravity = gravity;
    this.friction = friction;
    this.restitution = 1 ;
    this.boundary = createVector(window.innerWidth, window.innerHeight);
    this.objects = [];
  }

  checkBounds() {
    for (let obj of this.objects) {

        //for y axis
      if (obj.position.y >= this.boundary.y - obj.height / 2) {
        obj.velocity.y *= -0.8 * (1-1/obj.mass);
        obj.position.y = this.boundary.y - obj.height / 2;
        
        //for friction
        if(obj.velocity.x !=0 && obj.position.y >= this.boundary.y - obj.height / 2){
            obj.velocity.x = obj.velocity.x - obj.velocity.x/4;
        }
      }

      // for x axis
      if (obj.position.x >= this.boundary.x- obj.width/2 || obj.position.x - (obj.width/2)< 0) {
        if(obj.position.x >= this.boundary.x- (obj.width)/2 ){
            obj.position.x = this.boundary.x - (obj.width)/ 2;
        }else if(obj.position.x - (obj.width)/2 <=0){
            obj.position.x = 0+(obj.width)/ 2;
        }
        obj.velocity.x *= -0.8 * (1-1/obj.mass);
      }
    }
   

for (let i = 0; i < this.objects.length; i++) {
  let objA = this.objects[i];

  for (let j = i + 1; j < this.objects.length; j++) {
    let objB = this.objects[j];

    let distance = p5.Vector.dist(objA.position, objB.position);
    let radiusSum = (objA.width + objB.width) / 2;

    if (distance < radiusSum) {
      // --- 1. Collision normal and overlap correction ---
      let normal = p5.Vector.sub(objB.position, objA.position);
      let overlap = radiusSum - distance;
      normal.normalize();

      // Separate objects equally
      let correction = normal.copy().mult(overlap / 2);
      objA.position.sub(correction);
      objB.position.add(correction);
      
      // --- 2. Relative velocity and impulse calculation ---
      let relativeVelocity = p5.Vector.sub(objB.velocity, objA.velocity);
      let speedAlongNormal = relativeVelocity.dot(normal);

      // Skip if already moving apart
      if (speedAlongNormal > 0) continue;

      // Mass support (default = 1 if not defined)
      let m1 = objA.mass || 1;
      let m2 = objB.mass || 1;

      //impulse
      let impulseMagnitude = -(1 + this.restitution) * speedAlongNormal;
      impulseMagnitude /= (1 / m1 + 1 / m2);

      // Apply impulse
      let impulse = normal.copy().mult(impulseMagnitude);
      objA.velocity.sub(p5.Vector.div(impulse, m1));
      objB.velocity.add(p5.Vector.div(impulse, m2));
    }
  }
}
  }

  enableGravity() {
    for (let obj of this.objects) {
      if (obj.position.y + obj.height / 2 >= this.boundary.y && Math.abs(obj.velocity.y) < 0.5) {
        obj.velocity.y = 0;
        obj.position.y = this.boundary.y - obj.height / 2;
      }else {
        obj.acceleration.y += this.gravity; 
      }
    }
  }

  addWind(windVal) {
    let windVector = createVector(windVal, 0);

    
      stroke(255);
      noFill();
      // while(i <=window.innerWidth){

    for (let obj of this.objects) {
      obj.applyForce(windVector);
    }
  }

  show() {
    for (let obj of this.objects) {
      obj.show();
      obj.update();
    }
  }

  addObject(obj) {
    this.objects.push(obj);
  }

  showObj() {
    for (let obj of this.objects) {
      console.log(obj);
    }
  }
}
