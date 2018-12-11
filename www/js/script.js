
var socket


function setup() {
    createCanvas(640, 480)
    //WHY DOESNT THIS WORK
    //socket = io.connect()

}

// function mouseDragged(){
//     console.log(mouseX + ', '+ mouseY)
//
// }

function draw() {
    noStroke()
    background(51)
    ellipse(mouseX, mouseY, 40, 40)
}

//new user constructor, associated array of poses
//loads video
//initializes pose (nose location)
