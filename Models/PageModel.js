import mongoose, { Schema } from "mongoose";

const pageSchema = new Schema({
    title: {
        type: String,
        required: true,
    },  
    description: {
        type: String,
        required: true,
    }
}, {timestamps: true});

const Page = mongoose.model("Page", pageSchema);

export default Page;