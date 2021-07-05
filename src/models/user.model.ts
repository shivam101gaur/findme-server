import mongoose from 'mongoose';


export interface IUser {
    _id?: number;
    name: string;
    password: string;
}

const userSchema = new mongoose.Schema({

   
    name: String,
    password: String

});


const build_user = (user: IUser) => { return new UserController(user) }

const UserController = mongoose.model("user", userSchema);



export { build_user , UserController }