import mongoose, { Schema } from "mongoose";

const personSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
    },
    age: {
        type: Number,
    },
    phoneNo: {
        type:[Number]
    },
    gender: {
        type: String,
    },
    dob:{
        type: String,
    },
    occupation: {
        type: String,
    },
    relation: {
        type: String,
    },
    personImg: {
        type: String
    }
}, {timestamps: true});

const Person = mongoose.model("Person", personSchema);

export default Person;