
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

        if(obj.velocity.x !=0 && obj.position.y >= this.boundary.y - obj.height / 2){
            console.log("hi");
            obj.velocity.x = obj.velocity.x - obj.velocity.x/4;
        }

      }
      if (obj.position.x >= this.boundary.x- obj.width/2 || obj.position.x - (obj.width/2)< 0) {
        if(obj.position.x >= this.boundary.x- (obj.width)/2 ){
            obj.position.x = this.boundary.x - (obj.width)/ 2;
        }else if(obj.position.x - (obj.width)/2 <=0){
            obj.position.x = 0+(obj.width)/ 2;
        }
        obj.velocity.x *= -0.8;
      }
    }
  }

  enableGravity() {
    for (let obj of this.objects) {
      if (obj.position.y + obj.height / 2 >= this.boundary.y && Math.abs(obj.velocity.y) < 0.5) {
        obj.velocity.y = 0;
        obj.position.y = this.boundary.y - obj.height / 2;
      }else {
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
