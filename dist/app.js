"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_connect_1 = require("./connection/db.connect");
const user_route_1 = require("./routes/user.route");
const chalk_1 = __importDefault(require("chalk"));
const cors_1 = __importDefault(require("cors"));
const world_route_1 = require("./routes/world.route");
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = require("http");
const socket_connect_1 = require("./connection/socket.connect");
db_connect_1.db_connection;
const app = express_1.default();
const httpServer = new http_1.Server(app);
socket_connect_1.startSocketConnection(httpServer);
// let http = require("http").Server(app);
// let io = require("socket.io")(http);
app.use(cors_1.default());
// middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/users', user_route_1.userRouter);
app.use('/worlds', world_route_1.worldRouter);
app.get('/', (req, res) => {
    res.send(`
     <h2>
     <a href="./users">users</a>
     <br>
     <a href="./worlds">worlds</a>
     </h2>`);
});
app.get('*', (req, res) => {
    res.status(404).send(`<div style="display:flex;justify-content:center;align-items:center;height:100%;width:100%">
    <b style="color:red;font-size:5vmin">
    ROUTE NOT FOUND
    <br><br>
    <span  style="color:green;font-size:2.8vmin;text-align:center;">
    INVALID ROUTE : <a href="${req.url}">${req.url}</a>
     </span>
     </b>
     </div>`);
});
// 💀 Handling Invalid Routes
app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    });
    const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    next(err);
});
// An error handling middleware
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});
// #region Testing code FIXME ⚡ Only for testing , review when not required ⚡
app.get('/test/:param1?/:param2?', (req, res) => {
    const generatedId1 = mongoose_1.default.Types.ObjectId();
    const generatedId2 = mongoose_1.default.Types.ObjectId();
    const generatedId3 = mongoose_1.default.Types.ObjectId();
    console.log({ generatedId1, generatedId2, generatedId3 });
    res.json({ generatedId1, generatedId2, generatedId3 });
    // res.send('\nReceeived param1 : \n' + req.params.param1 + '\nReceeived param2 : \n' + req.params.param2)
});
// #endregion
httpServer.listen(8080, () => {
    console.log(chalk_1.default.blue.italic('\n\tapp started listening on http://localhost:8080'));
});
//# sourceMappingURL=app.js.map