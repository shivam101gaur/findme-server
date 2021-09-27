"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = exports.build_user = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, unique: true, required: true, dropDups: true },
    password: { type: String, required: true }
});
const build_user = (user) => { return new UserController(user); };
exports.build_user = build_user;
const UserController = mongoose_1.model("user", userSchema);
exports.UserController = UserController;
//# sourceMappingURL=user.model.js.map