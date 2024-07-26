import app from "./app.js"
import dotenv from "dotenv";
import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

dotenv.config();

const port = process.env.PORT

app.listen(process.env.PORT, ()=> {
    console.log(`App is running on PORT ${port}`);
})