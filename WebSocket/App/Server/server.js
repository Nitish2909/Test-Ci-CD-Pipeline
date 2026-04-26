import express from "express"
import { WebSocketServer } from "ws"
const app = express()

const PORT = 8080

const server = app.listen(PORT,()=>{
    console.log(`Server is Running on ${PORT}`)
})

const wss = new WebSocketServer({server})

wss.on("connection", (ws)=>{
    ws.on("message", (data)=>{
        console.log("Data from Client %s :", data)
        ws.send("Response from server, Hello client")
    })
})


