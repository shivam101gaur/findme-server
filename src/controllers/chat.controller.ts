import { IMessage, worldController } from "../models/world.model";
import mongoose, { Schema } from 'mongoose';



export async function postMessageToWorld(toWorldId: string | Schema.Types.ObjectId, message: IMessage) {

    // 📝 Validating parameters 
    if (!message.content || !isValidObjectId(message.from) || !isValidObjectId(toWorldId)) {

        const err = new Error()
        err.name = "400"
        err.message = ''

        if (!isValidObjectId(toWorldId)) {

            err.message += "\nINVALID WORLD ID!\nCannot determine where to push the message to!"

            return Promise.reject(err)
        }
        if (!isValidObjectId(message.from)) {
            err.message += "\nInvalid Message 'From' ID!\nCannot determine who has sent the message!"
        }
        if (!message.content) {

            err.message += "\nInvalid Message Content!"

        }
        return Promise.reject(err)
    }

    // 📝 generating ID for new message Object
    const generatedId = mongoose.Types.ObjectId();
    // 📝 finding the world and updating it, by pushing new message to it in chat array
    return await worldController.findOneAndUpdate(

        { _id: toWorldId, "chat._id": { $ne: generatedId } },
        {
            $push: { chat: { "content": message.content, "from": message.from, "timeStamp": new Date(), "_id": generatedId } }
        }

    )

}

// validate a MongoDB object ID
export function isValidObjectId(val: string | Schema.Types.ObjectId): boolean {
    if (mongoose.isValidObjectId(val)) {
        if ((mongoose.Types.ObjectId(val?.toString()).toHexString() == val?.toString())) {
            return true
        }
    }
    return false
}








