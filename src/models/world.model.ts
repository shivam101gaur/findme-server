import { Schema, model } from 'mongoose';


export interface IWorld {
    _id?: Schema.Types.ObjectId;
    name: string;
    password: string;
    created_by: Schema.Types.ObjectId;
    members: Schema.Types.ObjectId[]
}

const worldSchema = new Schema({

    name: { type: String, unique: true, required: true, dropDups: true },
    password: { type: String, required: true },
    created_by: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    members: { type: [Schema.Types.ObjectId], validate: (v: Schema.Types.ObjectId) => Array.isArray(v) && v.length > 0, ref: 'user' }

});


const build_world = (world: IWorld) => { return new worldController(world) }

const worldController = model("World", worldSchema);



export { build_world, worldController }