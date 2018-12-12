let socket

let cagieImage
let warehouseImage
let song

let video
let poseNet
let poses = []

let lastNoseX = 0
let lastNoseY = 0

let newNosePositionX = 0
let newNosePositionY = 0

let lastPD = 0
let newPD = 0

//loads images before canvas
function preload() {
    cagieImage = loadImage('resources/cagie.png')
    warehouseImage = loadImage('resources/warehouse.jpg')
    song = loadSound('resources/thewagecage.mp3')
}

function setup() {
    //hello server!!
    socket = io.connect()
    //todo: mobile support
    createCanvas(640, 480)
    video = createCapture(VIDEO)
    video.size(width, height)
    song.loop()

    // Create a new poseNet method with a single detection
    poseNet = ml5.poseNet(video)
    // This sets up an event that fills the global variable "poses"
    // with an array every time new poses are detected
    poseNet.on('pose', function(results) {
    poses = results
    })
    // Hide the video element, and just show the canvas
    video.hide()
}

function draw() {
    //image(video, 0, 0, width, height)
    image(warehouseImage, 0, 0, width, height)

    //receive and draw cagies
    socket.on('cagie', function(data) {
        drawCagie(data.x, data.y, data.pd)
    })

    // if a pose exists
    if (poses.length > 0) {
    // pull out the first pose
    let pose = poses[0]
    // pull out the pose information
    let poseInformation = pose.pose
    // pull out the keypoints of the pose
    let keypoints = poseInformation.keypoints

    //pull out keypoints
    let noseKeypoint = keypoints[0]
    let leftEyeKeypoint = keypoints[1]
    let rightEyeKeypoint = keypoints[2]

    // get the position of that point
    let nosePosition = noseKeypoint.position
    let leftEyePosition = leftEyeKeypoint.position
    let rightEyePosition = rightEyeKeypoint.position

    //let's calculate the scalar distance between eyes
    let pupillaryDistance = dist(leftEyePosition.x, leftEyePosition.y, rightEyePosition.x, rightEyePosition.y)

    // if it's likely to exist, interpolate for a smooth position
    if( noseKeypoint.score > .2) {
        newNosePositionX  = lerp(lastNoseX, nosePosition.x, .3)
        newNosePositionY  = lerp(lastNoseY, nosePosition.y, .3)

        lastNoseX = newNosePositionX
        lastNoseY = newNosePositionY

        newPD = lerp(lastPD, pupillaryDistance, .3)
        lastPD = newPD
    }

    // Draw cagie
    drawCagie(newNosePositionX, newNosePositionY, newPD)
    //send my cagie~
    sendCagie(newNosePositionX, newNosePositionY, newPD)

    }
}

function mousePressed() {
  if (song.isPlaying()) {
    song.pause()
  } else {
    song.play()
  }
}

function drawCagie(x,y,w){
    push()
    imageMode(CENTER)
    image(cagieImage, width - x, y, 2*w, 2*round(w*1.276))
    pop()
}

function sendCagie(xpos,ypos,w) {
    //uncorrected x, y, pupillary distance
    let data = {
        x: xpos,
        y: ypos,
        pd: w
    }
    socket.emit('cagie', data)
}
