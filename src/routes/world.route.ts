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
            res.statusCode=500;
            res.send(err);
        
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

   
    // var world = { name, password, created_by, members }
    var world: IWorld = req.body;

    if (!(world?.members)) {
        world.members = []
    }
    if (!(world.members.includes(world.created_by))) { world.members.push(world.created_by) }


    build_world(world).save()
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




export { router as worldRouter }