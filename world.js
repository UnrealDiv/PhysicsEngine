
export class World{
    constructor(gravity,resistance){
        this.gravity = gravity;
        this.resistance = resistance;
        this.objects = [];
    }

    enableGravity(){
        let gravityVector = createVector(0,this.gravity);
        for(let obj in this.objects){
            this.objects[obj].applyForce(gravityVector);
        }      
    }
    addWind(windVal){
        let windVector = createVector(windVal,0);
        for(let obj in this.objects){
            this.objects[obj].applyForce(windVector);
        }   
    }

    show(){
        for(let i in this.objects){
            this.objects[i].show();
            this.objects[i].update();
        }
    }
    addObject(obj){
       return this.objects.push(obj);
    }
    showObj(){
        for(let i in this.objects){
            console.log(this.objects[i]);
        }
    }
}