let particlecount = 10;
let gravityF = 1; 
let particles_smoke = [];
let particles_spark = [];
let mode = ["BLEND","ADD","HARD_LIGHT","SCREEN","CLOUD"];
let cols = [[255, 23, 29], [115, 129, 255], [23, 255, 144], [255, 0, 255], [0, 255, 255]];
let modeNum =0;
let circleX, circleY;

function preload(){
    //shader = new p5.Shader(renderer, vertSrc, fragSrc);
}
function setup(){
    var canvas = createCanvas(595,842);
    //canvas.parent("sketch");
    frameRate(60);
    noStroke();
    noCursor();
}
function draw(){
    background(0);
    /*circleX =width-mouseX
  circleY=mouseY
  ellipse(circleX, circleY,20,20)
  ellipse(mouseX)*/
    // create particles: 
    if (mouseIsPressed && mouseButton == LEFT){
        if (mouseButton == LEFT){
            console.log("clicked");
            // generate smoke
            for (let i=0; i<5;i++){
            let p = new Particle_Smoke(cols[modeNum][0], cols[modeNum][1], cols[modeNum][2]);
            particles_smoke.push(p);
            }
            
            if (modeNum != 4){
            // generate spark
            for (let i=0; i<10;i++){
                let p = new Particle_Spark(cols[modeNum][0], cols[modeNum][1], cols[modeNum][2]);
                particles_spark.push(p);
            }
        }
        }
    }
    console.log(particles_spark.length+" "+particles_smoke.length);

    // move and show smoke
    for (let i = particles_smoke.length-1; i > -1; i--){
        particles_smoke[i].display();
        particles_smoke[i].update();
        // remove dead smoke
        if (particles_smoke[i].opacity <= 0){
            particles_smoke.splice(i,1);
        }
    }
    if (modeNum != 4){
    // move and show spark
    for (let i = particles_spark.length-1; i > -1; i--){
        particles_spark[i].display();
        particles_spark[i].update();
        // remove dead spark
        if (particles_spark[i].lifespan <= 0){
            particles_spark.splice(i,1);
        }
    }
    }

    // show instruction
    instruction();
}
class Particle_Smoke {
    constructor(r1, g1, b1){
        // physics
        this.x = mouseX;
        this.y = mouseY;
        this.xv = random(-1,1)*0.8;
        this.yv = random(-1,1)*0.8;
        if (modeNum != 4){
        // style
        this.r = r1;
        this.g = g1;
        this.b = b1;
        this.opacity = 10;
        this.radius = 10;
        this.gravity = 0.01;
        } else if (modeNum == 4){
        // style
        this.r = r1;
        this.g = g1;
        this.b = b1;
        this.opacity = 30;
        this.radius = 10;
        this.gravity = 0.0;
        }
    }
    display(){
        fill(this.r, this.g, this.b, this.opacity);
        ellipse(this.x,this.y, this.radius);
    }
    update(){
        // style
        this.opacity -= 0.1;
        this.radius += 0.4;
        // gravity
        this.yv += this.gravity;
        // movement 
        this.x += this.xv;
        this.y += this.yv;
    }
}

class Particle_Spark {
    constructor(r1, g1, b1){
        // physics
        this.x = mouseX;
        this.y = mouseY;
        this.xv = random(-1,1)*0.5;
        this.yv = random(-1,1)*0.5;
        // style
        this.r = r1;
        this.g = g1;
        this.b = b1;
        this.lifespan = int(random(10,150));
        this.radius = random(1,3);
        this.weight = random();
        if (this.weight<0.8){
            this.gravity = 0.003;
        } else {
            this.gravity = 0.02;
        }
    }
    display(){
        //beginShape();
        fill(this.r, this.g, this.b, this.opacity);
        ellipse(this.x,this.y, this.radius);
        //endShape();
    }
    update(){
        // style
        this.opacity = random(0,255);
        this.lifespan--;
       //this.radius += 0.4;
        // gravity]
        this.yv += this.gravity;
        // movement 
        this.x += this.xv;
        this.y += this.yv;
    }
}




function instruction(){
    fill(255);
    textSize(12);
  text('S = SAVE', 20,30);
  text('Key 1,2,3,4 = Brush and Color Change', 90,30);
}



function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}
function keyPressed(){
    if (keyCode == 83){
        saveCanvas();
    } else {
      if (key>=0 && key<=4) {
      }
        
      /*
      // increase mode index
      if (modeNum >= mode.length-1){
          modeNum=0;
      } else {
          modeNum++;
      }
      */

      //let mode = ["BLEND","ADD","HARD_LIGHT","SCREEN","SMOKE"];
      if (key==0){
        modeNum=key;
          blendMode(BLEND);
      } else if (key ==1){
        modeNum=1;
          fill(0);
          rect(10,10,220,220);
          blendMode(ADD);
      } else if (key ==2){
        modeNum=2;
          fill(0);
          rect(10,10,220,220);
          blendMode(HARD_LIGHT);
      } else if (key ==3){
        modeNum=3;
          fill(0);
          rect(10,10,220,220);
          blendMode(SCREEN);
      } else if (key ==4){
        modeNum=4;
          blendMode(BLEND);
      }

    }
}