// PACKAGES CONFIGURATION
import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import fileUploader from "express-fileupload"
import dotenv from "dotenv";
import cloudinary from "cloudinary";

// DATABASE CONFIGURATION
import { dbConnect } from "./database/dbConnect.js";

// ROUTES CONFIGURATION
import messageRouter from "./routes/messageRoutes.js";
import userRouter from "./routes/userRoutes.js";
import appointmentRouter from "./routes/appointmentRoutes.js"

// MIDDLEWARE CONFIGURATION
import { errorMiddleware } from "./middlewares/errorMiddlewares.js";

// CLOUDINARY CONFIGURATION
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

dotenv.config();
dbConnect();
const port = process.env.PORT
const app = express();


app.listen(process.env.PORT, ()=> {
    console.log(`App is running on PORT ${port}`);
})

app.use(
    cors({
        origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
        methods: ["GET", "POST", "PUT", "UPDATE", "DELETE"],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(fileUploader({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))

app.use('/api/v1/user', userRouter)
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/appointment", appointmentRouter)

app.use(errorMiddleware);
export default app;