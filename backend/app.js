import express from "express";
import {config} from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import fileUploader from "express-fileupload"

const app = express();
config({path: ".env"});


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
    tempFileDir: "/tmp"
}))

export default app;