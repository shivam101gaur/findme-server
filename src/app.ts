import express from "express";
import { db_connection } from "./connection/db.connect"
import { userRouter } from "./routes/user.route";
import chalk from "chalk";
import cors from "cors"


db_connection;
const app = express();
app.use(cors());

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter)


app.get('/', (req, res) => {
    res.send(`<h2><a href="./users">users</a></h2>`)
})

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
})

app.listen(3000, () => {
    console.log(chalk.blue.italic('\n\tapp started listening on http://localhost:3000'))
});