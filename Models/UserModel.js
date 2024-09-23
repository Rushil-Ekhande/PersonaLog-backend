import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password:{
        type: String,
        required: true,
    },
    people: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'  // Referencing the Post model
    }],
    dairies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dairy'
    }],
    userImg: {
        type: String
    },
    accessTo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dairy' 
    }]
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;