let mySound;



let mic;

var CIRCLE_SIZE = 10;


var circleX = 30;
var circleY = 30;
var radius =  CIRCLE_SIZE;


function preload() {
    soundFormats( 'm4a');
    mySound = loadSound('sample');
  }

function setup(){
    //mySound.play();
    if(confirm("let us use audio")){
        userStartAudio();
    }else{
        console.log("you suck");
    }
    mic = new p5.AudioIn();
    fft = new p5.FFT();
    fft.setInput(mic);
    background(0);
    radius = windowWidth/100 * CIRCLE_SIZE
    circleX = windowWidth/2;
    circleY = windowHeight/2;

    createCanvas(windowWidth,windowHeight);
    
    mic.start();
    
}

function draw(){
    background(0);
    fill(255);
    drawSpectrum();

    
}



function drawSpectrum(){
    let size = map(mic.getLevel(),0,1,radius,radius*3);
    

    let spectrum = fft.analyze();
    
    for (let i = 0; i< spectrum.length; i+=10){
        var rads = 2*Math.PI* (i/spectrum.length);
        let h = map(spectrum[i], 0, 255, radius/1.5, radius*3);
        stroke(255);
        strokeWeight(5);
        line(circleX, circleY, circleX+ h*Math.cos(rads),circleY+ h*Math.sin(rads))
    }
    ellipse(circleX,circleY,size,size);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    radius = windowWidth/100 * CIRCLE_SIZE
    circleX = windowWidth/2;
    circleY = windowHeight/2;
    console.log("oof");
}
