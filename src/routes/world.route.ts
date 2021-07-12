import chalk from "chalk";
import express, { Router, Response, Request } from "express";
import { build_world, IWorld, worldController } from "../models/world.model";



const router = express.Router();


// 📝 get all worlds 

router.get('/', (req: Request, res: Response) => {

    worldController.find()
        .then(doc => {
            res.send(doc)
        })
        .catch(err => {
            res.send(err)
        })

})

//📝 get world with name
router.get('/:name', (req: Request, res: Response) => {
    worldController.find({
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
    var { name, password, created_by }: IWorld = req.body

    build_world({ name, password, created_by }).save()
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

    worldController.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.send(err)
    });
})

router.delete('/:id', (req, res) => {

    worldController.findByIdAndDelete(req.params.id, { new: true }).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.send(`user with id = ${req.params.id} could not be deleted${err}`)
    });

})




export { router as userRouter }