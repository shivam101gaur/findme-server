import { Server as HttpServer } from "http"
import { Server, Socket } from "socket.io";
import { addMessageToWorld } from "../controllers/chat.controller";


export function startSocketConnection(_httpServer: HttpServer) {
    const io = new Server(_httpServer)
    io.on("connection", (socket: Socket) => {

        console.log('User has connected');
        
        socket.on('msgfromuser',(letter)=>{
            console.log(letter.message)
            addMessageToWorld(letter.worldId,letter.message)
            socket.emit("msgfromserver",{
                content:'hello from backend to = > '+letter.worldId
            })
        })

    });
}

