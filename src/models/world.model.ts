import { Schema, model } from 'mongoose';


export interface IWorld {
    _id?: number;
    name: string;
    password: string;
    created_by: string;
}

const worldSchema = new Schema({

    name: { type: String, unique: true, required: true, dropDups: true },
    password: { type: String, required: true },
    created_by: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref:'User' }]

});


const build_world = (world: IWorld) => { return new worldController(world) }

const worldController = model("World", worldSchema);



export { build_world, worldController }