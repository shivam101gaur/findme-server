"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidObjectId = exports.deleteMessageById = exports.addMessageToWorld = void 0;
const world_model_1 = require("../models/world.model");
const mongoose_1 = __importDefault(require("mongoose"));
function addMessageToWorld(toWorldId, message) {
    return __awaiter(this, void 0, void 0, function* () {
        // 📝 Validating parameters 
        if (!message.content || !isValidObjectId(message.from) || !isValidObjectId(toWorldId)) {
            const err = new Error();
            err.name = "400";
            err.message = '';
            if (!isValidObjectId(toWorldId)) {
                err.message += "\nINVALID WORLD ID!\nCannot determine where to push the message to!";
                return Promise.reject(err);
            }
            if (!isValidObjectId(message.from)) {
                err.message += "\nInvalid Message 'From' ID!\nCannot determine who has sent the message!";
            }
            if (!message.content) {
                err.message += "\nInvalid Message Content!";
            }
            return Promise.reject(err);
        }
        // 📝 generating ID for new message Object
        const generatedId = mongoose_1.default.Types.ObjectId();
        // 📝 finding the world and updating it, by pushing new message to it in chat array
        return yield world_model_1.worldController.findOneAndUpdate({ _id: toWorldId, "chat._id": { $ne: generatedId } }, {
            $push: { chat: { "content": message.content, "from": message.from, "timeStamp": new Date(), "_id": generatedId } }
        }, {
            new: true
        });
    });
}
exports.addMessageToWorld = addMessageToWorld;
function deleteMessageById(wid, mid) {
    return __awaiter(this, void 0, void 0, function* () {
        // 📝 Validating parameters 
        if (!isValidObjectId(mid)) {
            const err = new Error();
            err.name = "400";
            err.message = 'INVALID message ID';
            return Promise.reject(err);
        }
        // 📝 Validating parameters 
        if (!isValidObjectId(wid)) {
            const err = new Error();
            err.name = "400";
            err.message = 'INVALID world ID';
            return Promise.reject(err);
        }
        // 📝 finding the world and updating it, by pushing new message to it in chat array
        return yield world_model_1.worldController.findOneAndUpdate({ _id: wid }, { "$pull": { "chat": { "_id": mid } } }, { multi: true, new: true });
    });
}
exports.deleteMessageById = deleteMessageById;
// validate a MongoDB object ID
function isValidObjectId(val) {
    if (mongoose_1.default.isValidObjectId(val)) {
        if ((mongoose_1.default.Types.ObjectId(val === null || val === void 0 ? void 0 : val.toString()).toHexString() == (val === null || val === void 0 ? void 0 : val.toString()))) {
            return true;
        }
    }
    return false;
}
exports.isValidObjectId = isValidObjectId;
//# sourceMappingURL=chat.controller.js.map