//express serves the html and js to the client
const express = require('express')
const app = express()

//create server that listens on port 3000
let server = app.listen(3000)
//serve the www folder!
app.use(express.static('www'))

console.log('server running')

//load sockets into variable and s
let socket = require ('socket.io')
let io = socket(server)

//use function 'on' to handle new function 'newConnection'
io.sockets.on('connection', newConnection)
function newConnection(socket) {
    console.log('new connection: ')
}
