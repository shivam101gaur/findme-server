import { Schema, model } from 'mongoose';


export interface IUser {
    _id?: Schema.Types.ObjectId;
    name: string;
    password: string;
}

const userSchema = new Schema({

    name: { type: String, unique: true, required: true, dropDups: true },
    password: { type: String, required: true }

});


const build_user = (user: IUser) => { return new UserController(user) }

const UserController = model("user", userSchema);



export { build_user, UserController }