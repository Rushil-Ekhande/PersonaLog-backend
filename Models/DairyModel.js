import mongoose, { Schema } from "mongoose";

const diarySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },  
    pages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page',
    }],
    giveAccessTo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    visibility: {
        type: String,
    }
}, {timestamps: true});

const Diary = mongoose.model("Diary", diarySchema);

export default Diary;