
let socket

function setup() {
    createCanvas(640, 480)
    background(51)
    socket = io.connect('http://localhost:3000')
}

// function mouseDragged(){
//     console.log(mouseX + ', '+ mouseY)
//
// }

function draw() {
    noStroke()
    ellipse(mouseX, mouseY, 40, 40)
}

//new user constructor, associated array of poses
//loads video
//initializes pose (nose location)
