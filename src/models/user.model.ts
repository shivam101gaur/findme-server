import  { Schema,model } from 'mongoose';


export interface IUser {
    _id?: number;
    name: string;
    password: string;
}

const userSchema = new Schema({

    name: { type: String, unique: true, required: true, dropDups: true },
    password: String

});


const build_user = (user: IUser) => { return new UserController(user) }

const UserController = model("user", userSchema);



export { build_user, UserController }