import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import fileUploader from "express-fileupload"
import mongoConnect from "./database/dbConnect.js";

const port = process.env.PORT;
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

mongoConnect()

const runApp = (port) => {
    mongoConnect().then(
        res=>{
            app.listen(port);
            console.log()
        }
    ).catch(
        err=>{
            console.log(err);
        }
    )
}
runApp(port);
export default app;