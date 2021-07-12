import express, { Router, Response, Request } from "express";
import { db_connection } from "./connection/db.connect"
import { userRouter } from "./routes/user.route";
import chalk from "chalk";
import cors from "cors"
import { worldRouter } from "./routes/world.route";


db_connection;
const app = express();
app.use(cors());

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter)
app.use('/worlds', worldRouter)


app.get('/', (req, res) => {
    res.send(`
     <h2>
     <a href="./users">users</a>
     <br>
     <a href="./worlds">worlds</a>
     </h2>`);

})



// 💀 Handling Invalid Routes
app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    });

    const err = new Error(`Can't find ${req.originalUrl} on this server!`);
        next(err);
});

app.get('*', (req, res) => {
    res.send(`<div style="display:flex;justify-content:center;align-items:center;height:100%;width:100%">
    <b style="color:red;font-size:5vmin">
    ROUTE NOT FOUND
    <br><br>
    <span  style="color:green;font-size:2.8vmin;text-align:center;">
    INVALID ROUTE : <a href="${req.url}">${req.url}</a>
     </span>
     </b>
     </div>`)
});


//An error handling middleware
app.use((err: any, req: Request, res: Response, next: any) => {

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});

app.listen(3000, () => {
    console.log(chalk.blue.italic('\n\tapp started listening on http://localhost:3000'))
});