import { Schema } from "mongoose";
import { IMessage, worldController } from "../models/world.model";
import mongoose from 'mongoose';

export function postMessageToWorld(toWorldId: any, from: any, content: any) {
    // const id =  mongoose.Types.ObjectId();
    const generatedId = mongoose.Types.ObjectId(2);
    console.log({ generatedId });
    worldController.findOneAndUpdate(
        { _id: toWorldId, 'chat._id': { $ne: generatedId } },
        {
            $push: { chat: { "content": content, "from": from, "timeStamp": new Date() } }
        }
        , { new: true, upsert: true }
    )

        .then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });


}




// export class World {

//     constructor() { }
// postMessageToWorld(toWorldId:Schema.Types.ObjectId,from:Schema.Types.ObjectId,message:IMessage['message']){




// }


// }