import { Server as HttpServer } from "http"
import { Server, Socket } from "socket.io";




export function startSocketConnection(_httpServer: HttpServer) {
    const io = new Server(_httpServer)
    io.on("connection", (socket: Socket) => {
        // ...
        console.log('socket connected');
    });
}