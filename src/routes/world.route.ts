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
            res.status(404).send(err);
        })

})

//📝 get all worlds where a user exists in memeber array
router.get('/user/:user_id',(req:Request,res:Response)=>{
    worldController.find({
        members: req.params.user_id
    }).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(404).send(err)
    }); 
})

//📝 get world with name
router.get('/:name', (req: Request, res: Response) => {

    worldController.find({
        name: req.params.name
    }).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(404).send(err)
    });

})

router.post('/', (req, res) => {

    // var world = { name, password, created_by, members }
    const world: IWorld = req.body;

    if (!(world?.members)) {
        world.members = []
    }
    if (!(world.members.includes(world.created_by))) { world.members.push(world.created_by) }

    // 📰 removing duplicate members in array
    world.members = [...new Set(world.members)]

    build_world(world).save()
        .then(doc => {
            res.send(doc);
            console.log(doc)
        })
        .catch(err => {
            res.status(400).send(err);
            console.error(err)
        });
})

router.put('/:id', (req, res) => {

    const world: IWorld = req.body;

    if (!(world?.members)) {
        world.members = []
    }
    if (!(world.members.includes(world.created_by))) { world.members.push(world.created_by) }
    // 📰 removing duplicate members in array
    world.members = [...new Set(world.members)]

    worldController.findByIdAndUpdate(req.params.id, world, { new: true }).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(400).send(err)
    });
})

router.delete('/:id', (req, res) => {

    worldController.findByIdAndRemove(req.params.id, { new: true }).then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log('World Could not be deleted at request',err)
        res.status(500).send(`user with id = ${req.params.id} could not be deleted${err}`)
    });

})




export { router as worldRouter }