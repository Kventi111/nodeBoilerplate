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

  socket.join('room 666', () => {
    let rooms = Object.keys(socket.rooms);
    console.log(rooms); // [ <socket.id>, 'room 237' ]
  });

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
    console.log(socket.id)

    io.emit('serverMessage',{
      message : msg,
      nickname : socket.id
    });
  })  

  socket.on('privateMessage', function ({ message,id }) {
    console.log(socket.id)
    console.log(message)
    console.log(id)

    if (id === socket.id) {
      console.log({ id })
      socket.to(id).emit('error', 'Ты пытаешься написать самому себе ????');
    }

    socket.to(id).emit('personalMessage', {
      message,
      nickname : socket.id
    });
  })
});

http.listen(3333,() => {console.log("server it`s work!")})