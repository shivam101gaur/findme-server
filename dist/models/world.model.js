"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.worldController = exports.build_world = void 0;
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    from: { type: mongoose_1.Schema.Types.ObjectId, required: [true, "From Id is required in message"] },
    type: { type: String, required: [true, "Age is required"] },
    timeStamp: { type: String, required: [true, "Timestamp is required"] },
    content: { type: String, required: [true, "message content is required"] }
});
const worldSchema = new mongoose_1.Schema({
    name: { type: String, unique: true, required: true, dropDups: true },
    password: { type: String },
    created_by: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user', required: true },
    members: { type: [mongoose_1.Schema.Types.ObjectId], validate: (v) => Array.isArray(v) && v.length > 0, ref: 'user' },
    chat: { type: [messageSchema] }
});
const build_world = (world) => { return new worldController(world); };
exports.build_world = build_world;
const worldController = mongoose_1.model("World", worldSchema);
exports.worldController = worldController;
//# sourceMappingURL=world.model.js.map