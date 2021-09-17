import chalk from "chalk";
import express, { Router, Response, Request } from "express";
import { Schema } from "mongoose";
import { deleteMessageById, addMessageToWorld, isValidObjectId } from "../controllers/chat.controller";
import { build_world, IMessage, IWorld, worldController } from "../models/world.model";
import mongoose from 'mongoose';

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

// 📝❌ get all worlds where a user does not exists in memeber array
router.get('/notamember/:user_id', (req: Request, res: Response) => {
    worldController.find({
        members: { "$ne": req.params.user_id }
    }).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(404).send(err)
    });
})

// 📝 get all worlds where a user exists in memeber array
router.get('/member/:user_id', (req: Request, res: Response) => {
    worldController.find({
        members: req.params.user_id
    }).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(404).send(err)
    });
})

// 📝 get world with name
router.get('/:name', (req: Request, res: Response) => {

    worldController.findOne({
        name: req.params.name
    }).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(404).send(err)
    });

})


// 📝 creating a new world
router.post('/', (req, res) => {

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

// 📝⚡ post a message to world by world id
router.post('/postmessage/:wid', (req, res) => {
    addMessageToWorld(req.params.wid, req.body).then((result) => {
        console.log(result);
        res.status(200).send(result)
    }).catch((err) => {
        console.log(chalk.red(err.message));
        res.status((Number(err.name)) ?? 500).send(err.message)

    });
})

// 📝⚡ delete a message by id
router.delete('/message/:wid/:mid', (req, res) => {

    deleteMessageById(req.params.wid, req.params.mid).then((result) => {
        console.log(result);
        res.status(200).send(result)
    }).catch((err) => {
        console.log(chalk.red(err.message));
        res.status((Number(err.name)) ?? 500).send(err.message)

    });
})

// 📝 update the world by id
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

// 📝 add a member to the world
router.put('/addmember/:id', (req, res) => {

    const membersToAdd: Schema.Types.ObjectId[] = req.body.members;

    worldController.findByIdAndUpdate(req.params.id, { $addToSet: { members: { $each: membersToAdd } } }, { new: true }).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(400).send(err)
    });
})
// 📝 remove a member from the world
router.delete('/removemember/:wid/:uid', (req, res) => {
if(isValidObjectId(req.params.wid)&&isValidObjectId(req.params.uid)){
      worldController.findByIdAndUpdate(req.params.wid, { $pull: { members: { '_id': req.params.uid } } }, { new: true }).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(500).send(err)
    });
}
else{
    res.status(400).send('Invalid world Id or User Id!\ncannot remove user from world')
}
  
})

// 📝 delete a world by id
router.delete('/:id', (req, res) => {

    worldController.findByIdAndRemove(req.params.id, { new: true }).then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log('World Could not be deleted at request', err)
        res.status(500).send(`user with id = ${req.params.id} could not be deleted${err}`)
    });

})

export { router as worldRouter }


