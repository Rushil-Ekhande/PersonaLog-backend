import mongoose from "mongoose";
import "../config.js"

export default async function dbConnect () {
    try {
        const db = mongoose.connect(process.env.MONGODB_ATLAS_CONNECTION_STRING)
        .then(()=>{
            console.log("Database Connected Successfully");
        })
        return db;
    } catch (error) {
        console.log("Error connecting to database -->", error);
        process.exit(1);
    }
}