import chalk from "chalk";
import express, { Router, Response, Request } from "express";
import { build_user, IUser, UserController } from "../models/user.model";

const router = express.Router();


//get all users
router.get('/', (req, res) => {

    UserController.find()
        .then(doc => {
            res.send(doc)
        })
        .catch(err => {
            res.send(err)
        })

})

//get user with id
router.get('/:name', (req, res) => {
    UserController.find({
        name: req.params.name
    }).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.send(err)
    });

})

router.post('/', (req, res) => {

    if (!req.body) {
        console.log(chalk.red.inverse('REQUEST BODY WAS UNDEFINED AT POST'));
        return
    }
    var { name, password }:IUser = req.body

    build_user({ name, password }).save()
        .then(doc => {
            res.send(doc);
            console.log(doc)
        })
        .catch(err => {
            res.send(err);
            console.error(err)
        });


})

router.put('/:id', (req, res) => {

    UserController.findByIdAndUpdate(req.params.id,req.body, {new: true}).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.send(err)
    });
})

router.delete('/:id', (req, res) => {

    UserController.findByIdAndDelete(req.params.id,{new:true}).then((result) => {
        res.send(result)
    }).catch((err) => {
         res.send(`user with id = ${req.params.id} could not be deleted${err}`)
    });
   
})




export { router as userRouter }