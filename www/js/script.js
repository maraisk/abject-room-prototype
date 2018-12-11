
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

    //update NPCMaker

    //draw NPCs

    //send server my NPCs

    //draw everyone else's NPCs
}

//client-side NPC constructor, associated array of poses
//loads video
//initializes pose (nose location)
let NPCMaker = new function() {

}
