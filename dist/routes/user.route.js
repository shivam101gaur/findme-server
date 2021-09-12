"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const chalk_1 = __importDefault(require("chalk"));
const express_1 = __importDefault(require("express"));
const world_model_1 = require("../models/world.model");
const user_model_1 = require("../models/user.model");
const router = express_1.default.Router();
exports.userRouter = router;
// 📄 get all users
router.get('/', (req, res) => {
    user_model_1.UserController.find()
        .then(doc => {
        res.send(doc);
    })
        .catch(err => {
        res.status(404).send(err);
    });
});
// 📃 get user with name
router.get('/:name', (req, res) => {
    user_model_1.UserController.find({
        name: req.params.name
    }).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(404).send(err);
    });
});
// 📝 get all users whoose ids exist in array ( member array of a world )
router.post('/in/list', (req, res) => {
    const members = req.body.members;
    user_model_1.UserController.find({
        _id: { $in: members }
    }).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});
// 😎 add new user
router.post('/', (req, res) => {
    if (!req.body) {
        console.log(chalk_1.default.red.inverse('REQUEST BODY WAS UNDEFINED AT POST'));
        return;
    }
    const { name, password } = req.body;
    user_model_1.build_user({ name, password }).save()
        .then(doc => {
        res.send(doc);
        console.log(doc);
    })
        .catch(err => {
        res.status(400).send(err);
        console.error(err);
    });
});
// ⚡👺 edit the user
router.put('/:id', (req, res) => {
    user_model_1.UserController.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});
// ❌ delete the user
// make changes in world 🌎 collection
router.delete('/:id', (req, res) => {
    user_model_1.UserController.findByIdAndRemove(req.params.id, { new: true }).then((user_res) => {
        world_model_1.worldController.deleteMany({ created_by: req.params.id }).then((wor_del) => {
            world_model_1.worldController.updateMany({ members: req.params.id }, { $pullAll: { members: [req.params.id] } }).then((wor_upd) => {
                res.send(`${user_res}\n${wor_del}\n${wor_upd}`);
            }).catch((err) => {
                res.status(500).send('User could not be deleted from members of the worlds');
            });
        }).catch((err) => {
            res.status(500).send('Could not delete world created by this user');
        });
    }).catch((err) => {
        res.status(500).send(`user with id = ${req.params.id} could not be deleted\n${err}`);
    });
});
//# sourceMappingURL=user.route.js.map