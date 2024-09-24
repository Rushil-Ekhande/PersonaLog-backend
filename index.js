import "./config.js"
// import 'dotenv/config' 
import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_ATLAS_CONNECTION_STRING)

    .then(() => {
        console.log("Mongodb Atlas connected");
        app.listen(PORT, () => {
            console.log("App is listening on port", PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    });

// importing all the routes
import diaryRoutes from "./Routes/dairyRoutes.js";

app.use('/diary', diaryRoutes);

app.listen(PORT, () => {
    console.log("App runnning on port", PORT)
})