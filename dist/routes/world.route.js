"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.worldRouter = void 0;
const chalk_1 = __importDefault(require("chalk"));
const express_1 = __importDefault(require("express"));
const chat_controller_1 = require("../controllers/chat.controller");
const world_model_1 = require("../models/world.model");
const router = express_1.default.Router();
exports.worldRouter = router;
// 📝 get all worlds
router.get('/', (req, res) => {
    world_model_1.worldController.find()
        .then(doc => {
        res.send(doc);
    })
        .catch(err => {
        res.status(404).send(err);
    });
});
// 📝❌ get all worlds where a user does not exists in memeber array
router.get('/notamember/:user_id', (req, res) => {
    world_model_1.worldController.find({
        members: { "$ne": req.params.user_id }
    }).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(404).send(err);
    });
});
// 📝 get all worlds where a user exists in memeber array
router.get('/member/:user_id', (req, res) => {
    world_model_1.worldController.find({
        members: req.params.user_id
    }).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(404).send(err);
    });
});
// 📝 get world with name
router.get('/:name', (req, res) => {
    world_model_1.worldController.findOne({
        name: req.params.name
    }).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(404).send(err);
    });
});
// 📝 creating a new world
router.post('/', (req, res) => {
    const world = req.body;
    if (!(world === null || world === void 0 ? void 0 : world.members)) {
        world.members = [];
    }
    if (!(world.members.includes(world.created_by))) {
        world.members.push(world.created_by);
    }
    // 📰 removing duplicate members in array
    world.members = [...new Set(world.members)];
    world_model_1.build_world(world).save()
        .then(doc => {
        res.send(doc);
        console.log(doc);
    })
        .catch(err => {
        res.status(400).send(err);
        console.error(err);
    });
});
// 📝⚡ post a message to world by world id
router.post('/postmessage/:wid', (req, res) => {
    chat_controller_1.addMessageToWorld(req.params.wid, req.body).then((result) => {
        console.log(result);
        res.status(200).send(result);
    }).catch((err) => {
        var _a;
        console.log(chalk_1.default.red(err.message));
        res.status((_a = (Number(err.name))) !== null && _a !== void 0 ? _a : 500).send(err.message);
    });
});
// 📝⚡ delete a message by id
router.delete('/message/:wid/:mid', (req, res) => {
    chat_controller_1.deleteMessageById(req.params.wid, req.params.mid).then((result) => {
        console.log(result);
        res.status(200).send(result);
    }).catch((err) => {
        var _a;
        console.log(chalk_1.default.red(err.message));
        res.status((_a = (Number(err.name))) !== null && _a !== void 0 ? _a : 500).send(err.message);
    });
});
// 📝 update the world by id
router.put('/:id', (req, res) => {
    const world = req.body;
    if (!(world === null || world === void 0 ? void 0 : world.members)) {
        world.members = [];
    }
    if (!(world.members.includes(world.created_by))) {
        world.members.push(world.created_by);
    }
    // 📰 removing duplicate members in array
    world.members = [...new Set(world.members)];
    world_model_1.worldController.findByIdAndUpdate(req.params.id, world, { new: true }).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});
// 📝 add a member to the world
router.put('/addmember/:id', (req, res) => {
    const membersToAdd = req.body.members;
    world_model_1.worldController.findByIdAndUpdate(req.params.id, { $addToSet: { members: { $each: membersToAdd } } }, { new: true }).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});
// 📝 delete a world by id
router.delete('/:id', (req, res) => {
    world_model_1.worldController.findByIdAndRemove(req.params.id, { new: true }).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log('World Could not be deleted at request', err);
        res.status(500).send(`user with id = ${req.params.id} could not be deleted${err}`);
    });
});
//# sourceMappingURL=world.route.js.map