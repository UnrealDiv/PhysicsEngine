export class Object {
  constructor(x, y, w) {
    this.width = w;
    this.height = w;
    this.mass = 1;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.color = {r:Math.random()*256,g:Math.random()*256,b:Math.random()*256};
  }

  show() {
    // fill(this.color.r,this.color.g,this.color.b);
    fill(100,200,100);
    console.log(this.color);
    
    ellipse(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force) {
    let fx = force.x / this.mass;
    let fy = force.y / this.mass;
    this.acceleration.x += fx;
    this.acceleration.y += fy;
  }
}

export class World {
  constructor(gravity, resistance) {
    this.gravity = gravity;
    this.resistance = resistance;
    this.boundary = createVector(window.innerWidth, window.innerHeight);
    this.objects = [];
  }

  checkBounds() {
    for (let obj of this.objects) {
      if (obj.position.y >= this.boundary.y - obj.height / 2) {
        obj.velocity.y *= -0.8;
        obj.position.y = this.boundary.y - obj.height / 2;
      }
      if (obj.position.x >= this.boundary.x || obj.position.x < 0) {
        obj.velocity.x *= -0.8;
      }
    }
  }

  enableGravity() {
    for (let obj of this.objects) {
      if (obj.position.y + obj.height / 2 >= this.boundary.y && Math.abs(obj.velocity.y) < 0.5) {
        obj.velocity.y = 0;
        obj.position.y = this.boundary.y - obj.height / 2;
      } else {
        let gravityVector = createVector(0, this.gravity);
        obj.applyForce(gravityVector);
      }
    }
  }

  addWind(windVal) {
    let windVector = createVector(windVal, 0);
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
