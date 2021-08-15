import { Schema, model } from 'mongoose';


export interface IWorld {
    _id?: Schema.Types.ObjectId;
    name: string;
    password: string;
    created_by: Schema.Types.ObjectId;
    members: Schema.Types.ObjectId[];
    chat: IMessage[]
}

export interface IMessage {
    _id: Schema.Types.ObjectId
    from: Schema.Types.ObjectId;
    type: 'text';
    timeStamp: Schema.Types.String;
    content: string;
}

const worldSchema = new Schema<IWorld>({

    name: { type: String, unique: true, required: true, dropDups: true },
    password: { type: String, required: true },
    created_by: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    members: { type: [Schema.Types.ObjectId], validate: (v: Schema.Types.ObjectId) => Array.isArray(v) && v.length > 0, ref: 'user' },
    chat: [new Schema(

        {
            _id: {
                type: Schema.Types.ObjectId,

                required: true,
            },
            from: { type: String, required: [true, "From Id is required in message"] },
            type: { type: String, required: [true, "Age is required"] },
            timeStamp: { type: String, required: [true, "Contact is required"] },
            content: { type: String, required: [true, "Contact is required"] }
        })]


});


const build_world = (world: IWorld) => { return new worldController(world) }

const worldController = model("World", worldSchema);



export { build_world, worldController }