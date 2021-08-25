scoreleftw = 0;
scorerightw = 0;

leftwristX="";
leftwristy="";

rightwristx="";
rightwristy="";

song="";

function preload(){
song = loadSound('music.mp3');
}

function setup(){
canvas = createCanvas(600, 500);
canvas.center();

webcam = createCapture(VIDEO);
webcam.hide();
poseNet = ml5.poseNet(webcam,modelLoaded);

poseNet.on('pose',gotPoses);
}

function gotPoses(results){
if(results.length>0){

console.log(results);

scoreleftw = results[0].pose.keypoints[9].score;
console.log("scoreLeftWrist =" + scoreleftw);

scorerightw = results[0].pose.keypoints[10].score;
console.log("scorerightWrist =" + scorerightw);


leftwristx = results[0].pose.leftWrist.x;
leftwristy = results[0].pose.leftWrist.y;
console.log("left wrist x" + leftwristx + "left wrist y" + leftwristy);

rightwristx = results[0].pose.rightWrist.x;
rightwristy = results[0].pose.rightWrist.y;
console.log("right wrist x" + rightwristx + "right wrist y" + rightwristy);

}
}

function modelLoaded(){
console.log("modelLoaded");
}

function draw(){
image(webcam,0,0,600,500);

if(scorerightw>0.2){
fill("#00FF00");
stroke("#00FF00");
circle(rightwristx,rightwristy,20);
    
if(rightwristy >0 && rightwristy <= 100){
document.getElementById('speed').innerHTML = "speed = 0.5x";

song.rate(0.5);
}
else if(rightwristy >100 && rightwristy <= 200){
    document.getElementById('speed').innerHTML = "speed = 1x";
    
    song.rate(1);
    }
else if(rightwristy >200 && rightwristy <= 300){
        document.getElementById('speed').innerHTML = "speed = 1.5x";
        
        song.rate(1.5);
        }        
else if(rightwristy >300 && rightwristy <= 400){
            document.getElementById('speed').innerHTML = "speed = 2x";
            
            song.rate(2);
            }    
else if(rightwristy >400 && rightwristy <= 500){
                document.getElementById('speed').innerHTML = "speed = 2.5x";
                
                song.rate(2.5);
                }      
}




if(scoreleftw > 0.2){

fill("#0000FF");
stroke("#0000FF");

circle(leftwristx,leftwristy,20);

inNumberleftwristy = Number(leftwristy);
removedec = floor(inNumberleftwristy);
vol = removedec/500;
console.log("Volume =" + vol);
song.setVolume(vol);
}
}
function play(){
song.play();

song.setVolume(1);
song.rate(1);

}


