import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import fileUploader from "express-fileupload"
import { dbConnect } from "./database/dbConnect.js";
import messageRouter from "./routes/messageRoutes.js";

dbConnect();

const app = express();


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

app.use("/api/v1/message", messageRouter)

export default app;