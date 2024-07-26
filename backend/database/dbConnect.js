import mongoose from "mongoose"
import dotenv from "dotenv";

dotenv.config();

const mongoURL = process.env.MONGO_URL;

export const dbConnect = () => {
    mongoose.connect(mongoURL, {
        dbName: "health-care"
    }).then(() => {
        console.log('Connected to database!')
    }).catch((err) => {
        console.log(`Error while connecting to the database: ${err}`)
    })
}
