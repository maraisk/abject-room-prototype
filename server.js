//express serves the html and js to the client
const express = require('express')
const app = express()

//create server that listens on port 3000
let server = app.listen(80, listen)
function listen() {
    let host = server.address().address
    let port = server.address().port
    console.log('listening at http://' + host + ':' + port)
}
//serve the www folder!
app.use(express.static('www'))

console.log('server running')

//load sockets into variable and s
let io = require('socket.io')(server)

//use function 'on' to handle new function 'newConnection'
io.sockets.on('connection', newConnection)
function newConnection(socket) {
    console.log("say hello to: " + socket.id)

    socket.on('cagie', function(data) {
        //console.log('received a cagie')
        socket.broadcast.emit('cagie', data)
    })

    socket.on('disconnect', function() {
        console.log(socket.id + ' disconnected')
    })
}
