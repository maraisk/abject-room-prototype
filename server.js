//express serves the html and js to the client
const express = require('express')
const app = express()

//create server that listens on port 3000
let server = app.listen(3000)
//serve the www folder!
app.use(express.static('www'))
