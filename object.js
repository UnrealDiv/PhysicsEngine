import { bounceSound } from "./sketch.js";

export class Object {
  constructor(x,y,w,h,type) {
    this.id ;
    this.width = w;
    this.height = h;
    this.mass = 2;
    this.type = type;
    this.soundCooldown = 0; 
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.color = {r:Math.random()*256+10,g:Math.random()*256+10,b:Math.random()*256+10};
  }

  show() {
    stroke(0);
    // noStroke();
    fill(this.color.r,this.color.g,this.color.b);
    if(this.type == "ball"){
        ellipse(this.position.x, this.position.y, this.width, this.height);
    }else if(this.type == "rect"){
        rectMode(CENTER);
        rect(this.position.x, this.position.y, this.width, this.height);
    }
  }
makeSound() {
  if (this.soundCooldown <= 0 && bounceSound && bounceSound.isLoaded()) {
    bounceSound.setVolume(random(0.3, 0.9));
    bounceSound.rate(random(0.9, 1.1));
    bounceSound.play();
    this.soundCooldown = 40; 
  }
}

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
     if (this.soundCooldown > 0) this.soundCooldown--;
  }

  applyForce(force) {
    let fx = force.x / this.mass;
    let fy = force.y / this.mass;
    this.acceleration.x += fx;
    this.acceleration.y += fy;
  }
}
