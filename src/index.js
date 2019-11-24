import express from "express"
import { createServer } from 'http';
import socket from 'socket.io';

// import bodyParser from "body-parser"
// import mongoose from "mongoose"
// import cors from 'cors'

// import TestController from "./controller/TestController"
// const Test = new TestController()

const app = express()  
const http = createServer(app)
const io = socket(http);

// app.use(cors())
// app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.json())

// mongoose.connect("mongodb://localhost/chat")

// app.get("/test",Test.index)

app.get('/', function(req, res){
  res.send('ok');
});

io.on('connection', function(socket){

  socket.broadcast.emit('userConnected', {
    data : `userConnected ${socket.id}`
  })  

  socket.on('disconnect', function(){
    socket.broadcast.emit('userDisconnected', {
      data : `disconected ${socket.id}`
    })
  });

  socket.on('chatMessage', function (msg) {
    console.log(`client say "${msg}"`)

    io.emit('serverMessage',msg);
  })
});

http.listen(3333,() => {console.log("server it`s work!")})