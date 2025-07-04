

export class Object {
  constructor(x,y,w,h,type) {
    this.id ;
    this.width = w;
    this.height = h;
    this.mass = 2;
    this.type = type;
    this.position = createVector(x, y);
    this.velocity = createVector(100, 0);
    this.acceleration = createVector(0, 0);
    this.color = {r:Math.random()*256,g:Math.random()*256,b:Math.random()*256};
  }

  show() {
    fill(this.color.r,this.color.g,this.color.b);
    if(this.type == "ball"){
        ellipse(this.position.x, this.position.y, this.width, this.height);
    }else if(this.type == "rect"){
        rectMode(CENTER);
        rect(this.position.x, this.position.y, this.width, this.height);
    }
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
