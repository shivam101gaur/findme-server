"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSocketConnection = void 0;
const chalk_1 = __importDefault(require("chalk"));
const socket_io_1 = require("socket.io");
const chat_controller_1 = require("../controllers/chat.controller");
function startSocketConnection(_httpServer) {
    const io = new socket_io_1.Server(_httpServer);
    io.on("connection", (socket) => {
        console.log(chalk_1.default.blue.bold('\nSocket has connected ✅'));
        console.log(chalk_1.default.blue(`connected socket is from world => ${socket.handshake.query.worldName} with id : ${socket.handshake.query.worldId}`));
        if (socket.handshake.query.worldId) {
            socket.join(socket.handshake.query.worldId);
            console.log(chalk_1.default.green.bold('Socket added to Room : ' + socket.handshake.query.worldId));
            console.log(chalk_1.default.green('referencing the world => ' + socket.handshake.query.worldName));
        }
        else {
            console.log(chalk_1.default.red('Socket could not be added to room'));
        }
        socket.on("disconnect", (reason) => {
            console.log(chalk_1.default.yellow('user disconnected '));
            console.log(reason);
        });
        socket.on('msgfromuser', (letter) => {
            console.log(`incoming message from client = > `, letter.message);
            chat_controller_1.addMessageToWorld(letter.worldId, letter.message).then((result) => {
                // console.log(result);
                console.log(chalk_1.default.green(`\nMessage added to it's World DB succesfully\n |=(( ~ Emitting message to all sockets`));
                // console.log((result as any).chat)
                // emit message to only those socket which are present in the room named after message world id
                io.to(letter.worldId).emit("msgfromserver", result.chat);
            }).catch((err) => {
                console.log(chalk_1.default.red(err.message));
                socket.emit("msgfromserver", {
                    content: 'could not send message !'
                });
            });
        });
    });
}
exports.startSocketConnection = startSocketConnection;
//# sourceMappingURL=socket.connect.js.map