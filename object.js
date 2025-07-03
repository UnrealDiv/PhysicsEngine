
export class Object {
    constructor(x,y,w){
        this.width = w;
        this.height = w;
        this.mass = 1;
        this.position = createVector(x,y);
        this.velocity = createVector(0,0);
        this.acceleration = createVector(0,0);
    }
    show(){
        fill(220);
        ellipse(this.position.x,this.position.y,this.width,this.height);
    }
    update(){
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0); 
    }
    applyForce(force){
        let fx = force.x/this.mass;
        let fy = force.y/this.mass;
        this.acceleration.x += fx;
        this.acceleration.y += fy;
    }
}