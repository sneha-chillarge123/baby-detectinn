var sound ="";
var status ="";
var objects=[];

function preload(){
    sound = loadSound("mixit-warning-alarm-buzzer-991.wav");
}

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video= createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function draw(){
    image(video,0,0,380,380);
     if(status != ""){
        r=random(255);
        g = random(255);
        b  =random(255);
        objectDetector.detect(video,gotResult);
    
      for(i=0 ; i < objects.length ; i++){
        document.getElementById("status").innerHTML = "Status: Baby detected";
        percent = floor(objects[i].confidence*100);
        text(objects[i].label+ "  "+ percent+" %", objects[i].x, objects[i].y);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      }
    }
    else{
        sound.play();
        document.getElementById("status").innerHTML = "Status: Baby Not detected";
    }

    
}

function model_loaded(){
    console.log("Model loaded");
    status = true;
}
   

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd',model_loaded);
    document.getElementById("status").innerHTML = "Status: Object Detecting";
    
}

