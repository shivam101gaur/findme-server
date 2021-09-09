import chalk from "chalk";
import { Server as HttpServer } from "http"
import { Server, Socket } from "socket.io";
import { IWorld } from "../models/world.model";
import { addMessageToWorld } from "../controllers/chat.controller";


export function startSocketConnection(_httpServer: HttpServer) {
    const io = new Server(_httpServer)
    io.on("connection", (socket: Socket) => {
        
         socket.on("disconnect", (reason) => {
          console.log(chalk.yellow('user disconnected '))
          console.log(reason)
   
        });
        console.log('User has connected');

        socket.on('msgfromuser', (letter) => {

            console.log(letter.message)

            addMessageToWorld(letter.worldId, letter.message).then((result) => {

                console.log(result);
                
                if(letter.worldId==(result as any)._id){

                    socket.broadcast.emit("msgfromserver", (result as any).chat)
                }
                
            }).catch((err) => {
                console.log(chalk.red(err.message));
                socket.emit("msgfromserver", {
                    content: 'could not send message !'
                })
            });


        })

    });


}

