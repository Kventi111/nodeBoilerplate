import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from 'cors'

import TestController from "./controller/UserController"
const Test = new TestController()

const app = express()  
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost/chat")

app.get("/test/:id",Test.index)

app.listen(3333,() => {console.log("server it`s work!")})