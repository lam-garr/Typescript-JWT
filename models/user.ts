import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true},
    password: {types: String, requried: true}
})

export default mongoose.model("NewUser", UserSchema);