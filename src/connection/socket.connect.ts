import chalk from "chalk";
import { Server as HttpServer } from "http"
import { Server, Socket } from "socket.io";
import { addMessageToWorld, deleteMessageById } from "../controllers/chat.controller";


export function startSocketConnection(_httpServer: HttpServer) {
    const io = new Server(_httpServer)
   
    io.on("connection", (socket: Socket) => {
        
        console.log(chalk.blue.bold('\nSocket has connected ✅'));
        console.log(chalk.blue(`connected socket is from world => ${socket.handshake.query.worldName} with id : ${socket.handshake.query.worldId}`));

        if(socket.handshake.query.worldId){
            socket.join(socket.handshake.query.worldId)
            console.log(chalk.green.bold('Socket added to Room : '+socket.handshake.query.worldId))
            console.log(chalk.green('referencing the world => '+socket.handshake.query.worldName))
        }
        else{
            console.log(chalk.red('Socket could not be added to room'))
        }

        socket.on("disconnect", (reason) => {
            console.log(chalk.yellow('user disconnected '))
            console.log(reason)

        });

        socket.on('msgfromuser', (letter) => {

            console.log(`incoming message from client = > `, letter.message)

            addMessageToWorld(letter.worldId, letter.message).then((result) => {
                if(!result){
                    socket.emit("deleteMessageError",'World was not found!')
                    return
                }
                // console.log(result);
                console.log(chalk.green(`\nMessage added to it's World DB succesfully\n |=(( ~ Emitting message to all sockets`));
                // console.log((result as any).chat)

                // emit message to only those socket which are present in the room named after message world id
                io.to(letter.worldId).emit("msgfromserver", (result as any).chat)

            }).catch((err) => {
                console.log(chalk.red(err.message));
                socket.emit("postMessageError",err)
            });


        })
        socket.on('messageDeleteRequest', (dltRequest) => {

            console.log(`incoming Message Delete Request from client `)
            deleteMessageById(dltRequest.worldId,dltRequest.messageId)
            .then((result) => {
                if(!result){
                    socket.emit("deleteMessageError",'World / message was not found!')
                    return
                }

                    // console.log(result);
                    console.log(chalk.green(`\nMessage deleted succesfully\n |=(( ~ Emitting  to all sockets`));
                    // console.log((result as any).chat)
    
                    // emit message to only those socket which are present in the room named after message world id
                    io.to(dltRequest.worldId).emit("msgfromserver", (result as any).chat)
                    
    
    
                }).catch((err) => {
                    console.log(chalk.red(err.message));
                    socket.emit("deleteMessageError",err)
                });

        })

    });


}

