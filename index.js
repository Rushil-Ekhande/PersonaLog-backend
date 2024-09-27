import "./config.js"
// import 'dotenv/config' 
import express from "express";
import dbConnect from "./Helpers/DatabaseConnector.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

dbConnect()
    .then(() => {
        app.listen(PORT, () => {
            console.log("server is running on port", PORT);
        })
    })



// importing all the routes
import diaryRoutes from "./Routes/dairyRoutes.js";
import pageRoutes from "./Routes/pageRoutes.js"

app.use('/diary', diaryRoutes);
app.use('/page', pageRoutes);

// app.listen(PORT, () => {
//     console.log("App runnning on port", PORT)
// })