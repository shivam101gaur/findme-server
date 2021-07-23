import chalk from "chalk";
import express, { Router, Response, Request } from "express";
import { worldController } from "../models/world.model";
import { build_user, IUser, UserController } from "../models/user.model";


const router = express.Router();


//📄 get all users 
router.get('/', (req, res) => {

    UserController.find()
        .then(doc => {
            res.send(doc)
        })
        .catch(err => {
            res.status(404).send(err)
        })
})

//📃 get user with name
router.get('/:name', (req, res) => {
    UserController.find({
        name: req.params.name
    }).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(404).send(err)
    });

})


// 😎 add new user
router.post('/', (req, res) => {

    if (!req.body) {
        console.log(chalk.red.inverse('REQUEST BODY WAS UNDEFINED AT POST'));
        return
    }
    var { name, password }: IUser = req.body

    build_user({ name, password }).save()
        .then(doc => {
            res.send(doc);
            console.log(doc)
        })
        .catch(err => {
            res.status(400).send(err);
            console.error(err)
        });


})

//⚡👺 edit the user
router.put('/:id', (req, res) => {

    UserController.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(400).send(err)
    });
})

// ❌ delete the user
// make changes in world 🌎 collection
router.delete('/:id', (req, res) => {

    UserController.findByIdAndRemove(req.params.id, { new: true }).then((user_res) => {

        worldController.deleteMany({ created_by: req.params.id }).then((wor_del) => {

            worldController.updateMany({ members: req.params.id }, { $pullAll: { members: [req.params.id] } }).then((wor_upd) => {
                res.send(`${user_res}\n${wor_del}\n${wor_upd}`);

            }).catch((err) => {
                res.status(500).send('User could not be deleted from members of the worlds')
            });

        }).catch((err) => {
            res.status(500).send('Could not delete world created by this user')
        });
    }).catch((err) => {
        res.status(500).send(`user with id = ${req.params.id} could not be deleted\n${err}`)
    });

})




export { router as userRouter }