import express, { Response, Request } from "express";
import { db_connection } from "./connection/db.connect"
import { userRouter } from "./routes/user.route";
import chalk from "chalk";
import cors from "cors"
import { worldRouter } from "./routes/world.route";
import mongoose from 'mongoose';

import { Server as HttpServer } from "http"
import { startSocketConnection } from "./connection/socket.connect";


db_connection;
const app = express();
const httpServer = new HttpServer(app)
startSocketConnection(httpServer)
// let http = require("http").Server(app);
// let io = require("socket.io")(http);


var allowedOrigins = ['https://find-me0.web.app/'];
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}))

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter)
app.use('/worlds', worldRouter)


app.get('/', (req, res) => {
    res.send(`
     <h2>
     <a href="./users">View Users</a>
     <br>
     <a href="./worlds">View Worlds</a>
     </h2>`);

})


app.get('*', (req, res) => {
    res.status(404).send(`<div style="display:flex;justify-content:center;align-items:center;height:100%;width:100%">
    <b style="color:red;font-size:5vmin">
    ROUTE NOT FOUND
    <br><br>
    <span  style="color:green;font-size:2.8vmin;text-align:center;">
    INVALID ROUTE : <a href="${req.url}">${req.url}</a>
     </span>
     </b>
     </div>`)
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
app.use((err: any, req: Request, res: Response, next: any) => {

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});


// #region Testing code FIXME ⚡ Only for testing , review when not required ⚡

app.get('/test/:param1?/:param2?', (req, res) => {

    const generatedId1 = mongoose.Types.ObjectId()
    const generatedId2 = mongoose.Types.ObjectId()
    const generatedId3 = mongoose.Types.ObjectId()
    console.log({ generatedId1, generatedId2, generatedId3 });
    res.json({ generatedId1, generatedId2, generatedId3 })

    // res.send('\nReceeived param1 : \n' + req.params.param1 + '\nReceeived param2 : \n' + req.params.param2)
})

// #endregion


httpServer.listen(8080, () => {
    console.log(chalk.blue.italic('\n\tapp started listening on https://findme-server-325808.el.r.appspot.com'))
});