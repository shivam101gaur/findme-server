import mongoose from 'mongoose';


export interface IUser {
    id?: number;
    name: string;
    password: string;
}

const userSchema = new mongoose.Schema({

    id: Number,
    name: String,
    password: String

});

const build_user = (user: IUser) => { return new UserController(user) }

const UserController = mongoose.model("user", userSchema);



export { build_user , UserController }