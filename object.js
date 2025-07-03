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
    fill(this.color.r,this.color.g,this.color.b);
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
